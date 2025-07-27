"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Star, Truck, Shield, Headphones, ArrowRight, ShoppingBag, Heart, Zap, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

// Default slides with images of girls in different dresses
const defaultSlides = [
  {
    id: 1,
    title: "Premium Shopping Experience",
    subtitle: "Discover curated products with exceptional quality",
    description: "Experience the best in online shopping with our premium services and exceptional customer care. Trusted by 10,000+ customers.",
    image: "/hero-slide-1.jpg", // Girl in elegant dress
    buttonText: "Explore Products",
    buttonLink: "/products",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
    badge: "Trusted by 10,000+ customers",
    features: [
      { icon: Shield, text: "Secure Payments" },
      { icon: Truck, text: "Fast Delivery" },
      { icon: CheckCircle, text: "Quality Guaranteed" }
    ]
  },
  {
    id: 2,
    title: "Exclusive Deals & Offers",
    subtitle: "Save big on premium products",
    description: "Get amazing discounts on our curated collection. Limited time offers on the best products with guaranteed quality and fast delivery.",
    image: "/hero-slide-2.jpg", // Girl in casual dress
    buttonText: "Shop Now",
    buttonLink: "/products",
    secondaryButtonText: "View Deals",
    secondaryButtonLink: "/categories",
    badge: "Limited Time Offers",
    features: [
      { icon: Zap, text: "Flash Sales" },
      { icon: Heart, text: "Wishlist Favorites" },
      { icon: Star, text: "Premium Quality" }
    ]
  },
  {
    id: 3,
    title: "24/7 Customer Support",
    subtitle: "We're here to help you",
    description: "Our dedicated support team is available round the clock to assist you with any questions or concerns. Your satisfaction is our priority.",
    image: "/hero-slide-3.jpg", // Girl in party dress
    buttonText: "Contact Us",
    buttonLink: "/contact",
    secondaryButtonText: "Get Help",
    secondaryButtonLink: "/help",
    badge: "24/7 Support Available",
    features: [
      { icon: Headphones, text: "Live Chat" },
      { icon: Shield, text: "Secure Shopping" },
      { icon: CheckCircle, text: "Easy Returns" }
    ]
  }
]

interface HeroSlide {
  _id?: string
  id?: number
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  badge: string
  features: Array<{ icon: any; text: string }>
  isActive?: boolean
  order?: number
}

interface HeroSliderProps {
  slides?: HeroSlide[]
}

export function HeroSlider({ slides = defaultSlides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-beige-100 to-amber-100 text-amber-900 py-20 lg:py-32 overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-amber-200/20"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(146, 64, 14, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            {/* Slide Content */}
            <div className="relative h-96 lg:h-auto">
              
              {/* Mobile Hero Image - Full Width */}
              <div className="lg:hidden mb-8">
                <div className="relative">
                  {slides.map((slide, index) => (
                    <div
                      key={slide._id || slide.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={400}
                        height={500}
                        className="w-full h-96 object-cover rounded-xl shadow-xl"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent rounded-xl"></div>
                    </div>
                  ))}
                </div>
              </div>
              {slides.map((slide, index) => (
                <div
                  key={slide._id || slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 bg-amber-200/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
                    <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium">{slide.badge}</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                      {slide.subtitle}
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl mb-8 text-amber-800 animate-fade-in-delay leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-delay-2">
                    <Link href={slide.buttonLink}>
                      <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 hover:from-amber-700 hover:to-orange-700 group hover:scale-105 transition-all duration-300 shadow-lg">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        {slide.buttonText}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href={slide.secondaryButtonLink}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-amber-300 text-amber-800 hover:bg-amber-200 hover:text-amber-900 bg-amber-100/50 backdrop-blur-sm group hover:scale-105 transition-all duration-300"
                      >
                        {slide.secondaryButtonText}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12 animate-fade-in-delay-2">
                    {slide.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <feature.icon className="h-5 w-5 text-amber-600" />
                        <span className="text-sm text-amber-800">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Image Slider */}
          <div className="hidden lg:block animate-fade-in-delay-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-amber-100/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-300/50 overflow-hidden">
                {/* Main Hero Image - Full Size */}
                <div className="relative mb-4">
                  {slides.map((slide, index) => (
                    <div
                      key={slide._id || slide.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={700}
                        height={800}
                        className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent rounded-lg"></div>
                    </div>
                  ))}
                </div>
                
                {/* Feature Cards - Smaller and positioned below */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <div className="bg-amber-200/60 rounded-lg p-3 backdrop-blur-sm">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg mb-2"></div>
                      <h3 className="font-semibold text-amber-900 text-sm">Premium Quality</h3>
                      <p className="text-amber-800 text-xs">Curated selection</p>
                    </div>
                    <div className="bg-amber-200/60 rounded-lg p-3 backdrop-blur-sm">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg mb-2"></div>
                      <h3 className="font-semibold text-amber-900 text-sm">Fast Delivery</h3>
                      <p className="text-amber-800 text-xs">3-5 business days</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-amber-200/60 rounded-lg p-3 backdrop-blur-sm">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg mb-2"></div>
                      <h3 className="font-semibold text-amber-900 text-sm">Best Prices</h3>
                      <p className="text-amber-800 text-xs">Competitive rates</p>
                    </div>
                    <div className="bg-amber-200/60 rounded-lg p-3 backdrop-blur-sm">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg mb-2"></div>
                      <h3 className="font-semibold text-amber-900 text-sm">24/7 Support</h3>
                      <p className="text-amber-800 text-xs">Always here to help</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-amber-200/80 hover:bg-amber-300/80 text-amber-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-200/80 hover:bg-amber-300/80 text-amber-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-amber-600 scale-125'
                : 'bg-amber-300 hover:bg-amber-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
} 