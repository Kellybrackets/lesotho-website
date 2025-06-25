"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Download, Eye, FileText, Clock, CheckCircle, AlertCircle, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Wallet,
  QrCode,
  Shield,
  Stamp,
  ExternalLink,
  CreditCard,
  GraduationCap,
  Heart,
  Building2,
  Home,
  Users,
  Car,
  Briefcase,
  Copy,
  CheckCircle2,
  AlertTriangle,
  FileTextIcon,
} from "lucide-react"
import DocumentViewer from "@/components/document-viewer"
import AddDocumentForm from "@/components/add-document-form"
import ExportOptions from "@/components/export-options"

// Mock user data
const userData = {
  name: "Thabo M.",
  id: "1001023456",
  email: "thabo.m@email.com",
  phone: "+266 5012 3456",
}

const applications = [
  {
    id: "NID-2024-001234",
    service: "National ID Application",
    status: "under_review",
    progress: 75,
    currentStep: "Under Review",
    steps: [
      { name: "Application Submitted", completed: true },
      { name: "Identity Verified", completed: true },
      { name: "Under Review", completed: false, current: true },
      { name: "Ready", completed: false },
    ],
    submittedDate: "2024-01-15",
    estimatedCompletion: "2024-01-22",
    fee: "M60.00",
    paid: true,
  },
  {
    id: "PSP-2024-000567",
    service: "Passport Application",
    status: "identity_verified",
    progress: 50,
    currentStep: "Identity Verified",
    steps: [
      { name: "Application Submitted", completed: true },
      { name: "Identity Verified", completed: true, current: true },
      { name: "Under Review", completed: false },
      { name: "Ready", completed: false },
    ],
    submittedDate: "2024-01-10",
    estimatedCompletion: "2024-01-25",
    fee: "M350.00",
    paid: true,
  },
  {
    id: "DL-2024-000890",
    service: "Driver's License Renewal",
    status: "ready",
    progress: 100,
    currentStep: "Ready for Collection",
    steps: [
      { name: "Application Submitted", completed: true },
      { name: "Identity Verified", completed: true },
      { name: "Under Review", completed: true },
      { name: "Ready", completed: true, current: true },
    ],
    submittedDate: "2024-01-05",
    estimatedCompletion: "2024-01-12",
    fee: "M120.00",
    paid: true,
  },
]

const notifications = [
  {
    id: 1,
    title: "Your passport is ready for collection",
    message: "Please visit the Home Affairs office in Maseru to collect your passport.",
    date: "2024-01-20",
    read: false,
    type: "success",
  },
  {
    id: 2,
    title: "Document Verification Complete",
    message: "Your National ID application documents have been verified successfully.",
    date: "2024-01-18",
    read: false,
    type: "info",
  },
  {
    id: 3,
    title: "Application Under Review",
    message: "Your passport application is currently under review by our team.",
    date: "2024-01-15",
    read: true,
    type: "info",
  },
]

