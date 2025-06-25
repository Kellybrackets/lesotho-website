"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Users,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  Globe,
} from "lucide-react"
import Link from "next/link"

const ministries = [
  {
    id: "home-affairs",
    name: "Ministry of Home Affairs",
    description: "Responsible for national identity, citizenship, immigration, and civil registration services.",
    minister: "Hon. Motlalentoa Letsosa",
    location: "Maseru",
    address: "P.O. Box 174, Maseru 100",
    phone: "+266 2232 3034",
    email: "info@homeaffairs.gov.ls",
    website: "www.homeaffairs.gov.ls",
    services: [
      "National Identity Cards",
      "Passports",
      "Birth Certificates",
      "Death Certificates",
      "Marriage Certificates",
      "Immigration Services",
    ],
    departments: [
      "Civil Registration",
      "Immigration & Passport Services",
      "National Identity & Civil Registry",
      "Refugee Affairs",
    ],
    stats: {
      employees: 450,
      offices: 12,
      servicesOffered: 15,
    },
    status: "active",
    lastUpdated: "2024-01-20",
  },
  {
    id: "health",
    name: "Ministry of Health",
    description: "Ensures accessible, quality healthcare services for all citizens of Lesotho.",
    minister: "Hon. Selibe Mochoboroane",
    location: "Maseru",
    address: "P.O. Box 514, Maseru 100",
    phone: "+266 2231 1611",
    email: "info@health.gov.ls",
    website: "www.health.gov.ls",
    services: [
      "Public Health Services",
      "Medical Licensing",
      "Health Insurance",
      "Vaccination Programs",
      "Mental Health Services",
      "Emergency Medical Services",
    ],
    departments: [
      "Primary Healthcare",
      "Hospital Services",
      "Public Health",
      "Medical Supplies",
      "Health Information Systems",
    ],
    stats: {
      employees: 2800,
      offices: 45,
      servicesOffered: 25,
    },
    status: "active",
    lastUpdated: "2024-01-18",
  },
  {
    id: "education",
    name: "Ministry of Education and Training",
    description: "Provides quality education and training opportunities for human resource development.",
    minister: "Hon. Nthabiseng Khaketla",
    location: "Maseru",
    address: "P.O. Box 47, Maseru 100",
    phone: "+266 2231 3045",
    email: "info@education.gov.ls",
    website: "www.education.gov.ls",
    services: [
      "School Registration",
      "Teacher Certification",
      "Student Loans",
      "Curriculum Development",
      "Educational Assessments",
      "Adult Education Programs",
    ],
    departments: [
      "Basic Education",
      "Higher Education",
      "Technical & Vocational Training",
      "Educational Planning",
      "Examinations Council",
    ],
    stats: {
      employees: 1200,
      offices: 28,
      servicesOffered: 18,
    },
    status: "active",
    lastUpdated: "2024-01-19",
  },
  {
    id: "finance",
    name: "Ministry of Finance",
    description: "Manages public finances, economic policy, and revenue collection for sustainable development.",
    minister: "Hon. Thabo Sophonea",
    location: "Maseru",
    address: "P.O. Box 395, Maseru 100",
    phone: "+266 2231 1101",
    email: "info@finance.gov.ls",
    website: "www.finance.gov.ls",
    services: [
      "Tax Registration",
      "Business Licensing",
      "Government Tenders",
      "Revenue Collection",
      "Budget Planning",
      "Economic Analysis",
    ],
    departments: ["Revenue Services", "Budget & Planning", "Treasury", "Economic Planning", "Public Procurement"],
    stats: {
      employees: 650,
      offices: 15,
      servicesOffered: 12,
    },
    status: "active",
    lastUpdated: "2024-01-21",
  },
  {
    id: "agriculture",
    name: "Ministry of Agriculture and Food Security",
    description: "Promotes sustainable agriculture and ensures food security for all citizens.",
    minister: "Hon. Tefo Mapesela",
    location: "Maseru",
    address: "P.O. Box 24, Maseru 100",
    phone: "+266 2232 3561",
    email: "info@agriculture.gov.ls",
    website: "www.agriculture.gov.ls",
    services: [
      "Farmer Registration",
      "Agricultural Loans",
      "Crop Insurance",
      "Livestock Services",
      "Land Use Planning",
      "Food Safety Certification",
    ],
    departments: [
      "Crop Production",
      "Livestock Development",
      "Agricultural Research",
      "Extension Services",
      "Food Security",
    ],
    stats: {
      employees: 890,
      offices: 22,
      servicesOffered: 16,
    },
    status: "active",
    lastUpdated: "2024-01-17",
  },
  {
    id: "public-works",
    name: "Ministry of Public Works and Transport",
    description: "Develops and maintains public infrastructure and transportation systems.",
    minister: "Hon. Keketso Sello",
    location: "Maseru",
    address: "P.O. Box 20, Maseru 100",
    phone: "+266 2231 2434",
    email: "info@publicworks.gov.ls",
    website: "www.publicworks.gov.ls",
    services: [
      "Driver's License",
      "Vehicle Registration",
      "Road Construction Permits",
      "Public Transport Licensing",
      "Infrastructure Development",
      "Traffic Management",
    ],
    departments: [
      "Roads & Bridges",
      "Transport Services",
      "Building Construction",
      "Traffic Police",
      "Public Transport",
    ],
    stats: {
      employees: 1100,
      offices: 18,
      servicesOffered: 14,
    },
    status: "active",
    lastUpdated: "2024-01-16",
  },
]

