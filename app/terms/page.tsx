import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, CheckCircle, Shield } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: "By accessing and using Punchakshri's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "Use License",
      icon: FileText,
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on Punchakshri's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      title: "User Account",
      icon: Shield,
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password."
    },
    {
      title: "Product Information",
      icon: AlertTriangle,
      content: "We strive to display accurate product information, including prices and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm opacity-90">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700">
                  These Terms of Service govern your use of the Punchakshri website and services. 
                  By using our services, you agree to these terms in full. If you disagree with these terms 
                  or any part of these terms, you must not use our services.
                </p>
              </CardContent>
            </Card>

            {/* Main Sections */}
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className="h-5 w-5 text-blue-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{section.content}</p>
                </CardContent>
              </Card>
            ))}

            {/* Additional Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ordering and Payment</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• All orders are subject to acceptance and availability</li>
                    <li>• Prices are subject to change without notice</li>
                    <li>• Payment must be made at the time of ordering</li>
                    <li>• We accept all major credit cards and digital payment methods</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Shipping and Delivery</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Delivery times are estimates and may vary</li>
                    <li>• Risk of loss and title pass to you upon delivery</li>
                    <li>• Shipping costs are calculated at checkout</li>
                    <li>• Free shipping available on orders above ₹999</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Returns and Refunds</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 30-day return policy for most items</li>
                    <li>• Items must be unused and in original packaging</li>
                    <li>• Return shipping costs may apply</li>
                    <li>• Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card>
              <CardHeader>
                <CardTitle>Prohibited Uses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">You may not use our services for any unlawful purpose or to solicit others to perform unlawful acts. Specifically, you agree not to:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Violate any applicable laws or regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Infringe upon or violate our intellectual property rights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Harass, abuse, insult, harm, defame, or discriminate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Submit false or misleading information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Attempt to gain unauthorized access to our systems</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  In no event shall Punchakshri, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Your use or inability to use the service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Any unauthorized access to or use of our servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Any interruption or cessation of transmission to or from the service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Any bugs, viruses, or other harmful code</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. 
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p className="text-gray-700">
                  What constitutes a material change will be determined at our sole discretion. By continuing to access or use 
                  our service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Email: legal@punchakshri.com</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Phone: +91 98765 43210</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Address: 123 Main Street, Panchkula, Haryana 134109</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 