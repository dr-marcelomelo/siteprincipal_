import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Scale, Briefcase, ShoppingCart } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { STATS, PRACTICE_AREAS, TESTIMONIALS, WHATSAPP_LINK } from '../constants';
import HeroImage from '../assets/fotos/imagem02.webp';
import AboutImage from '../assets/fotos/imagem01.webp';
import HeroBackground from '../assets/fotos/back01.webp';
import WhyChooseUsImage from '../assets/fotos/back03.webp';
import { useLeadModal } from '../context/LeadModalContext';
import LogoIcon from '../assets/logos/ICONE.webp';
import SEO from '../components/SEO';

// Schema.org Structured Data (Organization)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Dr. Marcelo Melo - Advocacia Especializada",
  "url": "https://marcelomelo.adv.br",
  "logo": "https://marcelomelo.adv.br/icon.webp",
  "image": "https://marcelomelo.adv.br/assets/fotos/imagem02.webp",
  "description": "Advocacia especializada em Direito Previdenciário (INSS), Trabalhista, Consumidor e Cível. Atendimento humanizado e estratégico em Manaus - AM.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Mário Ypiranga, 1521",
    "addressLocality": "Manaus",
    "addressRegion": "AM",
    "postalCode": "69050-030", // Example zip
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-92-98468-8656",
    "contactType": "customer service"
  },
  "priceRange": "$$"
};

