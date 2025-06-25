"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Archive, FileText, Shield, CheckCircle } from "lucide-react"

interface ExportOptionsProps {
  documents: Array<{
    id: string
    name: string
    type: string
    verified: boolean
  }>
}

export default function ExportOptions({ documents }: ExportOptionsProps) {
  const verifiedDocs = documents.filter((doc) => doc.verified)
  const totalDocs = documents.length

  const exportAllPDF = () => {
    // Simulate PDF export
    const link = document.createElement("a")
    link.href = "#"
    link.download = "My_Documents_Portfolio.pdf"
    link.click()
    // You could add a toast notification here
  }

  const exportAllZIP = () => {
    // Simulate ZIP export
    const link = document.createElement("a")
    link.href = "#"
    link.download = "My_Documents_Archive.zip"
    link.click()
    // You could add a toast notification here
  }

  const exportVerifiedOnly = () => {
    // Simulate verified documents export
    const link = document.createElement("a")
    link.href = "#"
    link.download = "Verified_Documents.pdf"
    link.click()
    // You could add a toast notification here
  }

  return (
    <div className="space-y-6">
      {/* Export Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-[#002366] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#002366]">{totalDocs}</p>
            <p className="text-sm text-gray-600">Total Documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{verifiedDocs.length}</p>
            <p className="text-sm text-gray-600">Verified Documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">
              {totalDocs > 0 ? Math.round((verifiedDocs.length / totalDocs) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-600">Verification Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export All Documents</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Download all your documents in a single portfolio file</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={exportAllPDF} className="w-full bg-[#002366] hover:bg-blue-800">
              <FileText className="w-4 h-4 mr-2" />
              Export as PDF Portfolio ({totalDocs} documents)
            </Button>
            <Button onClick={exportAllZIP} variant="outline" className="w-full">
              <Archive className="w-4 h-4 mr-2" />
              Export as ZIP Archive ({totalDocs} documents)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Export Verified Documents Only</span>
              <Badge className="bg-green-100 text-green-800">Recommended</Badge>
            </CardTitle>
            <p className="text-sm text-gray-600">Download only officially verified documents for official use</p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={exportVerifiedOnly}
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
              disabled={verifiedDocs.length === 0}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Export Verified Documents ({verifiedDocs.length} documents)
            </Button>
            {verifiedDocs.length === 0 && (
              <p className="text-xs text-gray-500 mt-2">No verified documents available for export</p>
            )}
          </CardContent>
        </Card>

        {/* Document List */}
        <Card>
          <CardHeader>
            <CardTitle>Documents in Your Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">{doc.name}</span>
                  </div>
                  <Badge className={doc.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {doc.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
