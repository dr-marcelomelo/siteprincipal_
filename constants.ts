import { PracticeAreaContent, Testimonial, Stat, NavLink } from './types';
import Back02 from './assets/fotos/back02.webp';
import Back03 from './assets/fotos/back03.webp';
import Back04 from './assets/fotos/back04.webp';
import Back01 from './assets/fotos/back01.webp';

export const PHONE_NUMBER = "5592984688656";
export const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER}?text=Olá,%20gostaria%20de%20falar%20com%20o%20Dr.%20Marcelo.`;

export const NAV_LINKS: NavLink[] = [
  { label: 'Início', path: '/' },
  { label: 'Sobre', path: '/sobre' },
  {
    label: 'Áreas de Atuação',
    path: '#',
    children: [
      { label: 'Previdenciário', path: '/area/previdenciario' },
      { label: 'Trabalhista', path: '/area/trabalhista' },
      { label: 'Consumidor', path: '/area/consumidor' },
      { label: 'Cível', path: '/area/civel' },
    ]
  },
];

export const STATS: Stat[] = [
  { value: '3+', label: 'Anos de Experiência' },
  { value: '200+', label: 'Casos Resolvidos' },
  { value: '100%', label: 'Compromisso Ético' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Maria da Graça",
    location: "Manaus - AM",
    text: "Eu estava perdida com meu pedido de aposentadoria no INSS. O Dr. Marcelo me acolheu, explicou tudo de forma simples e conseguiu meu benefício. Serei eternamente grata!"
  },
  {
    name: "Carlos Eduardo",
    location: "Manaus - AM",
    text: "Tive um problema sério com um voo cancelado e a empresa não queria pagar nada. O escritório resolveu tudo rápido e consegui minha indenização. Recomendo muito."
  },
  {
    name: "Fernanda Lima",
    location: "Manaus - AM",
    text: "Excelente profissional. Muito atencioso e transparente. Me ajudou em um processo trabalhista complexo e me senti segura durante todo o tempo."
  }
];

export const PRACTICE_AREAS: Record<string, PracticeAreaContent> = {
  previdenciario: {
    id: 'previdenciario',
    title: 'Direito Previdenciário',
    slug: 'previdenciario',
    shortDescription: 'Garanta sua aposentadoria e benefícios com tranquilidade e segurança.',
    iconName: 'ShieldCheck',
    heroImage: Back02,
    intro: 'Sabemos que lidar com o INSS pode ser desgastante e burocrático. Nosso objetivo é tirar esse peso das suas costas, garantindo que você receba o benefício que construiu com tanto esforço ao longo da vida.',
    whatIsIt: 'O Direito Previdenciário é a área que cuida da seguridade social. Em termos simples, é o ramo que luta para garantir que trabalhadores e contribuintes recebam suas aposentadorias, auxílios e pensões quando mais precisam, seja pela idade, doença ou tempo de serviço.',
    commonCases: [
      { title: 'Aposentadorias', description: 'Analisamos qual a melhor regra para você (idade, tempo de contribuição ou especial) para garantir o melhor valor possível.' },
      { title: 'BPC/LOAS', description: 'Benefício para idosos acima de 65 anos ou pessoas com deficiência de baixa renda que nunca contribuíram.' },
      { title: 'Auxílio-Doença', description: 'Para quem está temporariamente incapaz de trabalhar devido a problemas de saúde ou acidentes.' },
      { title: 'Planejamento Previdenciário', description: 'Um estudo detalhado para você saber quando se aposentar e com qual valor, evitando prejuízos.' },
      { title: 'Revisão de Benefícios', description: 'Se você acha que o valor da sua aposentadoria está errado, podemos recalcular e pedir a correção.' }
    ],
    checklist: [
      'Você trabalhou a vida toda e não sabe se já pode parar?',
      'O INSS negou seu pedido de benefício injustamente?',
      'Você tem algum problema de saúde que te impede de trabalhar?',
      'Cuidou de familiar doente ou trabalhou em ambiente insalubre?',
      'Sente que o valor da sua aposentadoria está abaixo do que deveria?'
    ],
    howWeHelp: 'Nossa atuação vai desde a organização da papelada até a defesa do seu direito na justiça, se o INSS negar. Fazemos o cálculo do seu tempo, simulamos o valor e lutamos para que você tenha o descanso remunerado que merece.',
    keywords: [
      'Previdenciário', 'Aposentadoria por idade', 'Aposentadoria por tempo de contribuição',
      'Revisão da vida toda', 'Benefício por incapacidade', 'Auxílio-doença',
      'BPC/LOAS', 'Pensão por morte', 'INSS', 'Aposentadoria especial',
      'Averbação de tempo de serviço', 'Planejamento previdenciário', 'Recurso administrativo INSS'
    ]
  },
  trabalhista: {
    id: 'trabalhista',
    title: 'Direito Trabalhista',
    slug: 'trabalhista',
    shortDescription: 'Defesa justa dos seus direitos como trabalhador.',
    iconName: 'Briefcase',
    heroImage: Back03,
    intro: 'O ambiente de trabalho deve ser justo e respeitoso. Se você sente que seus direitos foram violados, estamos aqui para ouvir sua história e buscar a reparação adequada, sempre com muito diálogo e firmeza.',
    whatIsIt: 'É a área que regula a relação entre patrão e empregado. Serve para equilibrar as forças e garantir que o trabalhador não seja explorado, recebendo tudo o que a lei manda pelo seu tempo e força de trabalho dedicados.',
    commonCases: [
      { title: 'Rescisão Indireta', description: 'Quando a empresa comete falhas graves e você precisa sair do emprego sem perder seus direitos.' },
      { title: 'Horas Extras', description: 'Cobrança de pagamentos por horas trabalhadas além da jornada contratada e não pagas.' },
      { title: 'Acidente de Trabalho', description: 'Indenizações e estabilidade para quem se machucou exercendo sua função.' },
      { title: 'Assédio Moral', description: 'Proteção e reparação para quem sofre humilhações ou perseguições no ambiente de trabalho.' },
      { title: 'Vínculo Empregatício', description: 'Reconhecimento de direitos para quem trabalhou sem carteira assinada (PJ ou informal).' }
    ],
    checklist: [
      'Você trabalha mais do que o contratado e não recebe por isso?',
      'Sofre pressão excessiva, xingamentos ou humilhações?',
      'Seu patrão não deposita o FGTS corretamente?',
      'Foi demitido e não recebeu suas verbas rescisórias?',
      'Trabalha sem registro na carteira mas cumpre horário e recebe ordens?'
    ],
    howWeHelp: 'Analisamos seu contrato, seu dia a dia na empresa e calculamos tudo o que lhe é devido. Atuamos com negociações extrajudiciais ou processos, sempre buscando a solução mais rápida e vantajosa para você.',
    keywords: [
      'Trabalhista', 'Verbas rescisórias', 'Horas extras', 'Assédio moral no trabalho',
      'Justa causa', 'Rescisão indireta', 'Adicional de insalubridade',
      'Adicional de periculosidade', 'Acidente de trabalho', 'FGTS',
      'Vínculo empregatício', 'Direitos trabalhistas', 'Reclamação trabalhista'
    ]
  },
  consumidor: {
    id: 'consumidor',
    title: 'Direito do Consumidor',
    slug: 'consumidor',
    shortDescription: 'Proteção contra abusos de empresas e prestadores de serviço.',
    iconName: 'ShoppingCart',
    heroImage: Back04,
    intro: 'Todos nós somos consumidores e merecemos respeito. Quando uma empresa falha, cobra indevidamente ou não entrega o prometido, você não precisa aceitar o prejuízo calado.',
    whatIsIt: 'O Código de Defesa do Consumidor existe para proteger a parte mais frágil da relação comercial: você. Esta área cuida de problemas com compras, serviços, bancos, companhias aéreas e planos de saúde.',
    commonCases: [
      { title: 'Negativação Indevida', description: 'Quando seu nome vai para o SPC/Serasa por uma conta que você já pagou ou nunca fez.' },
      { title: 'Problemas com Voos', description: 'Indenizações por cancelamentos, atrasos excessivos ou extravio de bagagem.' },
      { title: 'Planos de Saúde', description: 'Negativa de cobertura para exames, cirurgias ou aumentos abusivos na mensalidade.' },
      { title: 'Produtos com Defeito', description: 'Quando a garantia não funciona ou o produto veio estragado e a loja não troca.' },
      { title: 'Cobranças Abusivas', description: 'Juros extorsivos ou cobranças de serviços que você nunca contratou.' }
    ],
    checklist: [
      'Seu nome está sujo por uma dívida que você desconhece?',
      'Teve o voo cancelado e perdeu compromissos importantes?',
      'Comprou algo pela internet que nunca chegou?',
      'O plano de saúde negou um tratamento urgente?',
      'Está recebendo ligações de cobrança excessivas e ameaçadoras?'
    ],
    howWeHelp: 'Buscamos o cancelamento de cobranças indevidas, a troca de produtos e, principalmente, indenizações por danos morais e materiais causados pelo mau serviço das empresas.',
    keywords: [
      'Consumidor', 'Direito do consumidor', 'Cobrança indevida', 'Negativação indevida',
      'Compra pela internet', 'Atraso na entrega', 'Produto com defeito',
      'Cancelamento de serviço', 'Fraude bancária', 'Golpes digitais',
      'Planos de saúde', 'Reembolso indevido', 'Responsabilidade civil do fornecedor',
      'Indenização por danos morais'
    ]
  },
  civel: {
    id: 'civel',
    title: 'Direito Cível',
    slug: 'civel',
    shortDescription: 'Soluções para conflitos do dia a dia, contratos e família.',
    iconName: 'Scale',
    heroImage: Back01,
    intro: 'A vida em sociedade gera conflitos, seja com um vizinho, em um contrato de aluguel ou em questões familiares. Nossa missão é resolver esses problemas com técnica jurídica e sensibilidade.',
    whatIsIt: 'O Direito Cível é a área mais ampla do direito. Ele regula as relações entre as pessoas, os bens e as obrigações. Envolve desde um contrato de aluguel até indenizações por danos diversos.',
    commonCases: [
      { title: 'Contratos', description: 'Análise e elaboração de contratos de compra e venda, aluguel e prestação de serviços.' },
      { title: 'Indenizações', description: 'Reparação financeira por danos causados por terceiros (batida de carro, danos ao imóvel, etc).' },
      { title: 'Direito de Família (Básico)', description: 'Auxílio em questões de divórcio consensual, pensão alimentícia e guarda.' },
      { title: 'Usucapião', description: 'Regularização da documentação do seu imóvel através do tempo de posse.' },
      { title: 'Cobrança de Dívidas', description: 'Recuperação de valores emprestados ou devidos a você.' }
    ],
    checklist: [
      'Alguém te deve dinheiro e não paga?',
      'Precisa assinar um contrato importante e tem medo das cláusulas?',
      'Sofreu um prejuízo material por culpa de outra pessoa?',
      'Precisa regularizar a escritura da sua casa?',
      'Está passando por um divórcio e precisa de orientação?'
    ],
    howWeHelp: 'Oferecemos segurança jurídica. Analisamos documentos, notificamos a outra parte para tentar um acordo amigável e, se necessário, entramos com a ação judicial para garantir o seu direito e o seu patrimônio.',
    keywords: [
      'Cível', 'Ação de cobrança', 'Contratos', 'Danos morais e materiais',
      'Inventário e partilha', 'Usucapião', 'Despejo', 'Direito de família',
      'Guarda e pensão alimentícia', 'Divórcio', 'Execução de título',
      'Responsabilidade civil', 'Regularização de imóveis', 'Ações indenizatórias'
    ]
  }
};