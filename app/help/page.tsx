"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  HelpCircle, 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  RotateCcw,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const categories = [
    {
      title: "Shopping",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
      description: "Ordering, payments, and account management"
    },
    {
      title: "Shipping",
      icon: Truck,
      color: "bg-green-100 text-green-600",
      description: "Delivery, tracking, and shipping options"
    },
    {
      title: "Returns",
      icon: RotateCcw,
      color: "bg-orange-100 text-orange-600",
      description: "Returns, refunds, and exchanges"
    },
    {
      title: "Payment",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
      description: "Payment methods and security"
    }
  ]

  const faqs = [
    {
      category: "Shopping",
      question: "How do I place an order?",
      answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in, provide shipping and payment information, and confirm your order."
    },
    {
      category: "Shopping",
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 2 hours of placing it. After that, the order will be processed and cannot be changed. Contact our customer support for assistance."
    },
    {
      category: "Shipping",
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee. Delivery times may vary based on your location and product availability."
    },
    {
      category: "Shipping",
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section, or by using the tracking number sent to your email address."
    },
    {
      category: "Returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most products. Items must be unused and in original packaging. Some products may have different return terms. Return shipping costs may apply."
    },
    {
      category: "Returns",
      question: "How long does it take to process a refund?",
      answer: "Refunds are typically processed within 5-7 business days after we receive your returned item. The time for the refund to appear in your account depends on your payment method and bank."
    },
    {
      category: "Payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      category: "Payment",
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers."
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Help Center
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find answers to your questions and get the support you need.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-white text-gray-900 border-0 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h2>
            <p className="text-lg text-gray-600">Choose a category to find relevant help articles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover-lift cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color}`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find quick answers to common questions</p>
          </div>
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{faq.category}</Badge>
                      <span className="font-medium text-gray-900">{faq.question}</span>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No results found for "{searchQuery}"</p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-lg text-gray-600">Our support team is here to help you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                <Button>Start Chat</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak with a customer service representative</p>
                <Button variant="outline">+91 98765 43210</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
                <Button variant="outline">support@punchakshri.com</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 