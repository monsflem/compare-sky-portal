
import { ErrorLog } from '../types';

export const mockErrorLogs: ErrorLog[] = [
  {
    id: '1',
    message: 'Failed to fetch provider data',
    source: 'fetch-providers',
    stackTrace: 'Error: Network request failed\n  at fetchProviders (/functions/fetch-providers.ts:45:7)',
    isResolved: false,
    createdAt: '2023-05-21T08:15:30Z',
    resolvedAt: null,
  },
  {
    id: '2',
    message: 'API rate limit exceeded',
    source: 'fetch-providers',
    stackTrace: 'Error: Too many requests\n  at fetchProviderDetails (/functions/fetch-providers.ts:78:12)',
    isResolved: false,
    createdAt: '2023-05-22T10:30:45Z',
    resolvedAt: null,
  },
  {
    id: '3',
    message: 'Invalid provider data format',
    source: 'fetch-providers',
    stackTrace: 'Error: Unexpected token in JSON\n  at parseProviderData (/functions/fetch-providers.ts:112:9)',
    isResolved: true,
    createdAt: '2023-05-18T14:20:15Z',
    resolvedAt: '2023-05-19T09:10:22Z',
  },
  {
    id: '4',
    message: 'Database connection error',
    source: 'auto_resolve_errors',
    stackTrace: 'Error: Connection timed out\n  at executeQuery (/functions/auto_resolve_errors.ts:28:5)',
    isResolved: false,
    createdAt: '2023-05-23T16:45:10Z',
    resolvedAt: null,
  },
  {
    id: '5',
    message: 'Provider API authentication failed',
    source: 'fetch-providers',
    stackTrace: 'Error: Invalid API key\n  at authenticateRequest (/functions/fetch-providers.ts:32:11)',
    isResolved: false,
    createdAt: '2023-05-24T11:25:30Z',
    resolvedAt: null,
  },
];
