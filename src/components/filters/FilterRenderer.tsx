
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { House, Car, CreditCard, ArrowRightLeft } from 'lucide-react';
import { FilterConfig } from './FilterConfig';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterRendererProps {
  config: FilterConfig;
  value: any;
  onValueChange: (value: any) => void;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'house':
      return House;
    case 'car':
      return Car;
    case 'credit-card':
      return CreditCard;
    case 'arrow-right-left':
      return ArrowRightLeft;
    default:
      return null;
  }
};

export const FilterRenderer: React.FC<FilterRendererProps> = ({
  config,
  value,
  onValueChange
}) => {
  const { t } = useLanguage();
  const renderFilter = () => {
    switch (config.type) {
      case 'select':
        return (
          <div className="space-y-3">
            <Label className="text-base font-semibold text-card-foreground">{config.label}</Label>
            <div className="bg-card rounded-xl shadow-sm border border-border p-1">
              <Select value={value || 'all'} onValueChange={onValueChange}>
                <SelectTrigger className="border-0 shadow-none focus:ring-0 text-base bg-transparent">
                  <SelectValue placeholder={t('filters.options.selectProvider')} />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border shadow-xl">
                  {config.options?.map((option) => {
                    const IconComponent = option.icon ? getIconComponent(option.icon) : null;
                    return (
                      <SelectItem key={option.value} value={option.value} className="hover:bg-accent font-medium text-card-foreground">
                        <div className="flex items-center gap-2">
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'range':
        return (
          <div className="space-y-3">
            <Label className="text-base font-semibold text-card-foreground">{config.label}</Label>
            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <Slider
                value={value || [config.min || 0, config.max || 100]}
                onValueChange={onValueChange}
                min={config.min || 0}
                max={config.max || 100}
                step={config.step || 1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-3 font-medium">
                <span>{value ? value[0] : config.min}</span>
                <span>{value ? value[1] : config.max}</span>
              </div>
            </div>
          </div>
        );
      
      case 'search':
        return (
          <div className="space-y-3">
            <Label className="text-base font-semibold text-card-foreground">{config.label}</Label>
            <div className="bg-card rounded-xl shadow-sm border border-border p-1">
              <Input
                value={value || ''}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={config.placeholder}
                className="w-full border-0 shadow-none focus:ring-0 text-base bg-transparent text-card-foreground"
              />
            </div>
            {config.key === 'municipality' && value && value.trim() && (
              <div className="text-sm text-muted-foreground mt-2 font-medium">
                {t('filters.options.searchHint')}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return renderFilter();
};
