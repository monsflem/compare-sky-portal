
import React from 'react';
import { ErrorLog } from '../types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ErrorLogTableProps {
  errorLogs: ErrorLog[];
}

const ErrorLogTable = ({ errorLogs }: ErrorLogTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Source</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {errorLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-medium">{log.source}</TableCell>
            <TableCell>{log.message}</TableCell>
            <TableCell>{new Date(log.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <span 
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  log.isResolved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {log.isResolved ? 'Resolved' : 'Active'}
              </span>
            </TableCell>
            <TableCell>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`item-${log.id}`}>
                  <AccordionTrigger className="text-sky-600 text-sm">View Stack Trace</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-slate-100 p-3 rounded-md text-xs overflow-x-auto">
                      {log.stackTrace}
                    </pre>
                    
                    {log.resolvedAt && (
                      <div className="mt-2 text-xs text-slate-500">
                        Resolved at: {new Date(log.resolvedAt).toLocaleString()}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ErrorLogTable;
