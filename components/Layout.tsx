import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, Instagram, MapPin, Clock } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_LINK } from '../constants';
import LogoIcon from '../assets/logos/ICONE.webp';
import LogoName from '../assets/logos/NOME.webp';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import LeadCaptureModal from './LeadCaptureModal';
import { useLeadModal } from '../context/LeadModalContext';

const Header = () => {
  const { openModal } = useLeadModal();
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuState(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <nav
        data-state={menuState && 'active'}
        className="w-full px-2 group"
      >
        <div className={cn(
          'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
          isScrolled ? 'bg-neutral-deepBlack/80 max-w-4xl rounded-2xl border border-neutral-800 backdrop-blur-lg lg:px-5 shadow-lg shadow-black/20' : 'bg-transparent'
        )}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo Area */}
            <div className="relative flex w-full justify-center lg:w-auto lg:justify-start">
              <Link to="/" className="flex items-center gap-3 group">
                <img src={LogoIcon} alt="Logo Ícone" className={cn("w-auto object-contain transition-transform group-hover:scale-105", isScrolled ? "h-10 md:h-11" : "h-10 md:h-12")} />
                <img src={LogoName} alt="Dr. Marcelo Melo" className={cn("w-auto object-contain mt-1", isScrolled ? "h-8 md:h-9" : "h-8 md:h-10")} />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 block cursor-pointer p-2 lg:hidden text-white"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            {/* Desktop Links */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex items-center gap-8 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.label} className="relative group">
                    {link.children ? (
                      <div className="flex items-center gap-1 cursor-pointer text-gray-300 hover:text-white transition-colors duration-150 uppercase tracking-wide text-xs font-medium h-full">
                        {link.label}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                        {/* Dropdown */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                          <div className="bg-neutral-darkGray border border-neutral-700 rounded-lg shadow-xl overflow-hidden min-w-[200px]">
                            {link.children.map(child => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className="block px-4 py-3 text-gray-300 hover:bg-neutral-800 hover:text-gold-medium transition-colors border-b border-neutral-800 last:border-0"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={cn(
                          "flex items-center text-gray-300 hover:text-white transition-colors duration-150 uppercase tracking-wide text-xs font-medium h-full",
                          location.pathname === link.path && "text-white font-bold"
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu & CTA */}
            <div className="bg-neutral-darkGray group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-neutral-800 p-6 shadow-2xl shadow-black/50 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden w-full">
                <ul className="space-y-4 text-base">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      {link.children ? (
                        <div className="space-y-2">
                          <span className="text-gold-medium font-bold uppercase text-xs tracking-widest border-b border-neutral-700 pb-1 block">{link.label}</span>
                          <div className="pl-4 space-y-2">
                            {link.children.map(child => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className="block text-gray-300 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          className="block text-gray-300 hover:text-white uppercase font-medium"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  size="sm"
                  onClick={() => {
                    openModal();
                    setMenuState(false);
                  }}
                  className="bg-gold-medium hover:bg-gold-dark text-white rounded-full px-6 shadow-lg shadow-gold-medium/20 transition-all duration-300 hover:shadow-gold-medium/40"
                >
                  <span className="font-bold tracking-wide">Fale Conosco</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  // Flatten links for the footer
  const footerLinks = NAV_LINKS.flatMap(link => link.children ? link.children : [link]);

  return (
    <footer className="bg-neutral-darkGray text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img src={LogoIcon} alt="Logo Ícone" className="h-14 w-auto object-contain" />
              <img src={LogoName} alt="Dr. Marcelo Melo" className="h-10 w-auto object-contain mt-2" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Compromisso, ética e dedicação para resolver seus problemas jurídicos com humanidade e eficiência.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-medium transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold-medium transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif text-xl text-gold-light mb-6">Links Rápidos</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {footerLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-gold-medium transition-colors flex items-center">
                    <span className="mr-2 text-gold-dark">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl text-gold-light mb-6">Contato</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start">
                <MapPin className="text-gold-medium mr-3 mt-1 flex-shrink-0" size={18} />
                <span>AV MARIO YPIRANGA 1521,<br />Manaus - AM</span>
              </li>
              <li className="flex items-center">
                <Clock className="text-gold-medium mr-3 flex-shrink-0" size={18} />
                <span>Seg à Sex: 08:00 às 20:00</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-gold-medium mr-3 flex-shrink-0" size={18} />
                <span>(92) 98468-8656</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-gold-medium mr-3 flex-shrink-0" size={18} />
                <span>contato@marcelomelo.adv.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Dr. Marcelo Melo Advocacia. Todos os direitos reservados.</p>
          <p className="text-gray-400 text-xs">
            Desenvolvido por{' '}
            <a
              href="https://www.kvgroupbr.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors duration-300 font-semibold"
            >
              KV <span className="text-gold-medium font-bold">Group</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-24 flex-grow">
        <Outlet />
      </main>
      <LeadCaptureModal />
      <Footer />
    </div>
  );
};

export default Layout;