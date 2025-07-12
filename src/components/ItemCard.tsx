
import { useState } from 'react';
import { Heart, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ItemCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  size: string;
  condition: string;
  points: number;
  location: string;
  uploader: {
    name: string;
    rating: number;
  };
  onClick?: () => void;
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
}: ItemCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
            onClick={onClick}
          />
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full ${
              isFavorited ? 'bg-red-100 text-red-600' : 'bg-white/80 text-gray-600'
            } hover:bg-red-100 hover:text-red-600`}
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
          
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-green-600 text-white text-xs">
              {points} pts
            </Badge>
          </div>
        </div>
        
        <div className="p-4 space-y-3" onClick={onClick}>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Size {size}
              </Badge>
              <Badge className={`text-xs ${getConditionColor(condition)}`}>
                {condition}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
              <span>{uploader.rating}</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-400">
            by {uploader.name}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
