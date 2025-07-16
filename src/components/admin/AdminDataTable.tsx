
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface AdminDataTableProps {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string | number) => void;
  category: string;
}

const AdminDataTable: React.FC<AdminDataTableProps> = ({
  data,
  onEdit,
  onDelete,
  category
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Navn/Produkt</th>
                <th className="text-left p-4">Leverandør</th>
                <th className="text-left p-4">Pris</th>
                <th className="text-left p-4">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">{item.id}</td>
                  <td className="p-4">
                    {item.product_name || item.plan || item.loan_type || 'N/A'}
                  </td>
                  <td className="p-4">
                    {item.operator || item.provider || item.supplier_name || 'N/A'}
                  </td>
                  <td className="p-4">
                    {item.price_nok || item.price || item.monthly_premium || item.monthly_price || 'N/A'}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="text-center p-8 text-gray-500">
              Ingen data funnet for {category}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDataTable;
