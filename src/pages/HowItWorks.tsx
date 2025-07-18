
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
  Shield,
  User,
  Leaf,
  CheckCircle,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HowItWorks = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    itemsExchanged: 0,
    members: 0,
    carbonSaved: 0
  });

  // Simulate loading stats (in a real app, you'd fetch these)
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        itemsExchanged: 12483,
        members: 8562,
        carbonSaved: 28450 // kg
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const testimonials = [
    {
      quote: "I've refreshed my wardrobe without spending a dime! ReWear made swapping so easy.",
      author: "Sarah K.",
      role: "Frequent Swapper",
      icon: User
    },
    {
      quote: "Reduced my fashion footprint by 70% thanks to ReWear. The community is amazing!",
      author: "Michael T.",
      role: "Eco-Conscious User",
      icon: Leaf
    },
    {
      quote: "Every item I've received has been in perfect condition. The rating system works!",
      author: "Priya M.",
      role: "Verified Member",
      icon: CheckCircle
    },
    {
      quote: "Safe meetups and honest members. I've never had a bad experience swapping.",
      author: "David L.",
      role: "Community Leader",
      icon: Lock
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -5,
      scale: 1.03,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How ReWear Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the circular fashion movement. Give your clothes a second life while discovering new treasures from our community.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.itemsExchanged.toLocaleString()}+
            </div>
            <p className="text-gray-600">Items Exchanged</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.members.toLocaleString()}+
            </div>
            <p className="text-gray-600">Community Members</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.carbonSaved.toLocaleString()}kg
            </div>
            <p className="text-gray-600">Carbon Saved</p>
          </div>
        </motion.div>

        {/* Steps Section */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Four Simple Steps
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover="hover"
                className="relative"
              >
                <motion.div
                  variants={hoverVariants}
                >
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
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Why Choose ReWear?
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  variants={hoverVariants}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
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
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            What Our Community Says
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  variants={hoverVariants}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <testimonial.icon className="h-10 w-10 text-green-600" />
                      </div>
                      <blockquote className="text-gray-600 italic mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="text-center">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-white rounded-2xl p-8 shadow-lg"
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;