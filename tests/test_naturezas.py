# -*- coding: utf-8 -*-
"""Regras puras da natureza de despesa e do agrupamento de contratações."""
import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "tools"))

from pgc import naturezas


class TestExtrairDetalhadas(unittest.TestCase):
    def test_monta_tabela_a_partir_dos_pares_da_planilha(self):
        pares = [
            ("33903022", "MATERIAL DE LIMPEZA E PROD. DE HIGIENIZACAO"),
            ("44905208", "APAR.EQUIP.UTENS.MED.,ODONT,LABOR.HOSPIT."),
        ]
        self.assertEqual(
            naturezas.extrair_detalhadas(pares),
            {
                "33903022": "MATERIAL DE LIMPEZA E PROD. DE HIGIENIZACAO",
                "44905208": "APAR.EQUIP.UTENS.MED.,ODONT,LABOR.HOSPIT.",
            },
        )

    def test_deduplica_repeticoes_da_planilha(self):
        pares = [("33903948", "SERVICO DE SELECAO E TREINAMENTO")] * 3
        self.assertEqual(naturezas.extrair_detalhadas(pares), {"33903948": "SERVICO DE SELECAO E TREINAMENTO"})

    def test_descarta_linha_sem_codigo(self):
        pares = [("", ""), ("   ", "SEM CODIGO"), ("33903022", "MATERIAL DE LIMPEZA")]
        self.assertEqual(naturezas.extrair_detalhadas(pares), {"33903022": "MATERIAL DE LIMPEZA"})

    def test_rejeita_codigo_fora_do_padrao_de_oito_digitos(self):
        with self.assertRaises(ValueError):
            naturezas.extrair_detalhadas([("339030", "MATERIAL DE CONSUMO")])

    def test_rejeita_mesmo_codigo_com_descricoes_divergentes(self):
        pares = [("33903022", "MATERIAL DE LIMPEZA"), ("33903022", "OUTRA COISA")]
        with self.assertRaises(ValueError):
            naturezas.extrair_detalhadas(pares)


class TestElemento(unittest.TestCase):
    def test_trunca_a_detalhada_nos_seis_primeiros_digitos(self):
        self.assertEqual(naturezas.elemento("33903948"), "339039")

    def test_e_idempotente_sobre_codigo_ja_truncado(self):
        self.assertEqual(naturezas.elemento("339039"), "339039")

    def test_rejeita_codigo_curto_demais(self):
        with self.assertRaises(ValueError):
            naturezas.elemento("3390")


class TestTitulo(unittest.TestCase):
    def test_normaliza_caixa_alta_mantendo_conectivos_em_minuscula(self):
        self.assertEqual(
            naturezas.titulo("COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO"),
            "Compostos e Preparados para Limpeza e Polimento",
        )

    def test_preserva_sigla_pontuada(self):
        self.assertEqual(
            naturezas.titulo("SERVIÇOS DE MANUTENÇÃO E REPARO DE OUTROS PRODUTOS N.C.P"),
            "Serviços de Manutenção e Reparo de Outros Produtos N.C.P",
        )

    def test_colapsa_espacos_repetidos_da_base(self):
        self.assertEqual(
            naturezas.titulo("MOBILIÁRIO, EQUIPAMENTOS, UTENSÍLIOS E  SUPRIMENTOS  HOSPITALARES"),
            "Mobiliário, Equipamentos, Utensílios e Suprimentos Hospitalares",
        )


class TestNomeGrupo(unittest.TestCase):
    def test_combina_rotulo_do_elemento_com_a_classe(self):
        self.assertEqual(
            naturezas.nome_grupo("33903022", "COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO"),
            "Material de Consumo — Compostos e Preparados para Limpeza e Polimento",
        )

    def test_falha_alto_em_elemento_sem_rotulo(self):
        # rotular errado em silêncio é pior que quebrar: o grupo vira lote de compra
        with self.assertRaises(KeyError):
            naturezas.nome_grupo("339099", "QUALQUER CLASSE")


class TestNumerarGrupos(unittest.TestCase):
    def test_numera_a_partir_de_trezentos_na_ordem_de_natureza_e_classe(self):
        chaves = [("449052", "6530"), ("339030", "7930"), ("339039", "8729")]
        self.assertEqual(
            naturezas.numerar_grupos(chaves),
            {("339030", "7930"): 300, ("339039", "8729"): 301, ("449052", "6530"): 302},
        )

    def test_separa_custeio_de_investimento_na_mesma_classe(self):
        # mesma classe, elementos distintos -> contratações distintas
        chaves = [("339030", "4240"), ("449052", "4240")]
        codigos = naturezas.numerar_grupos(chaves)
        self.assertNotEqual(codigos[("339030", "4240")], codigos[("449052", "4240")])


if __name__ == "__main__":
    unittest.main()
