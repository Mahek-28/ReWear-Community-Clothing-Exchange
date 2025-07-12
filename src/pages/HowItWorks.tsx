
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Search, 
  MessageCircle, 
  Package, 
  Heart, 
  Recycle,
  Star,
  Shield
} from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Upload,
      title: "List Your Items",
      description: "Upload photos and details of clothes you no longer wear. Set your preferred swap or donation terms.",
      color: "text-blue-600"
    },
    {
      icon: Search,
      title: "Browse & Discover",
      description: "Explore thousands of preloved items from our community. Filter by size, style, and location.",
      color: "text-green-600"
    },
    {
      icon: MessageCircle,
      title: "Connect & Negotiate",
      description: "Message item owners to arrange swaps, purchases, or donations. Build connections in your area.",
      color: "text-purple-600"
    },
    {
      icon: Package,
      title: "Exchange & Enjoy",
      description: "Meet up safely or arrange shipping. Give your items new life and discover new favorites.",
      color: "text-orange-600"
    }
  ];

  const features = [
    {
      icon: Heart,
      title: "Community Driven",
      description: "Join a passionate community of fashion lovers committed to sustainable living."
    },
    {
      icon: Recycle,
      title: "Environmental Impact",
      description: "Every swap prevents textile waste and reduces the fashion industry's carbon footprint."
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Our rating system ensures trustworthy exchanges and high-quality items."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Built-in safety features and community guidelines keep all exchanges secure."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How ReWear Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the circular fashion movement. Give your clothes a second life while discovering new treasures from our community.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Four Simple Steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className={`mx-auto p-3 rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center mb-4`}>
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-4 -left-4 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose ReWear?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already making a difference through sustainable fashion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/auth')}
            >
              Join ReWear Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/browse')}
            >
              Browse Items
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
