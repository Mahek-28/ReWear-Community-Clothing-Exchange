import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  MessageCircle, 
  ArrowLeft,
  Package,
  Shield,
  Clock,
  Check,
  Home
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Item {
  id: string;
  title: string;
  images: string[];
  description: string;
  category: string;
  size: string;
  condition: string;
  points: number;
  tags: string[];
  uploader: {
    name: string;
    avatar: string;
    rating: number;
    totalSwaps: number;
    memberSince: string;
    location: string;
    responseTime: string;
    verifiedProfile: boolean;
  };
  postedDate: string;
  availability: string;
  views: number;
  interested: number;
}

const mockItems: Item[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
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
    tags: ['vintage', 'denim', 'classic', 'blue'],
    uploader: {
      name: 'Emma Wilson',
      avatar: '',
      rating: 4.9,
      totalSwaps: 34,
      memberSince: 'January 2023',
      location: 'Brooklyn, NY',
      responseTime: '2 hours',
      verifiedProfile: true
    },
    postedDate: '3 days ago',
    availability: 'available',
    views: 47,
    interested: 8
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
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
    tags: ['summer', 'floral', 'dress', 'casual'],
    uploader: {
      name: 'Sophia Johnson',
      avatar: '',
      rating: 4.8,
      totalSwaps: 28,
      memberSince: 'March 2023',
      location: 'Austin, TX',
      responseTime: '3 hours',
      verifiedProfile: true
    },
    postedDate: '1 day ago',
    availability: 'available',
    views: 32,
    interested: 5
  },
  {
    id: '3',
    title: 'Designer Wool Coat',
    images: [
      'https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=600&fit=crop'
    ],
    description: 'Luxury designer wool coat with premium craftsmanship. Perfect for winter seasons.',
    category: 'Outerwear',
    size: 'L',
    condition: 'Excellent',
    points: 40,
    tags: ['designer', 'wool', 'winter', 'coat'],
    uploader: {
      name: 'Maya Rodriguez',
      avatar: '',
      rating: 5.0,
      totalSwaps: 45,
      memberSince: 'December 2022',
      location: 'Seattle, WA',
      responseTime: '1 hour',
      verifiedProfile: true
    },
    postedDate: '5 days ago',
    availability: 'available',
    views: 68,
    interested: 12
  },
  {
    id: '4',
    title: 'Casual Button-Up Shirt',
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
    tags: ['casual', 'shirt', 'cotton', 'everyday'],
    uploader: {
      name: 'Alex Chen',
      avatar: '',
      rating: 4.7,
      totalSwaps: 42,
      memberSince: 'November 2022',
      location: 'Portland, OR',
      responseTime: '1 hour',
      verifiedProfile: true
    },
    postedDate: '5 days ago',
    availability: 'available',
    views: 56,
    interested: 12
  }
];

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
    <Button asChild>
      <Link to="/" className="flex items-center">
        <Home className="h-4 w-4 mr-2" />
        Return to Home
      </Link>
    </Button>
  </div>
);

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [swapDialogOpen, setSwapDialogOpen] = useState(false);
  const [item, setItem] = useState<Item | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (location.state?.item) {
      setItem(location.state.item);
    } else {
      const foundItem = mockItems.find(item => item.id === id);
      if (foundItem) {
        setItem(foundItem);
      } else {
        setNotFound(true);
      }
    }
  }, [id, location.state]);

  const handleSwapRequest = () => {
    if (!item) return;
    
    toast({
      title: "Swap Request Sent!",
      description: `${item.uploader.name} will be notified of your swap request. You'll hear back within 24 hours.`,
    });
    setSwapDialogOpen(false);
  };

  const handlePointsRedeem = () => {
    if (!item) return;
    
    toast({
      title: "Item Redeemed!",
      description: `${item.points} points have been deducted from your balance. Contact ${item.uploader.name} to arrange pickup/shipping.`,
    });
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (notFound) {
    return <NotFound />;
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p>Loading item details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={item.images[currentImageIndex]} 
                alt={item.title}
                className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Posted {item.postedDate}
                </span>
                <span>{item.views} views</span>
                <span>{item.interested} interested</span>
              </div>
              
              <Badge className="bg-green-100 text-green-800 mb-4">
                {item.availability === 'available' ? 'Available' : 'Reserved'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Category</span>
                <p className="font-medium">{item.category}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Size</span>
                <p className="font-medium">{item.size}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Condition</span>
                <Badge className={`${getConditionColor(item.condition)} mt-1`}>
                  {item.condition}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-gray-600">Points Value</span>
                <p className="font-medium text-green-600 text-lg">{item.points} pts</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Package className="h-4 w-4 mr-2" />
                      Request Swap
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Item Swap</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Send a swap request to {item.uploader.name} for the {item.title}. You can offer one of your items in exchange.
                      </p>
                      <Button 
                        onClick={handleSwapRequest}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Send Swap Request
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline"
                  onClick={handlePointsRedeem}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Redeem for {item.points} pts
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate(`/chat/${item.uploader.name}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>

                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={item.uploader.avatar} />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {item.uploader.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{item.uploader.name}</h4>
                      {item.uploader.verifiedProfile && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        {item.uploader.rating} ({item.uploader.totalSwaps} swaps)
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.uploader.location}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p>Member since {item.uploader.memberSince}</p>
                      <p>Usually responds in {item.uploader.responseTime}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Safe Trading Tips</h4>
                    <p className="text-sm text-blue-700">
                      Always meet in public places, inspect items before exchanging, and trust your instincts. 
                      Report any suspicious activity to our support team.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

// import { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { 
//   Heart, 
//   Share2, 
//   MapPin, 
//   Star, 
//   MessageCircle, 
//   ArrowLeft,
//   Package,
//   Shield,
//   Clock,
//   Check,
//   Home
// } from 'lucide-react';
// import { toast } from '@/hooks/use-toast';

// interface Item {
//   id: string;
//   title: string;
//   images: string[];
//   description: string;
//   category: string;
//   size: string;
//   condition: string;
//   points: number;
//   tags: string[];
//   uploader: {
//     name: string;
//     avatar: string;
//     rating: number;
//     totalSwaps: number;
//     memberSince: string;
//     location: string;
//     responseTime: string;
//     verifiedProfile: boolean;
//   };
//   postedDate: string;
//   availability: string;
//   views: number;
//   interested: number;
// }

// const mockItems: Item[] = [
//   {
//     id: '1',
//     title: 'Vintage Denim Jacket',
//     images: [
//       'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop',
//       'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
//       'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&h=600&fit=crop'
//     ],
//     description: 'Beautiful vintage denim jacket in excellent condition.',
//     category: 'Outerwear',
//     size: 'M',
//     condition: 'Excellent',
//     points: 25,
//     tags: ['vintage', 'denim', 'classic', 'blue'],
//     uploader: {
//       name: 'Emma Wilson',
//       avatar: '',
//       rating: 4.9,
//       totalSwaps: 34,
//       memberSince: 'January 2023',
//       location: 'Brooklyn, NY',
//       responseTime: '2 hours',
//       verifiedProfile: true
//     },
//     postedDate: '3 days ago',
//     availability: 'available',
//     views: 47,
//     interested: 8
//   },
//   {
//     id: '2',
//     title: 'Floral Summer Dress',
//     images: [
//       'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop',
//       'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
//       'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=600&fit=crop'
//     ],
//     description: 'Light and airy floral dress perfect for summer outings.',
//     category: 'Dresses',
//     size: 'S',
//     condition: 'Good',
//     points: 20,
//     tags: ['summer', 'floral', 'dress', 'casual'],
//     uploader: {
//       name: 'Sophia Johnson',
//       avatar: '',
//       rating: 4.8,
//       totalSwaps: 28,
//       memberSince: 'March 2023',
//       location: 'Austin, TX',
//       responseTime: '3 hours',
//       verifiedProfile: true
//     },
//     postedDate: '1 day ago',
//     availability: 'available',
//     views: 32,
//     interested: 5
//   },
//   {
//     id: '4',
//     title: 'Casual Button-Up Shirt',
//     images: [
//       'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
//       'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=600&fit=crop',
//       'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=600&fit=crop'
//     ],
//     description: 'Comfortable casual button-up shirt perfect for everyday wear.',
//     category: 'Tops',
//     size: 'M',
//     condition: 'Good',
//     points: 15,
//     tags: ['casual', 'shirt', 'cotton', 'everyday'],
//     uploader: {
//       name: 'Alex Chen',
//       avatar: '',
//       rating: 4.7,
//       totalSwaps: 42,
//       memberSince: 'November 2022',
//       location: 'Portland, OR',
//       responseTime: '1 hour',
//       verifiedProfile: true
//     },
//     postedDate: '5 days ago',
//     availability: 'available',
//     views: 56,
//     interested: 12
//   },
//   // Add other items as needed
// ];

// const NotFound = () => (
//   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
//     <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
//     <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
//     <Button asChild>
//       <Link to="/" className="flex items-center">
//         <Home className="h-4 w-4 mr-2" />
//         Return to Home
//       </Link>
//     </Button>
//   </div>
// );

// const ItemDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [swapDialogOpen, setSwapDialogOpen] = useState(false);
//   const [item, setItem] = useState<Item | null>(null);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     if (location.state?.item) {
//       setItem(location.state.item);
//     } else {
//       const foundItem = mockItems.find(item => item.id === id);
//       if (foundItem) {
//         setItem(foundItem);
//       } else {
//         setNotFound(true);
//       }
//     }
//   }, [id, location.state]);

//   const handleSwapRequest = () => {
//     if (!item) return;
    
//     toast({
//       title: "Swap Request Sent!",
//       description: `${item.uploader.name} will be notified of your swap request. You'll hear back within 24 hours.`,
//     });
//     setSwapDialogOpen(false);
//   };

//   const handlePointsRedeem = () => {
//     if (!item) return;
    
//     toast({
//       title: "Item Redeemed!",
//       description: `${item.points} points have been deducted from your balance. Contact ${item.uploader.name} to arrange pickup/shipping.`,
//     });
//   };

//   const getConditionColor = (condition: string) => {
//     switch (condition.toLowerCase()) {
//       case 'excellent': return 'bg-green-100 text-green-800';
//       case 'good': return 'bg-blue-100 text-blue-800';
//       case 'fair': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (notFound) {
//     return <NotFound />;
//   }

//   if (!item) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
//         <div className="text-center">
//           <p>Loading item details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <Button 
//           variant="ghost" 
//           onClick={() => navigate(-1)}
//           className="mb-6"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back
//         </Button>

//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-4">
//             <div className="relative">
//               <img 
//                 src={item.images[currentImageIndex]} 
//                 alt={item.title}
//                 className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
//               />
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="absolute top-4 right-4 bg-white/80 hover:bg-white"
//                 onClick={() => setIsFavorited(!isFavorited)}
//               >
//                 <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current text-red-500' : 'text-gray-600'}`} />
//               </Button>
//             </div>
            
//             <div className="flex space-x-2 overflow-x-auto">
//               {item.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
//                     currentImageIndex === index ? 'border-green-500' : 'border-gray-200'
//                   }`}
//                 >
//                   <img 
//                     src={image} 
//                     alt={`${item.title} ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
//               <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
//                 <span className="flex items-center">
//                   <Clock className="h-4 w-4 mr-1" />
//                   Posted {item.postedDate}
//                 </span>
//                 <span>{item.views} views</span>
//                 <span>{item.interested} interested</span>
//               </div>
              
//               <Badge className="bg-green-100 text-green-800 mb-4">
//                 {item.availability === 'available' ? 'Available' : 'Reserved'}
//               </Badge>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <span className="text-sm text-gray-600">Category</span>
//                 <p className="font-medium">{item.category}</p>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-600">Size</span>
//                 <p className="font-medium">{item.size}</p>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-600">Condition</span>
//                 <Badge className={`${getConditionColor(item.condition)} mt-1`}>
//                   {item.condition}
//                 </Badge>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-600">Points Value</span>
//                 <p className="font-medium text-green-600 text-lg">{item.points} pts</p>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
//               <p className="text-gray-700 leading-relaxed">{item.description}</p>
//             </div>

//             <div>
//               <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {item.tags.map(tag => (
//                   <Badge key={tag} variant="outline" className="text-xs">
//                     #{tag}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="grid grid-cols-2 gap-3">
//                 <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
//                   <DialogTrigger asChild>
//                     <Button className="bg-green-600 hover:bg-green-700">
//                       <Package className="h-4 w-4 mr-2" />
//                       Request Swap
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>Request Item Swap</DialogTitle>
//                     </DialogHeader>
//                     <div className="space-y-4">
//                       <p className="text-gray-600">
//                         Send a swap request to {item.uploader.name} for the {item.title}. You can offer one of your items in exchange.
//                       </p>
//                       <Button 
//                         onClick={handleSwapRequest}
//                         className="w-full bg-green-600 hover:bg-green-700"
//                       >
//                         Send Swap Request
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>

//                 <Button 
//                   variant="outline"
//                   onClick={handlePointsRedeem}
//                   className="border-green-600 text-green-600 hover:bg-green-50"
//                 >
//                   Redeem for {item.points} pts
//                 </Button>
//               </div>
              
//               <div className="flex space-x-2">
//                 <Button 
//                   variant="outline" 
//                   size="sm" 
//                   className="flex-1"
//                   onClick={() => navigate(`/chat/${item.uploader.name}`)}
//                 >
//                   <MessageCircle className="h-4 w-4 mr-2" />
//                   Message
//                 </Button>

//                 <Button variant="outline" size="sm" className="flex-1">
//                   <Share2 className="h-4 w-4 mr-2" />
//                   Share
//                 </Button>
//               </div>
//             </div>

//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-start space-x-4">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={item.uploader.avatar} />
//                     <AvatarFallback className="bg-green-100 text-green-700">
//                       {item.uploader.name.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
                  
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2 mb-1">
//                       <h4 className="font-semibold text-gray-900">{item.uploader.name}</h4>
//                       {item.uploader.verifiedProfile && (
//                         <Check className="h-4 w-4 text-green-500" />
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
//                       <div className="flex items-center">
//                         <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
//                         {item.uploader.rating} ({item.uploader.totalSwaps} swaps)
//                       </div>
//                       <div className="flex items-center">
//                         <MapPin className="h-4 w-4 mr-1" />
//                         {item.uploader.location}
//                       </div>
//                     </div>
                    
//                     <div className="text-sm text-gray-600">
//                       <p>Member since {item.uploader.memberSince}</p>
//                       <p>Usually responds in {item.uploader.responseTime}</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-blue-50 border-blue-200">
//               <CardContent className="p-4">
//                 <div className="flex items-start space-x-3">
//                   <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
//                   <div>
//                     <h4 className="font-medium text-blue-900 mb-1">Safe Trading Tips</h4>
//                     <p className="text-sm text-blue-700">
//                       Always meet in public places, inspect items before exchanging, and trust your instincts. 
//                       Report any suspicious activity to our support team.
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemDetail;

// import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { 
//   Heart, 
//   Share2, 
//   MapPin, 
//   Star, 
//   MessageCircle, 
//   ArrowLeft,
//   Package,
//   Shield,
//   Clock,
//   Check
// } from 'lucide-react';
// import { toast } from '@/hooks/use-toast';

// const ItemDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [swapDialogOpen, setSwapDialogOpen] = useState(false);

//   // Mock item data
//   const item = {
//     id: id,
//     title: 'Vintage Denim Jacket',
//     images: [
//       'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop',
//       'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
//       'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&h=600&fit=crop'
//     ],
//     description: 'Beautiful vintage denim jacket in excellent condition. Classic blue wash with minimal fading. Perfect for layering or as a statement piece. Originally from a high-end vintage boutique. Features original metal buttons and classic stitching.',
//     category: 'Outerwear',
//     size: 'M',
//     condition: 'Excellent',
//     points: 25,
//     tags: ['vintage', 'denim', 'classic', 'blue'],
//     uploader: {
//       name: 'Emma Wilson',
//       avatar: '',
//       rating: 4.9,
//       totalSwaps: 34,
//       memberSince: 'January 2023',
//       location: 'Brooklyn, NY',
//       responseTime: '2 hours',
//       verifiedProfile: true
//     },
//     postedDate: '3 days ago',
//     availability: 'available',
//     views: 47,
//     interested: 8
//   };

//   const handleSwapRequest = () => {
//     toast({
//       title: "Swap Request Sent!",
//       description: "Emma will be notified of your swap request. You'll hear back within 24 hours.",
//     });
//     setSwapDialogOpen(false);
//   };

//   const handlePointsRedeem = () => {
//     toast({
//       title: "Item Redeemed!",
//       description: "25 points have been deducted from your balance. Contact Emma to arrange pickup/shipping.",
//     });
//   };

//   const getConditionColor = (condition: string) => {
//     switch (condition.toLowerCase()) {
//       case 'excellent': return 'bg-green-100 text-green-800';
//       case 'good': return 'bg-blue-100 text-blue-800';
//       case 'fair': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Button */}
//         <Button 
//           variant="ghost" 
//           onClick={() => navigate(-1)}
//           className="mb-6"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back
//         </Button>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <div className="relative">
//               <img 
//                 src={item.images[currentImageIndex]} 
//                 alt={item.title}
//                 className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
//               />
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="absolute top-4 right-4 bg-white/80 hover:bg-white"
//                 onClick={() => setIsFavorited(!isFavorited)}
//               >
//                 <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current text-red-500' : 'text-gray-600'}`} />
//               </Button>
//             </div>
            
//             {/* Thumbnail Images */}
//             <div className="flex space-x-2 overflow-x-auto">
//               {item.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
//                     currentImageIndex === index ? 'border-green-500' : 'border-gray-200'
//                   }`}
//                 >
//                   <img 
//                     src={image} 
//                     alt={`${item.title} ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Item Details */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
//               <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
//                 <span className="flex items-center">
//                   <Clock className="h-4 w-4 mr-1" />
//                   Posted {item.postedDate}
//                 </span>
//                 <span>{item.views} views</span>
//                 <span>{item.interested} interested</span>
//               </div>
              
//               {/* Status Badge */}
//               <Badge className="bg-green-100 text-green-800 mb-4">
//                 {item.availability === 'available' ? 'Available' : 'Reserved'}
//               </Badge>
//             </div>

//             {/* Item Info */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <span className="text-sm text-gray-600">Category</span>
//                 <p className="font-medium">{item.category}</p>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-600">Size</span>
//                 <p className="font-medium">{item.size}</p>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-600">Condition</span>
//                 <Badge className={`${getConditionColor(item.condition)} mt-1`}>
//                   {item.condition}
//                 </Badge>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-600">Points Value</span>
//                 <p className="font-medium text-green-600 text-lg">{item.points} pts</p>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
//               <p className="text-gray-700 leading-relaxed">{item.description}</p>
//             </div>

//             {/* Tags */}
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {item.tags.map(tag => (
//                   <Badge key={tag} variant="outline" className="text-xs">
//                     #{tag}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <div className="grid grid-cols-2 gap-3">
//                 <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
//                   <DialogTrigger asChild>
//                     <Button className="bg-green-600 hover:bg-green-700">
//                       <Package className="h-4 w-4 mr-2" />
//                       Request Swap
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>Request Item Swap</DialogTitle>
//                     </DialogHeader>
//                     <div className="space-y-4">
//                       <p className="text-gray-600">
//                         Send a swap request to Emma for the {item.title}. You can offer one of your items in exchange.
//                       </p>
//                       <Button 
//                         onClick={handleSwapRequest}
//                         className="w-full bg-green-600 hover:bg-green-700"
//                       >
//                         Send Swap Request
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>

//                 <Button 
//                   variant="outline"
//                   onClick={handlePointsRedeem}
//                   className="border-green-600 text-green-600 hover:bg-green-50"
//                 >
//                   Redeem for {item.points} pts
//                 </Button>
//               </div>
              
//               <div className="flex space-x-2">
//                 {/* <Button variant="outline" size="sm" className="flex-1">
//                   <MessageCircle className="h-4 w-4 mr-2" />
//                   Message
//                 </Button> */}
//                 <Button 
//   variant="outline" 
//   size="sm" 
//   className="flex-1"
//   onClick={() => navigate(`/chat/${item.uploader.name}`)} // or uploader.id
// >
//   <MessageCircle className="h-4 w-4 mr-2" />
//   Message
// </Button>

//                 <Button variant="outline" size="sm" className="flex-1">
//                   <Share2 className="h-4 w-4 mr-2" />
//                   Share
//                 </Button>
//               </div>
//             </div>

//             {/* Seller Info */}
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-start space-x-4">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={item.uploader.avatar} />
//                     <AvatarFallback className="bg-green-100 text-green-700">
//                       {item.uploader.name.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
                  
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2 mb-1">
//                       <h4 className="font-semibold text-gray-900">{item.uploader.name}</h4>
//                       {item.uploader.verifiedProfile && (
//                         <Check className="h-4 w-4 text-green-500" />
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
//                       <div className="flex items-center">
//                         <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
//                         {item.uploader.rating} ({item.uploader.totalSwaps} swaps)
//                       </div>
//                       <div className="flex items-center">
//                         <MapPin className="h-4 w-4 mr-1" />
//                         {item.uploader.location}
//                       </div>
//                     </div>
                    
//                     <div className="text-sm text-gray-600">
//                       <p>Member since {item.uploader.memberSince}</p>
//                       <p>Usually responds in {item.uploader.responseTime}</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Safety Notice */}
//             <Card className="bg-blue-50 border-blue-200">
//               <CardContent className="p-4">
//                 <div className="flex items-start space-x-3">
//                   <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
//                   <div>
//                     <h4 className="font-medium text-blue-900 mb-1">Safe Trading Tips</h4>
//                     <p className="text-sm text-blue-700">
//                       Always meet in public places, inspect items before exchanging, and trust your instincts. 
//                       Report any suspicious activity to our support team.
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemDetail;
