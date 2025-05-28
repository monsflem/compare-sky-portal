
export interface TranslationKeys {
  nav: {
    home: string;
    insurance: string;
    electricity: string;
    mobile: string;
    loans: string;
    contact: string;
    login: string;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  categories: {
    title: string;
    subtitle: string;
    insurance: {
      title: string;
      description: string;
    };
    electricity: {
      title: string;
      description: string;
    };
    mobile: {
      title: string;
      description: string;
    };
    loans: {
      title: string;
      description: string;
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
  };
  trust: {
    title: string;
    subtitle: string;
    trusted: {
      title: string;
      description: string;
    };
    unbiased: {
      title: string;
      description: string;
    };
    free: {
      title: string;
      description: string;
    };
  };
  footer: {
    description: string;
    categories: string;
    company: string;
    connect: string;
    about: string;
    privacy: string;
    terms: string;
    contact: string;
    copyright: string;
  };
}

export const translations: Record<string, TranslationKeys> = {
  en: {
    nav: {
      home: "Home",
      insurance: "Insurance",
      electricity: "Electricity", 
      mobile: "Mobile",
      loans: "Loans",
      contact: "Contact",
      login: "Login",
      language: "Language"
    },
    hero: {
      title: "Compare & Save with Prispilot",
      subtitle: "Find the best deals on insurance, electricity, mobile plans, and loans in Norway.",
      cta: "Start Comparing"
    },
    categories: {
      title: "Compare Service Providers",
      subtitle: "Select a category below to compare providers and find the best deal for your needs.",
      insurance: {
        title: "Insurance",
        description: "Compare insurance providers to find the best coverage at competitive rates."
      },
      electricity: {
        title: "Electricity", 
        description: "Find the best electricity rates and providers with transparent pricing."
      },
      mobile: {
        title: "Mobile",
        description: "Compare mobile plans and find the best coverage for your needs."
      },
      loans: {
        title: "Loans",
        description: "Find the best loan rates and terms from Norway's leading banks."
      }
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Our comparison platform makes it easy to find and compare the best service providers in Norway.",
      step1: {
        title: "Choose a Category",
        description: "Select from insurance, electricity, mobile plans, or loans to start comparing."
      },
      step2: {
        title: "Compare Providers", 
        description: "View side-by-side comparisons of prices, features, and ratings from top providers."
      },
      step3: {
        title: "Choose the Best Deal",
        description: "Select the provider that best meets your needs and budget, and get connected directly."
      }
    },
    trust: {
      title: "Why Choose Prispilot?",
      subtitle: "We're committed to providing accurate, up-to-date information to help you make the best decision.",
      trusted: {
        title: "Trusted Information",
        description: "Our data is updated regularly to ensure you have access to the most accurate information."
      },
      unbiased: {
        title: "Unbiased Comparisons", 
        description: "We provide objective comparisons to help you make informed decisions without any bias."
      },
      free: {
        title: "Completely Free",
        description: "Our service is 100% free to use, with no hidden fees or charges for comparing providers."
      }
    },
    footer: {
      description: "Find and compare the best providers for insurance, electricity, mobile plans, and loans in Norway.",
      categories: "Categories",
      company: "Company", 
      connect: "Connect",
      about: "About Us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
      copyright: "All rights reserved."
    }
  },
  no: {
    nav: {
      home: "Hjem",
      insurance: "Forsikring",
      electricity: "Strøm",
      mobile: "Mobil", 
      loans: "Lån",
      contact: "Kontakt",
      login: "Logg inn",
      language: "Språk"
    },
    hero: {
      title: "Sammenlign & Spar med Prispilot",
      subtitle: "Finn de beste tilbudene på forsikring, strøm, mobilabonnement og lån i Norge.",
      cta: "Start sammenligning"
    },
    categories: {
      title: "Sammenlign Tjenesteleverandører",
      subtitle: "Velg en kategori nedenfor for å sammenligne leverandører og finne det beste tilbudet for dine behov.",
      insurance: {
        title: "Forsikring",
        description: "Sammenlign forsikringsleverandører for å finne best dekning til konkurransedyktige priser."
      },
      electricity: {
        title: "Strøm",
        description: "Finn de beste strømprisene og leverandørene med transparent prising."
      },
      mobile: {
        title: "Mobil", 
        description: "Sammenlign mobilabonnement og finn best dekning for dine behov."
      },
      loans: {
        title: "Lån",
        description: "Finn de beste lånerentene og vilkårene fra Norges ledende banker."
      }
    },
    howItWorks: {
      title: "Slik Fungerer Det",
      subtitle: "Vår sammenligningsplattform gjør det enkelt å finne og sammenligne de beste tjenesteleverandørene i Norge.",
      step1: {
        title: "Velg en Kategori",
        description: "Velg blant forsikring, strøm, mobilabonnement eller lån for å starte sammenligningen."
      },
      step2: {
        title: "Sammenlign Leverandører",
        description: "Se side-ved-side sammenligninger av priser, funksjoner og vurderinger fra topp leverandører."
      },
      step3: {
        title: "Velg Beste Tilbud",
        description: "Velg leverandøren som best møter dine behov og budsjett, og bli koblet til direkte."
      }
    },
    trust: {
      title: "Hvorfor Velge Prispilot?",
      subtitle: "Vi er forpliktet til å gi nøyaktig, oppdatert informasjon for å hjelpe deg med å ta den beste beslutningen.",
      trusted: {
        title: "Pålitelig Informasjon",
        description: "Våre data oppdateres regelmessig for å sikre at du har tilgang til den mest nøyaktige informasjonen."
      },
      unbiased: {
        title: "Objektive Sammenligninger",
        description: "Vi gir objektive sammenligninger for å hjelpe deg med å ta informerte beslutninger uten bias."
      },
      free: {
        title: "Helt Gratis",
        description: "Vår tjeneste er 100% gratis å bruke, uten skjulte avgifter eller kostnader for å sammenligne leverandører."
      }
    },
    footer: {
      description: "Finn og sammenlign de beste leverandørene for forsikring, strøm, mobilabonnement og lån i Norge.",
      categories: "Kategorier",
      company: "Selskap",
      connect: "Koble til",
      about: "Om Oss", 
      privacy: "Personvernregler",
      terms: "Vilkår for Bruk",
      contact: "Kontakt",
      copyright: "Alle rettigheter forbeholdt."
    }
  }
};

export type Language = 'en' | 'no';

export const defaultLanguage: Language = 'no';
