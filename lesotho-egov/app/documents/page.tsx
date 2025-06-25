"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Search, FileText, CreditCard, Calendar, Shield, AlertTriangle } from "lucide-react"

const documents = [
  {
    id: "doc-001",
    name: "National ID Card",
    type: "Identity Document",
    category: "identity",
    issueDate: "2023-06-15",
    expiryDate: "2033-06-15",
    status: "active",
    downloadable: true,
    fileSize: "2.1 MB",
    reference: "NID-2023-001234",
  },
  {
    id: "doc-002",
    name: "Birth Certificate",
    type: "Civil Registration",
    category: "civil",
    issueDate: "2023-05-20",
    expiryDate: "N/A",
    status: "active",
    downloadable: true,
    fileSize: "1.8 MB",
    reference: "BC-2023-005678",
  },
  {
    id: "doc-003",
    name: "Driver's License",
    type: "Transport Document",
    category: "transport",
    issueDate: "2024-01-12",
    expiryDate: "2029-01-12",
    status: "active",
    downloadable: true,
    fileSize: "1.5 MB",
    reference: "DL-2024-009876",
  },
  {
    id: "doc-004",
    name: "Passport",
    type: "Travel Document",
    category: "travel",
    issueDate: "2022-03-10",
    expiryDate: "2032-03-10",
    status: "active",
    downloadable: true,
    fileSize: "3.2 MB",
    reference: "PP-2022-012345",
  },
  {
    id: "doc-005",
    name: "Business Registration Certificate",
    type: "Business Document",
    category: "business",
    issueDate: "2023-09-15",
    expiryDate: "2024-09-15",
    status: "expiring_soon",
    downloadable: true,
    fileSize: "2.7 MB",
    reference: "BRC-2023-054321",
  },
  {
    id: "doc-006",
    name: "Tax Clearance Certificate",
    type: "Tax Document",
    category: "tax",
    issueDate: "2024-01-05",
    expiryDate: "2024-12-31",
    status: "active",
    downloadable: true,
    fileSize: "1.2 MB",
    reference: "TCC-2024-098765",
  },
]

const receipts = [
  {
    id: "receipt-001",
    service: "National ID Application",
    amount: "M60.00",
    date: "2024-01-15",
    reference: "PAY-2024-001234",
    status: "paid",
    method: "Mobile Money",
  },
  {
    id: "receipt-002",
    service: "Driver's License Renewal",
    amount: "M120.00",
    date: "2024-01-12",
    reference: "PAY-2024-001235",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "receipt-003",
    service: "Business Registration",
    amount: "M150.00",
    date: "2023-09-15",
    reference: "PAY-2023-009876",
    status: "paid",
    method: "Bank Transfer",
  },
]

const categories = [
  { id: "all", label: "All Documents", count: documents.length },
  { id: "identity", label: "Identity", count: documents.filter((d) => d.category === "identity").length },
  { id: "civil", label: "Civil Registration", count: documents.filter((d) => d.category === "civil").length },
  { id: "transport", label: "Transport", count: documents.filter((d) => d.category === "transport").length },
  { id: "travel", label: "Travel", count: documents.filter((d) => d.category === "travel").length },
  { id: "business", label: "Business", count: documents.filter((d) => d.category === "business").length },
  { id: "tax", label: "Tax", count: documents.filter((d) => d.category === "tax").length },
]

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expiring_soon":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Shield className="w-4 h-4" />
      case "expiring_soon":
        return <AlertTriangle className="w-4 h-4" />
      case "expired":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "identity":
        return "🆔"
      case "civil":
        return "📋"
      case "transport":
        return "🚗"
      case "travel":
        return "✈️"
      case "business":
        return "🏢"
      case "tax":
        return "💰"
      default:
        return "📄"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Document Center</h1>
          <p className="text-xl text-blue-200">Access and manage all your government documents and receipts</p>
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
                  <p className="text-sm text-gray-600">Active Documents</p>
                  <p className="text-2xl font-bold text-green-600">
                    {documents.filter((d) => d.status === "active").length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {documents.filter((d) => d.status === "expiring_soon").length}
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
                  <p className="text-sm text-gray-600">Total Receipts</p>
                  <p className="text-2xl font-bold text-purple-600">{receipts.length}</p>
                </div>
                <CreditCard className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="receipts">Payment Receipts</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search documents by name, type, or reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg border-2 border-gray-300 focus:border-[#002366]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-[#002366] hover:bg-blue-800" : ""}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getCategoryIcon(doc.category)}</div>
                        <div>
                          <CardTitle className="text-lg">{doc.name}</CardTitle>
                          <p className="text-sm text-gray-600">{doc.type}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {getStatusIcon(doc.status)}
                        <span className="ml-1 capitalize">{doc.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference:</span>
                        <span className="font-mono">{doc.reference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Issue Date:</span>
                        <span>{doc.issueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expiry Date:</span>
                        <span>{doc.expiryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">File Size:</span>
                        <span>{doc.fileSize}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      {doc.downloadable && (
                        <Button size="sm" className="flex-1 bg-[#002366] hover:bg-blue-800">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No documents found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="receipts" className="space-y-6">
            <div className="space-y-4">
              {receipts.map((receipt) => (
                <Card key={receipt.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{receipt.service}</h4>
                          <p className="text-sm text-gray-600">Reference: {receipt.reference}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-1" />
                              {receipt.date}
                            </span>
                            <span className="text-sm text-gray-600">via {receipt.method}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#002366]">{receipt.amount}</p>
                        <Badge className="bg-green-100 text-green-800 mt-1">Paid</Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Receipt
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
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
