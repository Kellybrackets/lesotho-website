"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, CreditCard, FileText, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, title: "Personal Information", description: "Basic details and contact information" },
  { id: 2, title: "Document Upload", description: "Upload required documents" },
  { id: 3, title: "Review & Confirm", description: "Review your application" },
  { id: 4, title: "Payment", description: "Pay application fee" },
  { id: 5, title: "Confirmation", description: "Application submitted" },
]

export default function NationalIDApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
    maritalStatus: "",
    nationality: "Mosotho",
    phoneNumber: "",
    email: "",
    address: "",
    district: "",
    village: "",
    chiefArea: "",
    applicationType: "new",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    birthCertificate: null,
    proofOfAddress: null,
    passportPhoto: null,
    oldID: null,
  })

  const progress = (currentStep / steps.length) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: file }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={formData.middleName}
                onChange={(e) => handleInputChange("middleName", e.target.value)}
                placeholder="Enter your middle name (optional)"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                <Input
                  id="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                  placeholder="Enter place of birth"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status *</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => handleInputChange("maritalStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="+266 XXXX XXXX"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Physical Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your full physical address"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="district">District *</Label>
                <Select value={formData.district} onValueChange={(value) => handleInputChange("district", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maseru">Maseru</SelectItem>
                    <SelectItem value="berea">Berea</SelectItem>
                    <SelectItem value="leribe">Leribe</SelectItem>
                    <SelectItem value="mafeteng">Mafeteng</SelectItem>
                    <SelectItem value="mohales-hoek">Mohale's Hoek</SelectItem>
                    <SelectItem value="quthing">Quthing</SelectItem>
                    <SelectItem value="qachas-nek">Qacha's Nek</SelectItem>
                    <SelectItem value="mokhotlong">Mokhotlong</SelectItem>
                    <SelectItem value="thaba-tseka">Thaba-Tseka</SelectItem>
                    <SelectItem value="butha-buthe">Butha-Buthe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="village">Village *</Label>
                <Input
                  id="village"
                  value={formData.village}
                  onChange={(e) => handleInputChange("village", e.target.value)}
                  placeholder="Enter village name"
                />
              </div>
              <div>
                <Label htmlFor="chiefArea">Chief Area *</Label>
                <Input
                  id="chiefArea"
                  value={formData.chiefArea}
                  onChange={(e) => handleInputChange("chiefArea", e.target.value)}
                  placeholder="Enter chief area"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Birth Certificate *
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      {uploadedFiles.birthCertificate
                        ? uploadedFiles.birthCertificate.name
                        : "Upload birth certificate"}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("birthCertificate", e.target.files?.[0] || null)}
                      className="hidden"
                      id="birth-cert"
                    />
                    <label htmlFor="birth-cert">
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Proof of Address *
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      {uploadedFiles.proofOfAddress ? uploadedFiles.proofOfAddress.name : "Upload proof of address"}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("proofOfAddress", e.target.files?.[0] || null)}
                      className="hidden"
                      id="proof-address"
                    />
                    <label htmlFor="proof-address">
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Passport Photo *
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      {uploadedFiles.passportPhoto ? uploadedFiles.passportPhoto.name : "Upload passport photo"}
                    </p>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("passportPhoto", e.target.files?.[0] || null)}
                      className="hidden"
                      id="passport-photo"
                    />
                    <label htmlFor="passport-photo">
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {formData.applicationType === "renewal" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Old ID Card
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">
                        {uploadedFiles.oldID ? uploadedFiles.oldID.name : "Upload old ID card"}
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("oldID", e.target.files?.[0] || null)}
                        className="hidden"
                        id="old-id"
                      />
                      <label htmlFor="old-id">
                        <Button variant="outline" size="sm" className="cursor-pointer">
                          Choose File
                        </Button>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">File Requirements:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Maximum file size: 5MB per file</li>
                <li>• Accepted formats: PDF, JPG, JPEG, PNG</li>
                <li>• Documents must be clear and readable</li>
                <li>• Photos must be recent (taken within 6 months)</li>
              </ul>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Personal Information</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Name:</span> {formData.firstName} {formData.middleName}{" "}
                        {formData.lastName}
                      </p>
                      <p>
                        <span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}
                      </p>
                      <p>
                        <span className="font-medium">Gender:</span> {formData.gender}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {formData.phoneNumber}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {formData.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Address Information</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="font-medium">District:</span> {formData.district}
                      </p>
                      <p>
                        <span className="font-medium">Village:</span> {formData.village}
                      </p>
                      <p>
                        <span className="font-medium">Chief Area:</span> {formData.chiefArea}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span> {formData.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Uploaded Documents</h4>
                  <div className="mt-2 space-y-2">
                    {Object.entries(uploadedFiles).map(
                      ([key, file]) =>
                        file && (
                          <div key={key} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="capitalize">
                              {key.replace(/([A-Z])/g, " $1")}: {file.name}
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Application Fee</span>
                  <span className="font-semibold">M50.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Processing Fee</span>
                  <span className="font-semibold">M10.00</span>
                </div>
                <div className="flex justify-between items-center py-2 font-bold text-lg">
                  <span>Total Amount</span>
                  <span>M60.00</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount Due:</span>
                    <span className="text-2xl font-bold text-[#002366]">M60.00</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Payment Method</Label>
                    <Select defaultValue="mobile-money">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobile-money">Mobile Money (M-Pesa, EcoCash)</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="voucher">Payment Voucher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phone">Mobile Money Number</Label>
                    <Input id="phone" placeholder="+266 XXXX XXXX" defaultValue={formData.phoneNumber} />
                  </div>

                  <Button className="w-full bg-[#002366] hover:bg-blue-800">Pay M60.00</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h2>
              <p className="text-gray-600">Your National ID application has been received and is being processed.</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Application Reference:</span>
                    <span className="font-mono text-[#002366]">NID-2024-001234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Estimated Completion:</span>
                    <span>5-7 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Collection Point:</span>
                    <span>Chief's Office - {formData.chiefArea}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button variant="outline">Go to Dashboard</Button>
              </Link>
              <Button onClick={() => window.print()}>Download Receipt</Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/services">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">National ID Application</h1>
          <p className="text-blue-200">Apply for your national identity document</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Tracker */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">
                  {currentStep} of {steps.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center text-center max-w-[120px]">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                      step.id < currentStep
                        ? "bg-green-500 text-white"
                        : step.id === currentStep
                          ? "bg-[#002366] text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  <div className="text-xs">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-gray-500 hidden sm:block">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={nextStep} className="bg-[#002366] hover:bg-blue-800">
              {currentStep === 4 ? "Submit Application" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
