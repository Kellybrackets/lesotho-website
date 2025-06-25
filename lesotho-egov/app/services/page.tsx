"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  FileText,
  Car,
  Building,
  Users,
  MapPin,
  CreditCard,
  UserCheck,
  Vote,
  Clock,
  CheckCircle,
  Heart,
  GraduationCap,
  Shield,
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "national-id",
    icon: UserCheck,
    title: "National ID Application",
    description: "Apply for or renew your national identity document",
    category: "identity",
    tag: "ID",
    fee: "M50",
    duration: "5-7 days",
    requirements: ["Birth Certificate", "Proof of Address", "Passport Photo"],
    status: "available",
  },
  {
    id: "passport",
    icon: FileText,
    title: "Passport Application",
    description: "Apply for new passport or renewal",
    category: "identity",
    tag: "ID",
    fee: "M350",
    duration: "10-14 days",
    requirements: ["National ID", "Birth Certificate", "Passport Photos"],
    status: "available",
  },
  {
    id: "drivers-license",
    icon: Car,
    title: "Driver's License",
    description: "Apply for or renew your driving license",
    category: "transport",
    tag: "Transport",
    fee: "M120",
    duration: "3-5 days",
    requirements: ["National ID", "Medical Certificate", "Driving Test"],
    status: "available",
  },
  {
    id: "vehicle-registration",
    icon: Car,
    title: "Vehicle Registration",
    description: "Register your vehicle or transfer ownership",
    category: "transport",
    tag: "Transport",
    fee: "M200",
    duration: "1-2 days",
    requirements: ["Proof of Purchase", "Insurance", "Roadworthy Certificate"],
    status: "available",
  },
  {
    id: "birth-certificate",
    icon: Users,
    title: "Birth Certificate",
    description: "Apply for birth certificate or certified copy",
    category: "civil",
    tag: "Civil",
    fee: "M25",
    duration: "2-3 days",
    requirements: ["Hospital Birth Record", "Parent IDs"],
    status: "available",
  },
  {
    id: "marriage-certificate",
    icon: Users,
    title: "Marriage Certificate",
    description: "Register marriage or get certified copy",
    category: "civil",
    tag: "Civil",
    fee: "M75",
    duration: "1-2 days",
    requirements: ["Marriage License", "Witness IDs", "Couple IDs"],
    status: "available",
  },
  {
    id: "business-registration",
    icon: Building,
    title: "Business Registration",
    description: "Register your business or company",
    category: "business",
    tag: "Business",
    fee: "M150",
    duration: "5-7 days",
    requirements: ["Business Plan", "Owner ID", "Proof of Address"],
    status: "available",
  },
  {
    id: "land-title",
    icon: MapPin,
    title: "Land Title Search",
    description: "Search and apply for land title documents",
    category: "land",
    tag: "Land",
    fee: "M100",
    duration: "7-10 days",
    requirements: ["Plot Number", "Survey Report", "Applicant ID"],
    status: "available",
  },
  {
    id: "voter-registration",
    icon: Vote,
    title: "Voter Registration",
    description: "Register to vote in elections",
    category: "civic",
    tag: "Civic",
    fee: "Free",
    duration: "1 day",
    requirements: ["National ID", "Proof of Address"],
    status: "available",
  },
  {
    id: "tax-filing",
    icon: CreditCard,
    title: "Tax Filing",
    description: "File your annual tax returns",
    category: "tax",
    tag: "Tax",
    fee: "Free",
    duration: "Immediate",
    requirements: ["Income Statements", "National ID", "Bank Details"],
    status: "available",
  },
  {
    id: "health-certificate",
    icon: Heart,
    title: "Health Certificate",
    description: "Medical fitness certificates",
    category: "health",
    tag: "Health",
    fee: "M80",
    duration: "2-3 days",
    requirements: ["Medical Examination", "National ID"],
    status: "available",
  },
  {
    id: "education-certificate",
    icon: GraduationCap,
    title: "Education Certificate",
    description: "Academic transcripts and certificates",
    category: "education",
    tag: "Education",
    fee: "M40",
    duration: "3-5 days",
    requirements: ["Student ID", "Academic Records"],
    status: "available",
  },
  {
    id: "security-clearance",
    icon: Shield,
    title: "Security Clearance",
    description: "Police clearance certificates",
    category: "security",
    tag: "Security",
    fee: "M60",
    duration: "7-10 days",
    requirements: ["National ID", "Fingerprints", "Application Form"],
    status: "available",
  },
]

const categories = [
  { id: "all", label: "All Services", count: services.length },
  { id: "identity", label: "Identity", count: services.filter((s) => s.category === "identity").length },
  { id: "health", label: "Health", count: services.filter((s) => s.category === "health").length },
  { id: "education", label: "Education", count: services.filter((s) => s.category === "education").length },
  { id: "land", label: "Land", count: services.filter((s) => s.category === "land").length },
  { id: "business", label: "Business", count: services.filter((s) => s.category === "business").length },
  { id: "security", label: "Security", count: services.filter((s) => s.category === "security").length },
  { id: "transport", label: "Transport", count: services.filter((s) => s.category === "transport").length },
  { id: "civil", label: "Civil", count: services.filter((s) => s.category === "civil").length },
  { id: "civic", label: "Civic", count: services.filter((s) => s.category === "civic").length },
  { id: "tax", label: "Tax", count: services.filter((s) => s.category === "tax").length },
]

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tag.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Government Services Directory</h1>
          <p className="text-xl text-blue-200">Find and apply for government services online</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search services by name, category, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-gray-300 focus:border-[#002366]"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-11 mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs lg:text-sm">
                  {category.label} ({category.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-[#002366]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {service.tag}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Fee:
                    </span>
                    <span className="font-semibold">{service.fee}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration:
                    </span>
                    <span className="font-semibold">{service.duration}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {service.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/services/${service.id}`}>
                  <Button className="w-full bg-[#002366] hover:bg-blue-800">Apply Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
