import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, Lock, Users, FileText } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Personal information (name, email, phone number, address)",
        "Payment information (processed securely through our payment partners)",
        "Order history and preferences",
        "Device information and browsing behavior",
        "Communication records with our support team"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Process and fulfill your orders",
        "Provide customer support and respond to inquiries",
        "Send order confirmations and updates",
        "Improve our products and services",
        "Send promotional offers (with your consent)",
        "Prevent fraud and ensure security"
      ]
    },
    {
      title: "Information Sharing",
      icon: FileText,
      content: [
        "We do not sell, trade, or rent your personal information",
        "Share with trusted third-party service providers (payment processors, shipping partners)",
        "Comply with legal obligations and law enforcement requests",
        "Protect our rights and prevent fraud",
        "With your explicit consent for specific purposes"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Encryption of sensitive data during transmission",
        "Secure storage of personal information",
        "Regular security audits and updates",
        "Limited access to personal data on a need-to-know basis",
        "Compliance with industry security standards"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                <p className="text-gray-700 mb-4">
                  At Punchakshri, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                  or use our services.
                </p>
                <p className="text-gray-700">
                  By using our services, you agree to the collection and use of information in accordance with this policy. 
                  If you have any questions about this Privacy Policy, please contact us.
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
                  <ul className="space-y-2">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, 
                  and understand where our visitors are coming from.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Essential cookies for website functionality</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Analytics cookies to improve our services</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Marketing cookies for personalized content</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Access and review your personal information</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Update or correct inaccurate information</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Request deletion of your personal data</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Opt-out of marketing communications</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Withdraw consent for data processing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We retain your personal information for as long as necessary to provide our services, 
                  comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Account information: Until account deletion</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Order information: 7 years for tax purposes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Marketing data: Until consent withdrawal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Our services are not intended for children under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Posting the new Privacy Policy on this page</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Sending you an email notification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Updating the "Last updated" date</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-4">
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">Email: privacy@punchakshri.com</span>
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