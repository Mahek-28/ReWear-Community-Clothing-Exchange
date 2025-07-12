

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  MessageCircle, 
  ThumbsUp, 
  Share2,
  X,
  Heart,
  Send
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Comment = {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
};

type Post = {
  id: number;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  comments: Comment[];
  time: string;
  liked: boolean;
};

const Community = () => {
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();
  
  const [communityPosts, setCommunityPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Alex Chen",
      avatar: "A",
      content: "Just swapped my winter coat for an amazing pair of boots! This platform is fantastic!",
      likes: 12,
      comments: [
        {
          id: 1,
          user: "Maya Rodriguez",
          avatar: "M",
          content: "Those boots look amazing! What size are they?",
          time: "1 hour ago"
        },
        {
          id: 2,
          user: "Jamal Smith",
          avatar: "J",
          content: "Congrats on the swap! I love seeing successful trades.",
          time: "30 minutes ago"
        }
      ],
      time: "2 hours ago",
      liked: false
    },
    {
      id: 2,
      user: "Maya Rodriguez",
      avatar: "M",
      content: "Looking for vintage band tees in size M. Anyone have any they're willing to swap?",
      likes: 8,
      comments: [
        {
          id: 1,
          user: "Emma Wilson",
          avatar: "E",
          content: "I have a few! What bands are you interested in?",
          time: "1 day ago"
        }
      ],
      time: "1 day ago",
      liked: false
    }
  ]);

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newPost: Post = {
      id: communityPosts.length + 1,
      user: "You",
      avatar: "Y",
      content: newPostContent,
      likes: 0,
      comments: [],
      time: "Just now",
      liked: false
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostContent('');
    setIsNewPostOpen(false);
    
    toast({
      title: "Success",
      description: "Your post has been shared with the community!",
    });
  };

  const handleLike = (postId: number) => {
    setCommunityPosts(communityPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !activePost) return;

    const updatedPosts = communityPosts.map(post => {
      if (post.id === activePost.id) {
        const newCommentObj: Comment = {
          id: post.comments.length + 1,
          user: "You",
          avatar: "Y",
          content: newComment,
          time: "Just now"
        };
        
        return {
          ...post,
          comments: [...post.comments, newCommentObj]
        };
      }
      return post;
    });

    setCommunityPosts(updatedPosts);
    setNewComment('');
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
    });
  };

  const openComments = (post: Post) => {
    setActivePost(post);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community</h1>
            <p className="text-gray-600 mt-2">Connect with other members of the swap community</p>
          </div>
          <Button onClick={() => setIsNewPostOpen(true)}>
            <Share2 className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* New Post Dialog */}
        <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle>Create New Post</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsNewPostOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DialogDescription>
                Share your thoughts, questions, or swap requests with the community
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="post-content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="post-content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="col-span-3"
                  placeholder="What would you like to share?"
                  rows={5}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handlePostSubmit}>Post to Community</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Comments Dialog */}
        <Dialog open={!!activePost} onOpenChange={(open) => !open && setActivePost(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {activePost && (
              <>
                <DialogHeader>
                  <div className="flex justify-between items-center">
                    <DialogTitle>Comments</DialogTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setActivePost(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Original Post */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{activePost.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{activePost.user}</h3>
                          <p className="text-sm text-gray-500">{activePost.time}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{activePost.content}</p>
                    </CardContent>
                  </Card>

                  {/* Comments List */}
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {activePost.comments.map(comment => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar>
                          <AvatarFallback>{comment.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{comment.user}</h4>
                              <span className="text-xs text-gray-500">{comment.time}</span>
                            </div>
                            <p className="mt-1 text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex space-x-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                    />
                    <Button 
                      size="icon" 
                      onClick={handleCommentSubmit}
                      disabled={!newComment.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {communityPosts.map(post => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{post.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{post.user}</h3>
                      <p className="text-sm text-gray-500">{post.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{post.content}</p>
                  <div className="flex space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 mr-2 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                      {post.likes} Likes
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => openComments(post)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments.length} Comments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>1. Be respectful to all members</p>
                <p>2. No spam or self-promotion</p>
                <p>3. Keep discussions relevant to swapping</p>
                <p>4. Report any suspicious activity</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Swappers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Alex Chen', 'Emma Wilson', 'Jamal Smith', 'Sophia Lee'].map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;