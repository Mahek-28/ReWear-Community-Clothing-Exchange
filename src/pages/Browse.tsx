
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import ItemCard from '@/components/ItemCard';
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';

const Browse = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    'All Categories', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 
    'Shoes', 'Accessories', 'Activewear', 'Formal'
  ];

  const sizes = ['All Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['All Conditions', 'Excellent', 'Good', 'Fair'];
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'points-low', label: 'Points: Low to High' },
    { value: 'points-high', label: 'Points: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const items = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=300&fit=crop',
      category: 'Outerwear',
      size: 'M',
      condition: 'Excellent',
      points: 25,
      location: 'Brooklyn, NY',
      uploader: { name: 'Emma', rating: 4.9 }
    },
    {
      id: '2',
      title: 'Floral Summer Dress',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop',
      category: 'Dresses',
      size: 'S',
      condition: 'Good',
      points: 20,
      location: 'Austin, TX',
      uploader: { name: 'Sophia', rating: 4.8 }
    },
    {
      id: '3',
      title: 'Designer Wool Coat',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop',
      category: 'Coats',
      size: 'L',
      condition: 'Excellent',
      points: 40,
      location: 'Seattle, WA',
      uploader: { name: 'Maya', rating: 5.0 }
    },
    {
      id: '4',
      title: 'Casual Button-Up Shirt',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop',
      category: 'Shirts',
      size: 'M',
      condition: 'Good',
      points: 15,
      location: 'Portland, OR',
      uploader: { name: 'Alex', rating: 4.7 }
    },
    {
      id: '5',
      title: 'Black Leather Boots',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      category: 'Shoes',
      size: '8',
      condition: 'Good',
      points: 30,
      location: 'Chicago, IL',
      uploader: { name: 'Jordan', rating: 4.6 }
    },
    {
      id: '6',
      title: 'Cozy Knit Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop',
      category: 'Knitwear',
      size: 'M',
      condition: 'Excellent',
      points: 25,
      location: 'Boston, MA',
      uploader: { name: 'Riley', rating: 4.9 }
    },
    {
      id: '7',
      title: 'Plaid Flannel Shirt',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop',
      category: 'Shirts',
      size: 'L',
      condition: 'Good',
      points: 18,
      location: 'Denver, CO',
      uploader: { name: 'Casey', rating: 4.8 }
    },
    {
      id: '8',
      title: 'Silk Scarf Collection',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=300&fit=crop',
      category: 'Accessories',
      size: 'One Size',
      condition: 'Excellent',
      points: 35,
      location: 'San Francisco, CA',
      uploader: { name: 'Morgan', rating: 5.0 }
    }
  ];

  const filteredItems = items.filter(item => {
    return (
      (searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
      (selectedSize === 'all' || item.size === selectedSize) &&
      (selectedCondition === 'all' || item.condition.toLowerCase() === selectedCondition.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
          <p className="text-gray-600">Discover amazing pieces from the ReWear community</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for items, brands, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem 
                      key={category} 
                      value={category === 'All Categories' ? 'all' : category.toLowerCase()}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(size => (
                    <SelectItem 
                      key={size} 
                      value={size === 'All Sizes' ? 'all' : size}
                    >
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(condition => (
                    <SelectItem 
                      key={condition} 
                      value={condition === 'All Conditions' ? 'all' : condition.toLowerCase()}
                    >
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedSize !== 'all' && (
                <Badge variant="secondary" className="px-3 py-1">
                  Size {selectedSize}
                  <button 
                    onClick={() => setSelectedSize('all')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedCondition !== 'all' && (
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedCondition}
                  <button 
                    onClick={() => setSelectedCondition('all')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>

            {/* Results Info and View Toggle */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                {filteredItems.length} items found
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
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
            <ItemCard
              key={item.id}
              {...item}
              onClick={() => navigate(`/item/${item.id}`)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all categories
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedSize('all');
                setSelectedCondition('all');
              }}
              variant="outline"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
