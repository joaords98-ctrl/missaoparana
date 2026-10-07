# Ferramentas de análise (não usadas pelo site)

## bu_para_excel.py — Boletim de Urna → Excel/CSV
Entrada: o arquivo `bweb_1t_PR_<data>.zip` do Portal de Dados Abertos do TSE (conjunto "Boletim de Urna"), sem descompactar.

    pip install pandas openpyxl
    python3 ferramentas/bu_para_excel.py bweb_1t_PR_041020261259.zip --partido 14 --saida missao

Saídas (formato Município | Zona | Seção | Cargo | Número | Candidato | Votos):
- `missao_secao.csv` / `.xlsx` — uma linha por seção × candidato (inclui a linha de legenda, Número = 14)
- `missao_municipio.xlsx` — abas: nominal por município, legenda por município e uma tabela larga por cargo (município × candidato)
- `missao_resumo.xlsx` — total por candidato

Sem `--partido` processa o estado inteiro (milhões de linhas; o `_secao.xlsx` é pulado e fica só o CSV).
`--cargo "Deputado Estadual"` filtra um cargo. Branco e nulo são descartados.

## console_votos_por_municipio.js — votos por município sem esperar o Dados Abertos
Script pra colar no Console do app de resultados do TSE (instruções no topo do arquivo). Lê os arquivos
oficiais por município (`pr<cod>-c000X-e006259-u.jws`) e baixa `missao_por_municipio.csv`
(Município | Cargo | Número | Candidato | Tipo | Votos). Roda no navegador, dentro do domínio do TSE,
então não sofre o bloqueio do Akamai. Não tem seção — pra isso é preciso o `bweb`.
