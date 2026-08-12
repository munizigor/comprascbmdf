# -*- coding: utf-8 -*-
"""Testes das regras puras do painel de saude do PCA.

Nenhuma regra aqui le o relogio nem a rede: `gerado_em` e sempre parametro,
como em test_radar.py.
"""
import os
import sys
import unittest
from datetime import date

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tools", "pgc"))

import saude  # noqa: E402

HOJE = date(2026, 8, 12)


def dfd(**campos):
    """Registro bruto do PGC com os campos que interessam; o resto e default."""
    base = {
        "id": 5000000,
        "numero": 1,
        "descricao": "1/2026",
        "identificadorUnico": "170394/000001/2026",
        "uasg": 170394,
        "nomeUasg": "CORPO DE BOMBEIROS MILITAR DO DF",
        "anoPCA": 2027,
        "status": "2",
        "descricaoStatus": "Rascunho",
        "fase": 1,
        "descricaoFase": "Planejamento",
        "descricaoTipo": "Documento de Formalizacao de Demanda",
        "nomeArea": None,
        "objeto": None,
        "necessidade": "",
        "valor": None,
        "loginOperacao": 12345678901,
        "nomeLoginOperacao": "FULANO DE TAL",
        "possuiContratacaoVinculada": False,
        "temAnexos": False,
    }
    base.update(campos)
    return base


class TestSaneamento(unittest.TestCase):
    def test_descarta_o_cpf_do_operador(self):
        limpo = saude.sanear(dfd(loginOperacao=12345678901))
        self.assertNotIn("loginOperacao", limpo)
        self.assertNotIn(12345678901, limpo.values())

    def test_preserva_o_nome_do_operador_como_responsavel(self):
        limpo = saude.sanear(dfd(nomeLoginOperacao="KATIA REJANE"))
        self.assertEqual(limpo["responsavel"], "KATIA REJANE")

    def test_traduz_os_campos_para_o_vocabulario_do_dominio(self):
        limpo = saude.sanear(dfd(numero=54, anoPCA=2027, nomeArea="COMOP - COMAV",
                                 valor=77700000.0, objeto="  Helicopteros  "))
        self.assertEqual(limpo["numero"], 54)
        self.assertEqual(limpo["ano_pca"], 2027)
        self.assertEqual(limpo["area"], "COMOP - COMAV")
        self.assertEqual(limpo["valor"], 77700000.0)
        self.assertEqual(limpo["objeto"], "Helicopteros")

    def test_area_ausente_vira_rotulo_explicito(self):
        self.assertEqual(saude.sanear(dfd(nomeArea=None))["area"], saude.SEM_AREA)
        self.assertEqual(saude.sanear(dfd(nomeArea="  "))["area"], saude.SEM_AREA)

    def test_marca_o_dfd_sem_nenhum_campo_essencial_como_casca(self):
        self.assertTrue(saude.sanear(dfd())["casca"])
        self.assertFalse(saude.sanear(dfd(objeto="Alguma coisa"))["casca"])

    def test_conta_os_campos_essenciais_preenchidos(self):
        limpo = saude.sanear(dfd(nomeArea="DESEG - DIMAT", objeto="Maletas"))
        self.assertEqual(limpo["preenchidos"], 2)
        self.assertEqual(limpo["essenciais"], len(saude.CAMPOS_ESSENCIAIS))


class TestCompletude(unittest.TestCase):
    def test_conta_preenchimento_por_campo_essencial(self):
        registros = [saude.sanear(dfd(nomeArea="DISAU", objeto="X", valor=10.0)),
                     saude.sanear(dfd()),
                     saude.sanear(dfd(nomeArea="DISAU"))]
        c = saude.completude(registros)
        self.assertEqual(c["area"], {"preenchidos": 2, "total": 3, "percentual": 66.7})
        self.assertEqual(c["objeto"]["preenchidos"], 1)
        self.assertEqual(c["necessidade"]["preenchidos"], 0)

    def test_sem_registros_nao_divide_por_zero(self):
        self.assertEqual(saude.completude([])["area"],
                         {"preenchidos": 0, "total": 0, "percentual": 0.0})


