
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface SpotPriceData {
  area: string;
  price: number;
  change: number;
  color: string;
}

interface ApiSpotPrice {
  price: number;
  change: number;
}

interface ApiResponse {
  NO1?: ApiSpotPrice; // Øst-Norge
  NO2?: ApiSpotPrice; // Sør-Norge
  NO3?: ApiSpotPrice; // Midt-Norge
  NO4?: ApiSpotPrice; // Nord-Norge
  NO5?: ApiSpotPrice; // Vest-Norge
}

const SpotPriceDisplay = () => {
  const [spotPrices, setSpotPrices] = useState<SpotPriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchSpotPrices = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching spot prices from Forbrukerrådet API...');
        
        const response = await fetch('https://strom-api.forbrukerradet.no/spotprice/dayprice/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        console.log('API response:', data);
        
        // Transform the API data to match our structure
        const transformedData: SpotPriceData[] = [
          { 
            area: 'Øst-Norge', 
            price: data.NO1?.price || 0, 
            change: data.NO1?.change || 0, 
            color: 'green' 
          },
          { 
            area: 'Sør-Norge', 
            price: data.NO2?.price || 0, 
            change: data.NO2?.change || 0, 
            color: 'red' 
          },
          { 
            area: 'Midt-Norge', 
            price: data.NO3?.price || 0, 
            change: data.NO3?.change || 0, 
            color: 'purple' 
          }, 
          { 
            area: 'Nord-Norge', 
            price: data.NO4?.price || 0, 
            change: data.NO4?.change || 0, 
            color: 'blue' 
          },
          { 
            area: 'Vest-Norge', 
            price: data.NO5?.price || 0, 
            change: data.NO5?.change || 0, 
            color: 'yellow' 
          }
        ];
        
        setSpotPrices(transformedData);
        setLastUpdated(new Date().toLocaleString('no-NO'));
        console.log('Successfully updated spot prices:', transformedData);
        
      } catch (error) {
        console.error('Error fetching spot prices:', error);
        setError('Kunne ikke laste spotpriser fra API');
        
        // Use fallback data if API fails
        const fallbackData: SpotPriceData[] = [
          { area: 'Øst-Norge', price: 68, change: -10.2, color: 'green' },
          { area: 'Sør-Norge', price: 87, change: -10.3, color: 'red' },
          { area: 'Midt-Norge', price: 12, change: 42.2, color: 'purple' }, 
          { area: 'Nord-Norge', price: 4, change: -50.4, color: 'blue' },
          { area: 'Vest-Norge', price: 31, change: -5.3, color: 'yellow' }
        ];
        setSpotPrices(fallbackData);
        setLastUpdated(new Date().toLocaleString('no-NO') + ' (backup data)');
      } finally {
        setLoading(false);
      }
    };

    fetchSpotPrices();
    
    // Update every hour
    const interval = setInterval(fetchSpotPrices, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dagens strømpriser</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSpinner message="Laster spotpriser..." size="md" />
        </CardContent>
      </Card>
    );
  }

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Dagens strømpriser</span>
            {error && (
              <span className="text-sm text-orange-600 font-normal">
                {error}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="md:flex md:justify-center md:items-center md:gap-12">
            {/* Complete Norge map SVG */}
            <div className="hidden md:block md:w-6/12 lg:w-4/12 xl:w-3/12">
              <svg width="100%" height="100%" viewBox="0 0 300 400" className="transition-all duration-300">
                {/* Nord-Norge (NO4) - Blue */}
                <path d="M150 20 L180 30 L190 50 L185 70 L175 80 L165 75 L155 70 L145 60 L140 40 L150 20 Z" 
                      className={`transition-all duration-300 hover:scale-105 cursor-pointer ${getColorClass('blue')}`} 
                      opacity="0.8" />
                
                {/* Midt-Norge (NO3) - Purple */}
                <path d="M140 80 L175 85 L185 95 L180 120 L170 140 L160 145 L150 140 L140 130 L135 110 L140 80 Z" 
                      className={`transition-all duration-300 hover:scale-105 cursor-pointer ${getColorClass('purple')}`} 
                      opacity="0.8" />
                
                {/* Vest-Norge (NO5) - Yellow */}
                <path d="M120 120 L140 130 L150 140 L145 160 L135 180 L125 185 L115 180 L110 160 L115 140 L120 120 Z" 
                      className={`transition-all duration-300 hover:scale-105 cursor-pointer ${getColorClass('yellow')}`} 
                      opacity="0.8" />
                
                {/* Øst-Norge (NO1) - Green */}
                <path d="M150 140 L180 145 L190 160 L185 180 L175 200 L165 205 L155 200 L150 180 L155 160 L150 140 Z" 
                      className={`transition-all duration-300 hover:scale-105 cursor-pointer ${getColorClass('green')}`} 
                      opacity="0.8" />
                
                {/* Sør-Norge (NO2) - Red */}
                <path d="M135 200 L175 205 L180 220 L175 240 L165 250 L155 245 L145 240 L140 220 L135 200 Z" 
                      className={`transition-all duration-300 hover:scale-105 cursor-pointer ${getColorClass('red')}`} 
                      opacity="0.8" />
              </svg>
            </div>

            {/* Tabell med spotpriser */}
            <div>
              <div className="p-2 flex flex-col cursor-default">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="hidden md:flex px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Område</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spotpris</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endring siste døgn</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {spotPrices.map((area, index) => (
                            <tr key={index} className="transition-all duration-300 hover:bg-gray-50 animate-fade-in">
                              <td className="hidden md:flex px-6 py-4 whitespace-nowrap text-sm md:text-base">
                                <div className={`w-6 h-6 ${getColorClass(area.color)} rounded-full transition-all duration-300 hover:scale-110`}></div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900">{area.area}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
                                <div className="flex gap-2">
                                  <span className="font-semibold text-lg text-blue-600">{area.price.toFixed(1)}</span>
                                  <span className="font-normal text-gray-500 text-sm md:text-base">øre/kWh</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                  {area.change > 0 ? (
                                    <ArrowUp className="fill-current text-red-500 h-4 w-4 animate-pulse" />
                                  ) : (
                                    <ArrowDown className="fill-current text-green-500 h-4 w-4 animate-pulse" />
                                  )}
                                  <span className="font-semibold text-sm md:text-base">{Math.abs(area.change).toFixed(1)}</span>
                                  <span className="font-normal text-gray-500 text-sm md:text-base">%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 text-xs text-gray-400">
                Prisene er inkl. mva. med unntak av Nord-Norge, hvor strøm er unntatt momsplikt.<br />
                Prisene oppdateres hver time. Sist oppdatert {lastUpdated}.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpotPriceDisplay;
