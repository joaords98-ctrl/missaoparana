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
    bio: "Médica, com pós-graduação em Emergência e atualmente cursando Paliativos, Yvis de Oliveira vive de perto os desafios de um sistema de saúde sobrecarregado e a urgência de quem busca atendimento nas UPAs e hospitais.\n\nÉ pré-candidata a Deputada Federal porque acredita que a gestão pública precisa de quem conhece a realidade do chão da unidade, entende o valor de cada minuto no atendimento e não aceita a insegurança de quem cuida e de quem é cuidado. Defende um Paraná com uma saúde técnica, humana e, acima de tudo, eficiente."
  },
  {
    id: "gerusa-correa", nome: "Gerusa Correa", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/gerusa-correa.jpg",
    instagram: "https://www.instagram.com/gerusacorreaoficial/",
    bio: "Mulher, mãe, pastora e coordenadora de projeto social, Gerusa Correa acompanha de perto as dores das famílias paranaenses: os desafios emocionais, os conflitos dentro dos lares e a urgência de valores que sustentem uma sociedade saudável.\n\nSua pré-candidatura nasce desse compromisso claro: defender a família, cuidar das necessidades do próximo e levantar uma voz de equilíbrio, fé e responsabilidade em Brasília. Gerusa não chega como alguém que tem todas as respostas, mas como alguém disposta a aprender, contribuir e representar os princípios em que acredita pela Missão Paraná."
  },
  {
    id: "jessica-this-do-autismo", nome: "Jéssica This Machado", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/jessica-this-do-autismo.jpg",
    instagram: "https://www.instagram.com/prof_this.pr/",
    bio: "Professora e pré-candidata a Deputada Federal, Jéssica This Machado é docente há mais de 10 anos, com trajetória na Educação Infantil, no Ensino Fundamental e, atualmente, no Ensino Superior. Cristã e empresária, é proprietária de uma clínica multidisciplinar em Curitiba, onde foca seu trabalho na alfabetização de crianças especiais, unindo rigor técnico à sensibilidade necessária para o atendimento clínico especializado.\n\nDefensora da Educação, da Inclusão e da Família, acredita que a verdadeira inclusão não acontece apenas no papel, mas no dia a dia, com estrutura, técnica e acolhimento real. Representa uma geração que cansou de aceitar a política tradicional brasileira."
  },
  {
    id: "alan-leal", nome: "Alan Leal", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/alan-leal.jpg",
    instagram: "https://www.instagram.com/alannleal_/",
    bio: "Curitibano, 28 anos, Alan Leal decidiu entrar para a política por acreditar que o Brasil precisa de uma nova geração de representantes: pessoas comuns, próximas da população e dispostas a enfrentar os problemas reais do país. Sua pré-candidatura nasce da vontade de defender liberdade, responsabilidade, honestidade, segurança, incentivo ao empreendedorismo e combate ao desperdício do dinheiro público.\n\nInspirado pelos princípios do Partido Missão, defende menos burocracia, mais transparência, investimento inteligente em segurança pública, combate ao crime organizado, valorização de quem produz e fiscalização firme sobre os gastos do governo. Não é político de carreira: é alguém que decidiu sair da indignação e partir para a ação, e busca representar quem trabalha, empreende, estuda, paga impostos e sente que sua voz não é ouvida em Brasília."
  },
  {
    id: "pedro-deyrot", nome: "Pedro Deyrot", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/pedro.deyrot/",
    bio: "Um dos fundadores do Movimento Brasil Livre (MBL) e do Partido Missão, Pedro Deyrot cresceu em Curitiba, é publicitário e produtor musical, e integrou o Bonde do Rolê, banda que fez sucesso internacional e chegou a tocar em festivais como Coachella e Glastonbury — experiência que lhe deu domínio raro sobre cultura, linguagem e comunicação de massa. Em 2014, ao lado de Renan Santos e Kim Kataguiri, fundou o MBL e foi um dos principais articuladores das manifestações que levaram ao impeachment de Dilma Rousseff, seguindo como Coordenador Nacional do movimento e professor de comunicação na Academia MBL.\n\nEm novembro de 2025, com a aprovação do Partido Missão pelo TSE, tornou-se vice-presidente do Partido no Paraná, dedicando-se à investigação e apuração de dossiês sobre escândalos atuais — disponíveis publicamente em pedrodeyrot.com/denuncias — e criou o site escandalomaster.com, que mapeia o esquema de corrupção do Banco Master. É pré-candidato a Deputado Federal pelo Paraná com atuação focada nas propostas do Livro Amarelo: agronegócio, família, segurança pública e combate à corrupção onde ela estiver."
  },
  {
    id: "delegado-eduardo-kruger", nome: "Delegado Eduardo Kruger", cargo: "senador",
    cargoLabel: "Senador", cidade: "Paraná", foto: "assets/candidatos/delegado-eduardo-kruger.jpg",
    instagram: "#",
    bio: "Em breve mais informações sobre a trajetória de Delegado Eduardo Kruger, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "ana-xavier", nome: "Ana Lucia Xavier", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/ana-xavier.jpg",
    instagram: "https://www.instagram.com/analuciapr14/",
    bio: "Contadora e analista de controladoria, Ana Lucia Xavier é pré-candidata a Deputada Federal pelo Partido Missão. Enfrenta, ao lado da pré-campanha, o tratamento de um câncer de mama HER2 — uma luta que reforça sua determinação em representar quem também enfrenta desafios difíceis no dia a dia."
  },
  {
    id: "jornalista-isaak-almeida", nome: "Jornalista Isaak Almeida", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "assets/candidatos/jornalista-isaak-almeida.jpg",
    instagram: "https://www.instagram.com/jornalistaisaakalmeida/",
    bio: "Em breve mais informações sobre a trajetória de Jornalista Isaak Almeida, suas bandeiras e o que pretende defender em Brasília pela Missão Paraná."
  },
  {
    id: "karen-guerreiro", nome: "Karen Guerreiro", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/karen.guerreiro7/",
    bio: "Graduada em Arte e diretora de comunicação, Karen Guerreiro é entusiasta da tecnologia e defensora da educação. Trabalhou em sala de aula e foi coordenadora de projeto social durante boa parte da vida, acreditando na educação como virada de chave e na escola como refúgio de muitas famílias em condição de vulnerabilidade.\n\nHá mais de 20 anos atua também como protetora autônoma de animais, e conhece de perto a dificuldade de quem luta por essa causa. É pré-candidata a Deputada Federal pelo Paraná."
  },
  {
    id: "manu-shtorach", nome: "Emanuelle Shtorach", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/manubittennpr/",
    bio: "Mais conhecida como Operadora Manu, do Conversa Franca, Emanuelle Shtorach é pré-candidata a Deputada Federal pelo Paraná."
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
    instagram: "https://www.instagram.com/profyangaudard/",
    bio: "Cristão, casado, 33 anos, Yan Gaudard é professor de Português formado pela UNESPAR (Universidade Estadual do Paraná), campus Paranaguá, em Letras – Português/Inglês, com pós-graduação em Docência da Língua Portuguesa para Estrangeiros pela UNINTER. Atualmente leciona Português, Literatura e Redação em um colégio da rede particular de Pontal do Paraná.\n\nMorador de Paranaguá — cidade-mãe do Estado — desde fevereiro de 2018, adotou o município como seu lar e é pré-candidato a Deputado Federal com o avanço educacional de toda a região litorânea como principal bandeira. Para o professor, a educação é o primeiro passo para um futuro glorioso: \"A educação é a chave para abrir a porta dourada da liberdade\" (George Washington Carver)."
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
    instagram: "https://www.instagram.com/beatrizoliveira.pr/",
    bio: "De Curitiba, 23 anos, formada em Direito, Beatriz Oliveira é pré-candidata a Deputada Estadual pelo Paraná pela Missão. Achava mais fácil criticar o sistema, mas decidiu assumir a responsabilidade de tentar fazer diferente — recusando-se a aceitar que o Paraná continue governado pelos mesmos de sempre enquanto a população vive insegura, abandonada e sem voz.\n\nDefende mais segurança pública, com investimento inteligente, valorização das forças policiais e políticas sérias de prevenção ao crime, além de menos gasto público e combate à corrupção. Defende também a desfavelização com dignidade: infraestrutura, saneamento, urbanização e oportunidades para transformar comunidades abandonadas em lugares seguros para viver e crescer."
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
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "assets/candidatos/gustavo-camillo.jpg",
    instagram: "https://www.instagram.com/gucamillo/",
    bio: "Jornalista, estudante de Direito e autodenominado \"fiscalizador nº 1 do poder público paranaense\", Gustavo Camillo tem, aos 22 anos e sem cargo público, gerado resultados concretos com suas denúncias nas redes sociais pelo Paraná.\n\nApós denúncias em Curitiba, a prefeitura passou a se mobilizar para tratar da situação dos moradores de rua. Em Pinhais, uma denúncia sua ao Ministério Público levou à exoneração de um secretário com condenação na Justiça. Em Fazenda Rio Grande, expôs supostas nomeações cruzadas entre prefeituras. Em Cianorte, atuou contra o fim do concurso da Guarda Municipal, e em Guaratuba, denunciou ao MP gastos públicos milionários possivelmente superfaturados em shows. É pré-candidato a Deputado Estadual para levar essa fiscalização também para dentro das instituições."
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
    instagram: "https://www.instagram.com/rubensnascimentopr/",
    bio: "Aos 28 anos, marido e pai, Rubens Nascimento é bacharel em Teologia e entusiasta da tecnologia, guiado pela convicção de usar a inovação para dar dignidade a quem sempre foi deixado para trás. Não é político de carreira.\n\nDe Piraquara para o Paraná, é pré-candidato a Deputado Estadual e constrói uma candidatura de quem veio do povo, para servir o povo. Cresceu nas periferias de Curitiba, estudou em escola pública e aprendeu que mudança de verdade começa por quem conhece a realidade — e quem conhece a realidade sabe o que precisa mudar."
  },
  {
    id: "henrique-de-souza", nome: "Henrique de Souza", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Paraná", foto: "",
    instagram: "https://www.instagram.com/henriquesouzacwb/",
    bio: "Henrique Souza tem 24 anos e, desde 2019, atua como influenciador digital e liderança regional em Curitiba, levando informação com humor, mas sem passar pano: denunciando atrasos em obras, cobrando reparos e expondo os descasos que a população enfrenta todos os dias.\n\nCansado de apenas filmar o problema, decidiu ir além: é pré-candidato a Deputado Estadual para ajudar a resolver de dentro o que sempre cobrou de fora."
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
    instagram: "https://www.instagram.com/odenilsonvicente/",
    bio: "Aos 56 anos, casado e pai de dois filhos, Odenilson Vicente é servidor público e atua há 24 anos como agente comunitário de saúde, acompanhando de perto a realidade das famílias paranaenses e os desafios que elas enfrentam.\n\nÉ graduado em Gestão Pública e pós-graduado em Políticas Públicas e na área da Saúde — formação que une à vivência de quem está todos os dias ao lado da comunidade."
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
