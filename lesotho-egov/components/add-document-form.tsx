"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileImage, Plus } from "lucide-react"

interface AddDocumentFormProps {
  onDocumentAdded: (document: any) => void
}

const documentTypes = [
  { id: "national-id", label: "National ID" },
  { id: "passport", label: "Passport" },
  { id: "voter-card", label: "Voter Registration Card" },
  { id: "academic-cert", label: "Academic Certificate" },
  { id: "health-card", label: "Health Insurance Card" },
  { id: "business-cert", label: "Business Certificate" },
  { id: "land-title", label: "Land Title" },
  { id: "driving-license", label: "Driving License" },
  { id: "employment-cert", label: "Employment Certificate" },
]

export default function AddDocumentForm({ onDocumentAdded }: AddDocumentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    issuingAuthority: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newDocument = {
      ...formData,
      verified: false, // New documents start as unverified
      details: {
        notes: formData.notes,
        uploadDate: new Date().toISOString().split("T")[0],
      },
    }

    onDocumentAdded(newDocument)

    // Reset form
    setFormData({
      name: "",
      type: "",
      documentNumber: "",
      issueDate: "",
      expiryDate: "",
      issuingAuthority: "",
      notes: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Document Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Driver's License"
            required
          />
        </div>

        <div>
          <Label htmlFor="type">Document Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
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

        <div>
          <Label htmlFor="documentNumber">Document Number *</Label>
          <Input
            id="documentNumber"
            value={formData.documentNumber}
            onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
            placeholder="Document reference number"
            required
          />
        </div>

        <div>
          <Label htmlFor="issuingAuthority">Issuing Authority *</Label>
          <Input
            id="issuingAuthority"
            value={formData.issuingAuthority}
            onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })}
            placeholder="e.g., Ministry of Home Affairs"
            required
          />
        </div>

        <div>
          <Label htmlFor="issueDate">Issue Date *</Label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="file">Upload Document File</Label>
        <Card className="border-2 border-dashed border-gray-300 hover:border-[#002366] transition-colors">
          <CardContent className="p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            <Button type="button" variant="outline" className="mt-3">
              <FileImage className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any additional information about this document..."
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-[#002366] hover:bg-blue-800">
        <Plus className="w-4 h-4 mr-2" />
        Add Document to Wallet
      </Button>
    </form>
  )
}
