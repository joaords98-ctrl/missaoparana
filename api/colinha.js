// Serve a pagina da colinha ja com a previa (og:image/title) da combinacao escolhida,
// para o link /colinha/<federal>/<estadual> mostrar no WhatsApp a colinha certa.
// As imagens de previa ficam em assets/colinhas/og/<federal>__<estadual>.jpg
// (geradas em lote a partir do proprio gerador da pagina colinha.html).

const fs = require('fs');
const path = require('path');

const SITE = 'https://missaoparana.com.br';

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function carregarCandidatos() {
  const src = fs.readFileSync(path.join(process.cwd(), 'candidatos-data.js'), 'utf8');
  const match = src.match(/const CANDIDATOS = (\[[\s\S]*?\n\]);/);
  if (!match) return [];
  // eslint-disable-next-line no-eval
  return eval(match[1]);
}

function lerHtml() {
  return fs.readFileSync(path.join(process.cwd(), 'colinha.html'), 'utf8');
}

module.exports = (req, res) => {
  try {
    const url = new URL(req.url, SITE);
    const fId = url.searchParams.get('f') || '';
    const eId = url.searchParams.get('e') || '';
    let html = lerHtml();

    const candidatos = carregarCandidatos();
    const fed = candidatos.find((c) => c.id === fId && c.cargo === 'federal');
    const est = candidatos.find((c) => c.id === eId && c.cargo === 'estadual');

    if (fed && est) {
      const titulo = `Minha colinha: ${fed.nome} ${fed.numero} e ${est.nome} ${est.numero}`;
      const descricao = 'Presidente 14, Governador 14, Senado 144 e os meus deputados. Monte a sua colinha da Missão também.';
      const pageUrl = `${SITE}/colinha/${encodeURIComponent(fId)}/${encodeURIComponent(eId)}`;
      const imagem = `${SITE}/assets/colinhas/og/${encodeURIComponent(fId)}__${encodeURIComponent(eId)}.jpg`;

      html = html
        .replace(/<title>[^<]*<\/title>/, `<title>${esc(titulo)} | Missão Paraná</title>`)
        .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${esc(pageUrl)}">`)
        .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${esc(pageUrl)}">`)
        .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(titulo)}">`)
        .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(descricao)}">`)
        .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(imagem)}">`)
        .replace(/<meta property="og:image:width" content="[^"]*">/, '<meta property="og:image:width" content="540">')
        .replace(/<meta property="og:image:height" content="[^"]*">/, '<meta property="og:image:height" content="675">');
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    res.status(200).send(html);
  } catch (err) {
    // Se algo falhar, nunca deixa a pagina quebrada: serve o HTML original puro.
    try {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(200).send(lerHtml());
    } catch (e2) {
      res.status(500).send('Erro ao carregar a página.');
    }
  }
};
