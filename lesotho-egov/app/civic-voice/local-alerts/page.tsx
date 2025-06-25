"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Plus,
  MapPin,
  Clock,
  ThumbsUp,
  Flag,
  AlertTriangle,
  CheckCircle,
  Upload,
  Filter,
} from "lucide-react"
import Link from "next/link"

interface Alert {
  id: string
  title: string
  description: string
  location: string
  district: string
  category: string
  timestamp: string
  author: string
  verified: boolean
  upvotes: number
  reports: number
  image?: string
}

const initialAlerts: Alert[] = [
  {
    id: "alert-1",
    title: "Road blocked in Leribe",
    description:
      "Main road to Hlotse is blocked due to fallen rocks after heavy rain. Alternative route via Teyateyaneng recommended.",
    location: "Main Road A1, Leribe",
    district: "Leribe",
    category: "transport",
    timestamp: "2024-01-20T14:30:00Z",
    author: "Thabo M.",
    verified: true,
    upvotes: 23,
    reports: 0,
  },
  {
    id: "alert-2",
    title: "Clinic closed today",
    description:
      "Berea Health Center is closed today due to staff shortage. Emergency cases should go to district hospital.",
    location: "Berea Health Center",
    district: "Berea",
    category: "health",
    timestamp: "2024-01-20T08:15:00Z",
    author: "Mamello K.",
    verified: true,
    upvotes: 15,
    reports: 0,
  },
  {
    id: "alert-3",
    title: "Water shortage in Ha Abia",
    description: "No water supply in Ha Abia area since yesterday morning. Water trucks expected this afternoon.",
    location: "Ha Abia, Maseru",
    district: "Maseru",
    category: "utilities",
    timestamp: "2024-01-20T06:45:00Z",
    author: "Palesa L.",
    verified: false,
    upvotes: 31,
    reports: 1,
  },
  {
    id: "alert-4",
    title: "School closure - Mokhotlong",
    description: "Mokhotlong Primary School closed due to heavy snow. Classes resume when weather improves.",
    location: "Mokhotlong Primary School",
    district: "Mokhotlong",
    category: "education",
    timestamp: "2024-01-19T16:20:00Z",
    author: "Teboho S.",
    verified: true,
    upvotes: 8,
    reports: 0,
  },
]

const categories = [
  { id: "all", label: "All Alerts", icon: "🔔" },
  { id: "transport", label: "Transport", icon: "🚗" },
  { id: "health", label: "Health", icon: "🏥" },
  { id: "utilities", label: "Utilities", icon: "💧" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "safety", label: "Safety", icon: "🚨" },
  { id: "weather", label: "Weather", icon: "🌤️" },
  { id: "other", label: "Other", icon: "📢" },
]

const districts = [
  "All Districts",
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

export default function LocalAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(initialAlerts)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    location: "",
    district: "",
    category: "",
  })

  // Load alerts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("communityAlerts")
    if (saved) {
      const savedAlerts = JSON.parse(saved)
      setAlerts(savedAlerts)
      setFilteredAlerts(savedAlerts)
    }
  }, [])

  // Save alerts to localStorage
  useEffect(() => {
    localStorage.setItem("communityAlerts", JSON.stringify(alerts))
  }, [alerts])

  // Filter alerts
  useEffect(() => {
    let filtered = alerts

    if (selectedCategory !== "all") {
      filtered = filtered.filter((alert) => alert.category === selectedCategory)
    }

    if (selectedDistrict !== "All Districts") {
      filtered = filtered.filter((alert) => alert.district === selectedDistrict)
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    setFilteredAlerts(filtered)
  }, [alerts, selectedCategory, selectedDistrict])

  const handleCreateAlert = () => {
    const alert: Alert = {
      id: `alert-${Date.now()}`,
      ...newAlert,
      timestamp: new Date().toISOString(),
      author: "You",
      verified: false,
      upvotes: 0,
      reports: 0,
    }

    setAlerts((prev) => [alert, ...prev])
    setNewAlert({
      title: "",
      description: "",
      location: "",
      district: "",
      category: "",
    })
    setIsCreateModalOpen(false)
  }

  const handleUpvote = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, upvotes: alert.upvotes + 1 } : alert)))
  }

  const handleReport = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, reports: alert.reports + 1 } : alert)))
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "transport":
        return "bg-blue-100 text-blue-700"
      case "health":
        return "bg-red-100 text-red-700"
      case "utilities":
        return "bg-cyan-100 text-cyan-700"
      case "education":
        return "bg-purple-100 text-purple-700"
      case "safety":
        return "bg-orange-100 text-orange-700"
      case "weather":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Community Alerts</h1>
              <p className="text-blue-200">Stay informed about local issues and help your community</p>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Alert
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Label>Filter by Category</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-[#002366] hover:bg-blue-800" : ""}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="lg:w-64">
              <Label>Filter by District</Label>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Showing {filteredAlerts.length} alerts</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Verified</span>
              </div>
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span>Unverified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getCategoryColor(alert.category)}>
                        {categories.find((c) => c.id === alert.category)?.icon} {alert.category}
                      </Badge>
                      <Badge variant={alert.verified ? "default" : "secondary"}>
                        {alert.verified ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Unverified
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{alert.description}</p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {formatTimeAgo(alert.timestamp)} by {alert.author}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleUpvote(alert.id)}>
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {alert.upvotes}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleReport(alert.id)}>
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                  <span className="text-xs text-gray-500">{alert.district}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No alerts found for the selected filters.</p>
          </div>
        )}

        {/* Create Alert Modal */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Community Alert</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="alertTitle">Alert Title *</Label>
              <Input
                id="alertTitle"
                value={newAlert.title}
                onChange={(e) => setNewAlert((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alertCategory">Category *</Label>
                <Select
                  value={newAlert.category}
                  onValueChange={(value) => setNewAlert((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c.id !== "all")
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <span className="flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            {category.label}
                          </span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="alertDistrict">District *</Label>
                <Select
                  value={newAlert.district}
                  onValueChange={(value) => setNewAlert((prev) => ({ ...prev, district: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts
                      .filter((d) => d !== "All Districts")
                      .map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="alertLocation">Specific Location *</Label>
              <Input
                id="alertLocation"
                value={newAlert.location}
                onChange={(e) => setNewAlert((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Street, landmark, or area name"
              />
            </div>

            <div>
              <Label htmlFor="alertDescription">Description *</Label>
              <Textarea
                id="alertDescription"
                value={newAlert.description}
                onChange={(e) => setNewAlert((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Provide details about the situation..."
                rows={4}
              />
            </div>

            <div>
              <Label>Add Photo (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload image</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleCreateAlert}
                className="flex-1 bg-[#002366] hover:bg-blue-800"
                disabled={
                  !newAlert.title ||
                  !newAlert.description ||
                  !newAlert.location ||
                  !newAlert.district ||
                  !newAlert.category
                }
              >
                Post Alert
              </Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </div>
  )
}
