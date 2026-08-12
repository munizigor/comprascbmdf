# -*- coding: utf-8 -*-
"""Regras puras da conversão do Rol de Demandas em itens do PCA.

Nenhum teste toca rede, disco ou relógio: a data de referência é constante e a
resolução de catálogo entra pronta, como parâmetro.
"""
import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tools", "pncp"))
import pca  # noqa: E402

ANO = 2027

# resolução de catálogo já pronta — quem a produz é o catalogo.py, testado à parte
RESOLUCAO = {
    "classe": "7930",
    "nome": "COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO",
    "catalogo": "CATMAT",
    "classificacao_catalogo": "1",
    "categoria": 1,
    "sugerida": False,
    "grupo_codigo": "435",
    "grupo_nome": "Aquisição de compostos e preparados para limpeza e polimento (ND 339030)",
}

LINHA = {
    "GND": "33903022",
    "DESCRIÇÃO GND": "MATERIAL DE LIMPEZA E PROD. DE HIGIENIZACAO",
    "CÓD CLASSE CATMAT/CATSER": "7930",
    "DEMANDANTE": "DIMAT",
    "CLASSE": "MATERIAL - EQUIPAMENTOS E MATERIAIS PARA LIMPEZA",
    "DESCRIÇÃO DO OBJETO": "(ID 10503) - Produtos químicos para limpeza LIMPA VIDRO, "
                           "Descrição: produto líquido, acondicionado em frasco. "
                           "Unidade de fornecimento: frasco com volume mínimo de 500 ml.",
    "MÊS PRETENDIDO PARA A ENTREGA DA CONTRATAÇÃO": "AGOSTO",
    "QUANTIDADE": "10",
    "VALOR UNITÁRIO": "R$ 6,00",
    "VALOR TOTAL": "R$ 60,00",
}


class TestNumeroBr(unittest.TestCase):
    def test_moeda_com_simbolo_e_separador_de_milhar(self):
        self.assertEqual(pca.numero_br("R$ 1.756,00"), 1756.0)

    def test_numero_solto_com_virgula_decimal(self):
        self.assertEqual(pca.numero_br("43,9"), 43.9)

    def test_inteiro_sem_decimal(self):
        self.assertEqual(pca.numero_br("10"), 10.0)

    def test_zero_e_zero_e_nao_ausencia(self):
        # distinguir 0,00 de vazio importa: um bloqueia por valor, o outro por falta
        self.assertEqual(pca.numero_br("R$ 0,00"), 0.0)

    def test_vazio_devolve_none(self):
        self.assertIsNone(pca.numero_br(""))
        self.assertIsNone(pca.numero_br("   "))
        self.assertIsNone(pca.numero_br(None))

    def test_texto_sem_digito_devolve_none(self):
        self.assertIsNone(pca.numero_br("#N/A"))


class TestNaturezaDespesa(unittest.TestCase):
    def test_pega_os_seis_primeiros_digitos(self):
        self.assertEqual(pca.natureza_despesa("33903022"), "339030")
        self.assertEqual(pca.natureza_despesa("44905208"), "449052")

    def test_gnd_ausente_devolve_vazio(self):
        self.assertEqual(pca.natureza_despesa(""), "")
        self.assertEqual(pca.natureza_despesa(None), "")

    def test_gnd_com_tamanho_inesperado_devolve_vazio(self):
        self.assertEqual(pca.natureza_despesa("3390"), "")

    def test_elemento_sao_o_quinto_e_o_sexto_digito(self):
        self.assertEqual(pca.elemento_despesa("33903022"), "30")
        self.assertEqual(pca.elemento_despesa("44905208"), "52")
        self.assertEqual(pca.elemento_despesa("33903948"), "39")
        self.assertEqual(pca.elemento_despesa(""), "")


