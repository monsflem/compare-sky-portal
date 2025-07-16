import { FilterConfig } from './FilterConfig';
import { getUniqueProviders, getUniqueLoanTypes, getUniqueInsuranceTypes } from './FilterConfig';

export const getFilterConfigs = (category: string, providers: any[] = [], offers: any[] = [], t?: (key: string) => string): FilterConfig[] => {
  // Fallback function if t is not provided
  const translate = t || ((key: string) => key);
  
  switch (category) {
    case 'mobil':
      return [
        {
          type: 'select',
          key: 'operator',
          label: translate('filters.labels.operator'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'price',
          label: translate('filters.labels.price'),
          min: 0,
          max: 1000,
          step: 50
        },
        {
          type: 'select',
          key: 'data_category',
          label: translate('filters.labels.data_category'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'small', label: translate('filters.options.dataSmall') },
            { value: 'medium', label: translate('filters.options.dataMedium') },
            { value: 'large', label: translate('filters.options.dataLarge') },
            { value: 'unlimited', label: translate('filters.options.dataUnlimited') }
          ]
        }
      ];
    
    case 'strom':
      return [
        {
          type: 'select',
          key: 'supplier_name',
          label: translate('filters.labels.supplier_name'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'search',
          key: 'municipality',
          label: translate('filters.labels.municipality'),
          placeholder: translate('filters.options.search')
        },
        {
          type: 'range',
          key: 'price',
          label: translate('filters.labels.priceElectricity'),
          min: 0,
          max: 200,
          step: 5
        },
        {
          type: 'select',
          key: 'contract_length',
          label: translate('filters.labels.contract_length'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'spot', label: translate('filters.options.spot') },
            { value: '12', label: translate('filters.options.months12') },
            { value: '24', label: translate('filters.options.months24') },
            { value: '36', label: translate('filters.options.months36') }
          ]
        }
      ];
    
    case 'internett':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'speed',
          label: translate('filters.labels.speed'),
          min: 10,
          max: 1000,
          step: 10
        },
        {
          type: 'range',
          key: 'price',
          label: translate('filters.labels.price'),
          min: 0,
          max: 1000,
          step: 50
        }
      ];
    
    case 'forsikring':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'select',
          key: 'insurance_type',
          label: translate('filters.labels.insurance_type'),
          options: [
            { value: 'all', label: translate('filters.options.allTypes') },
            ...getUniqueInsuranceTypes(offers).slice(1)
          ]
        },
        {
          type: 'range',
          key: 'monthly_premium',
          label: translate('filters.labels.monthly_premium'),
          min: 0,
          max: 2000,
          step: 100
        }
      ];
    
    case 'lan':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'effective_rate',
          label: translate('filters.labels.effective_rate'),
          min: 0,
          max: 30,
          step: 0.5
        }
      ];
    
    case 'boligalarm':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'monthly_price',
          label: translate('filters.labels.monthly_price'),
          min: 0,
          max: 1000,
          step: 50
        },
        {
          type: 'select',
          key: 'plan_type',
          label: translate('filters.labels.plan_type'),
          options: [
            { value: 'all', label: translate('filters.options.allPlans') },
            { value: 'basic', label: translate('filters.options.planBasic') },
            { value: 'standard', label: translate('filters.options.planStandard') },
            { value: 'premium', label: translate('filters.options.planPremium') }
          ]
        },
        {
          type: 'select',
          key: 'alarm_types',
          label: translate('filters.labels.alarm_types'),
          options: [
            { value: 'all', label: translate('filters.options.allTypes') },
            { value: 'innbrudd', label: 'Innbrudd' },
            { value: 'brann', label: 'Brann' },
            { value: 'vannlekkasje', label: 'Vannlekkasje' },
            { value: 'kamera', label: 'Kamera' },
            { value: 'smartlås', label: 'Smart' }
          ]
        },
        {
          type: 'select',
          key: 'installation_type',
          label: translate('filters.labels.installation_type'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'professional', label: translate('filters.options.installProfessional') },
            { value: 'diy', label: translate('filters.options.installDIY') }
          ]
        },
        {
          type: 'select',
          key: 'response_service',
          label: translate('filters.labels.response_service'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'with_guard', label: translate('filters.options.responseWithGuard') },
            { value: 'without_guard', label: translate('filters.options.responseWithoutGuard') }
          ]
        },
        {
          type: 'select',
          key: 'smart_features',
          label: translate('filters.labels.smart_features'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'app_control', label: translate('filters.options.appControl') },
            { value: 'google_home', label: translate('filters.options.googleHome') },
            { value: 'alexa', label: translate('filters.options.alexa') },
            { value: 'apple_homekit', label: translate('filters.options.appleHomeKit') }
          ]
        }
      ];

    case 'tv-pakker':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'monthly_price',
          label: translate('filters.labels.monthly_price'),
          min: 0,
          max: 1000,
          step: 50
        },
        {
          type: 'range',
          key: 'channels_count',
          label: translate('filters.labels.channels_count'),
          min: 0,
          max: 200,
          step: 10
        }
      ];

    case 'handverkere':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'hourly_rate',
          label: translate('filters.labels.hourly_rate'),
          min: 200,
          max: 1500,
          step: 50
        },
        {
          type: 'select',
          key: 'service_type',
          label: translate('filters.labels.service_type'),
          options: [
            { value: 'all', label: translate('filters.options.allServices') },
            { value: 'renovation', label: translate('filters.options.serviceRenovation') },
            { value: 'repair', label: translate('filters.options.serviceRepair') },
            { value: 'electrical', label: translate('filters.options.serviceElectrical') },
            { value: 'plumbing', label: translate('filters.options.servicePlumbing') },
            { value: 'painting', label: translate('filters.options.servicePainting') }
          ]
        },
        {
          type: 'select',
          key: 'certification',
          label: translate('filters.labels.certification'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'true', label: translate('filters.options.certified') },
            { value: 'false', label: translate('filters.options.notCertified') }
          ]
        }
      ];

    case 'renhold':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'hourly_rate',
          label: translate('filters.labels.hourly_rate'),
          min: 200,
          max: 800,
          step: 25
        },
        {
          type: 'select',
          key: 'service_type',
          label: translate('filters.labels.cleaning_type'),
          options: [
            { value: 'all', label: translate('filters.options.allTypes') },
            { value: 'home_cleaning', label: translate('filters.options.cleaningHome') },
            { value: 'office_cleaning', label: translate('filters.options.cleaningOffice') },
            { value: 'deep_cleaning', label: translate('filters.options.cleaningDeep') },
            { value: 'regular_cleaning', label: translate('filters.options.cleaningRegular') },
            { value: 'moving_cleaning', label: translate('filters.options.cleaningMoving') }
          ]
        },
        {
          type: 'select',
          key: 'equipment_included',
          label: translate('filters.labels.equipment_included'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'true', label: translate('filters.options.equipmentIncluded') },
            { value: 'false', label: translate('filters.options.bringOwnEquipment') }
          ]
        }
      ];
    
    default:
      return [];
  }
};
