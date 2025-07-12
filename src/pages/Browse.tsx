
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
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';

interface Item {
  id: string;
  title: string;
  image: string;
  images: string[];
  description: string;
  category: string;
  size: string;
  condition: string;
  points: number;
  location: string;
  uploader: {
    name: string;
    rating: number;
    avatar?: string;
    totalSwaps?: number;
    memberSince?: string;
    responseTime?: string;
    verifiedProfile?: boolean;
  };
  postedDate?: string;
  availability?: string;
  views?: number;
  interested?: number;
  tags?: string[];
}

const ItemCard = ({ 
  id,
  title,
  image,
  category,
  size,
  condition,
  points,
  location,
  uploader,
  onClick
}: Item & { onClick: () => void }) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <span className="bg-primary text-primary-foreground text-sm font-medium px-2 py-1 rounded ml-2">
            {points} pts
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="secondary">{category}</Badge>
          <Badge variant="secondary">{size}</Badge>
          <Badge variant="secondary">{condition}</Badge>
        </div>
        <div className="text-sm text-gray-600">
          <p>{location}</p>
          <p className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            {uploader.rating} · {uploader.name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const Browse = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleItems, setVisibleItems] = useState(8); // Initial number of items to show

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

  const allItems: Item[] = [
    // Initial 8 items
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&h=600&fit=crop'
      ],
      description: 'Beautiful vintage denim jacket in excellent condition.',
      category: 'Outerwear',
      size: 'M',
      condition: 'Excellent',
      points: 25,
      location: 'Brooklyn, NY',
      uploader: { 
        name: 'Emma', 
        rating: 4.9,
        avatar: '',
        totalSwaps: 34,
        memberSince: 'January 2023',
        responseTime: '2 hours',
        verifiedProfile: true
      },
      postedDate: '3 days ago',
      availability: 'available',
      views: 47,
      interested: 8,
      tags: ['vintage', 'denim', 'classic', 'blue']
    },
    {
      id: '2',
      title: 'Floral Summer Dress',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop',
     
      images: [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=600&fit=crop'
      ],
      description: 'Light and airy floral dress perfect for summer outings.',
      category: 'Dresses',
      size: 'S',
      condition: 'Good',
      points: 20,
      location: 'Austin, TX',
      uploader: { 
        name: 'Sophia', 
        rating: 4.8,
        avatar: '',
        totalSwaps: 28,
        memberSince: 'March 2023',
        responseTime: '3 hours',
        verifiedProfile: true
      },
      postedDate: '1 day ago',
      availability: 'available',
      views: 32,
      interested: 5,
      tags: ['summer', 'floral', 'dress', 'casual']
    },
    {
      id: '3',
      title: 'Designer Wool Coat',
      image: 'https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      images: [
        'https://images.unsplash.com/photo-1746972466957-6fe022ade280?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=600&fit=crop'
      ],
      description: 'Luxury designer wool coat with premium craftsmanship.',
      category: 'Outerwear',
      size: 'L',
      condition: 'Excellent',
      points: 40,
      location: 'Seattle, WA',
      uploader: { 
        name: 'Maya', 
        rating: 5.0,
        avatar: '',
        totalSwaps: 45,
        memberSince: 'December 2022',
        responseTime: '1 hour',
        verifiedProfile: true
      },
      postedDate: '5 days ago',
      availability: 'available',
      views: 68,
      interested: 12,
      tags: ['designer', 'wool', 'winter', 'coat']
    },
    {
      id: '4',
      title: 'Casual Button-Up Shirt',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=600&fit=crop'
      ],
      description: 'Comfortable casual button-up shirt perfect for everyday wear.',
      category: 'Tops',
      size: 'M',
      condition: 'Good',
      points: 15,
      location: 'Portland, OR',
      uploader: { 
        name: 'Alex', 
        rating: 4.7,
        avatar: '',
        totalSwaps: 42,
        memberSince: 'November 2022',
        responseTime: '1 hour',
        verifiedProfile: true
      },
      postedDate: '5 days ago',
      availability: 'available',
      views: 56,
      interested: 12,
      tags: ['casual', 'shirt', 'cotton', 'everyday']
    },
    {
      id: '5',
      title: 'Black Leather Boots',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop'
      ],
      description: 'Stylish black leather boots with comfortable fit.',
      category: 'Shoes',
      size: '8',
      condition: 'Good',
      points: 30,
      location: 'Chicago, IL',
      uploader: { 
        name: 'Jordan', 
        rating: 4.6,
        avatar: '',
        totalSwaps: 36,
        memberSince: 'September 2022',
        responseTime: '5 hours',
        verifiedProfile: true
      },
      postedDate: '4 days ago',
      availability: 'available',
      views: 52,
      interested: 9,
      tags: ['boots', 'leather', 'ankle', 'black']
    },
    {
      id: '6',
      title: 'Cozy Knit Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=600&h=600&fit=crop'
      ],
      description: 'Warm and cozy knit sweater for chilly days.',
      category: 'Knitwear',
      size: 'M',
      condition: 'Excellent',
      points: 25,
      location: 'Boston, MA',
      uploader: { 
        name: 'Riley', 
        rating: 4.9,
        avatar: '',
        totalSwaps: 41,
        memberSince: 'October 2022',
        responseTime: '3 hours',
        verifiedProfile: true
      },
      postedDate: '2 days ago',
      availability: 'available',
      views: 38,
      interested: 6,
      tags: ['knit', 'sweater', 'warm', 'cozy']
    },
    {
      id: '7',
      title: 'Plaid Flannel Shirt',
      image: 'https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      images: [
        'https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=600&fit=crop'
      ],
      description: 'Classic plaid flannel shirt for casual wear.',
      category: 'Shirts',
      size: 'L',
      condition: 'Good',
      points: 18,
      location: 'Denver, CO',
      uploader: { 
        name: 'Casey', 
        rating: 4.8,
        avatar: '',
        totalSwaps: 38,
        memberSince: 'October 2022',
        responseTime: '4 hours',
        verifiedProfile: true
      },
      postedDate: '2 days ago',
      availability: 'available',
      views: 42,
      interested: 7,
      tags: ['plaid', 'flannel', 'shirt', 'casual']
    },
    {
      id: '8',
      title: 'Silk Scarf Collection',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop'
      ],
      description: 'Set of three luxurious silk scarves in different patterns.',
      category: 'Accessories',
      size: 'One Size',
      condition: 'Excellent',
      points: 35,
      location: 'San Francisco, CA',
      uploader: { 
        name: 'Morgan', 
        rating: 5.0,
        avatar: '',
        totalSwaps: 47,
        memberSince: 'August 2022',
        responseTime: '2 hours',
        verifiedProfile: true
      },
      postedDate: '1 week ago',
      availability: 'available',
      views: 65,
      interested: 14,
      tags: ['silk', 'scarf', 'luxury', 'accessories']
    },
    // Additional items that will load when clicking "Load More"
    {
      id: '9',
      title: 'High-Waisted Jeans',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop'
      ],
      description: 'Stylish high-waisted jeans with perfect fit.',
      category: 'Bottoms',
      size: 'M',
      condition: 'Good',
      points: 22,
      location: 'Los Angeles, CA',
      uploader: { 
        name: 'Taylor', 
        rating: 4.7,
        avatar: '',
        totalSwaps: 29,
        memberSince: 'April 2023',
        responseTime: '6 hours',
        verifiedProfile: true
      },
      postedDate: '3 days ago',
      availability: 'available',
      views: 48,
      interested: 8,
      tags: ['jeans', 'denim', 'high-waisted', 'casual']
    },
    {
      id: '10',
      title: 'White Linen Blouse',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop'
      ],
      description: 'Breathable white linen blouse for summer days.',
      category: 'Tops',
      size: 'S',
      condition: 'Excellent',
      points: 18,
      location: 'Miami, FL',
      uploader: { 
        name: 'Jamie', 
        rating: 4.8,
        avatar: '',
        totalSwaps: 33,
        memberSince: 'February 2023',
        responseTime: '3 hours',
        verifiedProfile: true
      },
      postedDate: '2 days ago',
      availability: 'available',
      views: 37,
      interested: 5,
      tags: ['linen', 'blouse', 'summer', 'white']
    },
    {
      id: '11',
      title: 'Leather Crossbody Bag',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop'
      ],
      description: 'Elegant leather crossbody bag with multiple compartments.',
      category: 'Accessories',
      size: 'One Size',
      condition: 'Excellent',
      points: 28,
      location: 'Dallas, TX',
      uploader: { 
        name: 'Robin', 
        rating: 4.9,
        avatar: '',
        totalSwaps: 44,
        memberSince: 'January 2023',
        responseTime: '2 hours',
        verifiedProfile: true
      },
      postedDate: '4 days ago',
      availability: 'available',
      views: 53,
      interested: 11,
      tags: ['bag', 'leather', 'crossbody', 'accessory']
    },
    {
      id: '12',
      title: 'Wool Winter Coat',
      image: 'https://unsplash.com/photos/white-and-brown-floral-textile-0MnpfQIUO5c',
      images: [
        'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop'
      ],
      description: 'Warm wool winter coat with removable inner lining.',
      category: 'Outerwear',
      size: 'L',
      condition: 'Good',
      points: 38,
      location: 'Chicago, IL',
      uploader: { 
        name: 'Drew', 
        rating: 4.7,
        avatar: '',
        totalSwaps: 39,
        memberSince: 'November 2022',
        responseTime: '5 hours',
        verifiedProfile: true
      },
      postedDate: '1 week ago',
      availability: 'available',
      views: 72,
      interested: 15,
      tags: ['coat', 'wool', 'winter', 'warm']
    }
  ];

  const filteredItems = allItems.filter(item => {
    return (
      (searchTerm === '' || 
       item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || 
       item.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
      (selectedSize === 'all' || item.size === selectedSize) &&
      (selectedCondition === 'all' || 
       item.condition.toLowerCase() === selectedCondition.toLowerCase())
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'points-low':
        return a.points - b.points;
      case 'points-high':
        return b.points - a.points;
      case 'popular':
        return b.uploader.rating - a.uploader.rating;
      default: // 'recent'
        return 0; // In a real app, you'd sort by date
    }
  });

  const visibleItemsList = sortedItems.slice(0, visibleItems);

  const loadMoreItems = () => {
    setVisibleItems(prev => prev + 4); // Load 4 more items
  };

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
                {filteredItems.length} items found ({visibleItemsList.length} showing)
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
          {visibleItemsList.map((item) => (
            <ItemCard
              key={item.id}
              {...item}
              onClick={() => navigate(`/item/${item.id}`, { state: { item } })}
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
        {visibleItems < filteredItems.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={loadMoreItems}
            >
              Load More Items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