export default function DashboardPage() {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)

  const [walletDocuments, setWalletDocuments] = useState([
    {
      id: "wallet-001",
      name: "National Identity Card",
      type: "national-id",
      documentNumber: "1001023456",
      issueDate: "2023-06-15",
      expiryDate: "2033-06-15",
      issuingAuthority: "Ministry of Home Affairs",
      verified: true,
      details: {
        fullName: "Thabo Mokoena",
        dateOfBirth: "1990-03-15",
        nationality: "Mosotho",
      },
    },
    {
      id: "wallet-002",
      name: "Voter Registration Card",
      type: "voter-card",
      documentNumber: "VRC-2023-789012",
      issueDate: "2023-08-20",
      expiryDate: "2028-08-20",
      issuingAuthority: "Independent Electoral Commission",
      verified: true,
      details: {
        constituency: "Maseru Central",
        pollingStation: "Maseru High School",
      },
    },
    {
      id: "wallet-003",
      name: "University Degree",
      type: "academic-cert",
      documentNumber: "NUL-2015-001234",
      issueDate: "2015-12-10",
      expiryDate: "N/A",
      issuingAuthority: "National University of Lesotho",
      verified: true,
      details: {
        qualification: "Bachelor of Science in Computer Science",
        grade: "Second Class Upper Division",
      },
    },
    {
      id: "wallet-004",
      name: "Health Insurance Card",
      type: "health-card",
      documentNumber: "HIC-2023-456789",
      issueDate: "2023-01-01",
      expiryDate: "2023-12-31",
      issuingAuthority: "Ministry of Health",
      verified: false,
      details: {
        policyNumber: "POL-2023-456789",
        coverage: "Basic Health Package",
      },
    },
  ])

  const getDocumentIcon = (type: string) => {
    const icons = {
      "national-id": CreditCard,
      passport: FileTextIcon,
      "voter-card": Users,
      "academic-cert": GraduationCap,
      "health-card": Heart,
      "business-cert": Building2,
      "land-title": Home,
      "driving-license": Car,
      "employment-cert": Briefcase,
      default: FileTextIcon,
    }
    return icons[type] || icons.default
  }

  const getDocumentColor = (type: string) => {
    const colors = {
      "national-id": "bg-blue-100 text-blue-700",
      passport: "bg-green-100 text-green-700",
      "voter-card": "bg-purple-100 text-purple-700",
      "academic-cert": "bg-indigo-100 text-indigo-700",
      "health-card": "bg-red-100 text-red-700",
      "business-cert": "bg-teal-100 text-teal-700",
      "land-title": "bg-orange-100 text-orange-700",
      "driving-license": "bg-yellow-100 text-yellow-700",
      "employment-cert": "bg-pink-100 text-pink-700",
      default: "bg-gray-100 text-gray-700",
    }
    return colors[type] || colors.default
  }

  const getRelatedServices = (docType: string) => {
    const services = {
      "national-id": [
        { name: "Apply for Passport", href: "/services/passport" },
        { name: "Voter Registration", href: "/services/voter-registration" },
      ],
      passport: [
        { name: "Visa Application", href: "/services/visa" },
        { name: "Travel Insurance", href: "/services/travel-insurance" },
      ],
      "academic-cert": [
        { name: "Job Applications", href: "/services/employment" },
        { name: "Professional Registration", href: "/services/professional-reg" },
      ],
      "health-card": [
        { name: "Medical Services", href: "/services/medical" },
        { name: "Insurance Claims", href: "/services/insurance" },
      ],
    }
    return services[docType] || []
  }

  const generateVerificationToken = () => {
    return Math.random().toString(36).substr(2, 12)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const downloadDocument = (doc: any) => {
    // Simulate PDF download
    const link = document.createElement("a")
    link.href = "#"
    link.download = `${doc.name.replace(/\s+/g, "_")}.pdf`
    link.click()
    // You could add a toast notification here
  }

  const addDocumentToWallet = (newDoc: any) => {
    setWalletDocuments((prev) => [...prev, { ...newDoc, id: `wallet-${Date.now()}` }])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "identity_verified":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="w-4 h-4" />
      case "under_review":
        return <Clock className="w-4 h-4" />
      case "identity_verified":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name}</h1>
              <p className="text-blue-200">ID: {userData.id}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#002366]" />
                </div>
                <div>
                  <p className="font-medium">{userData.name}</p>
                  <p className="text-sm text-blue-200">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Applications</p>
                  <p className="text-2xl font-bold text-[#002366]">
                    {applications.filter((app) => app.status !== "ready").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ready for Collection</p>
                  <p className="text-2xl font-bold text-green-600">
                    {applications.filter((app) => app.status === "ready").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-purple-600">{applications.length}</p>
                </div>
                <FileText className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread Notifications</p>
                  <p className="text-2xl font-bold text-orange-600">{notifications.filter((n) => !n.read).length}</p>
                </div>
                <Bell className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Digital Wallet Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#002366] rounded-lg">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Digital Wallet</CardTitle>
                  <p className="text-gray-600">Manage your documents securely</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <Shield className="w-4 h-4 mr-1" />
                Secure
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documents">Verified Documents</TabsTrigger>
                <TabsTrigger value="add">Add New Document</TabsTrigger>
                <TabsTrigger value="export">Export Options</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {walletDocuments.map((doc) => {
                    const IconComponent = getDocumentIcon(doc.type)
                    return (
                      <Card
                        key={doc.id}
                        className="hover:shadow-lg transition-all duration-200 border-2 hover:border-[#002366]/20"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${getDocumentColor(doc.type)}`}>
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm">{doc.name}</h4>
                                <p className="text-xs text-gray-600">{doc.documentNumber}</p>
                              </div>
                            </div>
                            <Badge
                              className={doc.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                            >
                              {doc.verified ? (
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                              ) : (
                                <AlertTriangle className="w-3 h-3 mr-1" />
                              )}
                              {doc.verified ? "Verified" : "Pending"}
                            </Badge>
                          </div>

                          {doc.verified && (
                            <div className="flex items-center space-x-2 mt-2 p-2 bg-blue-50 rounded-lg">
                              <Stamp className="w-4 h-4 text-[#002366]" />
                              <span className="text-xs text-[#002366] font-medium">
                                Verified by {doc.issuingAuthority}
                              </span>
                            </div>
                          )}
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-2 text-xs mb-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Issued:</span>
                              <span>{doc.issueDate}</span>
                            </div>
                            {doc.expiryDate !== "N/A" && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Expires:</span>
                                <span>{doc.expiryDate}</span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  <Eye className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center space-x-2">
                                    <IconComponent className="w-5 h-5" />
                                    <span>{doc.name}</span>
                                  </DialogTitle>
                                </DialogHeader>
                                <DocumentViewer document={doc} />
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => downloadDocument(doc)}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              PDF
                            </Button>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  <QrCode className="w-3 h-3 mr-1" />
                                  QR
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Document QR Code</DialogTitle>
                                </DialogHeader>
                                <div className="text-center space-y-4">
                                  <QRCodeSVG
                                    value={`https://mosotho.gov.ls/verify-document/${doc.id}?token=${generateVerificationToken()}`}
                                    size={200}
                                    className="mx-auto"
                                  />
                                  <p className="text-sm text-gray-600">Scan to verify document authenticity</p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyToClipboard(`https://mosotho.gov.ls/verify-document/${doc.id}`)}
                                  >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Link
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {getRelatedServices(doc.type).length > 0 && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="text-xs">
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Use
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Use Document in Applications</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-3">
                                    {getRelatedServices(doc.type).map((service, index) => (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        className="w-full justify-between"
                                        onClick={() => window.open(service.href, "_blank")}
                                      >
                                        <span>{service.name}</span>
                                        <ArrowRight className="w-4 h-4" />
                                      </Button>
                                    ))}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {walletDocuments.length === 0 && (
                  <div className="text-center py-12">
                    <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No documents in your wallet yet.</p>
                    <p className="text-sm text-gray-400">
                      Complete government services to automatically add documents.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="add" className="mt-6">
                <AddDocumentForm onDocumentAdded={addDocumentToWallet} />
              </TabsContent>

              <TabsContent value="export" className="mt-6">
                <ExportOptions documents={walletDocuments} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Applications Progress */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Application Progress</h2>

            {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{app.service}</CardTitle>
                      <p className="text-sm text-gray-600">Reference: {app.id}</p>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1 capitalize">{app.currentStep}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Visual Progress Tracker */}
                    <div className="space-y-3">
                      {app.steps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step.completed
                                ? "bg-green-500 text-white"
                                : step.current
                                  ? "bg-[#002366] text-white"
                                  : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${step.current ? "text-[#002366]" : "text-gray-700"}`}>
                              {step.name}
                            </p>
                          </div>
                          {step.current && (
                            <Badge variant="outline" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm pt-4 border-t">
                      <div>
                        <span className="font-medium text-gray-700">Submitted:</span>
                        <p>{app.submittedDate}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Estimated Completion:</span>
                        <p>{app.estimatedCompletion}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Fee:</span>
                        <p className="text-green-600">{app.fee} (Paid)</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {app.status === "ready" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Notifications Panel */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={!notification.read ? "border-l-4 border-l-[#002366]" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`font-semibold ${!notification.read ? "text-[#002366]" : "text-gray-900"}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && <div className="w-2 h-2 bg-[#002366] rounded-full"></div>}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/services/national-id">
                  <Button variant="outline" className="w-full justify-between">
                    Apply for New ID
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/services/passport">
                  <Button variant="outline" className="w-full justify-between">
                    Apply for Passport
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="w-full justify-between">
                    View All Services
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/wallet">
                  <Button variant="outline" className="w-full justify-between">
                    Access Digital Wallet
                    <ArrowRight className="w-4 h-4" />
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
