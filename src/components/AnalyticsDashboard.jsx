import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Calendar, 
  BarChart3, PieChart as PieChartIcon, Activity, Target
} from 'lucide-react'
import '../App.css'

// Sample data based on the actual Excel structure
const salesData = [
  { date: '2024-06-01', revenue: 582.98, tips: 82.44, transactions: 8, staff: 'S01' },
  { date: '2024-06-02', revenue: 445.20, tips: 67.30, transactions: 6, staff: 'S01' },
  { date: '2024-06-03', revenue: 678.45, tips: 95.20, transactions: 10, staff: 'S02' },
  { date: '2024-06-04', revenue: 523.67, tips: 78.90, transactions: 7, staff: 'S01' },
  { date: '2024-06-05', revenue: 789.23, tips: 118.40, transactions: 12, staff: 'S03' },
  { date: '2024-06-06', revenue: 634.56, tips: 89.70, transactions: 9, staff: 'S02' },
  { date: '2024-06-07', revenue: 456.78, tips: 68.50, transactions: 6, staff: 'S01' }
]

const staffPerformance = [
  { name: 'S01', revenue: 1562.43, tips: 229.74, transactions: 21, percentage: 35 },
  { name: 'S02', revenue: 1312.01, tips: 184.90, transactions: 19, percentage: 30 },
  { name: 'S03', revenue: 1045.67, tips: 156.30, transactions: 15, percentage: 25 },
  { name: 'S04', revenue: 678.90, tips: 98.40, transactions: 10, percentage: 10 }
]

const hourlyData = [
  { hour: '9:00', revenue: 45.20, transactions: 2 },
  { hour: '10:00', revenue: 78.50, transactions: 3 },
  { hour: '11:00', revenue: 123.40, transactions: 5 },
  { hour: '12:00', revenue: 234.60, transactions: 8 },
  { hour: '13:00', revenue: 198.70, transactions: 7 },
  { hour: '14:00', revenue: 156.80, transactions: 6 },
  { hour: '15:00', revenue: 189.30, transactions: 7 },
  { hour: '16:00', revenue: 167.90, transactions: 6 },
  { hour: '17:00', revenue: 145.20, transactions: 5 },
  { hour: '18:00', revenue: 98.40, transactions: 3 }
]

const paymentMethods = [
  { name: 'Credit Card', value: 45, amount: 2456.78 },
  { name: 'Debit Card', value: 35, amount: 1890.45 },
  { name: 'Cash', value: 15, amount: 789.23 },
  { name: 'Mobile Pay', value: 5, amount: 234.67 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7days')

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0)
  const totalTips = salesData.reduce((sum, day) => sum + day.tips, 0)
  const totalTransactions = salesData.reduce((sum, day) => sum + day.transactions, 0)
  const avgTransaction = totalRevenue / totalTransactions

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sales Analytics</h2>
        <div className="flex space-x-2">
          {['7days', '30days', '90days', 'year'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === '7days' ? '7 Days' : 
               period === '30days' ? '30 Days' : 
               period === '90days' ? '90 Days' : 'Year'}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tips</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTips.toFixed(2)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgTransaction.toFixed(2)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.3% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Analysis</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue Trend</CardTitle>
                <CardDescription>Revenue and tips over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value, name) => [`$${value.toFixed(2)}`, name === 'revenue' ? 'Revenue' : 'Tips']}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="tips" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Transaction Volume */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Number of transactions per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value) => [value, 'Transactions']}
                    />
                    <Bar dataKey="transactions" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Staff Performance Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Staff Revenue Performance</CardTitle>
                <CardDescription>Revenue generated by each staff member</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={staffPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name === 'revenue' ? 'Revenue' : 'Tips']} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                    <Bar dataKey="tips" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Staff Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Staff Performance Summary</CardTitle>
                <CardDescription>Detailed breakdown by staff member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffPerformance.map((staff) => (
                    <div key={staff.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-blue-600">{staff.name}</span>
                        </div>
                        <div>
                          <p className="font-medium">${staff.revenue.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{staff.transactions} transactions</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Tips: ${staff.tips.toFixed(2)}</Badge>
                        <Badge variant="outline">{staff.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Sales Pattern</CardTitle>
              <CardDescription>Revenue and transaction patterns throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
                <CardDescription>Breakdown of payment methods used</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Payment Methods Details */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Details</CardTitle>
                <CardDescription>Revenue breakdown by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div key={method.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.value}% of transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${method.amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered insights based on your sales data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Peak Performance</span>
              </div>
              <p className="text-sm text-green-700">
                Lunch hours (12-2 PM) show highest revenue. Consider adding staff during these periods.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Staff Optimization</span>
              </div>
              <p className="text-sm text-blue-700">
                S01 is your top performer. Consider training other staff using their techniques.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Growth Opportunity</span>
              </div>
              <p className="text-sm text-yellow-700">
                Evening sales are lower. Consider promotional offers for 5-8 PM.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsDashboard

