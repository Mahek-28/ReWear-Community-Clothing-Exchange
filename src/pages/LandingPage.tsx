
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ItemCard from '@/components/ItemCard';
import { 
  Recycle, 
  Users, 
  Heart, 
  ArrowRight, 
  ShirtIcon,
  Leaf,
  Star,
  TrendingUp 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const featuredItems = [
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
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Members', value: '12,500+' },
    { icon: ShirtIcon, label: 'Items Exchanged', value: '45,000+' },
    { icon: Leaf, label: 'CO2 Saved (lbs)', value: '89,000+' },
    { icon: Heart, label: 'Satisfaction Rate', value: '98%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Swap. Share. <span className="text-green-600">Sustain.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the ReWear community and give your clothes a second life. Exchange unused garments, 
            earn points, and help reduce textile waste while discovering your next favorite piece.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              onClick={() => navigate('/browse')}
            >
              Start Swapping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
              onClick={() => navigate('/add-item')}
            >
              List an Item
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="border-green-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ReWear Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start your sustainable fashion journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <ShirtIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and details of clothes you no longer wear. Set your preferred swap or point value.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Swap</h3>
              <p className="text-gray-600">
                Browse items from other members, make swap requests, or use your earned points to claim items.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Refresh Your Wardrobe</h3>
              <p className="text-gray-600">
                Enjoy your new-to-you pieces while contributing to a more sustainable fashion ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Items</h2>
              <p className="text-gray-600">Discover amazing pieces from our community</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/browse')}
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              View All Items
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <ItemCard
                key={item.id}
                {...item}
                onClick={() => navigate(`/item/${item.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Making a Real Impact</h2>
          <p className="text-xl mb-8 text-green-100">
            Every swap helps reduce textile waste and supports a circular economy
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">2.7M</div>
              <div className="text-green-100">Pounds of textiles diverted from landfills</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-green-100">Less carbon footprint vs buying new</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$450</div>
              <div className="text-green-100">Average savings per member annually</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of fashion-forward, environmentally conscious individuals
          </p>
          
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            onClick={() => navigate('/auth')}
          >
            Join ReWear Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
