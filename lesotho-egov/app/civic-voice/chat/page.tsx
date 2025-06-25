"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, User, Bot, Clock, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "agent"
  content: string
  timestamp: Date
  status?: "sent" | "delivered" | "read"
  attachments?: string[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "agent",
    content: "Hello! I'm Palesa from the Ministry of Home Affairs. How can I assist you today?",
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    status: "read",
  },
  {
    id: "2",
    type: "agent",
    content:
      "I can help you with passport applications, ID renewals, birth certificates, and other civil registration services. What would you like to know?",
    timestamp: new Date(Date.now() - 280000),
    status: "read",
  },
]

const quickActions = [
  { label: "Track My Case", action: "track" },
  { label: "Passport Status", action: "passport" },
  { label: "ID Renewal", action: "id" },
  { label: "Birth Certificate", action: "birth" },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [agentStatus, setAgentStatus] = useState<"online" | "away" | "busy">("online")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("civicChatMessages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("civicChatMessages", JSON.stringify(messages))
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = generateAgentResponse(inputMessage)
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: agentResponse,
        timestamp: new Date(),
        status: "read",
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 2000)
  }

  const generateAgentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("passport")) {
      return "For passport applications, you'll need your National ID, birth certificate, and passport photos. The fee is M350 and processing takes 10-14 days. Would you like me to help you start an application?"
    }

    if (lowerMessage.includes("id") || lowerMessage.includes("national")) {
      return "National ID applications require a birth certificate, proof of address, and passport photo. The fee is M50 and takes 5-7 days. I can guide you through the online application process."
    }

    if (lowerMessage.includes("track") || lowerMessage.includes("status")) {
      return "To track your application, I'll need your reference number. It should start with letters like NID, PSP, or BC followed by numbers. Do you have your reference number?"
    }

    if (lowerMessage.includes("birth")) {
      return "Birth certificates cost M25 and take 2-3 days to process. You'll need the hospital birth record and parent IDs. Would you like to start the application process?"
    }

    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with today? I'm here to assist with all your government service needs."
    }

    return "I understand your query. Let me connect you with the appropriate department or provide you with the relevant information. Could you please provide more details about what specific service you need help with?"
  }

  const handleQuickAction = (action: string) => {
    let message = ""
    switch (action) {
      case "track":
        message = "I need to track my application status"
        break
      case "passport":
        message = "What's the status of my passport application?"
        break
      case "id":
        message = "I want to renew my National ID"
        break
      case "birth":
        message = "I need a birth certificate"
        break
    }
    setInputMessage(message)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Link href="/civic-voice">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Civic Voice
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Government Support Chat</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${agentStatus === "online" ? "bg-green-400" : "bg-yellow-400"}`}
                ></div>
                <span className="text-sm text-blue-200">
                  Agent Palesa - {agentStatus === "online" ? "Online" : "Away"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="w-5 h-5" />
                    <span>Live Support Chat</span>
                  </CardTitle>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Secure
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start space-x-2 max-w-[80%]`}>
                      {message.type === "agent" && (
                        <div className="w-8 h-8 bg-[#002366] rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user" ? "bg-[#002366] text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                          {message.type === "user" && message.status && (
                            <span className="text-xs opacity-70">
                              {message.status === "sent" && "✓"}
                              {message.status === "delivered" && "✓✓"}
                              {message.status === "read" && "✓✓"}
                            </span>
                          )}
                        </div>
                      </div>
                      {message.type === "user" && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-[#002366] rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
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
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} className="bg-[#002366] hover:bg-blue-800">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction(action.action)}
                  >
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Chat Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Started: {formatTime(new Date(Date.now() - 300000))}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Agent: Palesa Mokoena</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Secure Connection</span>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/help">
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Help Center
                  </Button>
                </Link>
                <Link href="/civic-voice/report">
                  <Button variant="outline" size="sm" className="w-full">
                    Report an Issue
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
