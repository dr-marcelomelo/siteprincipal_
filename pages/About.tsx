import React, { useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { WHATSAPP_LINK } from '../constants';
import AboutImage from '../assets/fotos/imagem02.webp';
import LogoIcon from '../assets/logos/ICONE.webp';
import { useLeadModal } from '../context/LeadModalContext';
import SEO from '../components/SEO';

// Schema.org Structured Data (Person/Attorney)
const attorneySchema = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  "name": "Dr. Marcelo Melo",
  "url": "https://marcelomelo.adv.br/sobre",
  "image": "https://marcelomelo.adv.br/assets/fotos/imagem02.webp",
  "jobTitle": "Advogado",
  "worksFor": {
    "@type": "LegalService",
    "name": "Dr. Marcelo Melo - Advocacia Especializada"
  },
  "description": "Advogado experiente e dedicado, focado em resolver problemas jurídicos com humanidade e eficiência em Manaus."
};

const About = () => {
  const { openModal } = useLeadModal();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-neutral-deepBlack">
      <SEO
        title="Sobre Dr. Marcelo Melo - Advocacia Humanizada"
        description="Conheça a trajetória do Dr. Marcelo Melo e nossa filosofia de trabalho baseada na empatia, transparência e excelência jurídica."
        canonical="https://marcelomelo.adv.br/sobre"
        keywords={["Advogado Manaus", "Dr. Marcelo Melo", "Advocacia Humanizada", "Trajetória Profissional"]}
        schema={attorneySchema}
      />
      {/* Header */}
      <div className="bg-neutral-darkGray text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Sobre o Dr. Marcelo Melo</h1>
          <div className="h-1 w-20 bg-gold-medium mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Main Bio */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Muito prazer, sou o <strong>Dr. Marcelo Melo</strong>.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Minha jornada no Direito começou com um propósito muito claro: ser a voz daqueles que muitas vezes não são ouvidos. Com mais de 3 anos de atuação intensa e mais de 200 casos resolvidos, aprendi que por trás de cada processo existe uma vida, uma família e uma esperança.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Não acredito na advocacia fria e distante. Meu escritório foi desenhado para ser um lugar de acolhimento. Aqui, você não é um número de processo; você é alguém que precisa de ajuda, e eu estou aqui para oferecer a melhor solução jurídica possível, com ética e transparência.
            </p>
            <div className="mt-8 p-6 bg-neutral-darkGray border-l-4 border-gold-medium rounded-r-lg">
              <p className="font-serif text-xl italic text-white">
                "O direito não é apenas sobre leis, é sobre devolver a dignidade e a paz de espírito para as pessoas."
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative max-w-md mx-auto">
              <div className="absolute top-4 left-4 w-full h-full border-2 border-gold-medium rounded-lg z-0"></div>
              <img src={AboutImage} alt="Dr. Marcelo Melo" className="relative z-10 rounded-lg shadow-xl w-full" />
              <div className="absolute bottom-3 right-3 z-20 opacity-90 bg-neutral-deepBlack p-0 rounded-lg shadow-lg">
                <img src={LogoIcon} alt="Logo" className="w-14 h-14 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <SectionTitle title="Nossa Filosofia" subtitle="Como Trabalhamos" />
            <p className="text-gray-400 text-lg leading-relaxed">
              Acreditamos que a justiça deve ser acessível e compreensível. Abolimos o "juridiquês" desnecessário. Nossa filosofia é baseada na verdade real: analisamos seu caso e dizemos exatamente quais são as chances, os riscos e os passos, sem falsas promessas. Construímos relações de confiança duradouras.
            </p>
          </div>
          <div>
            <SectionTitle title="Missão e Valores" subtitle="O que nos guia" />
            <ul className="space-y-4">
              {[
                { title: "Empatia", desc: "Sentir a dor do cliente para lutar com mais garra." },
                { title: "Transparência", desc: "O cliente deve saber tudo o que acontece no seu processo." },
                { title: "Excelência", desc: "Busca incansável pela melhor técnica jurídica." },
                { title: "Agilidade", desc: "O direito de quem precisa não pode esperar." }
              ].map((val, idx) => (
                <li key={idx} className="flex items-start border-b border-gray-800 pb-4 last:border-0">
                  <span className="text-gold-medium font-bold text-xl mr-4">0{idx + 1}.</span>
                  <div>
                    <strong className="block text-white text-lg">{val.title}</strong>
                    <span className="text-gray-400">{val.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-2xl mx-auto bg-neutral-darkGray p-12 rounded-2xl">
          <h3 className="font-serif text-3xl font-bold mb-4 text-white">Vamos conversar?</h3>
          <p className="text-gray-300 mb-8">
            Estou à disposição para ouvir sua história e buscar a melhor solução para o seu problema.
          </p>
          <Button onClick={openModal}>Falar com Dr. Marcelo no WhatsApp</Button>
        </div>
      </div>
    </div>
  );
};

export default About;