class TestSimplificar(unittest.TestCase):
    def test_descricao_curta_fica_intacta(self):
        self.assertEqual(pca.simplificar("LONA DE PROTEÇÃO"), "LONA DE PROTEÇÃO")

    def test_remove_o_prefixo_de_id_interno(self):
        self.assertEqual(pca.simplificar("(ID 10503) - PAPEL TOALHA"), "PAPEL TOALHA")
        self.assertEqual(pca.simplificar("(ID-28464) - PINÇA LUCAE"), "PINÇA LUCAE")

    def test_corta_no_marcador_estrutural(self):
        texto = "PINÇA LUCAE BAIONETA, Descrição: Modelo 2 Baioneta, ponta reta, serrilhada"
        self.assertEqual(pca.simplificar(texto), "PINÇA LUCAE BAIONETA")

    def test_marcador_no_comeco_nao_corta(self):
        # cortar aqui deixaria a descrição vazia
        texto = "Descrição: cabo de aço galvanizado de 12 mm"
        self.assertEqual(pca.simplificar(texto), "Descrição: cabo de aço galvanizado de 12 mm")

    def test_normaliza_espacos_e_quebras_de_linha(self):
        self.assertEqual(pca.simplificar("CABO   DE\n\n AÇO"), "CABO DE AÇO")

    def test_respeita_o_limite_cortando_em_fronteira_de_frase(self):
        texto = "ITEM PRINCIPAL COM NOME LONGO. " + ("detalhe irrelevante " * 30)
        saida = pca.simplificar(texto, limite=60)
        self.assertLessEqual(len(saida), 60)
        self.assertEqual(saida, "ITEM PRINCIPAL COM NOME LONGO")

    def test_sem_fronteira_util_corta_na_palavra(self):
        texto = "PALAVRA " * 40
        saida = pca.simplificar(texto, limite=50)
        self.assertLessEqual(len(saida), 50)
        self.assertFalse(saida.endswith("PALAVR"))  # não parte a palavra ao meio

    def test_limpa_fragmento_solto_no_fim(self):
        texto = "APARELHO DE PROFILAXIA ODONTOLÓGICO, contendo as seguintes características: bico"
        self.assertEqual(pca.simplificar(texto), "APARELHO DE PROFILAXIA ODONTOLÓGICO")

    def test_limpa_demais_especificacoes(self):
        texto = "BOLA DE BORRACHA. Demais especificações conforme termo de referência."
        self.assertEqual(pca.simplificar(texto), "BOLA DE BORRACHA")

    def test_descricao_vazia_nao_quebra(self):
        self.assertEqual(pca.simplificar(""), "")


class TestDescricao(unittest.TestCase):
    def test_acrescenta_a_natureza_de_despesa_no_fim(self):
        self.assertEqual(pca.descricao("LONA DE PROTEÇÃO", "44905208"),
                         "LONA DE PROTEÇÃO | 449052")

    def test_sem_gnd_o_separador_e_emitido_mesmo_assim(self):
        # a extração futura por split("|") precisa de posição previsível
        self.assertEqual(pca.descricao("LONA DE PROTEÇÃO", ""), "LONA DE PROTEÇÃO | ")

    def test_resultado_cabe_no_limite_da_api(self):
        texto = "X" * 5000
        self.assertLessEqual(len(pca.descricao(texto, "33903022")), 2048)


class TestUnidadeFornecimento(unittest.TestCase):
    def test_extrai_de_medida(self):
        self.assertEqual(pca.unidade_fornecimento("PINÇA LUCAE. Medida: Unidade"),
                         ("Unidade", False))

    def test_extrai_de_unidade_de_fornecimento(self):
        valor, pendencia = pca.unidade_fornecimento(
            "LIMPA VIDRO. Unidade de fornecimento: frasco com volume mínimo de 500 ml.")
        self.assertEqual(valor, "frasco com volume mínimo de 500 ml")
        self.assertFalse(pendencia)

    def test_sem_marcador_usa_o_padrao_e_marca_pendencia(self):
        self.assertEqual(pca.unidade_fornecimento("LONA DE PROTEÇÃO"), ("Unidade", True))

    def test_valor_extraido_respeita_o_limite_da_api(self):
        valor, _ = pca.unidade_fornecimento("ITEM. Medida: " + "x" * 400)
        self.assertLessEqual(len(valor), 255)


class TestDataDesejada(unittest.TestCase):
    def test_mes_informado_vira_o_ultimo_dia_do_mes(self):
        self.assertEqual(pca.data_desejada("AGOSTO", ANO), ("2027-08-31", False))

    def test_fevereiro_de_2027_termina_em_28(self):
        self.assertEqual(pca.data_desejada("FEVEREIRO", ANO), ("2027-02-28", False))

    def test_aceita_com_e_sem_acento(self):
        self.assertEqual(pca.data_desejada("MARÇO", ANO)[0], "2027-03-31")
        self.assertEqual(pca.data_desejada("marco", ANO)[0], "2027-03-31")

    def test_mes_ausente_vai_para_o_fim_do_ano_e_marca_pendencia(self):
        self.assertEqual(pca.data_desejada("", ANO), ("2027-12-31", True))

    def test_mes_irreconhecivel_marca_pendencia(self):
        self.assertEqual(pca.data_desejada("13o MES", ANO), ("2027-12-31", True))


