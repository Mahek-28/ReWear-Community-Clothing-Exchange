import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Github,
  Heart,
  Leaf,
  Recycle,
  ShoppingBag,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">ReWear</span>
            </Link>
            <p className="text-sm">
              Giving clothes a second life through community exchange. Sustainable fashion for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/mahek.2815?utm_source=qr&igsh=cnVudzJmdnJsZGxo" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://x.com/Mahek_2815" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61551389821140&mibextid=ZbWKwL" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://github.com/Mahek-28" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-sm hover:text-green-400 transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/add-item" className="text-sm hover:text-green-400 transition-colors">
                  List an Item
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm hover:text-green-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-green-400 transition-colors">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Sustainability */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Sustainability</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Leaf className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">85% less carbon footprint vs buying new</span>
              </li>
              <li className="flex items-start space-x-2">
                <Recycle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">2.7M+ pounds of textiles diverted</span>
              </li>
              <li className="flex items-start space-x-2">
                <Heart className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Community of 50K+ sustainable fashion lovers</span>
              </li>
            </ul>
            <Button variant="outline" className="mt-4 border-green-400 text-green-400 hover:bg-green-400 hover:text-white">
              Learn More
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">rewear@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Green St, Eco City</span>
              </li>
            </ul>
            <div className="pt-2">
              <p className="text-sm">Have questions?</p>
              <Button variant="outline" className="mt-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white">
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ReWear. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-sm text-gray-400 hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;