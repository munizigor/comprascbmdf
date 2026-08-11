# -*- coding: utf-8 -*-
"""Testes das regras puras do radar de vigencia.

Todas as regras recebem `hoje` como parametro. Nenhuma le o relogio do sistema —
e o que torna estes testes deterministicos.
"""
import os
import sys
import unittest
from datetime import date

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tools", "pncp"))

import radar  # noqa: E402

HOJE = date(2026, 8, 11)


class TestDiasRestantes(unittest.TestCase):
    def test_conta_dias_ate_o_vencimento(self):
        self.assertEqual(radar.dias_restantes("2026-08-21", HOJE), 10)

    def test_vence_hoje_e_zero(self):
        self.assertEqual(radar.dias_restantes("2026-08-11", HOJE), 0)

    def test_ja_vencido_e_negativo(self):
        self.assertEqual(radar.dias_restantes("2026-08-01", HOJE), -10)

    def test_aceita_data_iso_com_hora(self):
        self.assertEqual(radar.dias_restantes("2026-08-21T00:00:00", HOJE), 10)

    def test_data_ausente_devolve_none(self):
        self.assertIsNone(radar.dias_restantes(None, HOJE))
        self.assertIsNone(radar.dias_restantes("", HOJE))


class TestFaixaVencimento(unittest.TestCase):
    def test_vencido(self):
        self.assertEqual(radar.faixa_vencimento("2026-08-10", HOJE), "vencido")

    def test_fronteira_zero_e_noventa_dias(self):
        # vence hoje e no 90o dia ainda estao na primeira faixa
        self.assertEqual(radar.faixa_vencimento("2026-08-11", HOJE), "0-90")
        self.assertEqual(radar.faixa_vencimento("2026-11-09", HOJE), "0-90")

    def test_fronteira_noventa_e_um(self):
        self.assertEqual(radar.faixa_vencimento("2026-11-10", HOJE), "91-180")

    def test_fronteira_cento_e_oitenta(self):
        self.assertEqual(radar.faixa_vencimento("2027-02-07", HOJE), "91-180")
        self.assertEqual(radar.faixa_vencimento("2027-02-08", HOJE), "181-365")

    def test_fronteira_trezentos_e_sessenta_e_cinco(self):
        self.assertEqual(radar.faixa_vencimento("2027-08-11", HOJE), "181-365")
        self.assertEqual(radar.faixa_vencimento("2027-08-12", HOJE), ">365")

    def test_sem_data_devolve_indefinido(self):
        self.assertEqual(radar.faixa_vencimento(None, HOJE), "indefinido")


class TestValorSuspeito(unittest.TestCase):
    """O PNCP replica o valor total do credenciamento em cada contrato e usa
    R$ 1,00 quando nao ha valor definido. Somar ingenuamente infla 85%."""

    def test_valor_um_real_e_suspeito(self):
        self.assertEqual(radar.valor_suspeito(1.0, 1), "sem_valor")

    def test_valor_replicado_e_suspeito(self):
        self.assertEqual(radar.valor_suspeito(74337590.0, 23), "replicado")

    def test_valor_unico_e_plausivel(self):
        self.assertIsNone(radar.valor_suspeito(45341.95, 1))

    def test_valor_ausente(self):
        self.assertEqual(radar.valor_suspeito(None, 1), "sem_valor")

    def test_duas_ocorrencias_ainda_nao_e_replicacao(self):
        # coincidencia de dois contratos de mesmo valor acontece; 3+ nao
        self.assertIsNone(radar.valor_suspeito(180000.0, 2))
        self.assertEqual(radar.valor_suspeito(180000.0, 3), "replicado")


class TestNormalizarRegistro(unittest.TestCase):
    BRUTO = {
        "ano": "2025",
        "numero_sequencial": "254",
        "numero_controle_pncp": "05448380000145-2-000254/2025",
        "description": "Aquisicao de roupas de apicultor",
        "data_fim_vigencia": "2026-08-13T00:00:00",
        "data_inicio_vigencia": "2025-08-13T00:00:00",
        "valor_global": 73492.0,
        "orgao_cnpj": "05448380000145",
        "item_url": "/contratos/05448380000145/2025/254",
    }

    def test_extrai_campos_e_calcula_derivados(self):
        r = radar.normalizar(self.BRUTO, HOJE, ocorrencias_valor={73492.0: 1})
        self.assertEqual(r["ano"], 2025)
        self.assertEqual(r["sequencial"], 254)
        self.assertEqual(r["fim_vigencia"], "2026-08-13")
        self.assertEqual(r["dias"], 2)
        self.assertEqual(r["faixa"], "0-90")
        self.assertEqual(r["valor"], 73492.0)
        self.assertIsNone(r["alerta_valor"])
        self.assertEqual(r["url"], "https://pncp.gov.br/app/contratos/05448380000145/2025/254")

    def test_marca_valor_replicado(self):
        bruto = dict(self.BRUTO, valor_global=74337590.0)
        r = radar.normalizar(bruto, HOJE, ocorrencias_valor={74337590.0: 23})
        self.assertEqual(r["alerta_valor"], "replicado")


class TestMontarRadar(unittest.TestCase):
    def _reg(self, seq, fim, valor=1000.0):
        return {
            "ano": "2025", "numero_sequencial": str(seq),
            "numero_controle_pncp": "X-%d" % seq, "description": "item %d" % seq,
            "data_fim_vigencia": fim, "valor_global": valor,
            "orgao_cnpj": "05448380000145", "item_url": "/contratos/x/2025/%d" % seq,
        }

    def setUp(self):
        self.atas = [self._reg(1, "2026-09-04"), self._reg(2, "2027-12-01")]
        self.contratos = [
            self._reg(10, "2026-08-13"),
            self._reg(11, "2026-12-20"),
            self._reg(12, "2027-06-01"),
            self._reg(13, "2029-01-01"),
        ]

    def test_ordena_por_vencimento_mais_proximo(self):
        r = radar.montar_radar(self.atas, self.contratos, HOJE)
        self.assertEqual([c["sequencial"] for c in r["contratos"]["itens"]], [10, 11, 12, 13])

    def test_conta_por_faixa(self):
        r = radar.montar_radar(self.atas, self.contratos, HOJE)
        self.assertEqual(r["contratos"]["faixas"],
                         {"vencido": 0, "0-90": 1, "91-180": 1, "181-365": 1, ">365": 1,
                          "indefinido": 0})
        self.assertEqual(r["atas"]["faixas"]["0-90"], 1)

    def test_registra_total_e_data_de_geracao(self):
        r = radar.montar_radar(self.atas, self.contratos, HOJE)
        self.assertEqual(r["atas"]["total"], 2)
        self.assertEqual(r["contratos"]["total"], 4)
        self.assertEqual(r["gerado_em"], "2026-08-11")

    def test_registros_sem_data_nao_quebram_a_ordenacao(self):
        contratos = self.contratos + [self._reg(99, None)]
        r = radar.montar_radar(self.atas, contratos, HOJE)
        self.assertEqual(r["contratos"]["faixas"]["indefinido"], 1)
        # os sem data vao para o fim, nao para o topo
        self.assertEqual(r["contratos"]["itens"][-1]["sequencial"], 99)

    def test_detecta_replicacao_dentro_do_proprio_conjunto(self):
        replicados = [self._reg(20 + i, "2027-01-01", valor=74337590.0) for i in range(3)]
        r = radar.montar_radar([], replicados, HOJE)
        self.assertTrue(all(c["alerta_valor"] == "replicado" for c in r["contratos"]["itens"]))


if __name__ == "__main__":
    unittest.main()
