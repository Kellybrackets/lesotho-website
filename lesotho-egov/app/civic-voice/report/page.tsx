"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, ArrowLeft, CheckCircle, Clock, AlertTriangle, MapPin } from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "health", label: "Health Services", icon: "🏥" },
  { id: "water", label: "Water & Sanitation", icon: "💧" },
  { id: "police", label: "Police & Security", icon: "👮" },
  { id: "electricity", label: "Electricity", icon: "⚡" },
  { id: "ids", label: "Identity Documents", icon: "🆔" },
  { id: "roads", label: "Roads & Transport", icon: "🛣️" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "social", label: "Social Services", icon: "🤝" },
  { id: "other", label: "Other", icon: "📋" },
]

const districts = [
  "Maseru",
  "Berea",
  "Leribe",
  "Mafeteng",
  "Mohale's Hoek",
  "Quthing",
  "Qacha's Nek",
  "Mokhotlong",
  "Thaba-Tseka",
  "Butha-Buthe",
]

const agencies = {
  health: ["Ministry of Health", "Queen Mamohato Memorial Hospital", "District Health Office"],
  water: ["Water & Sewerage Authority", "Ministry of Water", "District Water Office"],
  police: ["Lesotho Mounted Police", "Local Police Station", "Traffic Police"],
  electricity: ["Lesotho Electricity Company", "Ministry of Energy", "Local Power Office"],
  ids: ["Ministry of Home Affairs", "Civil Registration", "Passport Office"],
  roads: ["Ministry of Transport", "Roads Directorate", "District Council"],
  education: ["Ministry of Education", "District Education Office", "School Management"],
  social: ["Ministry of Social Development", "Social Welfare Office", "Community Council"],
  other: ["District Administration", "Local Council", "Chief's Office"],
}

interface Report {
  id: string
  category: string
  title: string
  description: string
  district: string
  agency: string
  location: string
  status: "submitted" | "in-review" | "resolved"
  submittedDate: string
  priority: "low" | "medium" | "high"
}

export default function ReportPage() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    district: "",
    agency: "",
    location: "",
    priority: "medium",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedReport, setSubmittedReport] = useState<Report | null>(null)
  const [existingReports, setExistingReports] = useState<Report[]>([])

  // Load existing reports from localStorage
  useState(() => {
    const saved = localStorage.getItem("civicReports")
    if (saved) {
      setExistingReports(JSON.parse(saved))
    }
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newReport: Report = {
      id: `CV-${Date.now()}`,
      ...formData,
      status: "submitted",
      submittedDate: new Date().toISOString().split("T")[0],
    }

    // Save to localStorage
    const updatedReports = [...existingReports, newReport]
    setExistingReports(updatedReports)
    localStorage.setItem("civicReports", JSON.stringify(updatedReports))

    setSubmittedReport(newReport)
    setIsSubmitted(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "in-review":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4" />
      case "in-review":
        return <AlertTriangle className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (isSubmitted && submittedReport) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">Your report has been received and assigned a tracking number.</p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Ticket ID:</span>
                  <span className="font-mono text-[#002366]">{submittedReport.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <span>{categories.find((c) => c.id === submittedReport.category)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Assigned to:</span>
                  <span>{submittedReport.agency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge className={getStatusColor(submittedReport.status)}>
                    {getStatusIcon(submittedReport.status)}
                    <span className="ml-1 capitalize">{submittedReport.status}</span>
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-[#002366] hover:bg-blue-800">View in Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                Submit Another Report
              </Button>
              <Link href="/civic-voice">
                <Button variant="ghost" className="w-full">
                  Back to Civic Voice
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/civic-voice">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Civic Voice
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Report a Problem</h1>
          <p className="text-blue-200">Help us improve government services by reporting issues</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Service Issue Report</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <Label htmlFor="category">Issue Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of issue" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <span className="flex items-center space-x-2">
                              <span>{category.icon}</span>
                              <span>{category.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Issue Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>

                  {/* District and Agency */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="district">District *</Label>
                      <Select value={formData.district} onValueChange={(value) => handleInputChange("district", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="agency">Responsible Agency *</Label>
                      <Select
                        value={formData.agency}
                        onValueChange={(value) => handleInputChange("agency", value)}
                        disabled={!formData.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select agency" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.category &&
                            agencies[formData.category as keyof typeof agencies]?.map((agency) => (
                              <SelectItem key={agency} value={agency}>
                                {agency}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">Specific Location</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Street address, landmark, or area"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Please provide as much detail as possible about the issue..."
                      rows={5}
                      required
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                        <SelectItem value="medium">Medium - Affects daily activities</SelectItem>
                        <SelectItem value="high">High - Urgent attention needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label>Supporting Documents/Photos</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">Images, documents up to 10MB</p>
                      <input type="file" className="hidden" multiple accept="image/*,.pdf,.doc,.docx" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#002366] hover:bg-blue-800">
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                {existingReports.length > 0 ? (
                  <div className="space-y-3">
                    {existingReports
                      .slice(-3)
                      .reverse()
                      .map((report) => (
                        <div key={report.id} className="border-l-4 border-[#002366] pl-3">
                          <p className="font-medium text-sm">{report.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{report.id}</span>
                            <Badge className={getStatusColor(report.status)} size="sm">
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No reports submitted yet</p>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reporting Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Be specific about the location and time</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Include photos or documents when possible</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Choose the correct category for faster processing</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Track your report using the ticket ID</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg text-red-800">Emergency?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 mb-3">For urgent emergencies, please contact:</p>
                <div className="space-y-2 text-sm">
                  <div>
                    Police: <strong>123</strong>
                  </div>
                  <div>
                    Fire: <strong>124</strong>
                  </div>
                  <div>
                    Medical: <strong>125</strong>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
