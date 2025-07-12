
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemCard from '@/components/ItemCard';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Filter,
  SortAsc,
  Grid,
  List,
  ShirtIcon
} from 'lucide-react';

const Favorites = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');

  // Mock data - in a real app, this would come from Supabase
  const favoriteItems = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
      category: 'Outerwear',
      size: 'M',
      condition: 'Good',
      points: 45,
      location: 'Brooklyn, NY',
      uploader: { name: 'Maya', rating: 4.8 },
      dateAdded: '2024-01-15'
    },
    {
      id: '2',
      title: 'Silk Evening Dress',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop',
      category: 'Dresses',
      size: 'S',
      condition: 'Excellent',
      points: 60,
      location: 'Manhattan, NY',
      uploader: { name: 'Sophie', rating: 4.9 },
      dateAdded: '2024-01-10'
    },
    {
      id: '3',
      title: 'Designer Handbag',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
      category: 'Accessories',
      size: 'One Size',
      condition: 'Like New',
      points: 80,
      location: 'Queens, NY',
      uploader: { name: 'Alex', rating: 4.5 },
      dateAdded: '2024-01-05'
    }
  ];

  const savedSearches = [
    { query: 'vintage jackets', count: 12, lastUpdated: '2 days ago' },
    { query: 'size M dresses', count: 8, lastUpdated: '1 week ago' },
    { query: 'designer bags brooklyn', count: 3, lastUpdated: '3 days ago' }
  ];

  const filteredItems = favoriteItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Heart className="h-8 w-8 text-red-500 mr-3" />
            Your Favorites
          </h1>
          <p className="text-gray-600 mt-2">Items and searches you've saved for later</p>
        </div>

        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="items">Favorite Items ({favoriteItems.length})</TabsTrigger>
            <TabsTrigger value="searches">Saved Searches ({savedSearches.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            {favoriteItems.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start exploring items and save your favorites to see them here
                  </p>
                  <Button 
                    onClick={() => navigate('/browse')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Browse Items
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Search and Filter Bar */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="flex-1 w-full sm:max-w-md">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search your favorites..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <SortAsc className="h-4 w-4 mr-2" />
                          Sort
                        </Button>
                        <div className="flex border rounded-md">
                          <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                          >
                            <Grid className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                          >
                            <List className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Items Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {filteredItems.map((item) => (
                    <div key={item.id} className="relative">
                      <ItemCard
                        {...item}
                        onClick={() => navigate(`/item/${item.id}`)}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white shadow-sm"
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="searches" className="space-y-6">
            {savedSearches.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved searches</h3>
                  <p className="text-gray-600 mb-6">
                    Save searches from the browse page to get notified of new matches
                  </p>
                  <Button 
                    onClick={() => navigate('/browse')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Start Searching
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {savedSearches.map((search, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">"{search.query}"</h3>
                          <p className="text-sm text-gray-600">
                            {search.count} new items • Last updated {search.lastUpdated}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/browse?q=${encodeURIComponent(search.query)}`)}
                          >
                            View Results
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Favorites;
