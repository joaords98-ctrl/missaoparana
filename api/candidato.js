// Gera o preview (og:image/title/description) certo para cada pré-candidato
// ao compartilhar o link candidato.html?id=xxx — sem precisar mexer manualmente
// toda vez que uma foto ou bio nova é adicionada em candidatos-data.js.

const fs = require('fs');
const path = require('path');

const SITE = 'https://missaoparana.com.br';
const FALLBACK_IMG = `${SITE}/assets/og-missao.jpg`;

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function carregarCandidatos() {
  const dataPath = path.join(process.cwd(), 'candidatos-data.js');
  const src = fs.readFileSync(dataPath, 'utf8');
  const match = src.match(/const CANDIDATOS = (\[[\s\S]*?\n\]);/);
  if (!match) return [];
  // eslint-disable-next-line no-eval
  return eval(match[1]);
}

function resumoDe(c) {
  const base = c.resumo || c.bio || '';
  const semQuebras = base.replace(/\n+/g, ' ').trim();
  if (semQuebras.length <= 190) return semQuebras;
  return semQuebras.slice(0, 187).trim() + '...';
}

function cargoExibido(c) {
  if (c.genero !== 'f') return c.cargoLabel || '';
  return (c.cargoLabel || '')
    .replace(/Deputado/g, 'Deputada')
    .replace(/Vice-Governador/g, 'Vice-Governadora')
    .replace(/Governador/g, 'Governadora')
    .replace(/Senador/g, 'Senadora');
}

module.exports = (req, res) => {
  try {
    const url = new URL(req.url, SITE);
    const id = url.searchParams.get('id') || '';
    const htmlPath = path.join(process.cwd(), 'candidato-template.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    const candidatos = carregarCandidatos();
    const c = candidatos.find((x) => x.id === id);

    if (c) {
      const preLabel = c.genero === 'f' ? 'Pré-candidata' : 'Pré-candidato';
      const titulo = `${c.nome} — ${cargoExibido(c) || preLabel} | Missão Paraná`;
      const descricao = resumoDe(c);
      const imagem = c.foto && c.foto.trim() ? `${SITE}/${c.foto.replace(/^\/+/, '')}` : FALLBACK_IMG;
      const pageUrl = `${SITE}/c/${encodeURIComponent(id)}`;

      html = html
        .replace(/<title>[^<]*<\/title>/, `<title>${esc(titulo)}</title>`)
        .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(descricao)}">`)
        .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${esc(pageUrl)}">`)
        .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(titulo)}">`)
        .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(descricao)}">`)
        .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${esc(pageUrl)}">`)
        .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(imagem)}">`)
        .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(titulo)}">`)
        .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(descricao)}">`)
        .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${esc(imagem)}">`);

      const sameAs = [c.instagram, c.facebook, c.tiktok, c.youtube, c.twitter]
        .filter((v) => v && v.trim() && v !== '#');

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: c.nome,
        url: pageUrl,
        image: imagem,
        jobTitle: cargoExibido(c) || preLabel,
        affiliation: {
          '@type': 'Organization',
          name: 'Missão Paraná',
          url: SITE + '/',
        },
      };
      if (sameAs.length) jsonLd.sameAs = sameAs;
      if (c.cidade) jsonLd.homeLocation = { '@type': 'Place', name: c.cidade };

      const scriptTag = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
      html = html.replace('</head>', scriptTag + '</head>');
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    res.status(200).send(html);
  } catch (err) {
    // Se algo falhar, nunca deixa a página quebrada: serve o HTML original puro.
    try {
      const htmlPath = path.join(process.cwd(), 'candidato-template.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(200).send(html);
    } catch (e2) {
      res.status(500).send('Erro ao carregar a página.');
    }
  }
};
