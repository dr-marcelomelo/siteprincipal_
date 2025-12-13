import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string[];
    canonical?: string;
    schema?: object;
}

const SEO = ({
    title = "Dr. Marcelo Melo - Advocacia Especializada",
    description = "Advocacia especializada em Direito Previdenciário (INSS), Trabalhista, Consumidor e Cível. Atendimento humanizado e estratégico em Manaus - AM.",
    image = "/icon.webp",
    url = "https://marcelomelo.adv.br",
    keywords = [],
    canonical,
    schema
}: SEOProps) => {
    const fullTitle = title === "Dr. Marcelo Melo - Advocacia Especializada"
        ? title
        : `${title} | Dr. Marcelo Melo`;

    return (
        <Helmet>
            {/* Basic Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
