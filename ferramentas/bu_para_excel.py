#!/usr/bin/env python3
"""
Converte o Boletim de Urna do TSE (Dados Abertos, arquivo bweb_1t_PR_*.zip ou .csv)
em planilhas no formato: Municipio | Zona | Secao | Cargo | Numero | Candidato | Votos

Uso:
  python3 bu_para_excel.py bweb_1t_PR_041020261259.zip
  python3 bu_para_excel.py bweb_1t_PR_041020261259.zip --partido 14 --saida missao
  python3 bu_para_excel.py bweb_1t_PR_041020261259.zip --so-csv

Gera (na pasta atual):
  <saida>_secao.csv        todas as linhas (secao x candidato)        [CSV, pode ter milhoes de linhas]
  <saida>_secao.xlsx       mesma coisa, so se couber no Excel (< 1.048.576 linhas)
  <saida>_municipio.xlsx   votos por municipio x candidato + aba de legenda por municipio
  <saida>_resumo.xlsx      total por candidato (ordenado)

Requisitos: pip install pandas openpyxl
"""
import argparse, io, sys, zipfile
import pandas as pd

COLS = {
    'NM_MUNICIPIO': 'Municipio', 'CD_MUNICIPIO': 'CodMunicipio', 'NR_ZONA': 'Zona', 'NR_SECAO': 'Secao',
    'DS_CARGO_PERGUNTA': 'Cargo', 'NR_VOTAVEL': 'Numero', 'NM_VOTAVEL': 'Candidato', 'QT_VOTOS': 'Votos',
    'NR_PARTIDO': 'NumPartido', 'SG_PARTIDO': 'Partido', 'DS_TIPO_VOTAVEL': 'TipoVoto',
}
CARGOS_LEGISLATIVOS = ('Deputado Federal', 'Deputado Estadual')

def abrir(caminho):
    if caminho.lower().endswith('.zip'):
        with zipfile.ZipFile(caminho) as z:
            nomes = [n for n in z.namelist() if n.lower().endswith('.csv')]
            if not nomes: sys.exit('nenhum .csv dentro do zip')
            print('lendo', nomes[0]); return io.BytesIO(z.read(nomes[0]))
    return caminho

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('arquivo'); ap.add_argument('--partido', help='numero do partido pra filtrar (ex: 14)')
    ap.add_argument('--cargo', help='filtra pelo nome do cargo (ex: "Deputado Estadual")')
    ap.add_argument('--saida', default='votos_pr'); ap.add_argument('--so-csv', action='store_true')
    a = ap.parse_args()

    partes = []
    for ch in pd.read_csv(abrir(a.arquivo), sep=';', encoding='latin1', dtype=str, chunksize=500_000,
                          usecols=lambda c: c in COLS):
        ch = ch.rename(columns=COLS)
        ch['Votos'] = pd.to_numeric(ch['Votos'], errors='coerce').fillna(0).astype(int)
        # so votos nominais e de legenda (tira branco/nulo)
        if 'TipoVoto' in ch: ch = ch[ch['TipoVoto'].str.lower().isin(['nominal', 'legenda'])]
        if a.partido:
            # NR_PARTIDO existe na linha; pra legenda, o numero votavel e o proprio partido
            ch = ch[(ch['NumPartido'] == a.partido) | (ch['Numero'] == a.partido)]
        if a.cargo: ch = ch[ch['Cargo'].str.lower() == a.cargo.lower()]
        partes.append(ch)
    df = pd.concat(partes, ignore_index=True)
    if df.empty: sys.exit('nenhuma linha depois dos filtros')
    df['Zona'] = df['Zona'].astype(int); df['Secao'] = df['Secao'].astype(int)
    df = df.sort_values(['Cargo', 'Municipio', 'Zona', 'Secao', 'Numero'])

    secao = df[['Municipio', 'Zona', 'Secao', 'Cargo', 'Numero', 'Candidato', 'Votos']]
    secao.to_csv(f'{a.saida}_secao.csv', index=False, encoding='utf-8-sig')
    print(f'{a.saida}_secao.csv: {len(secao):,} linhas')
    if a.so_csv: return
    if len(secao) < 1_048_000: secao.to_excel(f'{a.saida}_secao.xlsx', index=False)
    else: print('(_secao.xlsx pulado: excede o limite de linhas do Excel; use o CSV)')

    mun = df.groupby(['Cargo', 'Municipio', 'Numero', 'Candidato', 'TipoVoto'], as_index=False)['Votos'].sum()
    nominal = mun[mun['TipoVoto'].str.lower() == 'nominal'].drop(columns='TipoVoto')
    legenda = mun[mun['TipoVoto'].str.lower() == 'legenda'].drop(columns='TipoVoto').rename(columns={'Candidato': 'Partido'})
    with pd.ExcelWriter(f'{a.saida}_municipio.xlsx') as w:
        nominal.sort_values(['Cargo', 'Numero', 'Votos'], ascending=[True, True, False]).to_excel(w, sheet_name='nominal_por_municipio', index=False)
        legenda.sort_values(['Cargo', 'Numero', 'Votos'], ascending=[True, True, False]).to_excel(w, sheet_name='legenda_por_municipio', index=False)
        # tabela larga: candidato nas colunas, municipio nas linhas (uma aba por cargo)
        for cargo, g in nominal.groupby('Cargo'):
            piv = g.pivot_table(index='Municipio', columns='Candidato', values='Votos', aggfunc='sum', fill_value=0)
            piv['TOTAL'] = piv.sum(axis=1)
            piv.sort_values('TOTAL', ascending=False).to_excel(w, sheet_name=cargo[:28].replace('/', '-'))
    resumo = df.groupby(['Cargo', 'Numero', 'Candidato', 'TipoVoto'], as_index=False)['Votos'].sum() \
               .sort_values(['Cargo', 'Votos'], ascending=[True, False])
    resumo.to_excel(f'{a.saida}_resumo.xlsx', index=False)
    print('gerados:', f'{a.saida}_municipio.xlsx', f'{a.saida}_resumo.xlsx')

if __name__ == '__main__': main()
