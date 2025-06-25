"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, Globe, Briefcase, Shield, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"

const accountTypes = [
  {
    id: "citizen",
    title: "Citizen",
    icon: "🇱🇸",
    description: "Lesotho citizens with full access to all services",
    IconComponent: User,
  },
  {
    id: "resident",
    title: "Resident",
    icon: "🌍",
    description: "Legal residents of Lesotho",
    IconComponent: Globe,
  },
  {
    id: "visitor",
    title: "Visitor",
    icon: "🧳",
    description: "Temporary visitors and tourists",
    IconComponent: Briefcase,
  },
  {
    id: "diplomat",
    title: "Diplomat",
    icon: "🤝",
    description: "Diplomatic personnel and staff",
    IconComponent: Shield,
  },
  {
    id: "refugee",
    title: "Refugee",
    icon: "🛂",
    description: "Refugees and asylum seekers",
    IconComponent: Heart,
  },
]

export default function RegisterPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idOrPassport: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  const resetForm = () => {
    setSelectedType(null)
    setFormData({
      firstName: "",
      lastName: "",
      idOrPassport: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully. You can now sign in to access government services.
            </p>
            <div className="space-y-3">
              <Link href="/login">
                <Button className="w-full bg-[#002366] hover:bg-blue-800">Sign In Now</Button>
              </Link>
              <Button variant="outline" onClick={resetForm} className="w-full">
                Register Another Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-[#002366] hover:text-blue-800 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Choose your account type to get started</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {accountTypes.map((type) => (
              <Card
                key={type.id}
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#002366]"
                onClick={() => setSelectedType(type.id)}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <type.IconComponent className="w-5 h-5" />
                    <span>{type.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <Button variant="outline" className="w-full">
                    Select {type.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const selectedAccountType = accountTypes.find((type) => type.id === selectedType)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSelectedType(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-2xl">{selectedAccountType?.icon}</div>
          </div>
          <CardTitle className="text-center">Register as {selectedAccountType?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="idOrPassport">{selectedType === "citizen" ? "National ID" : "ID/Passport"} *</Label>
              <Input
                id="idOrPassport"
                value={formData.idOrPassport}
                onChange={(e) => handleInputChange("idOrPassport", e.target.value)}
                placeholder={selectedType === "citizen" ? "Enter National ID" : "Enter ID or Passport number"}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+266 XXXX XXXX"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Create a strong password"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#002366] hover:bg-blue-800" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#002366] hover:text-blue-800 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