const agencies = [
  {
    id: "revenue-authority",
    name: "Lesotho Revenue Authority",
    description: "Collects taxes and customs duties to fund government operations.",
    director: "Mrs. Retšelisitsoe Matlanyane",
    location: "Maseru",
    address: "Corner Kingsway & Pioneer Road, Maseru",
    phone: "+266 2231 2001",
    email: "info@lra.org.ls",
    website: "www.lra.org.ls",
    services: [
      "Tax Registration",
      "VAT Registration",
      "Income Tax Filing",
      "Customs Clearance",
      "Tax Compliance",
      "Refund Processing",
    ],
    type: "Revenue Collection",
    stats: {
      employees: 320,
      offices: 8,
      servicesOffered: 10,
    },
    status: "active",
    lastUpdated: "2024-01-22",
  },
  {
    id: "electoral-commission",
    name: "Independent Electoral Commission",
    description: "Conducts free and fair elections and manages voter registration.",
    director: "Justice Mahapela Lehohla",
    location: "Maseru",
    address: "P.O. Box 12023, Maseru 100",
    phone: "+266 2231 5088",
    email: "info@iec.org.ls",
    website: "www.iec.org.ls",
    services: [
      "Voter Registration",
      "Election Management",
      "Candidate Registration",
      "Civic Education",
      "Electoral Disputes",
      "Boundary Delimitation",
    ],
    type: "Electoral Services",
    stats: {
      employees: 180,
      offices: 25,
      servicesOffered: 8,
    },
    status: "active",
    lastUpdated: "2024-01-19",
  },
  {
    id: "communications-authority",
    name: "Lesotho Communications Authority",
    description: "Regulates telecommunications and broadcasting services.",
    director: "Mr. Tšeliso Tšosane",
    location: "Maseru",
    address: "P.O. Box 15896, Maseru 100",
    phone: "+266 2222 6999",
    email: "info@lca.org.ls",
    website: "www.lca.org.ls",
    services: [
      "Telecom Licensing",
      "Broadcasting Permits",
      "Spectrum Management",
      "Consumer Protection",
      "Technical Standards",
      "Dispute Resolution",
    ],
    type: "Regulatory",
    stats: {
      employees: 95,
      offices: 4,
      servicesOffered: 12,
    },
    status: "active",
    lastUpdated: "2024-01-20",
  },
  {
    id: "water-authority",
    name: "Lesotho Highlands Water Commission",
    description: "Manages water resources and the Lesotho Highlands Water Project.",
    director: "Eng. Refiloe Tlali",
    location: "Maseru",
    address: "P.O. Box 7332, Maseru 100",
    phone: "+266 2231 4000",
    email: "info@lhwc.org.ls",
    website: "www.lhwc.org.ls",
    services: [
      "Water Supply Licensing",
      "Environmental Impact Assessment",
      "Water Quality Testing",
      "Dam Safety Inspection",
      "Water Rights Registration",
      "Irrigation Permits",
    ],
    type: "Water Management",
    stats: {
      employees: 240,
      offices: 6,
      servicesOffered: 9,
    },
    status: "active",
    lastUpdated: "2024-01-18",
  },
]