class TestValores(unittest.TestCase):
    def test_soma_apenas_o_que_tem_valor_informado(self):
        registros = [saude.sanear(dfd(valor=100.0)), saude.sanear(dfd(valor=None)),
                     saude.sanear(dfd(valor=50.0))]
        v = saude.resumo_valores(registros)
        self.assertEqual(v["total"], 150.0)
        self.assertEqual(v["com_valor"], 2)
        self.assertEqual(v["sem_valor"], 1)

    def test_aponta_o_maior_dfd_e_sua_concentracao(self):
        registros = [saude.sanear(dfd(numero=54, valor=77700000.0, objeto="Helicopteros")),
                     saude.sanear(dfd(numero=64, valor=1200000.0))]
        v = saude.resumo_valores(registros)
        self.assertEqual(v["maior"]["numero"], 54)
        self.assertEqual(v["maior"]["percentual"], 98.5)

    def test_alerta_quando_um_unico_dfd_domina_o_agregado(self):
        dominado = [saude.sanear(dfd(numero=1, valor=90.0)), saude.sanear(dfd(numero=2, valor=10.0))]
        equilibrado = [saude.sanear(dfd(numero=1, valor=40.0)), saude.sanear(dfd(numero=2, valor=60.0))]
        self.assertTrue(saude.resumo_valores(dominado)["concentrado"])
        self.assertFalse(saude.resumo_valores(equilibrado)["concentrado"])

    def test_sem_nenhum_valor_informado_nao_ha_maior(self):
        v = saude.resumo_valores([saude.sanear(dfd(valor=None))])
        self.assertEqual(v["total"], 0.0)
        self.assertIsNone(v["maior"])
        self.assertFalse(v["concentrado"])


class TestNumeracao(unittest.TestCase):
    def test_aponta_as_lacunas_da_sequencia(self):
        registros = [saude.sanear(dfd(numero=n)) for n in (5, 6, 9)]
        n = saude.numeracao(registros)
        self.assertEqual(n["menor"], 5)
        self.assertEqual(n["maior"], 9)
        self.assertEqual(n["ausentes"], [7, 8])
        self.assertEqual(n["cobertura"], 60.0)

    def test_sequencia_sem_lacuna(self):
        n = saude.numeracao([saude.sanear(dfd(numero=x)) for x in (1, 2, 3)])
        self.assertEqual(n["ausentes"], [])
        self.assertEqual(n["cobertura"], 100.0)

    def test_sem_registros(self):
        self.assertEqual(saude.numeracao([])["ausentes"], [])


class TestCamposMortos(unittest.TestCase):
    def test_lista_campos_nulos_ou_vazios_em_todos_os_registros(self):
        brutos = [dfd(nomeArea="DISAU", categoria=None, dataPrevista=None),
                  dfd(nomeArea=None, categoria=None, dataPrevista=None)]
        mortos = saude.campos_mortos(brutos)
        self.assertIn("categoria", mortos)
        self.assertIn("dataPrevista", mortos)
        self.assertIn("necessidade", mortos)
        self.assertNotIn("nomeArea", mortos)

    def test_nao_expoe_campo_de_pii_na_lista(self):
        brutos = [dfd(loginOperacao=None), dfd(loginOperacao=None)]
        self.assertNotIn("loginOperacao", saude.campos_mortos(brutos))


