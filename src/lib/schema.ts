// Centralized Schema.org structured data generators
// Enhanced for Arabic SEO and Saudi local business visibility

const SITE_URL = "https://keifaldiafa.com";
const SITE_NAME = "كيف الضيافة";
const SITE_NAME_EN = "Keif Al-Diafa";
const PHONE = "+966508252134";
const EMAIL = "info@keifdiafa.com";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description: "شركة سعودية متخصصة في تقديم خدمات الضيافة الفاخرة للمناسبات والفعاليات في جميع مناطق المملكة",
    foundingDate: "2016",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
        areaServed: "SA",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "00:00",
        },
      },
    ],
    sameAs: [
      "https://www.instagram.com/keifaldiafa",
      "https://www.tiktok.com/@keifaldiafa",
      `https://wa.me/966508252134`,
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "خدمات الضيافة الفاخرة",
          description: "قهوة عربية أصيلة، شاي فاخر، عصائر طازجة، مضيفون ومضيفات محترفات",
        },
        areaServed: {
          "@type": "Country",
          name: "Saudi Arabia",
        },
      },
    ],
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodService"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    description:
      "خدمات الضيافة الفاخرة في المملكة العربية السعودية - قهوة سعودية أصيلة، شاي فاخر، مضيفون ومضيفات محترفات، تقديمات راقية",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    image: `${SITE_URL}/icon-512.png`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressLocality: "الرياض",
      addressRegion: "منطقة الرياض",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.7136,
      longitude: 46.6753,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "08:00",
      closes: "00:00",
    },
    priceRange: "$$$$",
    servesCuisine: "Arabic Hospitality",
    areaServed: [
      { "@type": "City", name: "الرياض" },
      { "@type": "City", name: "جدة" },
      { "@type": "City", name: "مكة المكرمة" },
      { "@type": "City", name: "المدينة المنورة" },
      { "@type": "City", name: "الدمام" },
      { "@type": "City", name: "الخبر" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    sameAs: [
      "https://www.instagram.com/keifaldiafa",
      "https://www.tiktok.com/@keifaldiafa",
      `https://wa.me/966508252134`,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات الضيافة",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "خدمات رجالية",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "مضيفون محترفون" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "سقّاء زمزم" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "سفرجية" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "خدمات نسائية",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "مضيفات محترفات" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "سفرجيات" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "تقديمات فاخرة",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "قهوة عربية" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "تمور فاخرة" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "حلويات وعصائر" } },
          ],
        },
      ],
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": page.url,
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "ar",
    about: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    serviceType: "Hospitality Services",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      areaServed: "SA",
    },
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    url: SITE_URL,
    inLanguage: "ar",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateImageGallerySchema(images: { url: string; caption: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "معرض أعمال كيف الضيافة",
    description: "صور من فعاليات ومناسبات كيف الضيافة الفاخرة",
    url: `${SITE_URL}/portfolio`,
    image: images.map((img) => ({
      "@type": "ImageObject",
      url: img.url,
      caption: img.caption,
    })),
  };
}
