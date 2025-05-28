import React from 'react'
import { Provider } from '../../types'

// Dummy logo-komponenter - bytt ut med ekte importerte SVG React-komponenter
const DNBLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#0033A0" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="24">DNB</text></svg>
const NordeaLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#003366" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="20">Nordea</text></svg>
const SantanderLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#D32F2F" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="20">Santander</text></svg>
const KomplettBankLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#008080" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="16">Komplett Bank</text></svg>
const InstabankLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#FF6600" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="16">Instabank</text></svg>
const BankNorwegianLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#E60000" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="18">BankNorwegian</text></svg>
const YABankLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#0055A4" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="20">yA Bank</text></svg>
const SveaFinansLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#00BFFF" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="18">Svea Finans</text></svg>
const BNBankLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#004B87" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="18">BN Bank</text></svg>
const IkanoBankLogo = () => <svg width="100" height="60"><rect width="100" height="60" fill="#FF9900" /><text x="50%" y="50%" fill="white" alignmentBaseline="middle" textAnchor="middle" fontSize="18">Ikano Bank</text></svg>

// Mapping av navn til logo-komponenter
const providerLogos: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'DNB': DNBLogo,
  'Nordea': NordeaLogo,
  'Santander': SantanderLogo,
  'Komplett Bank': KomplettBankLogo,
  'Instabank': InstabankLogo,
  'Bank Norwegian': BankNorwegianLogo,
  'yA Bank': YABankLogo,
  'Svea Finans': SveaFinansLogo,
  'BN Bank': BNBankLogo,
  'Ikano Bank': IkanoBankLogo,
}

// Din provider data (forkortet her for lesbarhet - lim inn din fulle liste)
export const loanProviders: Provider[] = [
  {
    id: '31',
    name: 'DNB',
    category: 'loans',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/DNB_Logo.svg',
    price: 3.15,
    priceUnit: '% interest',
    rating: 4.7,
    description: 'DNB offers competitive mortgage and personal loan options with flexible terms and fast approval.',
    features: { mortgage: true, personal: true, carLoan: true, studentLoan: true, fixedRate: true, flexibleTerms: true },
    url: 'https://www.dnb.no',
    categoryUrls: { insurance: 'https://www.dnb.no/forsikring', electricity: 'https://www.dnb.no', mobile: 'https://www.dnb.no', loans: 'https://www.dnb.no/lan' },
    priceLastUpdated: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    isLivePrice: false,
    updatedAt: '2023-05-11T14:25:00Z',
  },
  // ... lim inn resten av leverandørene her ...
]

type LoanProvidersListProps = { providers: Provider[] }

export const LoanProvidersList: React.FC<LoanProvidersListProps> = ({ providers }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      {providers.map((provider) => {
        const LogoComponent = providerLogos[provider.name]
        return (
          <div
            key={provider.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              width: 220,
              textAlign: 'center',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '6rem', color: 'currentColor', marginBottom: '1rem' }}>
              {LogoComponent ? <LogoComponent /> : <img src={provider.logo} alt={`${provider.name} logo`} style={{ maxWidth: '100%', maxHeight: 60, objectFit: 'contain' }} />}
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>{provider.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#555', minHeight: 50 }}>{provider.description}</p>
            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>{provider.price} {provider.priceUnit}</p>
            <a href={provider.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'none' }}>
              Besøk nettside
            </a>
          </div>
        )
      })}
    </div>
  )
}
