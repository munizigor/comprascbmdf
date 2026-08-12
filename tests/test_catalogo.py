# -*- coding: utf-8 -*-
"""Classificação CATMAT/CATSER e numeração dos grupos de contratação.

As tabelas entram como parâmetro — o carregamento do disco fica no CLI.
"""
import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tools", "pncp"))
import catalogo  # noqa: E402

TABELAS = {
    "CATMAT": {
        "7930": {"nome": "COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO"},
        "6520": {"nome": "INSTRUMENTOS, EQUIPAMENTOS E SUPRIMENTOS  DENTÁRIOS"},
        "7110": {"nome": "MOBILIÁRIO PARA ESCRITÓRIO"},
        "7195": {"nome": "MOBILIÁRIOS DIVERSOS E ACESSÓRIOS"},
        "5680": {"nome": "MATERIAIS DIVERSOS PARA CONSTRUÇÃO"},
        "7010": {"nome": "COMPUTADORES"},
        "8533": {"nome": "CLASSE QUE EXISTE NAS DUAS TABELAS"},
    },
    "CATSER": {
        "9290": {"nome": "OUTROS SERVIÇOS DE EDUCAÇÃO E TREINAMENTO"},
        "5412": {"nome": "SERVIÇOS GERAIS DE CONSTRUÇÃO DOS EDIFÍCIOS NÃO RESIDÊNCIAIS"},
        "8533": {"nome": "SERVIÇOS GERAIS DE LIMPEZA"},
    },
}


class TestResolverClasse(unittest.TestCase):
    def test_material_cai_no_catmat(self):
        r = catalogo.resolver("7930", "33903022", "LIMPA VIDRO", TABELAS)
        self.assertEqual(r["catalogo"], "CATMAT")
        self.assertEqual(r["classificacao_catalogo"], "1")
        self.assertEqual(r["categoria"], 1)
        self.assertFalse(r["sugerida"])

    def test_equipamento_permanente_tambem_e_material(self):
        r = catalogo.resolver("6520", "44905208", "PINÇA", TABELAS)
        self.assertEqual(r["categoria"], 1)

    def test_servico_cai_no_catser(self):
        r = catalogo.resolver("9290", "33903948", "CURSO", TABELAS)
        self.assertEqual(r["catalogo"], "CATSER")
        self.assertEqual(r["classificacao_catalogo"], "2")
        self.assertEqual(r["categoria"], 2)

    def test_nome_vem_do_catalogo_oficial_e_nao_do_csv(self):
        r = catalogo.resolver("7930", "33903022", "MATERIAL DE LIMPEZA QUALQUER", TABELAS)
        self.assertEqual(r["nome"], "COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO")

    def test_espacos_duplos_do_catalogo_sao_colapsados(self):
        r = catalogo.resolver("6520", "44905208", "PINÇA", TABELAS)
        self.assertEqual(r["nome"], "INSTRUMENTOS, EQUIPAMENTOS E SUPRIMENTOS DENTÁRIOS")

    def test_classe_nas_duas_tabelas_e_resolvida_pelo_elemento(self):
        material = catalogo.resolver("8533", "44905208", "X", TABELAS)
        servico = catalogo.resolver("8533", "33903948", "X", TABELAS)
        self.assertEqual(material["catalogo"], "CATMAT")
        self.assertEqual(servico["catalogo"], "CATSER")

    def test_obra_recebe_categoria_propria(self):
        r = catalogo.resolver("5412", "44905100", "CONSTRUÇÃO DE GRUPAMENTO", TABELAS)
        self.assertEqual(r["categoria"], 3)

    def test_secao_de_tic_do_catser_vira_solucao_de_tic(self):
        # grupos 111 a 183 do CATSER são a seção de TIC
        tabelas = {"CATMAT": {}, "CATSER": {
            "1313": {"nome": "SOFTWARE COMO SERVIÇO - SAAS", "grupo": "131"}}}
        r = catalogo.resolver("1313", "33903948", "SAAS", tabelas)
        self.assertEqual(r["categoria"], 5)

    def test_servico_fora_da_secao_de_tic_continua_servico(self):
        tabelas = {"CATMAT": {}, "CATSER": {
            "9290": {"nome": "OUTROS SERVIÇOS DE EDUCAÇÃO E TREINAMENTO", "grupo": "929"}}}
        r = catalogo.resolver("9290", "33903948", "CURSO", tabelas)
        self.assertEqual(r["categoria"], 2)


