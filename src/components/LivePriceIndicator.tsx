
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock, Wifi, WifiOff, Zap } from 'lucide-react';
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
        color: 'text-red-700 bg-red-50 border-red-200',
        pulse: false
      };
    }
    
    if (isUpdating) {
      return {
        icon: <RefreshCw className="h-3 w-3 animate-spin" />,
        text: 'Oppdaterer priser...',
        variant: 'secondary' as const,
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        pulse: true
      };
    }
    
    if (lastUpdate) {
      const timeAgo = formatDistanceToNow(lastUpdate, { 
        addSuffix: true, 
        locale: nb 
      });
      const isRecent = Date.now() - lastUpdate.getTime() < 5 * 60 * 1000; // 5 minutes
      
      return {
        icon: isRecent ? <Zap className="h-3 w-3" /> : <Wifi className="h-3 w-3" />,
        text: `Oppdatert ${timeAgo}`,
        variant: 'secondary' as const,
        color: isRecent ? 'text-green-700 bg-green-50 border-green-200 live-indicator' : 'text-slate-700 bg-slate-50 border-slate-200',
        pulse: isRecent
      };
    }
    
    return {
      icon: <Clock className="h-3 w-3" />,
      text: 'Venter på oppdatering',
      variant: 'outline' as const,
      color: 'text-gray-700 bg-gray-50 border-gray-200',
      pulse: false
    };
  };

  const status = getStatusInfo();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Badge 
        variant={status.variant} 
        className={`${status.color} flex items-center gap-2 px-3 py-1 text-xs font-medium transition-all duration-300 ${status.pulse ? 'animate-pulse' : ''}`}
      >
        {status.icon}
        <span className="hidden sm:inline">{status.text}</span>
        <span className="sm:hidden">
          {isUpdating ? 'Oppdaterer...' : error ? 'Feil' : lastUpdate ? 'Live' : 'Venter'}
        </span>
      </Badge>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isUpdating}
        className={`h-8 px-3 transition-all duration-300 hover:shadow-md ${
          isUpdating 
            ? 'bg-blue-50 border-blue-200 text-blue-700' 
            : 'hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700'
        }`}
      >
        <RefreshCw className={`h-3 w-3 ${isUpdating ? 'animate-spin' : ''}`} />
        <span className="ml-1 hidden sm:inline">
          {isUpdating ? 'Oppdaterer' : 'Oppdater'}
        </span>
      </Button>
    </div>
  );
};

export default LivePriceIndicator;
