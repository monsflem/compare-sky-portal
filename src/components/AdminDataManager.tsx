
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AdminDataForm from './admin/AdminDataForm';
import AdminDataTable from './admin/AdminDataTable';
import { useAdminData } from '@/hooks/useAdminData';

interface AdminDataManagerProps {
  category: string;
}

const AdminDataManager: React.FC<AdminDataManagerProps> = ({ category }) => {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  
  const { data, loading, handleSubmit, handleUpdate, handleDelete } = useAdminData(category);

  const getFormFields = (category: string) => {
    switch (category) {
      case 'mobile':
        return [
          { key: 'operator', label: 'Operatør', type: 'text', required: true },
          { key: 'product_name', label: 'Produktnavn', type: 'text', required: true },
          { key: 'price_nok', label: 'Pris (NOK)', type: 'number', required: true },
          { key: 'data_included_mb', label: 'Data (MB)', type: 'number', required: true },
          { key: 'minutes_included', label: 'Minutter', type: 'number', required: true },
          { key: 'sms_included', label: 'SMS', type: 'number', required: true },
          { key: 'mms_included', label: 'MMS', type: 'number', required: true },
          { key: 'monthly_rate', label: 'Månedlig rate', type: 'number', required: true },
          { key: 'category', label: 'Kategori', type: 'text', required: true },
          { key: 'url', label: 'URL', type: 'url' }
        ];
      
      case 'power':
        return [
          { key: 'supplier_name', label: 'Leverandør', type: 'text', required: true },
          { key: 'product_name', label: 'Produktnavn', type: 'text', required: true },
          { key: 'price', label: 'Pris', type: 'number', required: true },
          { key: 'price_unit', label: 'Prisenhet', type: 'text', required: true },
          { key: 'municipality_name', label: 'Kommune', type: 'text', required: true },
          { key: 'municipality_number', label: 'Kommunenummer', type: 'number' },
          { key: 'contract_length', label: 'Kontraktslengde', type: 'text' },
          { key: 'additional_fees', label: 'Tilleggsavgifter', type: 'number' }
        ];
      
      case 'internet':
        return [
          { key: 'provider', label: 'Leverandør', type: 'text', required: true },
          { key: 'plan', label: 'Plan', type: 'text', required: true },
          { key: 'price', label: 'Pris', type: 'number', required: true },
          { key: 'speed', label: 'Hastighet (Mbps)', type: 'number', required: true },
          { key: 'url', label: 'URL', type: 'url' }
        ];
      
      default:
        return [];
    }
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingItem) {
      await handleUpdate(editingItem.id, formData);
    } else {
      await handleSubmit(formData);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (loading) {
    return <div className="text-center p-4">Laster data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Administrer {category} data</h3>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Legg til nytt
        </Button>
      </div>

      {showForm && (
        <AdminDataForm
          category={category}
          editingItem={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          formFields={getFormFields(category)}
        />
      )}

      <AdminDataTable
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        category={category}
      />
    </div>
  );
};

export default AdminDataManager;
