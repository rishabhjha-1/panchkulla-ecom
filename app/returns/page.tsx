import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  RotateCcw, 
  Clock, 
  Package, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  FileText,
  Truck
} from "lucide-react"
import Link from "next/link"

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Log into your account and go to 'My Orders' to start a return",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    },
    {
      step: 2,
      title: "Package Item",
      description: "Securely package the item in its original packaging",
      icon: Package,
      color: "bg-green-100 text-green-600"
    },
    {
      step: 3,
      title: "Ship Back",
      description: "Use the provided shipping label to return the item",
      icon: Truck,
      color: "bg-orange-100 text-orange-600"
    },
    {
      step: 4,
      title: "Get Refund",
      description: "Receive your refund within 5-7 business days",
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600"
    }
  ]

  const returnPolicy = [
    {
      title: "30-Day Return Window",
      description: "Most items can be returned within 30 days of delivery",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Original Condition",
      description: "Items must be unused and in original packaging",
      icon: Package,
      color: "text-green-600"
    },
    {
      title: "Free Returns",
      description: "Free return shipping for eligible items",
      icon: Truck,
      color: "text-orange-600"
    },
    {
      title: "Quick Refunds",
      description: "Refunds processed within 5-7 business days",
      icon: CheckCircle,
      color: "text-purple-600"
    }
  ]

  const nonReturnableItems = [
    "Personal care items (for hygiene reasons)",
    "Digital products and software",
    "Gift cards and vouchers",
    "Custom or personalized items",
    "Items marked as 'Final Sale'",
    "Damaged or used items"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RotateCcw className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Returns & Refunds
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Easy returns and quick refunds. Your satisfaction is our priority.
          </p>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Return Policy</h2>
            <p className="text-lg text-gray-600">Simple, transparent, and customer-friendly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnPolicy.map((policy, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6">
                  <policy.icon className={`h-12 w-12 mx-auto mb-4 ${policy.color}`} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{policy.title}</h3>
                  <p className="text-gray-600">{policy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
            <p className="text-lg text-gray-600">Follow these simple steps to return your item</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <Card key={index} className="relative hover-lift">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${step.color}`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </Badge>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Return Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Return Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Day 1-30</h4>
                    <p className="text-gray-600">Return window is open for most items</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Day 1-3</h4>
                    <p className="text-gray-600">Return request processed and shipping label provided</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Day 3-7</h4>
                    <p className="text-gray-600">Item received and inspected at our facility</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Day 5-7</h4>
                    <p className="text-gray-600">Refund processed and sent to your account</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Non-Returnable Items */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
            <p className="text-lg text-gray-600">Some items cannot be returned for safety and hygiene reasons</p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nonReturnableItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Common questions about returns and refunds</p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long do I have to return an item?</h3>
                <p className="text-gray-700">Most items can be returned within 30 days of delivery. Some items may have different return windows, which will be clearly marked on the product page.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I have to pay for return shipping?</h3>
                <p className="text-gray-700">We offer free return shipping for most items. If return shipping costs apply, they will be clearly communicated during the return process.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to get my refund?</h3>
                <p className="text-gray-700">Refunds are typically processed within 5-7 business days after we receive your returned item. The time for the refund to appear in your account depends on your payment method and bank.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if my item arrives damaged?</h3>
                <p className="text-gray-700">If your item arrives damaged, please contact our customer support immediately. We'll arrange for a replacement or refund at no additional cost to you.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start a Return?</h2>
          <p className="text-xl mb-8 opacity-90">
            Log into your account to initiate a return or contact our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" variant="secondary">
                Start Return
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