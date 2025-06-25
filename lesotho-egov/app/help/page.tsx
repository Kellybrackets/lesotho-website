"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, Bot, User } from "lucide-react"

const faqData = [
  {
    question: "How do I apply for a National ID?",
    answer:
      "You can apply for a National ID online through our services portal. You'll need your birth certificate, proof of address, and a passport photo. The process takes 5-7 business days and costs M50.",
  },
  {
    question: "What documents do I need for a passport application?",
    answer:
      "For a passport application, you need your National ID, birth certificate, passport photos, and proof of payment (M350). Processing takes 10-14 business days.",
  },
  {
    question: "How can I track my application status?",
    answer:
      "You can track your application status by logging into your dashboard or using the reference number provided when you submitted your application.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept Mobile Money (M-Pesa, EcoCash), credit/debit cards, bank transfers, and payment vouchers for in-person payments.",
  },
  {
    question: "How do I register for voter registration?",
    answer:
      "Voter registration is free and requires your National ID and proof of address. You can complete the process online in just one day.",
  },
  {
    question: "Can I renew my driver's license online?",
    answer:
      "Yes, you can renew your driver's license online. You'll need your current license, National ID, and medical certificate. The fee is M120 and processing takes 3-5 days.",
  },
  {
    question: "What if I lost my documents?",
    answer:
      "If you've lost important documents, you can apply for replacements through our services portal. You'll need to provide an affidavit and pay the replacement fee.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact us through this help page, call +266 2231 2345, email support@mosotho.gov.ls, or visit our offices in Maseru during business hours.",
  },
]

const chatMessages = [
  { type: "bot", message: "Hello! I'm here to help you with Mosotho services. How can I assist you today?" },
]

export default function HelpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState(chatMessages)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Add user message
    const newMessages = [...messages, { type: "user", message: chatInput }]

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(chatInput)
      setMessages([...newMessages, { type: "bot", message: botResponse }])
    }, 1000)

    setMessages(newMessages)
    setChatInput("")
  }

  const getBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("id") || lowerInput.includes("national")) {
      return "For National ID applications, you need a birth certificate, proof of address, and passport photo. The fee is M50 and processing takes 5-7 days. Would you like me to guide you to the application form?"
    }

    if (lowerInput.includes("passport")) {
      return "Passport applications require your National ID, birth certificate, and passport photos. The fee is M350 and takes 10-14 days to process. You can apply online through our services portal."
    }

    if (lowerInput.includes("track") || lowerInput.includes("status")) {
      return "You can track your application status by logging into your dashboard with your reference number. Would you like me to help you access the tracking system?"
    }

    if (lowerInput.includes("payment") || lowerInput.includes("pay")) {
      return "We accept Mobile Money, credit/debit cards, bank transfers, and payment vouchers. All payments are secure and you'll receive a receipt immediately."
    }

    return "I understand you need help with that. For detailed assistance, please check our FAQ section below or contact our support team at +266 2231 2345. Is there anything specific I can help you find?"
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            <Button onClick={() => setIsSubmitted(false)} className="bg-[#002366] hover:bg-blue-800">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-xl text-blue-200">
            Get assistance with Mosotho services and find answers to common questions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your issue or question in detail..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#002366] hover:bg-blue-800">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#002366]" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">+266 2231 2345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#002366]" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">support@mosotho.gov.ls</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#002366]" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-600">
                      Government Complex
                      <br />
                      Maseru, Lesotho
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#002366]" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-gray-600">Mon-Fri: 8:00 AM - 4:30 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chatbot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Quick Help Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                    {messages.map((msg, index) => (
                      <div key={index} className={`mb-3 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex items-start space-x-2 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.type === "user" ? "bg-[#002366]" : "bg-gray-300"}`}
                          >
                            {msg.type === "user" ? (
                              <User className="w-3 h-3 text-white" />
                            ) : (
                              <Bot className="w-3 h-3 text-gray-600" />
                            )}
                          </div>
                          <div
                            className={`rounded-lg p-2 text-sm ${msg.type === "user" ? "bg-[#002366] text-white" : "bg-white border"}`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type your question..."
                      className="flex-1"
                    />
                    <Button type="submit" size="sm" className="bg-[#002366] hover:bg-blue-800">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Application Status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Payment Issues
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Document Requirements
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Technical Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
