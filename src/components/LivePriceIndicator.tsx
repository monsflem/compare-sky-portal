
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock, Wifi, WifiOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale';

interface LivePriceIndicatorProps {
  isUpdating: boolean;
  lastUpdate: Date | null;
  error: string | null;
  onRefresh: () => void;
  className?: string;
}

const LivePriceIndicator = ({ 
  isUpdating, 
  lastUpdate, 
  error, 
  onRefresh,
  className = "" 
}: LivePriceIndicatorProps) => {
  const getStatusInfo = () => {
    if (error) {
      return {
        icon: <WifiOff className="h-3 w-3" />,
        text: 'Feil ved oppdatering',
        variant: 'destructive' as const,
        color: 'text-red-700'
      };
    }
    
    if (isUpdating) {
      return {
        icon: <RefreshCw className="h-3 w-3 animate-spin" />,
        text: 'Oppdaterer priser...',
        variant: 'secondary' as const,
        color: 'text-blue-700'
      };
    }
    
    if (lastUpdate) {
      const timeAgo = formatDistanceToNow(lastUpdate, { 
        addSuffix: true, 
        locale: nb 
      });
      return {
        icon: <Wifi className="h-3 w-3" />,
        text: `Oppdatert ${timeAgo}`,
        variant: 'secondary' as const,
        color: 'text-green-700'
      };
    }
    
    return {
      icon: <Clock className="h-3 w-3" />,
      text: 'Venter på oppdatering',
      variant: 'outline' as const,
      color: 'text-gray-700'
    };
  };

  const status = getStatusInfo();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge variant={status.variant} className={`${status.color} flex items-center gap-1`}>
        {status.icon}
        {status.text}
      </Badge>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isUpdating}
        className="h-7 px-2"
      >
        <RefreshCw className={`h-3 w-3 ${isUpdating ? 'animate-spin' : ''}`} />
        <span className="ml-1 hidden sm:inline">Oppdater</span>
      </Button>
    </div>
  );
};

export default LivePriceIndicator;
