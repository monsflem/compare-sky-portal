import { DnbLogo, NordeaLogo, SantanderLogo, KomplettBankLogo, InstabankLogo, BankNorwegianLogo, YaBankLogo, SveaFinansLogo, BnBankLogo, IkanoBankLogo } from '@eufemia/assets';
import { Provider } from '../../types';
import {
  DnbLogo,
  NordeaLogo,
  SantanderLogo,
  KomplettBankLogo,
  InstabankLogo,
  BankNorwegianLogo,
  YaBankLogo,
  SveaFinansLogo,
  BnBankLogo,
  IkanoBankLogo,
} from '@eufemia/assets';

export const loanProviders: Provider[] = [
  {
    id: '31',
    name: 'DNB',
    category: 'loans',
    logo: DnbLogo,  // React-komponent, ikke URL
    price: 3.15,
    priceUnit: '% interest',
    rating: 4.7,
    description: 'DNB offers competitive mortgage and personal loan options with flexible terms and fast approval.',
    features: {
      mortgage: true,
      personal: true,
      carLoan: true,
      studentLoan: true,
      fixedRate: true,
      flexibleTerms: true,
    },
    url: 'https://www.dnb.no',
    categoryUrls: {
      insurance: 'https://www.dnb.no/forsikring',
      electricity: 'https://www.dnb.no',
      mobile: 'https://www.dnb.no',
      loans: 'https://www.dnb.no/lan',
    },
    priceLastUpdated: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    isLivePrice: false,
    updatedAt: '2023-05-11T14:25:00Z',
  },
  {
    id: '32',
    name: 'Nordea',
    category: 'loans',
    logo: NordeaLogo,
    price: 3.25,
    priceUnit: '% interest',
    rating: 4.5,
    description: 'Nordea provides a range of loan products with competitive rates and excellent customer service.',
    features: {
      mortgage: true,
      personal: true,
      carLoan: true,
      studentLoan: false,
      fixedRate: true,
      flexibleTerms: true,
    },
    url: 'https://www.nordea.no',
    categoryUrls: {
      insurance: 'https://www.nordea.no/forsikring',
      electricity: 'https://www.nordea.no',
      mobile: 'https://www.nordea.no',
      loans: 'https://www.nordea.no/lan',
    },
    priceLastUpdated: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    isLivePrice: false,
    updatedAt: '2023-05-13T11:35:00Z',
  },
  // ... og så videre for de andre leverandørene ...
];
