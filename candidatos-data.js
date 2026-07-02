/* ============================================================
   DADOS DOS PRÉ-CANDIDATOS — MISSÃO PARANÁ
   ------------------------------------------------------------
   Para adicionar, remover ou editar um pré-candidato, basta
   alterar a lista abaixo. Cada um tem:
     id        -> identificador único na URL (sem espaços/acentos)
     nome      -> nome completo
     cargo     -> "governador" | "federal" | "estadual"
     cargoLabel-> texto exibido (ex.: "Deputado Federal")
     cidade    -> cidade/região
     foto      -> caminho da foto (ex.: "assets/candidatos/fulano.jpg")
                  deixe "" para usar o avatar padrão
     instagram -> link do Instagram (ou "")
     bio       -> texto de apresentação (pode ter vários parágrafos
                  separados por \n\n)
   ============================================================ */

const CANDIDATOS = [
  {
    id: "luiz-franca",
    pagina: "luiz-franca.html",
    nome: "Luiz Felipe França",
    cargo: "governador",
    cargoLabel: "Governador do Paraná",
    cidade: "Curitiba, PR",
    foto: "assets/candidatos/luiz-franca.jpg",
    instagram: "https://www.instagram.com/14luizfranca/",
    resumo: "Advogado e consultor político, Luiz Felipe França defende um Paraná com instituições fortes, liberdade econômica e gestão eficiente.",
    bio: "Natural do Paraná, Luiz Felipe França construiu sua trajetória unindo dedicação aos estudos, atuação profissional e participação ativa nos debates sobre desenvolvimento econômico, gestão pública e política. Desde cedo, desenvolveu interesse por temas ligados ao crescimento econômico, à segurança jurídica e ao fortalecimento das instituições.\n\nLuiz Felipe França acredita que o desenvolvimento do Paraná depende de instituições fortes, segurança jurídica, liberdade econômica e gestão eficiente. Sua atuação é voltada à construção de soluções que gerem crescimento, oportunidades e qualidade de vida para os paranaenses.",
    trajetoria: [
      "Advogado (OAB/PR 91.208) e consultor político",
      "Atuação em Direito Privado (societário e contratos) e Direito Público",
      "Especialista em Direito Econômico e Contratos Públicos",
      "Atuação em Relações Institucionais e Governamentais (RIG)",
      "Bacharel em Direito",
      "Graduando em Ciências Econômicas pela Universidade Positivo",
      "Mestrando em Desenvolvimento Econômico pela UFPR",
      "Pesquisador em Análise Econômica do Direito"
    ]
  },

  {
    id: "joao-adolfo",
    pagina: "joao-adolfo.html",
    nome: "João Adolfo Padilha Yamane Wendpap",
    cargo: "vice",
    cargoLabel: "Vice-Governador do Paraná",
    cidade: "Paraná",
    foto: "assets/candidatos/joao-adolfo.jpg",
    instagram: "https://www.instagram.com/folegodonaufrago/",
    destaque: "Casado, pai, e crê que a responsabilidade é o caminho democrático.",
    resumo: "Formado em Jornalismo e Letras, com experiência em direito e economia, defende um vice de trabalho contínuo e dedicado ao mandato.",
    bio: "João Adolfo Padilha Yamane Wendpap é formado em Jornalismo e Letras, e tem experiência com direito e economia. Crê que o papel do vice deve ser de trabalho contínuo e dedicado ao mandato; diferente do que vem ocorrendo no Paraná, onde a escolha pelos vices é decorativa e de eventual interlocução com grupos e setores."
  },

  // ---------- DEPUTADOS FEDERAIS ----------
  {
    id: "yvis-de-oliveira", nome: "Yvis de Oliveira", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/yvis-de-oliveira.jpg",
    instagram: "https://www.instagram.com/yvisoliveira_14/",
    bio: "Médica, Yvis de Oliveira tem a Saúde como principal bandeira de atuação. Em breve mais informações sobre sua trajetória e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "gerusa-correa", nome: "Gerusa Correa", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/gerusa-correa.jpg",
    instagram: "https://www.instagram.com/gerusacorreaoficial/",
    bio: "Mulher, mãe, pastora e coordenadora de projeto social, Gerusa Correa acompanha de perto as dores das famílias paranaenses: os desafios emocionais, os conflitos dentro dos lares e a urgência de valores que sustentem uma sociedade saudável.\n\nSua pré-candidatura nasce desse compromisso claro: defender a família, cuidar das necessidades do próximo e levantar uma voz de equilíbrio, fé e responsabilidade em Brasília. Gerusa não chega como alguém que tem todas as respostas, mas como alguém disposta a aprender, contribuir e representar os princípios em que acredita pela Missão Paraná."
  },
  {
    id: "jessica-this-do-autismo", nome: "Jessica This do Autismo", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/jessica-this-do-autismo.jpg",
    instagram: "https://www.instagram.com/prof_this.pr/",
    bio: "Em breve mais informações sobre a trajetória de Jessica This do Autismo, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "alan-leal", nome: "Alan Leal", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/alan-leal.jpg",
    instagram: "https://www.instagram.com/alannleal_/",
    bio: "Em breve mais informações sobre a trajetória de Alan Leal, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "pedro-deyrot", nome: "Pedro Deyrot", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Pedro Deyrot, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "delegado-eduardo-kruger", nome: "Delegado Eduardo Kruger", cargo: "senador",
    cargoLabel: "Senador", cidade: "Paraná", foto: "assets/candidatos/delegado-eduardo-kruger.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Delegado Eduardo Kruger, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "ana-xavier", nome: "Ana Xavier", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/ana-xavier.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Ana Xavier, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "jornalista-isaak-almeida", nome: "Jornalista Isaak Almeida", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/jornalista-isaak-almeida.jpg",
    instagram: "https://www.instagram.com/jornalistaisaakalmeida/",
    bio: "Em breve mais informações sobre a trajetória de Jornalista Isaak Almeida, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "anita-de-biasi", nome: "Anita de Biasi", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Anita de Biasi, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "yan-gaudard", nome: "Yan Gaudard", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Yan Gaudard, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "tayna-vieia", nome: "Tayna Vieia", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Tayna Vieia, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "glauberson-rocha", nome: "Glauberson Rocha", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/glauberson-rocha.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Glauberson Rocha, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "ricardo-cascavel-segura", nome: "Ricardo Cascavel Segura", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Ricardo Cascavel Segura, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "darlon-parana-pop", nome: "Darlon Parana Pop", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/darlondutra/",
    bio: "Em breve mais informações sobre a trajetória de Darlon Parana Pop, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "mauricio-franciscon", nome: "Mauricio Franciscon", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Mauricio Franciscon, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "marcello-de-paula", nome: "Marcello de Paula", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/marcello-de-paula.jpg",
    instagram: "https://www.instagram.com/marcello_de_paula/",
    bio: "Em breve mais informações sobre a trajetória de Marcello de Paula, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "diogo-costa", nome: "Diogo Costa", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/diogocosta_pr/",
    bio: "Em breve mais informações sobre a trajetória de Diogo Costa, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "caroline-barbosa", nome: "Caroline Barbosa", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/carolinecardine/",
    bio: "Em breve mais informações sobre a trajetória de Caroline Barbosa, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "matheus-santos-moreira", nome: "Matheus Santos Moreira", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/matheus-santos-moreira.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Matheus Santos Moreira, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "gabriel-bertolucci", nome: "Gabriel Bertolucci", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Gabriel Bertolucci, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "andrey-luiz", nome: "Andrey Luiz", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/andreyluiz.mbl/",
    bio: "Em breve mais informações sobre a trajetória de Andrey Luiz, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "carlos-eduardo-de-oliveira-gasparim", nome: "Carlos Eduardo de Oliveira Gasparim", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Advogado, Carlos Eduardo de Oliveira Gasparim é pré-candidato a Deputado Federal pela Missão com a convicção de que o Brasil não precisa de mais discursos vazios, mas de seriedade, preparo e compromisso verdadeiro com as pessoas. Como advogado, aprendeu que a transformação não acontece por conveniência nem por frases prontas — ela nasce do estudo, da coragem, do trabalho e da defesa firme daquilo que é justo.\n\nAo lado do presidente nacional Renan Santos, defenderá uma reforma administrativa séria, voltada ao corte de gastos e ao aumento da eficiência do Estado, criando condições reais para reduzir impostos e juros e devolver ao cidadão e ao setor produtivo a liberdade de crescer, investir e gerar empregos. Defenderá também o enfrentamento firme ao crime organizado, com coragem, inteligência e autoridade, e a reforma do pacto federativo, para que o dinheiro produzido no Paraná permaneça em maior medida no próprio Estado — impulsionando o desenvolvimento de uma terra que tanto contribui para a economia e o emprego no Brasil."
  },
  {
    id: "guilherme-machado", nome: "Guilherme Machado", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Guilherme Machado, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "marianny-thayla", nome: "Marianny Thayla", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Marianny Thayla, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "matheus-zozoloto", nome: "Matheus Zozoloto", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Matheus Zozoloto, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },

  // ---------- DEPUTADOS ESTADUAIS ----------
  {
    id: "beatriz-oliveira", nome: "Beatriz Oliveira", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "assets/candidatos/beatriz-oliveira.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Beatriz Oliveira, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "mariane-mazzon", nome: "Mariane Mazzon", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Mariane Mazzon, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "erica-de-freitas-goncalves", nome: "Erica de Freitas Gonçalves", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/almeida._erica/",
    bio: "Em breve mais informações sobre a trajetória de Erica de Freitas Gonçalves, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "lucas-backes", nome: "Lucas Backes", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Lucas Backes, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "alessandra-lima", nome: "Alessandra Lima", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Alessandra Lima, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "milena-mansur", nome: "Milena Mansur", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Milena Mansur, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "gustavo-camillo", nome: "Gustavo Camillo", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Gustavo Camillo, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "william-rocha", nome: "William Rocha", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de William Rocha, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "rubens-nascimento", nome: "Rubens Nascimento", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Rubens Nascimento, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "henrique-de-souza", nome: "Henrique de Souza", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/henriquesouzacwb/",
    bio: "Em breve mais informações sobre a trajetória de Henrique de Souza, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "vinicius-ferreira", nome: "Vinicius Ferreira", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/viniciusferreirabrasil/",
    bio: "Em breve mais informações sobre a trajetória de Vinicius Ferreira, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "paulo-di-melo", nome: "Paulo Di Melo", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "assets/candidatos/paulo-di-melo.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Paulo Di Melo, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "lude-riesemberg", nome: "Lude Riesemberg", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Lude Riesemberg, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "fernando-garbatchevski", nome: "Fernando Garbatchevski", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Fernando Garbatchevski, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "ivo-arthur-goncalves", nome: "Ivo Arthur Gonçalves", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Ivo Arthur Gonçalves, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "mateus-pepice", nome: "Mateus Pepice", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Mateus Pepice, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "joao-gabriel", nome: "João Gabriel", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de João Gabriel, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "natelie-facco", nome: "Natelie Facco", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Natelie Facco, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "carlos-eduardo", nome: "Carlos Eduardo", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "assets/candidatos/carlos-eduardo.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Carlos Eduardo, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "matheus-manholer", nome: "Matheus Manholer", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Matheus Manholer, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "daymond-pires", nome: "Daymond Pires", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Daymond Pires, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "kelven-alcantara", nome: "Kelven Alcantara", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Kelven Alcantara, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "aline-franzon", nome: "Aline Franzon", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Aline Franzon, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "eduardo-nunes-gomes", nome: "Eduardo Nunes Gomes", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Eduardo Nunes Gomes, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "lucas-leonardo-franca-de-oliveira", nome: "Lucas Leonardo França de Oliveira", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Lucas Leonardo França de Oliveira, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "odenilson-vicente", nome: "Odenilson Vicente", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Odenilson Vicente, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "daniel-aguiar", nome: "Daniel Aguiar", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Daniel Aguiar, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "felipe-de-castilho", nome: "Felipe de Castilho", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "assets/candidatos/felipe-de-castilho.jpg",
    instagram: "https://www.instagram.com/felipescastilho/",
    bio: "Em breve mais informações sobre a trajetória de Felipe de Castilho, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
  {
    id: "wagner-proenca-junior", nome: "Wagner Proença Junior", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "assets/candidatos/wagner-proenca-junior.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Wagner Proença Junior, suas bandeiras e o que pretende defender na Assembleia Legislativa do Paraná pela Missão Paraná."
  },
];