class TestAgrupamentos(unittest.TestCase):
    def test_agrupa_por_area_com_total_e_valor(self):
        registros = [saude.sanear(dfd(nomeArea="DISAU", valor=100.0)),
                     saude.sanear(dfd(nomeArea="DISAU", valor=200.0)),
                     saude.sanear(dfd(nomeArea="DIMAT", valor=500.0)),
                     saude.sanear(dfd(nomeArea=None))]
        areas = saude.por_area(registros)
        self.assertEqual([a["area"] for a in areas], ["DIMAT", "DISAU", saude.SEM_AREA])
        self.assertEqual(areas[1]["total"], 2)
        self.assertEqual(areas[1]["valor"], 300.0)
        self.assertEqual(areas[2]["cascas"], 1)

    def test_agrupa_por_responsavel_do_maior_para_o_menor(self):
        registros = [saude.sanear(dfd(nomeLoginOperacao="KATIA")),
                     saude.sanear(dfd(nomeLoginOperacao="KATIA")),
                     saude.sanear(dfd(nomeLoginOperacao="BARBARA"))]
        resp = saude.por_responsavel(registros)
        self.assertEqual(resp[0], {"responsavel": "KATIA", "total": 2})
        self.assertEqual(resp[1]["total"], 1)

    def test_conta_por_status(self):
        registros = [saude.sanear(dfd(descricaoStatus="Rascunho")),
                     saude.sanear(dfd(descricaoStatus="Rascunho")),
                     saude.sanear(dfd(descricaoStatus="Devolvido"))]
        self.assertEqual(saude.por_status(registros),
                         [{"status": "Rascunho", "total": 2}, {"status": "Devolvido", "total": 1}])


class TestDedupe(unittest.TestCase):
    def test_o_mesmo_dfd_em_dois_lotes_conta_uma_vez(self):
        brutos = [dfd(id=1, numero=5), dfd(id=2, numero=6), dfd(id=1, numero=5)]
        self.assertEqual([b["id"] for b in saude.dedupe(brutos)], [1, 2])

    def test_vence_a_ocorrencia_mais_recente_do_lote(self):
        antigo = dfd(id=1, objeto=None)
        novo = dfd(id=1, objeto="ja preenchido")
        self.assertEqual(saude.dedupe([antigo, novo])[0]["objeto"], "ja preenchido")

    def test_registro_sem_id_e_preservado(self):
        self.assertEqual(len(saude.dedupe([dfd(id=None), dfd(id=None)])), 2)


class TestMontarPainel(unittest.TestCase):
    def test_separa_os_anos_de_pca_do_mesmo_lote(self):
        brutos = [dfd(numero=1, anoPCA=2026), dfd(numero=2, anoPCA=2027),
                  dfd(numero=3, anoPCA=2027)]
        painel = saude.montar_painel(brutos, HOJE)
        self.assertEqual([a["ano_pca"] for a in painel["anos"]], [2026, 2027])
        self.assertEqual(painel["anos"][1]["total"], 2)

    def test_carrega_a_data_da_coleta(self):
        self.assertEqual(saude.montar_painel([dfd()], HOJE)["gerado_em"], "2026-08-12")

    def test_cada_ano_traz_os_indicadores_e_os_registros(self):
        painel = saude.montar_painel([dfd(numero=54, valor=100.0, nomeArea="COMOP")], HOJE)
        ano = painel["anos"][0]
        for chave in ("total", "cascas", "completude", "valores", "numeracao",
                      "areas", "responsaveis", "status", "campos_mortos", "itens"):
            self.assertIn(chave, ano)
        self.assertEqual(ano["itens"][0]["numero"], 54)

    def test_o_peso_das_cascas_vem_calculado_do_python(self):
        brutos = [dfd(numero=1), dfd(numero=2), dfd(numero=3, objeto="preenchido"),
                  dfd(numero=4, objeto="preenchido")]
        ano = saude.montar_painel(brutos, HOJE)["anos"][0]
        self.assertEqual(ano["cascas"], 2)
        self.assertEqual(ano["cascas_percentual"], 50.0)

    def test_registros_do_painel_nao_carregam_cpf(self):
        painel = saude.montar_painel([dfd(loginOperacao=12345678901)], HOJE)
        self.assertNotIn("loginOperacao", painel["anos"][0]["itens"][0])

    def test_lote_vazio_nao_quebra(self):
        painel = saude.montar_painel([], HOJE)
        self.assertEqual(painel["anos"], [])
        self.assertEqual(painel["total"], 0)


if __name__ == "__main__":
    unittest.main()
