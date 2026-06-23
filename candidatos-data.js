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

  // ---------- DEPUTADOS FEDERAIS ----------
  {
    id: "federal-1", nome: "Pré-candidato 1", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Cidade, PR", foto: "",
    instagram: "#",
    bio: "Apresentação do pré-candidato a deputado federal. Trajetória, principais bandeiras e o que pretende defender em Brasília pela Missão."
  },
  {
    id: "federal-2", nome: "Pré-candidato 2", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Cidade, PR", foto: "",
    instagram: "#",
    bio: "Apresentação do pré-candidato a deputado federal. Trajetória, principais bandeiras e o que pretende defender em Brasília pela Missão."
  },
  {
    id: "federal-3", nome: "Pré-candidato 3", cargo: "federal",
    cargoLabel: "Deputado Federal", cidade: "Cidade, PR", foto: "",
    instagram: "#",
    bio: "Apresentação do pré-candidato a deputado federal. Trajetória, principais bandeiras e o que pretende defender em Brasília pela Missão."
  },

  // ---------- DEPUTADOS ESTADUAIS ----------
  {
    id: "estadual-1", nome: "Pré-candidato 1", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Cidade, PR", foto: "",
    instagram: "#",
    bio: "Apresentação do pré-candidato a deputado estadual. Trajetória, principais bandeiras e o que pretende defender na Assembleia pela Missão."
  },
  {
    id: "estadual-2", nome: "Pré-candidato 2", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Cidade, PR", foto: "",
    instagram: "#",
    bio: "Apresentação do pré-candidato a deputado estadual. Trajetória, principais bandeiras e o que pretende defender na Assembleia pela Missão."
  },
  {
    id: "estadual-3", nome: "Pré-candidato 3", cargo: "estadual",
    cargoLabel: "Deputado Estadual", cidade: "Cidade, PR", foto: "",
    instagram: "#",
    bio: "Apresentação do pré-candidato a deputado estadual. Trajetória, principais bandeiras e o que pretende defender na Assembleia pela Missão."
  },
];
