"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  FileText,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  Globe,
  Calendar,
  Download,
  Star,
  MessageCircle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for ministry details
const ministryDetails = {
  "home-affairs": {
    id: "home-affairs",
    name: "Ministry of Home Affairs",
    description:
      "The Ministry of Home Affairs is responsible for national identity, citizenship, immigration, and civil registration services. We ensure the security and proper documentation of all citizens and residents of Lesotho.",
    minister: "Hon. Motlalentoa Letsosa",
    location: "Maseru",
    address: "P.O. Box 174, Maseru 100",
    phone: "+266 2232 3034",
    email: "info@homeaffairs.gov.ls",
    website: "www.homeaffairs.gov.ls",
    established: "1966",
    vision:
      "To be a leading ministry in providing efficient, accessible and quality services to all citizens and residents of Lesotho.",
    mission:
      "To provide comprehensive home affairs services that promote national security, facilitate legal documentation, and support citizen welfare through efficient service delivery.",
    services: [
      {
        name: "National Identity Cards",
        description: "Application and renewal of national identity documents",
        fee: "M60.00",
        processingTime: "7-14 days",
        requirements: ["Birth Certificate", "Proof of Address", "Passport Photos"],
        status: "Available",
      },
      {
        name: "Passports",
        description: "New passport applications and renewals",
        fee: "M350.00",
        processingTime: "14-21 days",
        requirements: ["National ID", "Birth Certificate", "Passport Photos", "Travel Itinerary"],
        status: "Available",
      },
      {
        name: "Birth Certificates",
        description: "Registration and issuance of birth certificates",
        fee: "M25.00",
        processingTime: "3-5 days",
        requirements: ["Hospital Birth Record", "Parent IDs", "Marriage Certificate (if applicable)"],
        status: "Available",
      },
      {
        name: "Marriage Certificates",
        description: "Registration of marriages and issuance of certificates",
        fee: "M50.00",
        processingTime: "Same day",
        requirements: ["IDs of both parties", "Witnesses", "Marriage Officer"],
        status: "Available",
      },
    ],
    departments: [
      {
        name: "Civil Registration",
        head: "Mrs. Mamello Thabane",
        description: "Handles birth, death, and marriage registrations",
        services: ["Birth Registration", "Death Registration", "Marriage Registration"],
        contact: "+266 2232 3035",
      },
      {
        name: "Immigration & Passport Services",
        head: "Mr. Tšepo Molapo",
        description: "Manages passport issuance and immigration services",
        services: ["Passport Applications", "Visa Processing", "Immigration Permits"],
        contact: "+266 2232 3036",
      },
      {
        name: "National Identity & Civil Registry",
        head: "Mrs. Lineo Khiba",
        description: "Oversees national identity card system and civil registry",
        services: ["National ID Cards", "Civil Registry Management", "Identity Verification"],
        contact: "+266 2232 3037",
      },
    ],
    offices: [
      {
        name: "Maseru Main Office",
        address: "Kingsway Road, Maseru",
        phone: "+266 2232 3034",
        hours: "8:00 AM - 4:30 PM",
        services: "All Services",
      },
      {
        name: "Leribe District Office",
        address: "Main Street, Hlotse",
        phone: "+266 2240 0123",
        hours: "8:00 AM - 4:30 PM",
        services: "Basic Services",
      },
      {
        name: "Mafeteng District Office",
        address: "Hospital Road, Mafeteng",
        phone: "+266 2270 0456",
        hours: "8:00 AM - 4:30 PM",
        services: "Basic Services",
      },
    ],
    news: [
      {
        title: "New Online Passport Application System Launched",
        date: "2024-01-20",
        summary: "Citizens can now apply for passports online, reducing processing time and improving convenience.",
      },
      {
        title: "Extended Hours for National ID Services",
        date: "2024-01-15",
        summary: "Main office now open until 6:00 PM on weekdays to serve more citizens.",
      },
      {
        title: "Mobile Registration Units Deployed",
        date: "2024-01-10",
        summary: "Mobile units will visit remote areas to provide birth registration services.",
      },
    ],
    stats: {
      employees: 450,
      offices: 12,
      servicesOffered: 15,
      citizensServed: "125,000+",
      satisfaction: "4.2/5",
    },
    status: "active",
    lastUpdated: "2024-01-20",
  },
}

export default function MinistryDetailPage() {
  const params = useParams()
  const ministryId = params.id as string
  const ministry = ministryDetails[ministryId]

  if (!ministry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ministry Not Found</h1>
          <p className="text-gray-600 mb-4">The requested ministry could not be found.</p>
          <Link href="/ministries">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ministries
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/ministries">
              <Button variant="ghost" className="text-white hover:bg-white/10 mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Ministries
              </Button>
            </Link>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{ministry.name}</h1>
                <p className="text-blue-200 text-lg mb-4">{ministry.description}</p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Minister: {ministry.minister}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Established: {ministry.established}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Rating: {ministry.stats.satisfaction}</span>
                  </div>
                </div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-[#002366] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#002366]">{ministry.stats.employees}</p>
              <p className="text-sm text-gray-600">Employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Building2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{ministry.stats.offices}</p>
              <p className="text-sm text-gray-600">Offices</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{ministry.stats.servicesOffered}</p>
              <p className="text-sm text-gray-600">Services</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{ministry.stats.citizensServed}</p>
              <p className="text-sm text-gray-600">Citizens Served</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="offices">Offices</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vision & Mission</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Vision</h4>
                      <p className="text-gray-600">{ministry.vision}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Mission</h4>
                      <p className="text-gray-600">{ministry.mission}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Services Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {ministry.services.slice(0, 4).map((service, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Fee: {service.fee}</span>
                            <span>{service.processingTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>{ministry.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{ministry.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <span>{ministry.website}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <span>{ministry.address}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-[#002366] hover:bg-[#001a4d]">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Ministry
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Brochure
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <div className="grid gap-6">
              {ministry.services.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge className="bg-green-100 text-green-800">{service.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Fee</h5>
                        <p className="text-lg font-bold text-green-600">{service.fee}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Processing Time</h5>
                        <p className="text-gray-700">{service.processingTime}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Requirements</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center space-x-2">
                              <ChevronRight className="w-3 h-3" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/services/${service.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Button className="bg-[#002366] hover:bg-[#001a4d]">Apply Now</Button>
                      </Link>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="departments" className="mt-6">
            <div className="grid gap-6">
              {ministry.departments.map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <p className="text-gray-600">{dept.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Department Head</h5>
                        <p className="text-gray-700 mb-4">{dept.head}</p>
                        <h5 className="font-semibold text-gray-900 mb-2">Contact</h5>
                        <p className="text-gray-700">{dept.contact}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Services Offered</h5>
                        <ul className="space-y-1">
                          {dept.services.map((service, serviceIndex) => (
                            <li key={serviceIndex} className="flex items-center space-x-2 text-gray-600">
                              <ChevronRight className="w-3 h-3" />
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offices" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministry.offices.map((office, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{office.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <span className="text-gray-700">{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{office.hours}</span>
                    </div>
                    <div className="pt-2">
                      <Badge variant="outline">{office.services}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <div className="space-y-6">
              {ministry.news.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <p className="text-gray-600">{item.summary}</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
