
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormField {
  key: string;
  label: string;
  type: string;
  required?: boolean;
}

interface AdminDataFormProps {
  category: string;
  editingItem: any;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  formFields: FormField[];
}

const AdminDataForm: React.FC<AdminDataFormProps> = ({
  category,
  editingItem,
  onSubmit,
  onCancel,
  formFields
}) => {
  const [formData, setFormData] = useState(editingItem || {});

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{editingItem ? 'Rediger element' : 'Legg til nytt element'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map(field => (
              <div key={field.key} className="space-y-2">
                <Label>{field.label} {field.required && '*'}</Label>
                <Input
                  type={field.type}
                  value={formData[field.key] || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value
                  }))}
                  required={field.required}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="submit">
              {editingItem ? 'Oppdater' : 'Legg til'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Avbryt
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminDataForm;
