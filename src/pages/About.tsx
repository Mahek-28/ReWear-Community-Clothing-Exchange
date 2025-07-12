
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Users, 
  Target, 
  Award,
  Heart,
  Globe,
  Package
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "50K+", label: "Community Members", icon: Users },
    { number: "200K+", label: "Items Exchanged", icon: Package },
    { number: "85%", label: "Waste Reduction", icon: Leaf },
    { number: "150+", label: "Cities Worldwide", icon: Globe }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "Every exchange reduces textile waste and promotes circular fashion practices."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building meaningful connections between fashion-conscious individuals worldwide."
    },
    {
      icon: Heart,
      title: "Inclusive & Accessible",
      description: "Fashion sustainability should be accessible to everyone, regardless of budget."
    },
    {
      icon: Award,
      title: "Quality & Trust",
      description: "Maintaining high standards through community ratings and verified exchanges."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About ReWear</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to revolutionize the fashion industry by making sustainable clothing exchanges 
            accessible, enjoyable, and impactful. Together, we're building a circular fashion economy that 
            benefits both people and the planet.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-12 text-center">
              <Target className="mx-auto h-16 w-16 mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                To create a world where every piece of clothing has multiple lives, where fashion waste becomes 
                fashion opportunity, and where style meets sustainability in every wardrobe.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact So Far</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <stat.icon className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <value.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  ReWear was born from a simple observation: millions of perfectly good clothes sit unused in 
                  wardrobes while the fashion industry continues to produce at an unsustainable pace.
                </p>
                <p>
                  Founded in 2023 by a team of fashion lovers and sustainability advocates, we set out to create 
                  a platform that would make it easy for people to give their clothes a second life while 
                  discovering new favorites.
                </p>
                <p>
                  Today, we're proud to be part of a growing movement that's reshaping how we think about fashion 
                  consumption, one exchange at a time.
                </p>
              </div>
            </div>
            <div className="bg-green-100 rounded-2xl p-8 text-center">
              <Leaf className="mx-auto h-24 w-24 text-green-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Movement</h3>
              <p className="text-gray-600 mb-6">
                Be part of the solution. Every item you share helps build a more sustainable future.
              </p>
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/auth')}
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions, suggestions, or want to partner with us? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = 'mailto:hello@rewear.com'}
            >
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/how-it-works')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
