/* =========================================================
   CONFIGURAÇÃO DA LOJA  —  edite aqui
   ========================================================= */
export const CONFIG = {
  nomeLoja: "Lojinha do Clai",

  // Barra preta no topo do site
  aviso: "Todos os preços são negociáveis · Negociação direto no WhatsApp",

  // Texto abaixo do nome na seção do topo
  slogan: "Desapegando do meu setup. Tudo bem cuidado, pronto pra uso e aberto a propostas.",

  // Seu WhatsApp: 55 + DDD + número, só dígitos. Ex: "5511987654321"
  whatsapp: "5561998636443",

  // Mensagem que já vem escrita quando a pessoa clica no botão.
  // {produto} e {preco} são substituídos automaticamente.
  mensagemPadrao: "Opa! Vi na Lojinha do Clai e tenho interesse em: {produto} ({preco}). Ainda está disponível? Podemos negociar?",
  mensagemGeral: "Opa! Vi a Lojinha do Clai e queria tirar uma dúvida.",
};

/* =========================================================
   PRODUTOS
   - id: também é o nome da pasta de fotos em src/fotos/<id>/
   - preco: número (ex: 899.90) ou null para mostrar "Preço sob consulta"
   - especificacoes: lista opcional exibida na página do produto
   - vendido: true para marcar como vendido
   - icone: emoji da imagem provisória (usada enquanto não houver fotos)

   FOTOS: coloque as imagens em src/fotos/<id>/ (1.jpg, 2.jpg, 3.jpg...).
   Elas são encontradas automaticamente e ordenadas pelo nome; a primeira é a capa.
   ========================================================= */
export const PRODUTOS = [
  // ---------- COMPUTADOR ----------
  {
    id: "pc-completo",
    nome: "PC Gamer Ryzen 7 5700X + RTX 3060 12GB (Setup Branco)",
    categoria: "Computador",
    subtitulo: "PC Gamer completo montado no tema branco com gabinete Aigo DarkFlash DLM 21 Branco, iluminação ARGB sincronizada e bomba com display de temperatura. Windows 11 Pro ativado e pronto para uso.",
    especificacoes: [
      ["Processador", "AMD Ryzen 7 5700X (8 núcleos / 16 threads)"],
      ["Placa de vídeo", "Zotac Gaming GeForce RTX 3060 12GB GDDR6"],
      ["Placa-mãe", "ASRock B550M Steel Legend (dissipador com RGB)"],
      ["Memória RAM", "16GB (2x8GB) 3200MHz T-Force Delta RGB Branca"],
      ["Water Cooler", "Mancer Mystic G1 120mm ARGB Branco (com display digital de temperatura)"],
      ["SSD NVMe", "Adata XPG Spectrix S40G 512GB RGB (3500MB/s leitura)"],
      ["SSD SATA", "Adata SU650 256GB"],
      ["Fonte", "Rise Mode Elektra 650W Bronze Full Modular Branca (PFC Ativo)"],
      ["Gabinete", "Aigo DarkFlash DLM 21 Branco (lateral em vidro temperado)"],
      ["Iluminação", "Fans ARGB sincronizados"],
      ["Sistema Operacional", "Windows 11 Pro (Ativado e pronto para uso)"],
    ],
    preco: 5500,
    vendido: false,
    icone: "🖥️",
  },

  // ---------- PERIFÉRICOS ----------
  {
    id: "teclado-attack-shark-k86",
    nome: "Teclado Mecânico Attack Shark K86 Sem Fio",
    categoria: "Periféricos",
    subtitulo: "Teclado mecânico sem fio com tela TFT colorida personalizável e knob de metal. Acompanha caixa original e todos os acessórios.",
    especificacoes: [
      ["Conexão", "Tri-Mode (Sem fio 2.4GHz, Bluetooth 5.0 e Cabo USB-C)"],
      ["Tela", "Display TFT colorido personalizável (GIFs, data e bateria)"],
      ["Controle", "Knob giratório de metal para controle de volume"],
      ["Estrutura", "Gasket Mount (digitação suave e macia)"],
      ["Iluminação", "RGB personalizável com barras de LED laterais"],
      ["Compatibilidade", "Windows e Mac (chave seletora física)"],
      ["Acessórios inclusos", "Caixa original, cabo USB-C, extrator e switches extras"],
    ],
    preco: 300,
    vendido: false,
    icone: "⌨️",
  },
  {
    id: "mouse-gpro-superlight-2c",
    nome: "Mouse Logitech G PRO X Superlight 2c (1 mês de uso, na garantia)",
    categoria: "Periféricos",
    subtitulo: "Mouse gamer sem fio profissional topo de linha. Apenas 1 mês de uso, completo na caixa com garantia e nota/garantia ativa.",
    especificacoes: [
      ["Tempo de uso", "Apenas 1 mês de uso"],
      ["Garantia", "Na garantia de fábrica Logitech"],
      ["Sensor", "HERO 2 de última geração (até 32.000 DPI, 500+ IPS)"],
      ["Switches", "LIGHTFORCE Híbridos (óptico-mecânicos)"],
      ["Conexão", "Tecnologia sem fio Lightspeed profissional e USB-C"],
      ["Design", "Ultraleve e compacto (versão 2c)"],
      ["Acessórios inclusos", "Caixa original, receptor Lightspeed, cabo USB-C, grip tapes 3M novos, tampa PTFE extra e manuais"],
    ],
    preco: 650,
    vendido: false,
    icone: "🖱️",
  },
  {
    id: "mouse-dragonfly-r1-pro",
    nome: "Mouse Gamer VXE Dragonfly R1 Pro + Dongle 4K",
    categoria: "Periféricos",
    subtitulo: "Mouse gamer ultraleve sem fio com Dongle 4K dedicado, sensor topo de linha e acessórios novos.",
    especificacoes: [
      ["Sensor", "PixArt PAW3395 (até 26.000 DPI)"],
      ["Taxa de resposta", "Até 4000Hz (4K Polling Rate com dongle dedicado)"],
      ["Peso", "Ultraleve (~48 gramas)"],
      ["Conexão", "Sem fio 2.4GHz Smart Speed Wireless e Cabo Type-C"],
      ["Dongle 4K", "Acompanha Dongle 4K dedicado VGN na caixa"],
      ["Skates / Feets", "PTFE puro 100% (mais kit reserva novo)"],
      ["Acessórios inclusos", "Caixas originais, Dongle 4K, cabo paracord, grip tapes e skates extras"],
    ],
    preco: 200,
    vendido: false,
    icone: "🖱️",
  },
  {
    id: "headset-redragon-lamia",
    nome: "Headset Redragon Lamia Lunar White RGB",
    categoria: "Periféricos",
    subtitulo: "Headset gamer branco com som surround 7.1 e anel de iluminação RGB Chroma. Funcionando 100%, com desgaste natural do corino nas espumas/arco.",
    especificacoes: [
      ["Conexão", "USB plug & play (áudio digital + iluminação)"],
      ["Áudio", "Surround Virtual 7.1"],
      ["Iluminação", "RGB Chroma personalizável nos fones"],
      ["Microfone", "Microfone flexível com LED indicador"],
      ["Cor", "Lunar White (Edição Branca)"],
      ["Estado", "Funcionamento perfeito; espumas com desgaste de uso (fotos no anúncio)"],
    ],
    preco: 100,
    vendido: false,
    icone: "🎧",
  },
];
