"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Shield,
  Eye,
  Download,
  Share2,
  Plus,
  Upload,
  CheckCircle,
  AlertTriangle,
  Lock,
  Unlock,
  FileText,
  CreditCard,
  Home,
  Building2,
  GraduationCap,
  Heart,
  Users,
  Copy,
  Calendar,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock user authentication check
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      setIsAuthenticated(authStatus === "true")
      setIsLoading(false)
    }

    setTimeout(checkAuth, 1000)
  }, [])

  return { isAuthenticated, isLoading }
}

// Document types configuration
const documentTypes = [
  {
    id: "national-id",
    label: "National ID",
    icon: CreditCard,
    category: "identity",
    color: "bg-blue-100 text-blue-700",
  },
  { id: "passport", label: "Passport", icon: FileText, category: "identity", color: "bg-green-100 text-green-700" },
  {
    id: "birth-cert",
    label: "Birth Certificate",
    icon: Users,
    category: "civil",
    color: "bg-purple-100 text-purple-700",
  },
  { id: "land-title", label: "Land Title", icon: Home, category: "property", color: "bg-orange-100 text-orange-700" },
  {
    id: "business-cert",
    label: "Business Certificate",
    icon: Building2,
    category: "business",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: "academic-cert",
    label: "Academic Certificate",
    icon: GraduationCap,
    category: "education",
    color: "bg-indigo-100 text-indigo-700",
  },
  { id: "health-card", label: "Health Insurance", icon: Heart, category: "health", color: "bg-red-100 text-red-700" },
  {
    id: "marriage-cert",
    label: "Marriage Certificate",
    icon: Users,
    category: "civil",
    color: "bg-pink-100 text-pink-700",
  },
]

// Mock documents data
const initialDocuments = [
  {
    id: "doc-001",
    type: "national-id",
    name: "National Identity Card",
    issueDate: "2023-06-15",
    expiryDate: "2033-06-15",
    status: "verified",
    documentNumber: "1001023456",
    issuingAuthority: "Ministry of Home Affairs",
    details: {
      fullName: "Thabo Mokoena",
      dateOfBirth: "1990-03-15",
      placeOfBirth: "Maseru",
      nationality: "Mosotho",
      address: "Ha Abia, Maseru 100",
    },
  },
  {
    id: "doc-002",
    type: "passport",
    name: "Lesotho Passport",
    issueDate: "2022-03-10",
    expiryDate: "2032-03-10",
    status: "verified",
    documentNumber: "LP1234567",
    issuingAuthority: "Ministry of Home Affairs",
    details: {
      fullName: "Thabo Mokoena",
      passportType: "Ordinary",
      nationality: "Lesotho",
      placeOfIssue: "Maseru",
    },
  },
  {
    id: "doc-003",
    type: "birth-cert",
    name: "Birth Certificate",
    issueDate: "2023-05-20",
    expiryDate: "N/A",
    status: "verified",
    documentNumber: "BC-2023-005678",
    issuingAuthority: "Civil Registration",
    details: {
      fullName: "Thabo Mokoena",
      dateOfBirth: "1990-03-15",
      placeOfBirth: "Queen Mamohato Memorial Hospital, Maseru",
      fatherName: "Lehlohonolo Mokoena",
      motherName: "Mamello Mokoena",
    },
  },
  {
    id: "doc-004",
    type: "business-cert",
    name: "Business Registration Certificate",
    issueDate: "2023-09-15",
    expiryDate: "2024-09-15",
    status: "expiring",
    documentNumber: "BRC-2023-054321",
    issuingAuthority: "Ministry of Trade",
    details: {
      businessName: "Mokoena Trading Enterprise",
      registrationType: "Sole Proprietorship",
      businessAddress: "Kingsway, Maseru",
      registrationDate: "2023-09-15",
    },
  },
  {
    id: "doc-005",
    type: "academic-cert",
    name: "University Degree Certificate",
    issueDate: "2015-12-10",
    expiryDate: "N/A",
    status: "verified",
    documentNumber: "NUL-2015-001234",
    issuingAuthority: "National University of Lesotho",
    details: {
      qualification: "Bachelor of Science in Computer Science",
      graduationDate: "2015-12-10",
      institution: "National University of Lesotho",
      grade: "Second Class Upper Division",
    },
  },
]

