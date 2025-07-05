"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  verified: boolean
}

const mockReviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Rahul Sharma",
      avatar: "/placeholder-user.jpg"
    },
    rating: 5,
    title: "Excellent Quality Product",
    comment: "This product exceeded my expectations. The quality is outstanding and it arrived in perfect condition. Highly recommended!",
    date: "2024-01-15",
    helpful: 12,
    verified: true
  },
  {
    id: "2",
    user: {
      name: "Priya Patel",
      avatar: "/placeholder-user.jpg"
    },
    rating: 4,
    title: "Great Value for Money",
    comment: "Good product at a reasonable price. The delivery was fast and the packaging was secure. Would buy again.",
    date: "2024-01-10",
    helpful: 8,
    verified: true
  },
  {
    id: "3",
    user: {
      name: "Amit Kumar",
      avatar: "/placeholder-user.jpg"
    },
    rating: 5,
    title: "Perfect for my needs",
    comment: "Exactly what I was looking for. The product is well-made and functions perfectly. Very satisfied with my purchase.",
    date: "2024-01-08",
    helpful: 15,
    verified: false
  }
]

export function ProductReviews({ productId }: { productId: string }) {
  const [reviews] = useState<Review[]>(mockReviews)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const totalReviews = reviews.length

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Customer Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Review Summary */}
        <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(averageRating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  )} 
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">{totalReviews} reviews</div>
          </div>
          
          <div className="flex-1">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length
                const percentage = (count / totalReviews) * 100
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-4">{rating}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.user.name}</span>
                    {review.verified && (
                      <Badge variant="outline" className="text-xs">Verified Purchase</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < review.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"
                          )} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                  
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {reviews.length > 2 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? "Show Less" : `Show All ${totalReviews} Reviews`}
            </Button>
          </div>
        )}

        {/* Write Review Button */}
        <div className="text-center pt-4 border-t">
          <Button>
            Write a Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
} 