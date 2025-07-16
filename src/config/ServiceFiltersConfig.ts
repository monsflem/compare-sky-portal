interface ServiceFilter {
  value: string;
  label: string;
  description: string;
  nested?: ServiceFilter[];
}

interface ServiceFiltersConfig {
  [key: string]: ServiceFilter[];
}

export const serviceFiltersConfig: ServiceFiltersConfig = {
  mobil: [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle mobilabonnementer'
    },
    {
      value: 'lavpris',
      label: 'Lavpris',
      description: 'Under 300 kr/måned'
    },
    {
      value: 'familie',
      label: 'Familie',
      description: '5-20 GB, perfekt for familier'
    },
    {
      value: 'ubegrenset',
      label: 'Ubegrenset',
      description: 'Ubegrenset data'
    },
    {
      value: 'bedrift',
      label: 'Bedrift',
      description: 'Business-abonnementer'
    }
  ],
  strom: [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle strømavtaler'
    },
    {
      value: 'spot',
      label: 'Spotpris',
      description: 'Variable priser følger markedet'
    },
    {
      value: 'fixed',
      label: 'Fastpris',
      description: 'Fastpris i perioder',
      nested: [
        {
          value: '6',
          label: '6 måneder',
          description: 'Fastpris i 6 måneder'
        },
        {
          value: '12',
          label: '12 måneder',
          description: 'Fastpris i ett år'
        },
        {
          value: '18',
          label: '18 måneder',
          description: 'Fastpris i 18 måneder'
        },
        {
          value: '24',
          label: '24 måneder',
          description: 'Fastpris i to år'
        },
        {
          value: '36',
          label: '36 måneder',
          description: 'Fastpris i tre år'
        }
      ]
    },
    {
      value: 'variabel',
      label: 'Variabel',
      description: 'Variabel pris uten binding'
    },
    {
      value: 'gronn',
      label: 'Grønn strøm',
      description: 'Miljøvennlige alternativer'
    },
    {
      value: 'bolig',
      label: 'Boligstrøm',
      description: 'Strøm til boliger og leiligheter'
    },
    {
      value: 'hytte',
      label: 'Hyttestrøm',
      description: 'Strøm til hytter og fritidsboliger'
    },
    {
      value: 'bedrift',
      label: 'Bedrift',
      description: 'Strøm til bedrifter'
    }
  ],
  internett: [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle internettilbud'
    },
    {
      value: 'fiber',
      label: 'Fiber',
      description: '100+ Mbps fiberbredbånd'
    },
    {
      value: 'adsl',
      label: 'ADSL',
      description: 'Tradisjonelt bredbånd'
    },
    {
      value: 'mobilt',
      label: 'Mobilt bredbånd',
      description: '4G/5G internett'
    },
    {
      value: 'bedrift',
      label: 'Bedrift',
      description: 'Business internett'
    }
  ],
  forsikring: [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle forsikringer'
    },
    {
      value: 'bolig',
      label: 'Bolig',
      description: 'Innbo og husforsikring'
    },
    {
      value: 'kjoretoy',
      label: 'Kjøretøy',
      description: 'Bil, MC og båtforsikring'
    },
    {
      value: 'person',
      label: 'Person',
      description: 'Reise og livsforsikring'
    },
    {
      value: 'dyr_fritid',
      label: 'Dyr & Fritid',
      description: 'Dyreforsikring og fritidsaktiviteter'
    }
  ],
  lan: [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle lånetilbud'
    },
    {
      value: 'forbrukslan',
      label: 'Forbrukslån',
      description: 'Lån til kjøp og oppussing'
    },
    {
      value: 'refinansiering',
      label: 'Refinansiering',
      description: 'Samle gjeld med lavere rente'
    },
    {
      value: 'boliglan',
      label: 'Boliglån',
      description: 'Finansiering av bolig'
    },
    {
      value: 'billan',
      label: 'Billån',
      description: 'Finansiering av kjøretøy'
    }
  ],
  boligalarm: [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle alarmsystemer'
    },
    {
      value: 'innbrudd',
      label: 'Innbrudd',
      description: 'Innbruddsbeskyttelse'
    },
    {
      value: 'brann',
      label: 'Brann',
      description: 'Branndeteksjon'
    },
    {
      value: 'vannlekkasje',
      label: 'Vannlekkasje',
      description: 'Vannlekkasje-detektor'
    },
    {
      value: 'kamera',
      label: 'Kamera',
      description: 'Overvåkningskameraer'
    },
    {
      value: 'smartlås',
      label: 'Smart',
      description: 'Smartlås og hjemmeautomatisering'
    }
  ],
  'tv-pakker': [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle TV-pakker'
    },
    {
      value: 'standard',
      label: 'Standard TV',
      description: 'Grunnleggende kanaler'
    },
    {
      value: 'streaming',
      label: 'Streaming',
      description: 'Strømmetjenester inkludert'
    },
    {
      value: 'sport',
      label: 'Sport TV',
      description: 'Inkluderer sportskanaler'
    },
    {
      value: 'flexible',
      label: 'Fleksibel',
      description: 'Velg selv kanaler'
    },
    {
      value: 'cabin',
      label: 'Hytte/Fritid',
      description: 'Hytte og fritidsløsninger'
    },
    {
      value: 'combo',
      label: 'Kombi-pakker',
      description: 'TV + Internett + Telefon'
    },
    {
      value: 'extras',
      label: 'Tillegg',
      description: 'Ekstrapakker og tillegg'
    }
  ],
  handverkere: [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle håndverkere'
    },
    {
      value: 'renovation',
      label: 'Renovering',
      description: 'Oppussing og ombygging'
    },
    {
      value: 'electrical',
      label: 'Elektriker',
      description: 'Elektriske installasjoner'
    },
    {
      value: 'plumbing',
      label: 'Rørlegger',
      description: 'VVS-arbeider og reparasjoner'
    },
    {
      value: 'painting',
      label: 'Maler',
      description: 'Malingsarbeider inne og ute'
    }
  ],
  renhold: [
    {
      value: 'all',
      label: 'Alle',
      description: 'Vis alle rengjøringstyper'
    },
    {
      value: 'bolig',
      label: 'Bolig',
      description: 'Hjemmerengjøring'
    },
    {
      value: 'kontor',
      label: 'Kontor',
      description: 'Kontorrenhold'
    },
    {
      value: 'storrengjoring',
      label: 'Storrengjøring',
      description: 'Grundig rengjøring'
    },
    {
      value: 'fast_renhold',
      label: 'Fast renhold',
      description: 'Regelmessig rengjøring'
    },
    {
      value: 'flytterengjoring',
      label: 'Flytterengjøring',
      description: 'Rengjøring ved flytting'
    }
  ]
};

export const getServiceFilters = (serviceSlug: string): ServiceFilter[] => {
  return serviceFiltersConfig[serviceSlug] || [];
};