class TestBloqueio(unittest.TestCase):
    def test_linha_completa_nao_bloqueia(self):
        self.assertIsNone(pca.bloqueio(LINHA))

    def test_sem_valor_total_bloqueia(self):
        linha = dict(LINHA, **{"VALOR TOTAL": ""})
        self.assertIn("valor total", pca.bloqueio(linha))

    def test_valor_zerado_bloqueia(self):
        linha = dict(LINHA, **{"VALOR TOTAL": "R$ 0,00", "VALOR UNITÁRIO": "R$ 0,00"})
        self.assertIsNotNone(pca.bloqueio(linha))

    def test_sem_quantidade_bloqueia(self):
        linha = dict(LINHA, **{"QUANTIDADE": ""})
        self.assertIn("quantidade", pca.bloqueio(linha))


class TestConverter(unittest.TestCase):
    def setUp(self):
        self.item, self.pendencias = pca.converter(LINHA, 7, RESOLUCAO, ANO)

    def test_numero_do_item_e_o_informado(self):
        self.assertEqual(self.item["numeroItem"], 7)

    def test_campos_fixos_do_catalogo(self):
        self.assertEqual(self.item["catalogo"], 1)
        self.assertEqual(self.item["classificacaoCatalogo"], "1")
        self.assertIsNone(self.item["codigoItem"])

    def test_classificacao_superior_vem_da_resolucao(self):
        self.assertEqual(self.item["classificacaoSuperiorCodigo"], "7930")
        self.assertEqual(self.item["classificacaoSuperiorNome"],
                         "COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO")

    def test_grupo_de_contratacao_vem_da_resolucao(self):
        self.assertEqual(self.item["grupoContratacaoCodigo"], "435")
        self.assertTrue(self.item["grupoContratacaoNome"].endswith("(ND 339030)"))

    def test_descricao_simplificada_com_natureza_no_fim(self):
        self.assertEqual(self.item["descricao"],
                         "Produtos químicos para limpeza LIMPA VIDRO | 339030")

    def test_demandante_vira_unidade_requisitante(self):
        self.assertEqual(self.item["unidadeRequisitante"], "DIMAT")

    def test_valor_do_exercicio_espelha_o_total(self):
        self.assertEqual(self.item["valorOrcamentoExercicio"], 60.0)

    def test_valores_e_quantidade_convertidos(self):
        self.assertEqual(self.item["quantidade"], 10.0)
        self.assertEqual(self.item["valorUnitario"], 6.0)
        self.assertEqual(self.item["valorTotal"], 60.0)

    def test_linha_integra_nao_gera_pendencia(self):
        self.assertEqual(self.pendencias, [])

    def test_pendencias_acumulam_lacunas(self):
        linha = dict(LINHA, **{"MÊS PRETENDIDO PARA A ENTREGA DA CONTRATAÇÃO": "",
                               "DESCRIÇÃO DO OBJETO": "LONA DE PROTEÇÃO"})
        _, pendencias = pca.converter(linha, 1, RESOLUCAO, ANO)
        self.assertIn("mes_ausente", pendencias)
        self.assertIn("unidade_fornecimento_ausente", pendencias)

    def test_classe_sugerida_entra_como_pendencia(self):
        _, pendencias = pca.converter(LINHA, 1, dict(RESOLUCAO, sugerida=True), ANO)
        self.assertIn("classe_sugerida", pendencias)

    def test_quantidade_vezes_unitario_diferente_do_total_e_pendencia(self):
        linha = dict(LINHA, **{"VALOR TOTAL": "R$ 999,00"})
        _, pendencias = pca.converter(linha, 1, RESOLUCAO, ANO)
        self.assertIn("valor_incoerente", pendencias)


class TestMontarPlano(unittest.TestCase):
    def test_numera_os_itens_a_partir_de_um(self):
        plano = pca.montar_plano("24104", ANO, [
            (dict(LINHA), RESOLUCAO), (dict(LINHA), RESOLUCAO), (dict(LINHA), RESOLUCAO)])
        self.assertEqual([i["numeroItem"] for i in plano["itensPlano"]], [1, 2, 3])

    def test_cabecalho_do_plano(self):
        plano = pca.montar_plano("170394", ANO, [(dict(LINHA), RESOLUCAO)])
        self.assertEqual(plano["codigoUnidade"], "170394")
        self.assertEqual(plano["anoPca"], 2027)

    def test_numeracao_reinicia_em_cada_plano(self):
        a = pca.montar_plano("170394", ANO, [(dict(LINHA), RESOLUCAO)])
        b = pca.montar_plano("170495", ANO, [(dict(LINHA), RESOLUCAO)])
        self.assertEqual(a["itensPlano"][0]["numeroItem"], b["itensPlano"][0]["numeroItem"])


if __name__ == "__main__":
    unittest.main()
