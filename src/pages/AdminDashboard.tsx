import React, { useState } from 'react';
import Layout from '../components/Layout';
import ErrorLogTable from '../components/ErrorLogTable';
import { useResolveAllErrors } from '@/hooks/useSupabaseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// This is a mock implementation - in a real app, this would be connected to Supabase
const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('errors');
  
  const resolveAllErrorsMutation = useResolveAllErrors();

  // Mock login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        setIsAuthenticated(true);
        toast.success('Successfully logged in');
      } else {
        toast.error('Invalid credentials. Try admin/admin');
      }
    }, 1000);
  };

  const handleResolveAllErrors = () => {
    resolveAllErrorsMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('All errors have been marked as resolved');
      },
      onError: (error) => {
        toast.error('Failed to resolve errors: ' + error.message);
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Please sign in to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-sky-600 hover:bg-sky-700"
                    >
                      Login
                    </Button>
                  </div>
                  <div className="text-center text-sm text-slate-500">
                    <p>Use username: admin, password: admin</p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-900 py-6">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <Tabs defaultValue="errors" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="errors">Error Logs</TabsTrigger>
            <TabsTrigger value="affiliate">Affiliate Clicks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="errors">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Error Logs</CardTitle>
                  <CardDescription>
                    Review and manage system error logs from the self-healing processes
                  </CardDescription>
                </div>
                <Button
                  className="mt-4 sm:mt-0 bg-sky-600 hover:bg-sky-700"
                  onClick={handleResolveAllErrors}
                  disabled={resolveAllErrorsMutation.isPending}
                >
                  {resolveAllErrorsMutation.isPending ? 'Processing...' : 'Mark All as Resolved'}
                </Button>
              </CardHeader>
              <CardContent>
                <ErrorLogTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="affiliate">
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Clicks</CardTitle>
                <CardDescription>
                  Monitor affiliate click data and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-slate-500">
                  <p>Affiliate click tracking will be implemented with additional Supabase tables</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Configure system settings and admin preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Self-Healing Configuration</h3>
                    <p className="text-slate-600 mb-4">Configure the behavior of the self-healing system</p>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Provider Fetch Interval
                          </label>
                          <select className="w-full px-3 py-2 border border-slate-300 rounded-md">
                            <option value="1">Every hour</option>
                            <option value="2">Every 2 hours</option>
                            <option value="6">Every 6 hours</option>
                            <option value="12">Every 12 hours</option>
                            <option value="24">Every 24 hours</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Max Retry Attempts
                          </label>
                          <select className="w-full px-3 py-2 border border-slate-300 rounded-md">
                            <option value="1">1 retry</option>
                            <option value="3">3 retries</option>
                            <option value="5">5 retries</option>
                            <option value="10">10 retries</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-sky-600 mr-2" checked />
                          <span>Auto-resolve errors older than 7 days</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
                    <p className="text-slate-600 mb-4">Configure when and how you receive notifications</p>
                    
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-sky-600 mr-2" checked />
                        <span>Email notifications for critical errors</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-sky-600 mr-2" checked />
                        <span>Daily error summary report</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-sky-600 mr-2" />
                        <span>Affiliate click notifications</span>
                      </label>
                    </div>
                  </div>
                  
                  <Button className="bg-sky-600 hover:bg-sky-700">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
