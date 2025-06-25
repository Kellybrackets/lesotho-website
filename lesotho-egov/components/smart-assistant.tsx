"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, X, Bot, User, ExternalLink, ArrowRight } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: Array<{
    text: string
    action: string
    href?: string
  }>
}

const initialMessage: Message = {
  id: "1",
  type: "assistant",
  content:
    "Hello! I'm your AI assistant for Mosotho government services. I can help you find information, guide you through processes, or connect you with the right department. What would you like to know?",
  timestamp: new Date(),
  suggestions: [
    { text: "How do I get a land title?", action: "query" },
    { text: "Where's the nearest school?", action: "query" },
    { text: "Apply for National ID", action: "link", href: "/services/national-id" },
    { text: "Talk to a Real Agent", action: "link", href: "/civic-voice/chat" },
  ],
}

export default function SmartAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(inputMessage)
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("land") || lowerQuery.includes("title")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "To get a land title in Lesotho, you'll need to apply through the Land Administration Authority. The process involves surveying, application submission, and verification. Here's what you can do:",
        timestamp: new Date(),
        suggestions: [
          { text: "Apply Now", action: "link", href: "/services/land-title" },
          { text: "Find LAA Office", action: "link", href: "/know?filter=government" },
          { text: "Get Help", action: "link", href: "/help" },
        ],
      }
    }

    if (lowerQuery.includes("school") || lowerQuery.includes("education")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "I can help you find schools in Lesotho. You can use our interactive map to locate schools by district, or I can guide you to specific educational services.",
        timestamp: new Date(),
        suggestions: [
          { text: "Find Schools on Map", action: "link", href: "/know?filter=school" },
          { text: "Education Services", action: "link", href: "/services?category=education" },
          { text: "Ministry of Education", action: "link", href: "/ministries/education" },
        ],
      }
    }

    if (lowerQuery.includes("passport") || lowerQuery.includes("travel")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "For passport services, you'll need your National ID, birth certificate, and passport photos. The fee is M350 and processing takes 10-14 days. I can help you get started:",
        timestamp: new Date(),
        suggestions: [
          { text: "Apply for Passport", action: "link", href: "/services/passport" },
          { text: "Track Application", action: "link", href: "/dashboard" },
          { text: "Required Documents", action: "link", href: "/help" },
        ],
      }
    }

    if (lowerQuery.includes("id") || lowerQuery.includes("national")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "National ID applications require a birth certificate, proof of address, and passport photo. The fee is M50 and takes 5-7 days to process. Let me help you:",
        timestamp: new Date(),
        suggestions: [
          { text: "Apply for National ID", action: "link", href: "/services/national-id" },
          { text: "Check Requirements", action: "link", href: "/help" },
          { text: "Find Home Affairs Office", action: "link", href: "/know?filter=government" },
        ],
      }
    }

    if (lowerQuery.includes("report") || lowerQuery.includes("problem") || lowerQuery.includes("issue")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "You can report government service issues through our Civic Voice platform. This helps improve services for everyone. Here are your options:",
        timestamp: new Date(),
        suggestions: [
          { text: "Report a Problem", action: "link", href: "/civic-voice/report" },
          { text: "Community Alerts", action: "link", href: "/civic-voice/local-alerts" },
          { text: "Chat with Agent", action: "link", href: "/civic-voice/chat" },
        ],
      }
    }

    if (lowerQuery.includes("health") || lowerQuery.includes("clinic") || lowerQuery.includes("hospital")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "I can help you find health services in Lesotho. You can locate clinics and hospitals on our map, or access health-related government services.",
        timestamp: new Date(),
        suggestions: [
          { text: "Find Health Centers", action: "link", href: "/know?filter=clinic" },
          { text: "Health Services", action: "link", href: "/services?category=health" },
          { text: "Ministry of Health", action: "link", href: "/ministries/health" },
        ],
      }
    }

    // Default response
    return {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content:
        "I understand you need help with that. Let me provide you with some options to get the assistance you need:",
      timestamp: new Date(),
      suggestions: [
        { text: "Browse All Services", action: "link", href: "/services" },
        { text: "Talk to Real Agent", action: "link", href: "/civic-voice/chat" },
        { text: "Visit Help Center", action: "link", href: "/help" },
        { text: "Explore Lesotho", action: "link", href: "/know" },
      ],
    }
  }

  const handleSuggestionClick = (suggestion: { text: string; action: string; href?: string }) => {
    if (suggestion.action === "query") {
      setInputMessage(suggestion.text)
    } else if (suggestion.action === "link" && suggestion.href) {
      window.open(suggestion.href, "_blank")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#002366] hover:bg-blue-800 shadow-lg z-50"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
          <CardHeader className="border-b bg-[#002366] text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Bot className="w-5 h-5" />
                <span>AI Assistant</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-blue-200">Online</span>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start space-x-2 max-w-[85%]`}>
                  {message.type === "assistant" && (
                    <div className="w-6 h-6 bg-[#002366] rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user" ? "bg-[#002366] text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">{formatTime(message.timestamp)}</span>

                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full justify-between text-xs"
                          >
                            <span>{suggestion.text}</span>
                            {suggestion.action === "link" ? (
                              <ExternalLink className="w-3 h-3" />
                            ) : (
                              <ArrowRight className="w-3 h-3" />
                            )}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.type === "user" && (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-[#002366] rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 text-sm"
              />
              <Button onClick={sendMessage} size="sm" className="bg-[#002366] hover:bg-blue-800">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
