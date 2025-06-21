import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  BarChart3, TrendingUp, Users, DollarSign, Calendar, LogIn, 
  Plus, FileText, Download, Settings, Bell, Search
} from 'lucide-react'
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx'
import './App.css'

const [isAuthenticated, setIsAuthenticated] = useState(true)
const [user, setUser] = useState({
  name: 'Local Tester',
  email: 'tester@localhost',
  picture: 'https://via.placeholder.com/40'
})
const [salesData, setSalesData] = useState([
  { id: 1, amount: 100, tip: 10, staff: 'S01', method: 'Cash', date: '2025-06-20' },
  { id: 2, amount: 250, tip: 15, staff: 'S02', method: 'Credit Card', date: '2025-06-19' },
])
const [loading, setLoading] = useState(false)
const [activeTab, setActiveTab] = useState('dashboard')
const [showAddTransaction, setShowAddTransaction] = useState(false)


  // Mock authentication function
  const handleGoogleLogin = async () => {
    setLoading(true)
    // Simulate Google OAuth login
    setTimeout(() => {
      setIsAuthenticated(true)
      setUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        picture: 'https://via.placeholder.com/40'
      })
      setLoading(false)
    }, 1500)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setSalesData([])
    setActiveTab('dashboard')
  }

  // Mock sales data
  useEffect(() => {
    if (isAuthenticated) {
      setSalesData([
        { id: 1, date: '2024-06-20', amount: 170.63, tip: 25.59, service: 'S01', paymentMethod: 'Credit Card' },
        { id: 2, date: '2024-06-19', amount: 157.75, tip: 18.66, service: 'S01', paymentMethod: 'Debit Card' },
        { id: 3, date: '2024-06-18', amount: 254.60, tip: 38.19, service: 'S02', paymentMethod: 'Credit Card' },
        { id: 4, date: '2024-06-17', amount: 189.45, tip: 28.42, service: 'S01', paymentMethod: 'Cash' },
        { id: 5, date: '2024-06-16', amount: 298.75, tip: 44.81, service: 'S03', paymentMethod: 'Credit Card' },
      ])
    }
  }, [isAuthenticated])

  const AddTransactionForm = () => {
    const [formData, setFormData] = useState({
      amount: '',
      tip: '',
      service: '',
      paymentMethod: '',
      date: new Date().toISOString().split('T')[0]
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      const newTransaction = {
        id: salesData.length + 1,
        ...formData,
        amount: parseFloat(formData.amount),
        tip: parseFloat(formData.tip)
      }
      setSalesData([newTransaction, ...salesData])
      setShowAddTransaction(false)
      setFormData({
        amount: '',
        tip: '',
        service: '',
        paymentMethod: '',
        date: new Date().toISOString().split('T')[0]
      })
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
          <CardDescription>Record a new sale manually</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tip">Tip ($)</Label>
                <Input
                  id="tip"
                  type="number"
                  step="0.01"
                  value={formData.tip}
                  onChange={(e) => setFormData({...formData, tip: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="service">Staff Member</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S01">S01</SelectItem>
                    <SelectItem value="S02">S02</SelectItem>
                    <SelectItem value="S03">S03</SelectItem>
                    <SelectItem value="S04">S04</SelectItem>
                    <SelectItem value="S05">S05</SelectItem>
                    <SelectItem value="S06">S06</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Mobile Pay">Mobile Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button type="submit">Add Transaction</Button>
              <Button type="button" variant="outline" onClick={() => setShowAddTransaction(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Enterprise Sales Management</CardTitle>
            <CardDescription>
              Sign in with your Google account to access your sales dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleGoogleLogin} 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Your data is securely stored in Google Drive and accessible only to you.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.amount, 0)
  const totalTips = salesData.reduce((sum, sale) => sum + sale.tip, 0)
  const avgTransaction = salesData.length > 0 ? totalRevenue / salesData.length : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Sales Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tips</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalTips.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +8.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{salesData.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +3 from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${avgTransaction.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +5.1% from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Latest sales data from your Google Sheets
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddTransaction(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.slice(0, 5).map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">${sale.amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{sale.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Tip: ${sale.tip.toFixed(2)}</Badge>
                        <Badge variant="outline">{sale.service}</Badge>
                        <Badge variant="outline">{sale.paymentMethod}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {salesData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions found. Connect your Google Sheets to see data.
                  </div>
                )}
              </CardContent>
            </Card>

            {showAddTransaction && <AddTransactionForm />}
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Transactions</CardTitle>
                    <CardDescription>Complete transaction history</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search transactions..." className="pl-8" />
                    </div>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">${sale.amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{sale.date} • {sale.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Tip: ${sale.tip.toFixed(2)}</Badge>
                        <Badge variant="outline">{sale.service}</Badge>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Sales Report</CardTitle>
                  <CardDescription>Generate daily sales summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staff Performance Report</CardTitle>
                  <CardDescription>Analyze staff performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Summary</CardTitle>
                  <CardDescription>Comprehensive monthly analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Report</CardTitle>
                  <CardDescription>Tax calculations and summaries</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Report</CardTitle>
                  <CardDescription>Create custom date range reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Create Custom</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Export Data</CardTitle>
                  <CardDescription>Download raw data in various formats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">Export CSV</Button>
                    <Button variant="outline" className="w-full">Export Excel</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App

