"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Shield, Stamp, Download, Share2, CheckCircle2 } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface DocumentViewerProps {
  document: {
    id: string
    name: string
    type: string
    documentNumber: string
    issueDate: string
    expiryDate: string
    issuingAuthority: string
    verified: boolean
    details: Record<string, any>
  }
}

export default function DocumentViewer({ document }: DocumentViewerProps) {
  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-32 h-20 bg-gradient-to-br from-[#002366] to-blue-800 rounded-lg mx-auto flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-xs font-bold">KINGDOM OF</div>
              <div className="text-lg font-bold">LESOTHO</div>
              <div className="text-xs">OFFICIAL DOCUMENT</div>
            </div>
          </div>

          {document.verified && (
            <div className="absolute -top-2 -right-2">
              <div className="bg-green-500 text-white p-2 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">{document.name}</h3>
          <p className="text-gray-600">Document No: {document.documentNumber}</p>
        </div>

        {document.verified && (
          <div className="flex items-center justify-center space-x-2 bg-green-50 p-3 rounded-lg">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Officially Verified</span>
            <Stamp className="w-5 h-5 text-green-600" />
          </div>
        )}
      </div>

      <Separator />

      {/* Document Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Issue Date</label>
          <p className="text-gray-900">{document.issueDate}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Expiry Date</label>
          <p className="text-gray-900">{document.expiryDate}</p>
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700">Issuing Authority</label>
          <p className="text-gray-900">{document.issuingAuthority}</p>
        </div>
      </div>

      <Separator />

      {/* Additional Details */}
      {document.details && Object.keys(document.details).length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Document Information</h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            {Object.entries(document.details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                </span>
                <span className="text-gray-900 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Verification QR Code */}
      <div className="text-center space-y-3">
        <h4 className="font-semibold text-gray-900">Verification QR Code</h4>
        <QRCodeSVG
          value={`https://mosotho.gov.ls/verify-document/${document.id}?token=${Math.random().toString(36).substr(2, 9)}`}
          size={150}
          className="mx-auto border p-2 rounded-lg"
        />
        <p className="text-xs text-gray-600">Scan to verify document authenticity</p>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button className="flex-1 bg-[#002366] hover:bg-blue-800">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Government Watermark */}
      <div className="text-center pt-4 border-t border-dashed">
        <div className="text-xs text-gray-400 space-y-1">
          <p>🏛️ GOVERNMENT OF LESOTHO</p>
          <p>This document is digitally signed and verified</p>
          <p>Verification ID: {document.id.toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}
