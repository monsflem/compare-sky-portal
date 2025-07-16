import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { User, Phone, Mail, Building, UserCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProvider?: {
    id: number;
    navn: string;
    kategori: string;
  } | null;
  preSelectedCategory?: string;
}

interface FormData {
  navn: string;
  telefon: string;
  epost: string;
  brukertype: 'privat' | 'bedrift';
  tjeneste: string;
  leverandor: string;
  samtykke: boolean;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ isOpen, onClose, selectedProvider, preSelectedCategory }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    navn: '',
    telefon: '',
    epost: '',
    brukertype: 'privat',
    tjeneste: '',
    leverandor: '',
    samtykke: false,
  });

  useEffect(() => {
    if (selectedProvider) {
      setFormData(prev => ({
        ...prev,
        tjeneste: selectedProvider.kategori,
        leverandor: selectedProvider.navn
      }));
    } else if (preSelectedCategory) {
      setFormData(prev => ({
        ...prev,
        tjeneste: preSelectedCategory,
        leverandor: ''
      }));
    }
  }, [selectedProvider, preSelectedCategory]);

  const tjenester = [
    'Strøm',
    'Internett', 
    'Mobil',
    'Forsikring',
    'Bank',
    'Lån',
    'Boligalarm',
    'Håndverkere',
    'Renhold'
  ];

  const leverandorer = {
    'Strøm': ['Hafslund', 'Tibber', 'Fortum', 'Fjordkraft', 'Lyse'],
    'Internett': ['Altibox', 'Telenor', 'Telia', 'Get', 'Bredbandsfylket'],
    'Mobil': ['Telenor', 'Telia', 'Ice', 'OneCall', 'MyCall'],
    'Forsikring': ['If', 'Tryg', 'Gjensidige', 'SpareBank 1', 'Fremtind'],
    'Bank': ['DNB', 'Nordea', 'SpareBank 1', 'Handelsbanken', 'Sbanken'],
    'Lån': ['Santander', 'Bank Norwegian', 'Komplett Bank', 'Folkefinans'],
    'Boligalarm': ['Sector Alarm', 'Verisure', 'G4S', 'SecuriNor'],
    'Håndverkere': ['Ikke relevant'],
    'Renhold': ['Ikke relevant']
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && (!formData.navn || !formData.telefon)) {
      toast({
        title: t('quote.validation.fields'),
        description: t('quote.validation.namePhone'),
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !formData.tjeneste) {
      toast({
        title: t('quote.validation.service'),
        description: t('quote.validation.serviceDesc'),
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 3 && !formData.leverandor && !['håndverkere', 'renhold'].includes(formData.tjeneste)) {
      toast({
        title: t('quote.validation.provider'),
        description: t('quote.validation.providerDesc'),
        variant: "destructive"
      });
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formData.samtykke) {
      toast({
        title: t('quote.validation.consent'),
        description: t('quote.validation.consentDesc'),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate form submission since leads table doesn't exist
      console.log('Lead data:', formData);
      
      toast({
        title: t('quote.success.title'),
        description: t('quote.success.desc'),
      });

      // Reset form and close
      setFormData({
        navn: '',
        telefon: '',
        epost: '',
        brukertype: 'privat',
        tjeneste: '',
        leverandor: '',
        samtykke: false,
      });
      setCurrentStep(1);
      onClose();

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('quote.error.title'),
        description: t('quote.error.desc'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="navn" className="flex items-center text-foreground font-medium">
                <User className="mr-2 h-4 w-4" />
                {t('quote.fields.name')}
              </Label>
              <Input
                id="navn"
                value={formData.navn}
                onChange={(e) => handleInputChange('navn', e.target.value)}
                placeholder={t('quote.fields.namePlaceholder')}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="telefon" className="flex items-center text-foreground font-medium">
                <Phone className="mr-2 h-4 w-4" />
                {t('quote.fields.phone')}
              </Label>
              <Input
                id="telefon"
                value={formData.telefon}
                onChange={(e) => handleInputChange('telefon', e.target.value)}
                placeholder={t('quote.fields.phonePlaceholder')}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="epost" className="flex items-center text-foreground font-medium">
                <Mail className="mr-2 h-4 w-4" />
                {t('quote.fields.email')}
              </Label>
              <Input
                id="epost"
                type="email"
                value={formData.epost}
                onChange={(e) => handleInputChange('epost', e.target.value)}
                placeholder={t('quote.fields.emailPlaceholder')}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label className="flex items-center text-foreground font-medium mb-3">
                <UserCheck className="mr-2 h-4 w-4" />
                {t('quote.fields.userType')}
              </Label>
              <ToggleGroup 
                type="single" 
                value={formData.brukertype} 
                onValueChange={(value) => value && handleInputChange('brukertype', value)}
                className="grid w-full grid-cols-2 bg-muted rounded-lg p-1"
              >
                <ToggleGroupItem 
                  value="privat" 
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=off]:text-muted-foreground hover:bg-accent"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{t('quote.fields.private')}</span>
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="bedrift" 
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=off]:text-muted-foreground hover:bg-accent"
                >
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{t('quote.fields.business')}</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-foreground font-medium">{t('quote.service.title')}</Label>
              <Select value={formData.tjeneste} onValueChange={(value) => handleInputChange('tjeneste', value)}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder={t('quote.service.placeholder')} />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {tjenester.map((tjeneste) => (
                    <SelectItem key={tjeneste} value={tjeneste.toLowerCase()}>
                      {tjeneste}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        const currentService = tjenester.find(t => t.toLowerCase() === formData.tjeneste);
        const isServiceWithoutProviders = ['håndverkere', 'renhold'].includes(formData.tjeneste);
        
        if (isServiceWithoutProviders) {
          // Skip step 3 for services without providers
          setCurrentStep(4);
          return null;
        }

        return (
          <div className="space-y-4">
            <div>
              <Label className="text-foreground font-medium">{t('quote.provider.title')}</Label>
              <Select value={formData.leverandor} onValueChange={(value) => handleInputChange('leverandor', value)}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder={t('quote.provider.placeholder')} />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {currentService && leverandorer[currentService]?.map((leverandor) => (
                    <SelectItem key={leverandor} value={leverandor}>
                      {leverandor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 text-foreground">{t('quote.summary.title')}</h4>
              <p className="text-foreground"><strong>Navn:</strong> {formData.navn}</p>
              <p className="text-foreground"><strong>Telefon:</strong> {formData.telefon}</p>
              {formData.epost && <p className="text-foreground"><strong>E-post:</strong> {formData.epost}</p>}
              <p className="text-foreground"><strong>Brukertype:</strong> {formData.brukertype === 'privat' ? 'Privat' : 'Bedrift'}</p>
              <p className="text-foreground"><strong>Tjeneste:</strong> {tjenester.find(t => t.toLowerCase() === formData.tjeneste)}</p>
              {formData.leverandor && formData.leverandor !== 'Ikke relevant' && (
                <p className="text-foreground"><strong>Nåværende leverandør:</strong> {formData.leverandor}</p>
              )}
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="samtykke"
                checked={formData.samtykke}
                onCheckedChange={(checked) => handleInputChange('samtykke', checked as boolean)}
                className="border-border"
              />
              <Label htmlFor="samtykke" className="text-sm text-foreground leading-5">
                {t('quote.consent')}
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {t('quote.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{t('quote.step')} {currentStep} {t('quote.of')} 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              {t('quote.back')}
            </Button>
          )}
          
          {currentStep < 4 ? (
            <Button onClick={handleNext} variant="default" className="ml-auto">
              {t('quote.next')}
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || !formData.samtykke}
              variant="default"
              className="ml-auto"
            >
              {isLoading ? t('quote.submitting') : t('quote.submit')}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteForm;
