
import { Provider } from '../types';
import { insuranceProviders } from './providers/insuranceProviders';
import { electricityProviders } from './providers/electricityProviders';
import { mobileProviders } from './providers/mobileProviders';
import { loanProviders } from './providers/loanProviders';

// Combined mock data for all providers
export const mockProviders: Provider[] = [
  ...insuranceProviders,
  ...electricityProviders,
  ...mobileProviders,
  ...loanProviders,
];

// Helper function to get providers by category
export const getProvidersByCategory = (category: string) => {
  return mockProviders.filter(provider => provider.category === category);
};

export const getProviderById = (id: string) => {
  return mockProviders.find(provider => provider.id === id);
};
