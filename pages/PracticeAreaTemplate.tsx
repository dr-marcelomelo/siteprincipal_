import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Check, ArrowRight, Scale, Shield } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { PRACTICE_AREAS, WHATSAPP_LINK } from '../constants';
import { useLeadModal } from '../context/LeadModalContext';
import SEO from '../components/SEO';

const PracticeAreaTemplate = () => {
  const { openModal } = useLeadModal();
  const { slug } = useParams<{ slug: string }>();
  const content = Object.values(PRACTICE_AREAS).find(area => area.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!content) {
    return <Navigate to="/" replace />;
  }

  // Schema.org Structured Data (Service)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": content.title,
    "provider": {
      "@type": "LegalService",
      "name": "Dr. Marcelo Melo - Advocacia Especializada"
    },
    "areaServed": {
      "@type": "City",
      "name": "Manaus"
    },
    "description": content.shortDescription,
    "url": `https://marcelomelo.adv.br/area/${content.slug}`
  };

  return (
    <div className="bg-neutral-deepBlack">
      <SEO
        title={`${content.title} - Dr. Marcelo Melo`}
        description={content.shortDescription}
        image={content.heroImage}
        canonical={`https://marcelomelo.adv.br/area/${content.slug}`}
        keywords={content.keywords}
        schema={serviceSchema}
      />
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={content.heroImage}
            alt={content.title}
            className="w-full h-full object-cover brightness-[0.25]"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-gold-medium tracking-[0.3em] uppercase text-sm font-bold mb-4 block">Área de Atuação</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">{content.title}</h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">{content.shortDescription}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">

        {/* Intro & What is it */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <SectionTitle title={`Entenda o ${content.title}`} subtitle="Introdução" />
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {content.intro}
            </p>
            <div className="bg-neutral-darkGray p-6 rounded-lg border-l-4 border-gold-medium">
              <h4 className="font-bold text-white mb-2">O que é?</h4>
              <p className="text-gray-400">{content.whatIsIt}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {/* Dynamic Illustration based on Area - represented by blocks */}
            <div className="grid grid-cols-2 gap-4">
              {/* Block 1: Direito */}
              <div className="bg-neutral-darkGray border border-neutral-800 p-6 rounded-2xl h-48 flex flex-col justify-end transition-all duration-300 hover:border-gold-medium/50 group">
                <Scale size={32} className="text-gold-dark mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-gold-medium font-serif text-4xl font-bold">Direito</span>
              </div>

              {/* Block 2: Justiça */}
              <div className="bg-gradient-to-br from-gold-medium to-gold-dark p-6 rounded-2xl h-48 flex flex-col justify-end text-neutral-deepBlack shadow-lg">
                <Shield size={32} className="text-neutral-deepBlack/40 mb-4" />
                <span className="font-serif text-4xl font-bold">Justiça</span>
              </div>

              {/* Block 3: Slogan */}
              <div className="bg-neutral-deepBlack p-8 rounded-2xl h-auto flex items-center col-span-2 border border-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-medium/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <p className="text-gray-300 font-medium text-lg relative z-10">
                  Focado em resolver o <span className="text-gold-medium font-bold text-xl">seu</span> problema de forma ágil e humanizada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Cases */}
        <div className="mb-24">
          <SectionTitle title="Principais Casos Atendidos" subtitle="Serviços" centered />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.commonCases.map((item, idx) => (
              <div key={idx} className="bg-neutral-darkGray p-8 rounded-xl border border-neutral-800 hover:border-gold-medium shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist - "Você se identifica?" */}
        <div className="bg-neutral-darkGray text-white rounded-3xl p-8 md:p-16 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-medium/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Você se identifica com alguma dessas situações?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
              {content.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start group">
                  <div className="bg-gold-medium/10 rounded-full p-2 mr-4 flex-shrink-0 group-hover:bg-gold-medium transition-colors duration-300">
                    <Check size={18} className="text-gold-medium group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300 pt-1 border-b border-gray-800 pb-4 w-full">{item}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="mb-6 text-gold-light font-medium italic">Se você marcou "sim" para qualquer uma das opções, nós podemos ajudar.</p>
            </div>
          </div>
        </div>

        {/* How we help & CTA */}
        <div className="flex flex-col md:flex-row items-center gap-12 bg-neutral-darkGray p-8 md:p-12 rounded-2xl border border-gold-light/30">
          <div className="md:w-2/3">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-white">Como podemos resolver isso para você</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {content.howWeHelp}
            </p>
            <p className="font-medium text-white">
              Não enfrente a burocracia ou grandes empresas sozinho. Tenha um especialista ao seu lado.
            </p>
          </div>
          <div className="md:w-1/3 text-center md:text-right">
            <Button onClick={openModal} className="w-full md:w-auto shadow-xl">
              Falar agora com Dr. Marcelo
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PracticeAreaTemplate;