const Home = () => {
  const { openModal } = useLeadModal();
  return (
    <>
      <SEO
        title="Dr. Marcelo Melo - Advocacia Especializada"
        description="Escritório de advocacia em Manaus especializado em Direito Previdenciário, Trabalhista, Consumidor e Cível. Atendimento humanizado e resultados comprovados."
        canonical="https://marcelomelo.adv.br"
        keywords={[
          "Advogado Manaus", "Direito Previdenciário", "INSS", "Aposentadoria",
          "Direito Trabalhista", "Direito do Consumidor", "Direito Cível",
          "Advocacia Especializada", "Dr. Marcelo Melo"
        ]}
        schema={organizationSchema}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-neutral-deepBlack overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <img src={HeroBackground} alt="Escritório de Advocacia" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left mb-12 md:mb-0">
            <span className="text-gold-text font-bold tracking-widest uppercase text-sm mb-4 block">Defesa Humanizada e Estratégica</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight mb-6">
              Defendemos seus direitos com <span className="text-gold-medium italic">humanidade</span> e estratégia.
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
              Soluções jurídicas claras para problemas complexos. Especialista em Direito Previdenciário, Trabalhista, do Consumidor e Cível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={openModal}>Falar com Dr. Marcelo</Button>
              <Link to="/sobre">
                <Button variant="outline">Conhecer o Escritório</Button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 relative flex justify-center mt-12 md:mt-0">
            {/* Image placeholder for Lawyer */}
            <div className="relative w-64 h-[400px] sm:w-80 sm:h-[500px] md:w-96 md:h-[600px] bg-gray-200 rounded-t-full overflow-hidden shadow-2xl border-b-8 border-gold-medium">
              <img
                src={HeroImage}
                alt="Dr. Marcelo Melo"
                className="w-full h-full object-cover"
                width="384"
                height="600"
                fetchPriority="high"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:-left-4 lg:left-10 bg-neutral-darkGray p-6 shadow-xl rounded-lg max-w-xs border-l-4 border-gold-medium w-[90%] md:w-auto">
              <p className="font-serif text-2xl font-bold text-white">200+</p>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Casos Resolvidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-neutral-darkGray py-16 text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
          {STATS.map((stat, index) => (
            <div key={index} className="py-4 md:py-0 px-4">
              <p className="font-serif text-5xl text-gold-medium font-bold mb-2">{stat.value}</p>
              <p className="text-sm tracking-widest uppercase text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-neutral-mediumGray">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Image Side */}
            <div className="lg:w-1/2 order-1">
              <div className="relative group max-w-md mx-auto">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-medium rounded-lg z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <img
                  src={AboutImage}
                  alt="Dr. Marcelo Melo"
                  className="relative z-10 rounded-lg shadow-2xl w-full grayscale hover:grayscale-0 transition-all duration-500"
                  width="500"
                  height="600"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 z-20 opacity-90 bg-neutral-deepBlack p-0 rounded-lg shadow-lg">
                  <img src={LogoIcon} alt="Logo" className="w-14 h-14 object-contain" />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 order-2">
              <SectionTitle title="Sobre o Dr. Marcelo" subtitle="Excelência e Humanidade" />

              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Muito prazer, sou o <strong>Dr. Marcelo Melo</strong>. Minha jornada no Direito começou com um propósito muito claro: ser a voz daqueles que muitas vezes não são ouvidos.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Com mais de 3 anos de atuação intensa e centenas de casos resolvidos, aprendi que por trás de cada processo existe uma vida, uma família e uma esperança. Não acredito na advocacia fria e distante.
              </p>

              <div className="my-8 p-6 bg-neutral-darkGray border-l-4 border-gold-medium rounded-r-lg">
                <p className="font-serif text-xl italic text-white">
                  "O direito não é apenas sobre leis, é sobre devolver a dignidade e a paz de espírito para as pessoas."
                </p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Aqui, você não é um número de processo; você é alguém que precisa de ajuda, e eu estou aqui para oferecer a melhor solução jurídica possível, com ética e transparência.
              </p>

              <div className="flex gap-4">
                <Link to="/sobre">
                  <Button variant="outline">Ler Biografia Completa</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Summary */}
      <section className="py-24 bg-neutral-deepBlack">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Áreas de Atuação"
            subtitle="Como podemos te ajudar"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.values(PRACTICE_AREAS).map((area) => (
              <div key={area.id} className="group bg-neutral-darkGray p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-gold-light">
                <div className="w-14 h-14 bg-gold-medium/10 text-gold-dark rounded-full flex items-center justify-center mb-6 group-hover:bg-gold-medium group-hover:text-white transition-colors">
                  {area.iconName === 'ShieldCheck' && <Shield size={28} />}
                  {area.iconName === 'Briefcase' && <Briefcase size={28} />}
                  {area.iconName === 'ShoppingCart' && <ShoppingCart size={28} />}
                  {area.iconName === 'Scale' && <Scale size={28} />}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">{area.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed min-h-[80px]">
                  {area.shortDescription}
                </p>
                <Link to={`/area/${area.slug}`} className="inline-flex items-center text-gold-dark font-medium hover:text-gold-medium transition-colors">
                  Saiba mais <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-neutral-deepBlack">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <img src={WhyChooseUsImage} alt="Escritório" className="rounded-lg shadow-xl" width="600" height="400" loading="lazy" />
          </div>
          <div className="md:w-1/2">
            <SectionTitle title="Por que escolher nosso escritório?" subtitle="Diferenciais" />
            <div className="space-y-6">
              {[
                "Atendimento 100% humanizado e sem juridiquês",
                "Transparência total sobre as chances do seu processo",
                "Estratégia personalizada para cada caso",
                "Atualização constante sobre o andamento"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="text-gold-medium mt-1 flex-shrink-0 mr-4" size={24} />
                  <p className="text-lg text-gray-300">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button onClick={openModal}>Agendar Consulta Gratuita</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-deepBlack">
        <div className="container mx-auto px-6">
          <SectionTitle title="O que dizem nossos clientes" subtitle="Depoimentos" centered />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-neutral-darkGray p-8 rounded-2xl shadow-lg border-t-4 border-gold-medium">
                <div className="text-gold-medium text-4xl font-serif mb-4">"</div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  {t.text}
                </p>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gold-text uppercase tracking-wide">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gold-medium">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">
            Não deixe seu direito para depois
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Cada dia conta. Entre em contato agora e vamos analisar seu caso com a atenção que ele merece.
          </p>
          <Button variant="white" onClick={openModal}>Quero ajuda com meu caso</Button>
        </div>
      </section>
    </>
  );
};

export default Home;