const categories = [
  { id: "all", label: "All Documents" },
  { id: "identity", label: "Identity" },
  { id: "civil", label: "Civil Registration" },
  { id: "property", label: "Property" },
  { id: "business", label: "Business" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health" },
]

export default function WalletPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [isWalletLocked, setIsWalletLocked] = useState(true)
  const [pin, setPin] = useState("")
  const [documents, setDocuments] = useState(initialDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<(typeof initialDocuments)[0] | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    name: "",
    type: "",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    issuingAuthority: "",
    notes: "",
  })
  const [shareUrl, setShareUrl] = useState("")

  // Load documents from localStorage
  useEffect(() => {
    const savedDocs = localStorage.getItem("walletDocuments")
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs))
    }
  }, [])

  // Save documents to localStorage
  useEffect(() => {
    localStorage.setItem("walletDocuments", JSON.stringify(documents))
  }, [documents])

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === "1234") {
      // Mock PIN verification
      setIsWalletLocked(false)
      setPin("")
    } else {
      alert("Invalid PIN. Try 1234 for demo.")
    }
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newDocument = {
      id: `doc-${Date.now()}`,
      type: uploadForm.type,
      name: uploadForm.name,
      issueDate: uploadForm.issueDate,
      expiryDate: uploadForm.expiryDate || "N/A",
      status: "verified" as const,
      documentNumber: uploadForm.documentNumber,
      issuingAuthority: uploadForm.issuingAuthority,
      details: {
        notes: uploadForm.notes,
        uploadDate: new Date().toISOString().split("T")[0],
      },
    }

    setDocuments([...documents, newDocument])
    setIsUploadModalOpen(false)
    setUploadForm({
      name: "",
      type: "",
      documentNumber: "",
      issueDate: "",
      expiryDate: "",
      issuingAuthority: "",
      notes: "",
    })
  }

  const generateShareUrl = (docId: string) => {
    const url = `https://mosotho.gov.ls/verify/${docId}?token=${Math.random().toString(36).substr(2, 9)}`
    setShareUrl(url)
    navigator.clipboard.writeText(url)
  }

  const getDocumentIcon = (type: string) => {
    const docType = documentTypes.find((dt) => dt.id === type)
    return docType ? docType.icon : FileText
  }

  const getDocumentColor = (type: string) => {
    const docType = documentTypes.find((dt) => dt.id === type)
    return docType ? docType.color : "bg-gray-100 text-gray-700"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "expiring":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />
      case "expiring":
      case "expired":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const docType = documentTypes.find((dt) => dt.id === doc.type)
    const matchesCategory = selectedCategory === "all" || docType?.category === selectedCategory
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      docType?.label.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#002366] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your digital wallet...</p>
        </div>
      </div>
    )
  }

  // Authentication required
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="w-16 h-16 text-[#002366] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your digital wallet.</p>
            <Button onClick={() => router.push("/login")} className="w-full bg-[#002366] hover:bg-blue-800">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // PIN verification
  if (isWalletLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="w-16 h-16 text-[#002366] mx-auto mb-4" />
            <CardTitle className="text-2xl">Secure Access Required</CardTitle>
            <p className="text-gray-600">Enter your PIN to access your digital wallet</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <Label htmlFor="pin">Security PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-gray-500 mt-1">Demo PIN: 1234</p>
              </div>
              <Button type="submit" className="w-full bg-[#002366] hover:bg-blue-800">
                <Unlock className="w-4 h-4 mr-2" />
                Unlock Wallet
              </Button>
            </form>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Digital Wallet</h1>
              <p className="text-xl text-blue-200">Securely manage all your official documents</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-blue-200">Wallet Status</p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-semibold">Verified & Secure</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsWalletLocked(true)}
                className="bg-white text-[#002366] border-white hover:bg-blue-50"
              >
                <Lock className="w-4 h-4 mr-2" />
                Lock Wallet
              </Button>
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
                  <p className="text-sm text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-[#002366]">{documents.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-green-600">
                    {documents.filter((d) => d.status === "verified").length}
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
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {documents.filter((d) => d.status === "expiring").length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-sm font-bold text-purple-600">Today</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search documents by name, number, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg border-2 border-gray-300 focus:border-[#002366]"
              />
            </div>
            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#002366] hover:bg-blue-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Document
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-7">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => {
            const IconComponent = getDocumentIcon(document.type)
            return (
              <Card key={document.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getDocumentColor(document.type)}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{document.name}</CardTitle>
                        <p className="text-sm text-gray-600">{document.documentNumber}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(document.status)}>
                      {getStatusIcon(document.status)}
                      <span className="ml-1 capitalize">{document.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Issued:</span>
                      <span>{document.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span>{document.expiryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Authority:</span>
                      <span className="text-right">{document.issuingAuthority}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedDocument(document)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <IconComponent className="w-5 h-5" />
                            <span>{selectedDocument?.name}</span>
                          </DialogTitle>
                        </DialogHeader>
                        {selectedDocument && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Document Number</Label>
                                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                                  {selectedDocument.documentNumber}
                                </p>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <Badge className={getStatusColor(selectedDocument.status)}>
                                  {getStatusIcon(selectedDocument.status)}
                                  <span className="ml-1 capitalize">{selectedDocument.status}</span>
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Issue Date</Label>
                                <p>{selectedDocument.issueDate}</p>
                              </div>
                              <div>
                                <Label>Expiry Date</Label>
                                <p>{selectedDocument.expiryDate}</p>
                              </div>
                            </div>

                            <div>
                              <Label>Issuing Authority</Label>
                              <p>{selectedDocument.issuingAuthority}</p>
                            </div>

                            {selectedDocument.details && (
                              <div>
                                <Label>Document Details</Label>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                  {Object.entries(selectedDocument.details).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="capitalize text-gray-600">
                                        {key.replace(/([A-Z])/g, " $1")}:
                                      </span>
                                      <span>{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => generateShareUrl(document.id)}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No documents found matching your criteria.</p>
          </div>
        )}

        {/* Upload Modal */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Document</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="docName">Document Name *</Label>
                <Input
                  id="docName"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="e.g., Driver's License"
                  required
                />
              </div>
              <div>
                <Label htmlFor="docType">Document Type *</Label>
                <Select
                  value={uploadForm.type}
                  onValueChange={(value) => setUploadForm({ ...uploadForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="docNumber">Document Number *</Label>
                <Input
                  id="docNumber"
                  value={uploadForm.documentNumber}
                  onChange={(e) => setUploadForm({ ...uploadForm, documentNumber: e.target.value })}
                  placeholder="Document reference number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="authority">Issuing Authority *</Label>
                <Input
                  id="authority"
                  value={uploadForm.issuingAuthority}
                  onChange={(e) => setUploadForm({ ...uploadForm, issuingAuthority: e.target.value })}
                  placeholder="e.g., Ministry of Home Affairs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueDate">Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={uploadForm.issueDate}
                  onChange={(e) => setUploadForm({ ...uploadForm, issueDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={uploadForm.expiryDate}
                  onChange={(e) => setUploadForm({ ...uploadForm, expiryDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="file">Upload Document File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={uploadForm.notes}
                onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
                placeholder="Any additional information about this document..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-[#002366] hover:bg-blue-800">
                <Plus className="w-4 h-4 mr-2" />
                Add Document
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>

        {/* Share URL Modal */}
        {shareUrl && (
          <Dialog open={!!shareUrl} onOpenChange={() => setShareUrl("")}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Secure Document Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600">Share this secure link to allow others to verify your document:</p>
                <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg">
                  <code className="flex-1 text-sm">{shareUrl}</code>
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">This link expires in 24 hours and can only be used 3 times.</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
