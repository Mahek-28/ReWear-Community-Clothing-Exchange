
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemCard from '@/components/ItemCard';
import { 
  Plus, 
  Star, 
  TrendingUp, 
  Package, 
  Heart,
  Settings,
  MapPin,
  Calendar,
  Award,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    points: 150,
    totalSwaps: 23,
    rating: 4.9,
    memberSince: 'March 2023',
    location: 'Brooklyn, NY'
  });

  const myItems = [
    {
      id: '1',
      title: 'Black Leather Boots',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      category: 'Shoes',
      size: '8',
      condition: 'Good',
      points: 30,
      location: 'Brooklyn, NY',
      uploader: { name: 'Sarah', rating: 4.9 },
      status: 'active'
    },
    {
      id: '2',
      title: 'Cozy Knit Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop',
      category: 'Knitwear',
      size: 'M',
      condition: 'Excellent',
      points: 25,
      location: 'Brooklyn, NY',
      uploader: { name: 'Sarah', rating: 4.9 },
      status: 'pending'
    }
  ];

  const activeSwaps = [
    {
      id: '1',
      type: 'outgoing',
      item: 'Vintage Band T-Shirt',
      otherUser: 'Alex Chen',
      status: 'Pending Response',
      date: '2 days ago'
    },
    {
      id: '2',
      type: 'incoming',
      item: 'Designer Handbag',
      otherUser: 'Emma Wilson',
      status: 'Accepted - Pending Shipment',
      date: '1 day ago'
    }
  ];

  const recentActivity = [
    { type: 'swap_completed', description: 'Completed swap with Maya for Floral Dress', points: '+20', date: '3 days ago' },
    { type: 'item_listed', description: 'Listed new item: Black Leather Boots', points: '+5', date: '1 week ago' },
    { type: 'points_earned', description: 'Earned bonus points for profile completion', points: '+10', date: '2 weeks ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your items, track swaps, and discover new pieces</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Points Balance</p>
                  <p className="text-3xl font-bold">{user.points}</p>
                </div>
                <Award className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Swaps</p>
                  <p className="text-3xl font-bold text-gray-900">{user.totalSwaps}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Rating</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-3xl font-bold text-gray-900">{user.rating}</p>
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Items</p>
                  <p className="text-3xl font-bold text-gray-900">{myItems.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="items" className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="items">My Items</TabsTrigger>
                  <TabsTrigger value="swaps">Active Swaps</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <Button 
                  onClick={() => navigate('/add-item')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <TabsContent value="items" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Listed Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {myItems.map((item) => (
                        <div key={item.id} className="relative">
                          <ItemCard
                            {...item}
                            onClick={() => navigate(`/item/${item.id}`)}
                          />
                          <Badge 
                            className={`absolute -top-2 -right-2 ${
                              item.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="swaps" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Swaps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeSwaps.map((swap) => (
                        <div key={swap.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{swap.item}</p>
                            <p className="text-sm text-gray-600">
                              {swap.type === 'outgoing' ? 'Swap request to' : 'Swap request from'} {swap.otherUser}
                            </p>
                            <p className="text-xs text-gray-500">{swap.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={swap.status.includes('Pending') ? 'outline' : 'default'}>
                              {swap.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.description}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {activity.points}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Profile & Quick Actions */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Profile
                  <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member since:</span>
                    <span className="font-medium">{user.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{user.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/browse')}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Browse Items
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/favorites')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  View Favorites
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/community')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
