import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, centered = false, light = false }) => {
  return (
    <div className={`mb-6 md:mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <span className={`block mb-1 md:mb-2 text-[10px] md:text-sm font-bold tracking-widest uppercase ${light ? 'text-gold-light' : 'text-gold-text'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`font-serif text-xl md:text-4xl lg:text-5xl font-semibold leading-tight ${light ? 'text-white' : 'text-white'}`}>
        {title}
      </h2>
      <div className={`mt-2 md:mt-4 h-0.5 md:h-1 w-12 md:w-20 bg-gold-medium ${centered ? 'mx-auto' : ''} rounded-full`}></div>
    </div>
  );
};

export default SectionTitle;