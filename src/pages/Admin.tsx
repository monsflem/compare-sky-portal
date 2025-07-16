
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import AdminDataManager from '@/components/AdminDataManager';

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration since leads and providers tables don't exist
  const mockLeads = [
    {
      id: '1',
      navn: 'Ola Nordmann',
      telefon: '12345678',
      epost: 'ola@example.com',
      brukertype: 'privat',
      tjeneste: 'mobil',
      leverandor: 'Telenor',
      samtykke: true,
      created_at: new Date().toISOString()
    }
  ];

  const mockProviders = [
    { id: 1, navn: 'Telenor', kategori: 'mobil', log_url: 'https://telenor.no' },
    { id: 2, navn: 'Telia', kategori: 'mobil', log_url: 'https://telia.no' },
    { id: 3, navn: 'Ice', kategori: 'mobil', log_url: 'https://ice.no' }
  ];

  const distributeToProviders = async (leadId: string, category: string) => {
    try {
      // Get relevant providers for this category
      const relevantProviders = mockProviders.filter(p => 
        p.kategori?.toLowerCase() === category.toLowerCase()
      );

      if (relevantProviders.length === 0) {
        toast({
          title: "Ingen leverandører",
          description: `Ingen leverandører funnet for kategori: ${category}`,
          variant: "destructive"
        });
        return;
      }

      // Simulate distribution (in a real app, this would send emails/API calls)
      console.log(`Distributing lead ${leadId} to providers:`, relevantProviders);
      
      toast({
        title: "Lead distribuert",
        description: `Lead sendt til ${relevantProviders.length} leverandører i kategorien ${category}`,
      });

    } catch (error) {
      console.error('Error distributing lead:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke distribuere lead",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Administrer leads, leverandører og prisdata</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Oversikt</TabsTrigger>
            <TabsTrigger value="mobile">Mobil</TabsTrigger>
            <TabsTrigger value="power">Strøm</TabsTrigger>
            <TabsTrigger value="internet">Internett</TabsTrigger>
            <TabsTrigger value="insurance">Forsikring</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Totale Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">{mockLeads.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Nye Leads (i dag)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    {mockLeads.filter(lead => {
                      const today = new Date().toDateString();
                      const leadDate = new Date(lead.created_at).toDateString();
                      return today === leadDate;
                    }).length}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Leverandører</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-orange-600">{mockProviders.length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Providers Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Leverandører</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockProviders.map((provider) => (
                    <div key={provider.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{provider.navn}</h3>
                      <p className="text-sm text-gray-600 mb-2">{provider.kategori}</p>
                      {provider.log_url && (
                        <a 
                          href={provider.log_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Besøk nettside →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mobile">
            <AdminDataManager category="mobile" />
          </TabsContent>

          <TabsContent value="power">
            <AdminDataManager category="power" />
          </TabsContent>

          <TabsContent value="internet">
            <AdminDataManager category="internet" />
          </TabsContent>

          <TabsContent value="insurance">
            <AdminDataManager category="insurance" />
          </TabsContent>

          <TabsContent value="leads">
            {/* Leads Table */}
            <Card>
              <CardHeader>
                <CardTitle>Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Navn</th>
                        <th className="text-left p-2">Telefon</th>
                        <th className="text-left p-2">Tjeneste</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Dato</th>
                        <th className="text-left p-2">Handlinger</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLeads.map((lead) => (
                        <tr key={lead.id} className="border-b">
                          <td className="p-2">{lead.navn}</td>
                          <td className="p-2">{lead.telefon}</td>
                          <td className="p-2">
                            <Badge variant="secondary">
                              {lead.tjeneste || 'Ikke spesifisert'}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Badge variant={lead.brukertype === 'bedrift' ? 'default' : 'outline'}>
                              {lead.brukertype}
                            </Badge>
                          </td>
                          <td className="p-2">
                            {new Date(lead.created_at).toLocaleDateString('no-NO')}
                          </td>
                          <td className="p-2">
                            {lead.tjeneste && (
                              <Button
                                size="sm"
                                onClick={() => distributeToProviders(lead.id, lead.tjeneste!)}
                              >
                                Distribuer
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {mockLeads.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Ingen leads ennå
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
