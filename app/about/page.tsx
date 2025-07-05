import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  ShoppingBag, 
  Truck, 
  Shield, 
  Heart, 
  Users, 
  Award, 
  Target, 
  Globe,
  Star,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Heart },
    { label: "Products Sold", value: "50,000+", icon: ShoppingBag },
    { label: "Years Experience", value: "5+", icon: Award },
    { label: "Cities Served", value: "25+", icon: Globe },
  ]

  const values = [
    {
      title: "Quality First",
      description: "We never compromise on quality. Every product in our store meets the highest standards.",
      icon: Star,
    },
    {
      title: "Customer Satisfaction",
      description: "Your satisfaction is our priority. We go above and beyond to ensure you're happy.",
      icon: Heart,
    },
    {
      title: "Trust & Reliability",
      description: "Building trust through transparent pricing, secure payments, and reliable delivery.",
      icon: Shield,
    },
    {
      title: "Fast Delivery",
      description: "Quick and efficient delivery to your doorstep with real-time tracking.",
      icon: Truck,
    },
  ]

  const team = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      image: "/placeholder-user.jpg",
      description: "Passionate about creating the best shopping experience for customers.",
    },
    {
      name: "Priya Patel",
      role: "Head of Operations",
      image: "/placeholder-user.jpg",
      description: "Ensuring smooth operations and excellent customer service.",
    },
    {
      name: "Amit Kumar",
      role: "Head of Technology",
      image: "/placeholder-user.jpg",
      description: "Building innovative solutions to enhance your shopping experience.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Punchakshri
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your trusted partner in online shopping, delivering quality products and exceptional service since 2019.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To provide our customers with the best online shopping experience by offering high-quality products, 
                competitive prices, and exceptional customer service. We believe in making quality products accessible to everyone.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Quality products at competitive prices</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Fast and reliable delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Excellent customer support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Secure and transparent transactions</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become the leading e-commerce platform in India, known for our commitment to quality, 
                customer satisfaction, and innovation. We aim to create a seamless shopping experience 
                that makes our customers' lives easier and more enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and help us deliver the best experience to our customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Punchakshri who work tirelessly to bring you the best shopping experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">{member.role}</Badge>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover our amazing collection of products and experience the Punchakshri difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Browse Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 