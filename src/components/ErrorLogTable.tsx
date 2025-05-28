
import React from 'react';
import { useErrorLogs } from '@/hooks/useSupabaseData';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ErrorLogTable = () => {
  const { data: errorLogs, isLoading, error } = useErrorLogs();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertDescription className="text-red-700">
          Error loading error logs: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!errorLogs || errorLogs.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <AlertDescription className="text-green-700">
          No error logs found. The system is running smoothly!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {errorLogs.map((log) => (
          <div
            key={log.log_id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Badge variant={log.resolved ? "secondary" : "destructive"}>
                  {log.resolved ? "Resolved" : "Active"}
                </Badge>
                <span className="text-sm font-medium text-slate-600">
                  {log.component}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                {new Date(log.occurred_at).toLocaleString()}
              </span>
            </div>
            
            <p className="text-sm text-slate-700 mb-2">
              {log.error_message}
            </p>
            
            {log.retry_count && log.retry_count > 0 && (
              <div className="text-xs text-slate-500">
                Retry attempts: {log.retry_count}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorLogTable;
