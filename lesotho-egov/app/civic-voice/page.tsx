"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, FileText, Vote, AlertTriangle, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const civicFeatures = [
  {
    icon: MessageCircle,
    title: "Real-Time Support Chat",
    description: "Connect directly with government agents for immediate assistance with your queries and concerns.",
    href: "/civic-voice/chat",
    color: "bg-blue-100 text-blue-700",
    stats: "24/7 Available",
  },
  {
    icon: FileText,
    title: "Report a Problem",
    description: "Submit service issues and track their resolution. Help improve government services for everyone.",
    href: "/civic-voice/report",
    color: "bg-red-100 text-red-700",
    stats: "1,234 Reports Resolved",
  },
  {
    icon: Vote,
    title: "Participate in Governance",
    description: "Voice your opinion on policies, participate in surveys, and engage in democratic processes.",
    href: "/civic-voice/participate",
    color: "bg-green-100 text-green-700",
    stats: "15 Active Surveys",
  },
  {
    icon: AlertTriangle,
    title: "Community Alerts",
    description: "Stay informed about local issues and share important community updates with your neighbors.",
    href: "/civic-voice/local-alerts",
    color: "bg-orange-100 text-orange-700",
    stats: "23 Active Alerts",
  },
]

const recentActivity = [
  {
    type: "chat",
    title: "New chat session started",
    description: "Agent Palesa is helping with passport renewal",
    time: "2 minutes ago",
    status: "active",
  },
  {
    type: "report",
    title: "Water shortage reported in Maseru",
    description: "Issue #CV-2024-001 has been escalated to Water Authority",
    time: "1 hour ago",
    status: "in-progress",
  },
  {
    type: "survey",
    title: "Digital Services Survey",
    description: "87% completion rate - closes in 3 days",
    time: "2 hours ago",
    status: "active",
  },
  {
    type: "alert",
    title: "Road closure in Berea",
    description: "Main Street blocked due to construction",
    time: "4 hours ago",
    status: "verified",
  },
]

export default function CivicVoicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Civic Voice</h1>
              <p className="text-xl text-blue-200">
                Your platform to engage with government and strengthen your community
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8" />
                  <div>
                    <p className="text-sm text-blue-200">Active Citizens</p>
                    <p className="text-2xl font-bold">12,847</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=1200"
              alt="Citizens engaging with government"
              width={1200}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-[#002366] bg-opacity-70 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Make Your Voice Heard</h2>
                <p className="text-lg mb-6">Connect, report, participate, and stay informed - all in one place</p>
                <Link href="/civic-voice/chat">
                  <Button size="lg" variant="secondary">
                    Start a Conversation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-[#002366]">How Can We Help You Today?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {civicFeatures.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{feature.stats}</span>
                      <ArrowRight className="w-4 h-4 text-[#002366]" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6 text-[#002366]">Recent Community Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {activity.type === "chat" && <MessageCircle className="w-5 h-5 text-blue-600" />}
                          {activity.type === "report" && <FileText className="w-5 h-5 text-red-600" />}
                          {activity.type === "survey" && <Vote className="w-5 h-5 text-green-600" />}
                          {activity.type === "alert" && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <p className="text-gray-600 text-sm">{activity.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{activity.time}</span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                activity.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : activity.status === "in-progress"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {activity.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#002366]">Impact Statistics</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
                    <p className="text-gray-600">Issues Resolved</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">15,234</div>
                    <p className="text-gray-600">Citizens Engaged</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
                    <p className="text-gray-600">Satisfaction Rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                    <p className="text-gray-600">Support Available</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-[#002366] to-blue-700 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
              <p className="text-lg mb-6">Join thousands of citizens who are actively shaping the future of Lesotho</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/civic-voice/chat">
                  <Button size="lg" variant="secondary">
                    Start Chatting
                  </Button>
                </Link>
                <Link href="/civic-voice/report">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#002366]"
                  >
                    Report an Issue
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
