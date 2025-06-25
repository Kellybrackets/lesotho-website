"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, CreditCard, MapPin, Heart, GraduationCap, Shield, Truck, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const featuredServices = [
  {
    icon: FileText,
    title: "National ID",
    subtitle: "Apply or renew your ID",
    href: "/services/national-id",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: FileText,
    title: "Passport",
    subtitle: "Travel document services",
    href: "/services/passport",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: CreditCard,
    title: "Tax Filing",
    subtitle: "Submit tax returns",
    href: "/services/tax-filing",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: MapPin,
    title: "Land Title",
    subtitle: "Property registration",
    href: "/services/land-title",
    color: "bg-orange-100 text-orange-700",
  },
]

const ministries = [
  {
    name: "Ministry of Health",
    icon: Heart,
    description: "Healthcare services and medical records",
    href: "/ministries/health",
    color: "bg-red-50 border-red-200",
  },
  {
    name: "Ministry of Home Affairs",
    icon: Shield,
    description: "Identity documents and civil registration",
    href: "/ministries/home-affairs",
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "Lesotho Revenue Authority",
    icon: CreditCard,
    description: "Tax services and customs",
    href: "/ministries/lra",
    color: "bg-green-50 border-green-200",
  },
  {
    name: "Land Administration Authority",
    icon: MapPin,
    description: "Land registration and property services",
    href: "/ministries/laa",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    name: "Ministry of Transport",
    icon: Truck,
    description: "Vehicle registration and licensing",
    href: "/ministries/transport",
    color: "bg-purple-50 border-purple-200",
  },
  {
    name: "Ministry of Education",
    icon: GraduationCap,
    description: "Educational services and certification",
    href: "/ministries/education",
    color: "bg-indigo-50 border-indigo-200",
  },
]

const news = [
  {
    title: "New Digital ID Cards Now Available",
    date: "2024-01-20",
    type: "announcement",
    urgent: false,
  },
  {
    title: "System Maintenance - January 25, 2024",
    date: "2024-01-22",
    type: "alert",
    urgent: true,
  },
  {
    title: "Mobile Money Integration Goes Live",
    date: "2024-01-18",
    type: "news",
    urgent: false,
  },
  {
    title: "Tax Filing Deadline Extended to March 31",
    date: "2024-01-15",
    type: "announcement",
    urgent: false,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-[#002366] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#002366] font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Mosotho</h1>
                <p className="text-sm text-blue-200">One Portal, All Government Services</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/help">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                  Help
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm" className="bg-white text-[#002366] border-white hover:bg-blue-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <Link href="/" className="text-[#002366] font-medium whitespace-nowrap border-b-2 border-[#002366] pb-2">
              Home
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-[#002366] whitespace-nowrap pb-2">
              Services
            </Link>
            <Link href="/civic-voice" className="text-gray-600 hover:text-[#002366] whitespace-nowrap pb-2">
              Civic Voice
            </Link>
            <Link href="/know" className="text-gray-600 hover:text-[#002366] whitespace-nowrap pb-2">
              Know Lesotho
            </Link>
            <Link href="/museum" className="text-gray-600 hover:text-[#002366] whitespace-nowrap pb-2">
              Museums
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-[#002366] whitespace-nowrap pb-2">
              Help
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="relative mb-8">
            <Image
              src="/placeholder.svg?height=300&width=800"
              alt="Basotho cultural landscape with traditional huts and mountains"
              width={800}
              height={300}
              className="mx-auto rounded-lg shadow-lg object-cover"
            />
            <div className="absolute inset-0 bg-[#002366] bg-opacity-40 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Mosotho</h2>
                <p className="text-xl md:text-2xl mb-8">One Portal, All Government Services</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for services, documents, or information..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg border-2 border-gray-300 focus:border-[#002366] rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-[#002366]">Featured Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{service.subtitle}</p>
                    <Button size="sm" className="bg-[#002366] hover:bg-blue-800">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries & Agencies */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-[#002366]">Ministries & Agencies</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry, index) => (
              <Link key={index} href={ministry.href}>
                <Card className={`hover:shadow-lg transition-shadow cursor-pointer h-full border-2 ${ministry.color}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <ministry.icon className="w-6 h-6 text-[#002366]" />
                      </div>
                      <CardTitle className="text-lg">{ministry.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{ministry.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Services
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-[#002366]">News & Announcements</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {news.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-[#002366]" />
                      {item.title}
                    </CardTitle>
                    {item.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">{item.date}</p>
                    <Badge variant="outline" className="text-xs capitalize">
                      {item.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-[#002366] text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Get Started Today</h3>
          <p className="text-xl text-blue-200 mb-8">Access all government services from one convenient portal</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Register Now
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 border-white text-white hover:bg-white hover:text-[#002366]"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold text-lg mb-4">Mosotho</h5>
              <p className="text-gray-400">Official digital service platform for the Kingdom of Lesotho</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/know" className="hover:text-white">
                    Know Lesotho
                  </Link>
                </li>
                <li>
                  <Link href="/museum" className="hover:text-white">
                    Museums
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/help#faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help#contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contact</h6>
              <div className="text-gray-400 space-y-2">
                <p>+266 2231 2345</p>
                <p>info@mosotho.gov.ls</p>
                <p>Maseru, Lesotho</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kingdom of Lesotho. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
