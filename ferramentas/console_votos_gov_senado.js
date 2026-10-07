// Votação de GOVERNADOR (Luiz França) e SENADOR (Karen Guerreiro) do Missão por MUNICÍPIO, direto do site de resultados do TSE.
// COMO USAR: abrir https://resultados.tse.jus.br/oficial/app/index.html no Chrome,
// Cmd+Option+I -> Console -> digitar "allow pasting" (Enter) -> colar este arquivo inteiro -> Enter.
// Leva ~2-3 min (399 municípios x 2 cargos). Ao final baixa "missao_gov_senado_por_municipio.csv".
// Ajuste PARTIDO / ELEICAO / CARGOS se precisar.
(async () => {
  const PARTIDO = '14', ELEICAO = '6259', UF = 'pr';
  const CARGOS = { '0003': 'Governador', '0005': 'Senador' };
  const E6 = ELEICAO.padStart(6, '0'), BASE = '/oficial/ele2026/' + ELEICAO;
  const dec = t => { const p = t.trim().split('.'); let b = p[1].replace(/-/g,'+').replace(/_/g,'/'); while (b.length % 4) b += '=';
    const s = atob(b), u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return JSON.parse(new TextDecoder().decode(u)); };
  const get = async u => { const r = await fetch(u + '?nocache=' + Date.now()); if (!r.ok) throw new Error(r.status + ' ' + u); return dec(await r.text()); };
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const cfg = await get(`${BASE}/config/mun-e${E6}-cm.jws`);
  const uf = (cfg.abr || []).find(a => String(a.cd).toLowerCase() === UF);
  if (!uf) throw new Error('UF não encontrada na config');
  const municipios = uf.mu || [];
  console.log('municípios:', municipios.length);

  const linhas = [['Municipio', 'CodMunicipio', 'Cargo', 'Numero', 'Candidato', 'Tipo', 'Votos']];
  let i = 0, erros = 0;
  for (const m of municipios) {
    for (const [cod, cargo] of Object.entries(CARGOS)) {
      try {
        const d = await get(`${BASE}/dados/${UF}/${UF}${m.cd}-c${cod}-e${E6}-u.jws`);
        for (const c of (d.carg || [])) for (const a of (c.agr || [])) for (const p of (a.par || [])) {
          if (String(p.n) !== PARTIDO) continue;
          linhas.push([m.nm, m.cd, cargo, p.n, p.nm || p.sg || 'LEGENDA', 'Legenda', Number(p.tval || p.tvtl || 0)]);
          for (const k of (p.cand || [])) linhas.push([m.nm, m.cd, cargo, k.n, k.nm, 'Nominal', Number(k.vap || 0)]);
        }
      } catch (e) { erros++; console.warn('falhou', m.nm, cargo, e.message); }
      await sleep(120);
    }
    if (++i % 25 === 0) console.log(i + '/' + municipios.length);
  }
  const csv = linhas.map(l => l.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(';')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
  a.download = 'missao_gov_senado_por_municipio.csv'; a.click();
  console.log('pronto:', linhas.length - 1, 'linhas, erros:', erros);
})();
