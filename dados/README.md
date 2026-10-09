# Dados para análise eleitoral (não usados pelo site)

## perfil_secao_2026_PR_resumo.csv.gz
Resumo por seção eleitoral do "Perfil do eleitorado por seção - 2026 - PR" (Dados Abertos TSE, gerado em 14/07/2026).
Original: 4,9 mi de linhas (uma por combinação sexo/idade/escolaridade/etc.). Aqui: 1 linha por seção (27.333 seções, 8.609.026 eleitores).

Colunas: CD_MUNICIPIO, NM_MUNICIPIO, NR_ZONA, NR_SECAO, NR_LOCAL_VOTACAO, NM_LOCAL_VOTACAO, eleitores, fem,
fx_16_24, fx_25_34, fx_35_44, fx_45_59, fx_60_mais, esc_superior, esc_medio, esc_fundamental, esc_ate_fund_ou_analf.

Uso previsto: cruzar com o Boletim de Urna (bweb_1t_PR) por (CD_MUNICIPIO, NR_ZONA, NR_SECAO) para ver o perfil
das seções onde o Missão foi mais forte.

## missao_votos_por_secao_2026_PR.csv.gz
Votos do Partido Missão por SEÇÃO eleitoral (todos os candidatos a dep. federal/estadual, legenda, governador e senador),
filtrado de "Resultados 2026 – Votação por seção eleitoral – PR" (Dados Abertos TSE, 08/10/2026). 142.614 linhas.
Colunas: CD_MUNICIPIO, NM_MUNICIPIO, NR_ZONA, NR_SECAO, CD_CARGO, DS_CARGO, NR_VOTAVEL, NM_VOTAVEL, QT_VOTOS,
NR_LOCAL_VOTACAO, NM_LOCAL_VOTACAO, DS_LOCAL_VOTACAO_ENDERECO. Chave de cruzamento com o perfil: (CD_MUNICIPIO, NR_ZONA, NR_SECAO).
