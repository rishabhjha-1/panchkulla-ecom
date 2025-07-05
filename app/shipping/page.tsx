import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Truck, 
  Clock, 
  MapPin, 
  Package, 
  Shield, 
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: "Standard Delivery",
      duration: "3-5 business days",
      price: "Free on orders above ₹999",
      icon: Truck,
      color: "bg-blue-100 text-blue-600",
      features: ["Free on orders above ₹999", "₹99 for orders below ₹999", "Tracking included", "Signature required"]
    },
    {
      name: "Express Delivery",
      duration: "1-2 business days",
      price: "₹199",
      icon: Zap,
      color: "bg-green-100 text-green-600",
      features: ["Fast delivery", "Priority handling", "Real-time tracking", "SMS updates"]
    },
    {
      name: "Same Day Delivery",
      duration: "Same day (select cities)",
      price: "₹299",
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
      features: ["Available in major cities", "Order by 12 PM", "Guaranteed delivery", "Premium service"]
    }
  ]

  const deliveryFeatures = [
    {
      title: "Free Shipping",
      description: "Free standard delivery on orders above ₹999",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Secure Packaging",
      description: "All items are carefully packaged for safe delivery",
      icon: Shield,
      color: "text-green-600"
    },
    {
      title: "Real-time Tracking",
      description: "Track your order from warehouse to doorstep",
      icon: MapPin,
      color: "text-purple-600"
    },
    {
      title: "Fast Delivery",
      description: "Quick and reliable delivery across India",
      icon: Truck,
      color: "text-orange-600"
    }
  ]

  const deliveryCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam",
    "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik",
    "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", "Varanasi", "Srinagar"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Truck className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shipping Information
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Fast, reliable, and secure delivery to your doorstep.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Options</h2>
            <p className="text-lg text-gray-600">Choose the delivery option that works best for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${option.color}`}>
                    <option.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{option.name}</CardTitle>
                  <div className="space-y-2">
                    <Badge variant="outline">{option.duration}</Badge>
                    <p className="text-lg font-semibold text-blue-600">{option.price}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Shipping?</h2>
            <p className="text-lg text-gray-600">We ensure your orders reach you safely and on time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6">
                  <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Order Placed</h4>
                    <p className="text-gray-600">Order confirmation sent immediately</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Order Processing</h4>
                    <p className="text-gray-600">1-2 business days for order preparation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Shipped</h4>
                    <p className="text-gray-600">Tracking number provided via email and SMS</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Delivered</h4>
                    <p className="text-gray-600">Package delivered to your doorstep</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Delivery Cities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cities We Deliver To</h2>
            <p className="text-lg text-gray-600">Fast delivery across major cities in India</p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {deliveryCities.map((city, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">{city}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't see your city? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> to check delivery availability.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tracking Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h2>
            <p className="text-lg text-gray-600">Stay updated on your delivery status</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  How to Track
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Check Your Email</h4>
                      <p className="text-gray-600">Tracking number sent to your email address</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Visit My Orders</h4>
                      <p className="text-gray-600">Log into your account and check 'My Orders'</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-time Updates</h4>
                      <p className="text-gray-600">Get SMS and email updates on delivery status</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Delivery Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Failed Delivery</h4>
                      <p className="text-gray-600">Contact us if delivery attempts fail</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Damaged Package</h4>
                      <p className="text-gray-600">Report damage immediately upon receipt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Wrong Address</h4>
                      <p className="text-gray-600">Update address before order ships</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-xl mb-8 opacity-90">
            Enjoy fast and reliable delivery on all your orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 