export default function MinistriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("ministries")

  const filteredMinistries = ministries.filter(
    (ministry) =>
      ministry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ministry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ministry.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredAgencies = agencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Ministries & Agencies</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Discover government departments and agencies serving the people of Lesotho
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search ministries, agencies, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "ministries" ? "default" : "outline"}
                onClick={() => setActiveTab("ministries")}
                className={activeTab === "ministries" ? "bg-[#002366]" : ""}
              >
                Ministries ({ministries.length})
              </Button>
              <Button
                variant={activeTab === "agencies" ? "default" : "outline"}
                onClick={() => setActiveTab("agencies")}
                className={activeTab === "agencies" ? "bg-[#002366]" : ""}
              >
                Agencies ({agencies.length})
              </Button>
            </div>
          </div>
        </div>

        {/* Ministries Tab */}
        {activeTab === "ministries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Government Ministries</h2>
              <Badge className="bg-green-100 text-green-800">{filteredMinistries.length} Active</Badge>
            </div>

            <div className="grid gap-6">
              {filteredMinistries.map((ministry) => (
                <Card key={ministry.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-[#002366] rounded-lg">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{ministry.name}</CardTitle>
                          <p className="text-gray-600 mb-3">{ministry.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>Minister: {ministry.minister}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{ministry.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Contact Information */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{ministry.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{ministry.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span>{ministry.website}</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span>{ministry.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Services */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Services</h4>
                        <div className="space-y-1">
                          {ministry.services.slice(0, 4).map((service, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <ChevronRight className="w-3 h-3 text-gray-400" />
                              <span>{service}</span>
                            </div>
                          ))}
                          {ministry.services.length > 4 && (
                            <p className="text-xs text-gray-500 mt-2">+{ministry.services.length - 4} more services</p>
                          )}
                        </div>
                      </div>

                      {/* Statistics */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Statistics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Employees:</span>
                            <span className="font-medium">{ministry.stats.employees}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Offices:</span>
                            <span className="font-medium">{ministry.stats.offices}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Services:</span>
                            <span className="font-medium">{ministry.stats.servicesOffered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated:</span>
                            <span className="font-medium">{ministry.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t">
                      <Link href={`/ministries/${ministry.id}`}>
                        <Button className="bg-[#002366] hover:bg-[#001a4d]">
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Agencies Tab */}
        {activeTab === "agencies" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Government Agencies</h2>
              <Badge className="bg-blue-100 text-blue-800">{filteredAgencies.length} Active</Badge>
            </div>

            <div className="grid gap-6">
              {filteredAgencies.map((agency) => (
                <Card key={agency.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-600 rounded-lg">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{agency.name}</CardTitle>
                          <p className="text-gray-600 mb-3">{agency.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>Director: {agency.director}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Badge variant="outline" className="text-xs">
                                {agency.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Contact Information */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{agency.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{agency.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span>{agency.website}</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span>{agency.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Services */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Services</h4>
                        <div className="space-y-1">
                          {agency.services.slice(0, 4).map((service, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <ChevronRight className="w-3 h-3 text-gray-400" />
                              <span>{service}</span>
                            </div>
                          ))}
                          {agency.services.length > 4 && (
                            <p className="text-xs text-gray-500 mt-2">+{agency.services.length - 4} more services</p>
                          )}
                        </div>
                      </div>

                      {/* Statistics */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Statistics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Employees:</span>
                            <span className="font-medium">{agency.stats.employees}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Offices:</span>
                            <span className="font-medium">{agency.stats.offices}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Services:</span>
                            <span className="font-medium">{agency.stats.servicesOffered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated:</span>
                            <span className="font-medium">{agency.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t">
                      <Link href={`/agencies/${agency.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {((activeTab === "ministries" && filteredMinistries.length === 0) ||
          (activeTab === "agencies" && filteredAgencies.length === 0)) && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No results found</p>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}
