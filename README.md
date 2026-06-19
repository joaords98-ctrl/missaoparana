# Missão Paraná — Grupos Regionais

Página de captação de membros da **Missão** no Paraná. A pessoa preenche o formulário,
escolhe a cidade e é redirecionada para o grupo de WhatsApp da sua mesorregião.
Os dados são salvos no Supabase.

Pensado para rodar em: **grupos.missaoparana.com.br**

## O que tem aqui

- `index.html` — home institucional (página principal).
- `grupos.html` — página de captação que leva aos grupos de WhatsApp por região.
  integração com o Supabase já embutidos). É o único arquivo necessário.

## Como publicar (GitHub + Vercel)

1. Suba este repositório no GitHub.
2. No Vercel, clique em **Add New → Project** e importe este repositório.
3. Não precisa configurar build: o Vercel detecta o `index.html` e publica.
4. Em **Settings → Domains**, adicione `grupos.missaoparana.com.br`.
5. Crie o CNAME no Registro.br (instruções abaixo).

## DNS no Registro.br

No painel do domínio `missaoparana.com.br`, em **Editar Zona / DNS**, adicione:

| Tipo  | Nome (host) | Valor / Destino          |
|-------|-------------|--------------------------|
| CNAME | grupos      | cname.vercel-dns.com     |

> O Vercel confirma o valor exato do CNAME na tela de domínios. Use o que ele indicar.
> Em alguns minutos o https (SSL) é emitido automaticamente.

## Onde ficam os leads

Banco: **Supabase**, tabela `leads_missao_pr`.
Campos: nome, email, whatsapp, profissão, cidade, região, como_ajudar, created_at.

Para ver/exportar: painel do Supabase → **Table Editor** → `leads_missao_pr`
(ou **SQL Editor** para filtrar por região, exportar CSV, etc).

A chave usada no site é a **publishable** (pública): só permite inserir leads,
nunca ler. Por isso é seguro manter este repositório, mesmo público.

## Grupos por região (mesorregião)

Campos Gerais · Centro Oeste · Noroeste · Norte Central · Norte Pioneiro ·
Oeste · Sudeste · Sudoeste · Centro-Sul · Curitiba Metropolitana e Litoral