class TestSugestaoDeClasse(unittest.TestCase):
    def test_classe_menos_sete_vira_construcao(self):
        r = catalogo.resolver("-7", "44905100", "Construção do Canil Militar", TABELAS)
        self.assertEqual(r["classe"], "5412")
        self.assertEqual(r["categoria"], 3)
        self.assertTrue(r["sugerida"])

    def test_classe_7099_vira_solucao_de_tic(self):
        r = catalogo.resolver("7099", "44905235", "Solução de segurança", TABELAS)
        self.assertEqual(r["classe"], "7010")
        self.assertEqual(r["categoria"], 5)
        self.assertTrue(r["sugerida"])

    def test_sem_classe_mobiliario_pela_descricao(self):
        r = catalogo.resolver("", "", "(ID 45047) - Móveis em geral MESA DE REUNIÃO", TABELAS)
        self.assertEqual(r["classe"], "7110")
        self.assertTrue(r["sugerida"])

    def test_sem_classe_divisorias(self):
        r = catalogo.resolver("", "", "Aquisição de Divisórias Anexo I", TABELAS)
        self.assertEqual(r["classe"], "5680")

    def test_sem_classe_caixa_organizadora(self):
        r = catalogo.resolver("", "", "CAIXA EMPILHÁVEL C/ TAMPA 10L", TABELAS)
        self.assertEqual(r["classe"], "7195")

    def test_classe_desconhecida_sem_regra_devolve_none(self):
        self.assertIsNone(catalogo.resolver("8888", "33903022", "coisa nenhuma", TABELAS))


class TestNomeDoGrupo(unittest.TestCase):
    def test_material_e_aquisicao_em_caixa_de_sentenca(self):
        r = catalogo.resolver("7930", "33903022", "X", TABELAS)
        self.assertEqual(catalogo.nome_grupo(r, "339030"),
                         "Aquisição de compostos e preparados para limpeza e polimento (ND 339030)")

    def test_servico_e_contratacao(self):
        r = catalogo.resolver("9290", "33903948", "X", TABELAS)
        self.assertEqual(catalogo.nome_grupo(r, "339039"),
                         "Contratação de outros serviços de educação e treinamento (ND 339039)")

    def test_colapsa_espacos_duplicados_do_catalogo(self):
        r = catalogo.resolver("6520", "44905208", "X", TABELAS)
        self.assertNotIn("  ", catalogo.nome_grupo(r, "449052"))

    def test_natureza_ausente_fica_explicita(self):
        r = catalogo.resolver("7110", "", "MESA", TABELAS)
        self.assertTrue(catalogo.nome_grupo(r, "").endswith("(ND não informada)"))

    def test_nome_respeita_o_limite_da_api(self):
        tabelas = {"CATMAT": {"1111": {"nome": "N" * 400}}, "CATSER": {}}
        r = catalogo.resolver("1111", "33903022", "X", tabelas)
        self.assertLessEqual(len(catalogo.nome_grupo(r, "339030")), 255)


class TestGrupos(unittest.TestCase):
    def test_numeracao_comeca_em_trezentos(self):
        grupos = catalogo.montar_grupos([("7930", "339030"), ("9290", "339039")])
        self.assertEqual(grupos["7930|339030"], "300")
        self.assertEqual(grupos["9290|339039"], "301")

    def test_ordem_e_crescente_por_codigo_de_classe(self):
        grupos = catalogo.montar_grupos([("9290", "339039"), ("6520", "449052"), ("7930", "339030")])
        self.assertEqual(grupos["6520|449052"], "300")
        self.assertEqual(grupos["7930|339030"], "301")
        self.assertEqual(grupos["9290|339039"], "302")

    def test_grupo_ja_congelado_mantem_o_codigo(self):
        # renumerar grupo publicado quebraria a referência no PNCP
        congelado = {"9290|339039": "417"}
        grupos = catalogo.montar_grupos([("6520", "449052"), ("9290", "339039")], congelado)
        self.assertEqual(grupos["9290|339039"], "417")

    def test_classe_nova_recebe_o_proximo_codigo_livre(self):
        congelado = {"9290|339039": "417"}
        grupos = catalogo.montar_grupos([("6520", "449052"), ("9290", "339039")], congelado)
        self.assertEqual(grupos["6520|449052"], "418")

    def test_mesma_classe_com_naturezas_distintas_sao_grupos_distintos(self):
        grupos = catalogo.montar_grupos([("7930", "339030"), ("7930", "449052")])
        self.assertEqual(len(set(grupos.values())), 2)


if __name__ == "__main__":
    unittest.main()
