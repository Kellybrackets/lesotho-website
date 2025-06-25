"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Navigation,
  Phone,
  Clock,
  Star,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Layers,
  Locate,
  Filter,
  Heart,
  GraduationCap,
  Building2,
  Home,
  Church,
  ShoppingBag,
  Palette,
  Briefcase,
  Bus,
  Wheat,
  Utensils,
  Hospital,
  Users,
  Globe,
  Info,
} from "lucide-react"
import Image from "next/image"

// Mock locations data - comprehensive dataset
const locationsData = [
  // Tourist Spots
  {
    id: 1,
    name: "Maletsunyane Falls",
    type: "tourist",
    coordinates: { lat: -29.8333, lng: 28.0333 },
    district: "Semonkong",
    description: "One of the highest single-drop waterfalls in Southern Africa with breathtaking views.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    phone: "+266 2234 5678",
    hours: "8:00 AM - 6:00 PM",
    trivia: "The falls drop 192 meters, making them higher than Victoria Falls!",
    contact: "info@semonkong.co.ls",
    website: "www.semonkong-tourism.ls",
  },
  {
    id: 2,
    name: "Thaba Bosiu",
    type: "tourist",
    coordinates: { lat: -29.4167, lng: 27.7333 },
    district: "Maseru",
    description: "Historic mountain fortress of King Moshoeshoe I, birthplace of the Basotho nation.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    phone: "+266 2231 2345",
    hours: "9:00 AM - 5:00 PM",
    trivia: "The name means 'Mountain at Night' because it seemed to grow taller in darkness!",
    contact: "heritage@thabaBosiu.gov.ls",
  },
  {
    id: 3,
    name: "Sani Mountain Lodge",
    type: "tourist",
    coordinates: { lat: -29.5833, lng: 29.2833 },
    district: "Mokhotlong",
    description: "Highest pub in Africa with stunning mountain views and adventure activities.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    phone: "+266 2295 0123",
    hours: "10:00 AM - 11:00 PM",
    trivia: "At 2,874m above sea level, it's officially the highest pub in Africa!",
    contact: "info@sanimountainlodge.co.ls",
  },

  // Restaurants
  {
    id: 4,
    name: "Maliba Mountain Lodge Restaurant",
    type: "restaurant",
    coordinates: { lat: -28.7667, lng: 28.2333 },
    district: "Butha-Buthe",
    description: "Fine dining with mountain views and traditional Basotho cuisine.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    phone: "+266 2246 0123",
    hours: "7:00 AM - 10:00 PM",
    trivia: "Serves traditional 'papa' made from locally grown sorghum!",
    contact: "dining@maliba.co.ls",
  },
  {
    id: 5,
    name: "Regal Restaurant",
    type: "restaurant",
    coordinates: { lat: -29.31, lng: 27.485 },
    district: "Maseru",
    description: "Popular local restaurant serving authentic Basotho and continental cuisine.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    phone: "+266 2231 4567",
    hours: "11:00 AM - 10:00 PM",
    trivia: "Famous for its traditional 'morogo' (wild spinach) dishes!",
    contact: "info@regalrestaurant.ls",
  },

  // Clinics & Health Centers
  {
    id: 6,
    name: "Queen Mamohato Memorial Hospital",
    type: "clinic",
    coordinates: { lat: -29.3167, lng: 27.4833 },
    district: "Maseru",
    description: "Main referral hospital providing comprehensive healthcare services.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    phone: "+266 2231 2501",
    hours: "24 hours",
    trivia: "Named after Queen Mamohato, mother of King Letsie III.",
    contact: "info@qmmh.gov.ls",
  },
  {
    id: 7,
    name: "Berea District Hospital",
    type: "clinic",
    coordinates: { lat: -29.2167, lng: 27.6833 },
    district: "Berea",
    description: "Regional hospital serving the Berea district with emergency and general services.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.0,
    phone: "+266 2245 0234",
    hours: "24 hours",
    trivia: "One of the first hospitals built during the colonial era in 1938.",
    contact: "info@bereahospital.gov.ls",
  },

  // Schools & Educational Institutions
  {
    id: 8,
    name: "National University of Lesotho",
    type: "school",
    coordinates: { lat: -29.4667, lng: 27.7333 },
    district: "Maseru",
    description: "Premier institution of higher learning in Lesotho.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    phone: "+266 2234 0601",
    hours: "8:00 AM - 5:00 PM",
    trivia: "Established in 1975, it's the oldest university in Lesotho!",
    contact: "info@nul.ls",
    website: "www.nul.ls",
  },
  {
    id: 9,
    name: "Lesotho High School",
    type: "school",
    coordinates: { lat: -29.32, lng: 27.49 },
    district: "Maseru",
    description: "One of the oldest and most prestigious high schools in Lesotho.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    phone: "+266 2231 3456",
    hours: "7:30 AM - 4:00 PM",
    trivia: "Founded in 1956, many of Lesotho's leaders studied here!",
    contact: "admin@lesothohigh.edu.ls",
  },

  // Government Offices
  {
    id: 10,
    name: "Ministry of Home Affairs",
    type: "government",
    coordinates: { lat: -29.3167, lng: 27.4833 },
    district: "Maseru",
    description: "Main government office for identity documents and civil registration.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 3.8,
    phone: "+266 2231 2345",
    hours: "8:00 AM - 4:30 PM",
    trivia: "Processes over 50,000 identity documents annually!",
    contact: "info@homeaffairs.gov.ls",
  },
  {
    id: 11,
    name: "Berea District Council",
    type: "government",
    coordinates: { lat: -29.22, lng: 27.68 },
    district: "Berea",
    description: "Local government office serving the Berea district.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 3.6,
    phone: "+266 2245 0123",
    hours: "8:00 AM - 4:30 PM",
    trivia: "Berea means 'place of the aloes' in Sesotho.",
    contact: "info@berea.gov.ls",
  },

  // Villages & Towns
  {
    id: 12,
    name: "Ha Kome Cave Village",
    type: "village",
    coordinates: { lat: -29.5833, lng: 28.1667 },
    district: "Berea",
    description: "Traditional village built into sandstone caves, population ~200.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    phone: "+266 2245 0123",
    hours: "Daylight hours",
    trivia: "Families have lived in these caves for over 200 years!",
    contact: "chief@hakome.ls",
    population: 200,
  },
  {
    id: 13,
    name: "Morija Village",
    type: "village",
    coordinates: { lat: -29.5167, lng: 27.5833 },
    district: "Maseru",
    description: "Historic village known for its museum and cultural significance, population ~3,500.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    phone: "+266 2236 0308",
    hours: "All day",
    trivia: "Home to the first printing press in Lesotho, established in 1861!",
    contact: "info@morija.ls",
    population: 3500,
  },

  // Religious Sites
  {
    id: 14,
    name: "St. Monica's Cathedral",
    type: "religious",
    coordinates: { lat: -29.31, lng: 27.49 },
    district: "Maseru",
    description: "Beautiful Catholic cathedral and spiritual center.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    phone: "+266 2231 2678",
    hours: "6:00 AM - 6:00 PM",
    trivia: "The cathedral's bells can be heard from 5 kilometers away!",
    contact: "info@stmonicas.ls",
  },
  {
    id: 15,
    name: "Morija Mission Church",
    type: "religious",
    coordinates: { lat: -29.516, lng: 27.584 },
    district: "Maseru",
    description: "Historic mission church, first Christian mission in Lesotho.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    phone: "+266 2236 0309",
    hours: "7:00 AM - 5:00 PM",
    trivia: "Founded in 1833 by French missionaries, it's the oldest church in Lesotho!",
    contact: "heritage@morija.ls",
  },

  // Markets & Shops
  {
    id: 16,
    name: "Maseru Central Market",
    type: "market",
    coordinates: { lat: -29.32, lng: 27.48 },
    district: "Maseru",
    description: "Bustling market with local crafts, food, and traditional goods.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.1,
    phone: "+266 2231 3456",
    hours: "6:00 AM - 6:00 PM",
    trivia: "Over 500 vendors sell everything from blankets to fresh produce!",
    contact: "market@maseru.gov.ls",
  },
  {
    id: 17,
    name: "Basotho Hat Shop",
    type: "market",
    coordinates: { lat: -29.315, lng: 27.482 },
    district: "Maseru",
    description: "Traditional craft shop specializing in authentic Basotho hats and blankets.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    phone: "+266 2231 4789",
    hours: "9:00 AM - 5:00 PM",
    trivia: "Each hat takes 3 days to weave by hand using traditional techniques!",
    contact: "crafts@basothohat.ls",
  },

  // Cultural Centers
  {
    id: 18,
    name: "Morija Arts & Cultural Festival Center",
    type: "cultural",
    coordinates: { lat: -29.5167, lng: 27.5833 },
    district: "Maseru",
    description: "Hub for Basotho arts, music, and cultural preservation.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    phone: "+266 2236 0308",
    hours: "9:00 AM - 5:00 PM",
    trivia: "Hosts the annual Morija Arts Festival with over 10,000 visitors!",
    contact: "arts@morija.ls",
  },
  {
    id: 19,
    name: "Basotho Cultural Village",
    type: "cultural",
    coordinates: { lat: -29.42, lng: 27.74 },
    district: "Maseru",
    description: "Living museum showcasing traditional Basotho lifestyle and customs.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    phone: "+266 2231 5678",
    hours: "8:00 AM - 5:00 PM",
    trivia: "Visitors can learn traditional pottery, weaving, and cooking techniques!",
    contact: "culture@basothovillage.ls",
  },

  // Job Centers & Training
  {
    id: 20,
    name: "Lesotho Skills Development Center",
    type: "job",
    coordinates: { lat: -29.33, lng: 27.5 },
    district: "Maseru",
    description: "Vocational training and job placement services.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.0,
    phone: "+266 2231 4567",
    hours: "8:00 AM - 4:00 PM",
    trivia: "Trains over 2,000 people annually in various skills!",
    contact: "training@skills.gov.ls",
  },
  {
    id: 21,
    name: "Youth Employment Center",
    type: "job",
    coordinates: { lat: -29.325, lng: 27.495 },
    district: "Maseru",
    description: "Specialized center for youth employment and entrepreneurship programs.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    phone: "+266 2231 6789",
    hours: "8:00 AM - 4:30 PM",
    trivia: "Has helped over 5,000 young people find employment since 2018!",
    contact: "youth@employment.gov.ls",
  },

  // Transport Hubs
  {
    id: 22,
    name: "Maseru Bus Station",
    type: "transport",
    coordinates: { lat: -29.315, lng: 27.475 },
    district: "Maseru",
    description: "Main transport hub connecting all districts of Lesotho.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 3.5,
    phone: "+266 2231 5678",
    hours: "5:00 AM - 9:00 PM",
    trivia: "Over 15,000 passengers pass through daily!",
    contact: "info@transport.gov.ls",
  },
  {
    id: 23,
    name: "Maseru Border Post",
    type: "transport",
    coordinates: { lat: -29.28, lng: 27.51 },
    district: "Maseru",
    description: "Main border crossing between Lesotho and South Africa.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 3.8,
    phone: "+266 2231 7890",
    hours: "24 hours",
    trivia: "Processes over 10,000 border crossings daily!",
    contact: "border@homeaffairs.gov.ls",
  },

  // Agricultural Sites
  {
    id: 24,
    name: "Thaba-Tseka Agricultural Cooperative",
    type: "agriculture",
    coordinates: { lat: -29.5167, lng: 28.6167 },
    district: "Thaba-Tseka",
    description: "Community farming cooperative and seed bank.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    phone: "+266 2290 0123",
    hours: "7:00 AM - 5:00 PM",
    trivia: "Preserves over 50 traditional crop varieties!",
    contact: "coop@thabatseka.ls",
  },
  {
    id: 25,
    name: "Maseru Farmers Market",
    type: "agriculture",
    coordinates: { lat: -29.335, lng: 27.465 },
    district: "Maseru",
    description: "Weekly farmers market with fresh produce and agricultural supplies.",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.0,
    phone: "+266 2231 8901",
    hours: "6:00 AM - 2:00 PM (Saturdays)",
    trivia: "Features over 200 local farmers selling organic produce!",
    contact: "market@agriculture.gov.ls",
  },
]

const filterTypes = [
  { id: "all", label: "All Locations", icon: MapPin, color: "bg-gray-100 text-gray-700" },
  { id: "tourist", label: "Tourist Spots", icon: Star, color: "bg-purple-100 text-purple-700" },
  { id: "restaurant", label: "Restaurants", icon: Utensils, color: "bg-orange-100 text-orange-700" },
  { id: "clinic", label: "Clinics", icon: Hospital, color: "bg-red-100 text-red-700" },
  { id: "school", label: "Schools", icon: GraduationCap, color: "bg-blue-100 text-blue-700" },
  { id: "government", label: "Government", icon: Building2, color: "bg-green-100 text-green-700" },
  { id: "village", label: "Villages", icon: Home, color: "bg-yellow-100 text-yellow-700" },
  { id: "religious", label: "Religious Sites", icon: Church, color: "bg-indigo-100 text-indigo-700" },
  { id: "market", label: "Markets", icon: ShoppingBag, color: "bg-pink-100 text-pink-700" },
  { id: "cultural", label: "Cultural Centers", icon: Palette, color: "bg-teal-100 text-teal-700" },
  { id: "job", label: "Job Centers", icon: Briefcase, color: "bg-cyan-100 text-cyan-700" },
  { id: "transport", label: "Transport", icon: Bus, color: "bg-violet-100 text-violet-700" },
  { id: "agriculture", label: "Agriculture", icon: Wheat, color: "bg-lime-100 text-lime-700" },
]

const communityData = {
  topRated: [
    { name: "Maletsunyane Falls", rating: 4.8, votes: 1234, type: "tourist" },
    { name: "Sani Mountain Lodge", rating: 4.9, votes: 987, type: "tourist" },
    { name: "Morija Arts Center", rating: 4.6, votes: 654, type: "cultural" },
    { name: "Basotho Hat Shop", rating: 4.7, votes: 432, type: "market" },
  ],
  events: [
    { title: "Morija Arts Festival", date: "2024-02-15", location: "Morija", type: "Cultural" },
    { title: "Mountain Marathon", date: "2024-02-20", location: "Semonkong", type: "Sports" },
    { title: "Cultural Heritage Day", date: "2024-02-25", location: "Thaba Bosiu", type: "Heritage" },
    { title: "Agricultural Fair", date: "2024-03-01", location: "Maseru", type: "Agriculture" },
  ],
  opportunities: [
    { title: "Youth Environmental Program", type: "Volunteer", location: "Maseru", contact: "env@youth.ls" },
    { title: "School Reading Initiative", type: "Education", location: "Berea", contact: "reading@education.ls" },
    { title: "Agricultural Training", type: "Skills", location: "Thaba-Tseka", contact: "training@agri.ls" },
    { title: "Tourism Guide Training", type: "Employment", location: "Semonkong", contact: "guides@tourism.ls" },
  ],
}

// Simple map component (since we can't use external libraries)
const InteractiveMap = ({
  locations,
  selectedLocation,
  onLocationSelect,
  mapStyle,
  userLocation,
}: {
  locations: typeof locationsData
  selectedLocation: (typeof locationsData)[0] | null
  onLocationSelect: (location: (typeof locationsData)[0]) => void
  mapStyle: string
  userLocation: { lat: number; lng: number } | null
}) => {
  const getFilterIcon = (type: string) => {
    const filter = filterTypes.find((f) => f.id === type)
    return filter ? filter.icon : MapPin
  }

  return (
    <div className="relative h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
      <Image
        src="/placeholder.svg?height=600&width=800"
        alt="Interactive map of Lesotho"
        width={800}
        height={600}
        className="w-full h-full object-cover"
      />

      {/* Map overlay with location info */}
      <div className="absolute inset-0">
        {/* Map style indicator */}
        <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium capitalize flex items-center">
            <Layers className="w-4 h-4 mr-1" />
            {mapStyle} View
          </p>
        </div>

        {/* User location indicator */}
        {userLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse">
              <div className="w-8 h-8 bg-blue-200 rounded-full absolute -top-2 -left-2 animate-ping opacity-75"></div>
            </div>
          </div>
        )}

        {/* Location markers */}
        {locations.slice(0, 12).map((location, index) => {
          const IconComponent = getFilterIcon(location.type)
          const isSelected = selectedLocation?.id === location.id

          return (
            <button
              key={location.id}
              onClick={() => onLocationSelect(location)}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-all duration-200 ${
                isSelected ? "bg-red-500 ring-4 ring-red-200 scale-110" : "bg-[#002366] hover:bg-blue-700"
              }`}
              style={{
                top: `${15 + (index % 4) * 20}%`,
                left: `${15 + Math.floor(index / 4) * 20}%`,
              }}
              title={location.name}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          )
        })}

        {/* Center info overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white bg-black bg-opacity-40 p-6 rounded-lg">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Interactive Map of Lesotho</h3>
            <p className="text-lg mb-2">Click on markers to explore locations</p>
            <Badge className="bg-white text-[#002366]">{locations.length} locations available</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function KnowLesothoPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<(typeof locationsData)[0] | null>(null)
  const [bookmarkedLocations, setBookmarkedLocations] = useState<number[]>([])
  const [mapStyle, setMapStyle] = useState("roadmap")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedLocations")
    if (saved) {
      setBookmarkedLocations(JSON.parse(saved))
    }
  }, [])

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem("bookmarkedLocations", JSON.stringify(bookmarkedLocations))
  }, [bookmarkedLocations])

  const handleFilterToggle = (filterId: string) => {
    if (filterId === "all") {
      setSelectedFilters(["all"])
    } else {
      setSelectedFilters((prev) => {
        const newFilters = prev.filter((f) => f !== "all")
        if (newFilters.includes(filterId)) {
          const updated = newFilters.filter((f) => f !== filterId)
          return updated.length === 0 ? ["all"] : updated
        } else {
          return [...newFilters, filterId]
        }
      })
    }
  }

  const filteredLocations = locationsData.filter((location) => {
    const matchesFilter = selectedFilters.includes("all") || selectedFilters.includes(location.type)
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const toggleBookmark = (locationId: number) => {
    setBookmarkedLocations((prev) =>
      prev.includes(locationId) ? prev.filter((id) => id !== locationId) : [...prev, locationId],
    )
  }

  const handleUseMyLocation = () => {
    // Mock GPS location (Maseru center)
    setUserLocation({ lat: -29.3167, lng: 27.4833 })
    // Auto-select a nearby location for demo
    const nearbyLocation = locationsData.find((loc) => loc.district === "Maseru")
    if (nearbyLocation) setSelectedLocation(nearbyLocation)
  }

  const getFilterIcon = (type: string) => {
    const filter = filterTypes.find((f) => f.id === type)
    return filter ? filter.icon : MapPin
  }

  const getFilterColor = (type: string) => {
    const filter = filterTypes.find((f) => f.id === type)
    return filter ? filter.color : "bg-gray-100 text-gray-700"
  }

  const cycleMapStyle = () => {
    const styles = ["roadmap", "satellite", "dark"]
    const currentIndex = styles.indexOf(mapStyle)
    const nextIndex = (currentIndex + 1) % styles.length
    setMapStyle(styles[nextIndex])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Know Lesotho</h1>
          <p className="text-xl text-blue-200">
            Interactive digital map to discover places, services, and culture across the Kingdom
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search locations, districts, services, or types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg border-2 border-gray-300 focus:border-[#002366]"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleUseMyLocation}>
                <Locate className="w-4 h-4 mr-2" />
                My Location
              </Button>
              <Button variant="outline" onClick={cycleMapStyle}>
                <Layers className="w-4 h-4 mr-2" />
                {mapStyle === "roadmap" ? "Satellite" : mapStyle === "satellite" ? "Dark" : "Roadmap"}
              </Button>
              <Button variant="outline">
                <Globe className="w-4 h-4 mr-2" />
                Full Screen
              </Button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterTypes.map((filter) => {
              const IconComponent = filter.icon
              const isSelected = selectedFilters.includes(filter.id)
              const count =
                filter.id === "all" ? locationsData.length : locationsData.filter((l) => l.type === filter.id).length

              return (
                <Button
                  key={filter.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterToggle(filter.id)}
                  className={`${isSelected ? "bg-[#002366] hover:bg-blue-800" : ""} transition-all`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {filter.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {count}
                  </Badge>
                </Button>
              )
            })}
          </div>

          {/* Active filters display */}
          {selectedFilters.length > 0 && !selectedFilters.includes("all") && (
            <div className="flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Active filters:</span>
              {selectedFilters.map((filterId) => {
                const filter = filterTypes.find((f) => f.id === filterId)
                return filter ? (
                  <Badge key={filterId} variant="outline" className="text-xs">
                    {filter.label}
                  </Badge>
                ) : null
              })}
              <Button variant="ghost" size="sm" onClick={() => setSelectedFilters(["all"])} className="text-xs">
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <InteractiveMap
                  locations={filteredLocations}
                  selectedLocation={selectedLocation}
                  onLocationSelect={setSelectedLocation}
                  mapStyle={mapStyle}
                  userLocation={userLocation}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Location Card */}
            {selectedLocation && (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                      <p className="text-gray-600">{selectedLocation.district} District</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getFilterColor(selectedLocation.type)}>{selectedLocation.type}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(selectedLocation.id)}
                        className="p-1"
                      >
                        {bookmarkedLocations.includes(selectedLocation.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-[#002366]" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Image
                    src={selectedLocation.image || "/placeholder.svg"}
                    alt={selectedLocation.name}
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />

                  <p className="text-gray-700 mb-4">{selectedLocation.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{selectedLocation.rating}</span>
                      <span className="text-gray-600">rating</span>
                    </div>

                    {selectedLocation.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{selectedLocation.phone}</span>
                      </div>
                    )}

                    {selectedLocation.hours && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{selectedLocation.hours}</span>
                      </div>
                    )}

                    {selectedLocation.population && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Population: {selectedLocation.population.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-900 mb-1 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      Did You Know?
                    </h4>
                    <p className="text-sm text-blue-800">{selectedLocation.trivia}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-[#002366] hover:bg-blue-800">
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                    {selectedLocation.phone && (
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Community Engagement */}
            <Tabs defaultValue="rated" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="rated">Top Rated</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="volunteer">Opportunities</TabsTrigger>
              </TabsList>

              <TabsContent value="rated">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Citizen Favorites</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {communityData.topRated.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-sm">{item.rating}</span>
                            <span className="text-xs text-gray-500">({item.votes} votes)</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <Heart className="w-4 h-4 text-red-500" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {communityData.events.map((event, index) => (
                      <div key={index} className="border-l-4 border-[#002366] pl-3">
                        <p className="font-medium">{event.title}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volunteer">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Get Involved</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {communityData.opportunities.map((opp, index) => (
                      <div key={index} className="space-y-1">
                        <p className="font-medium">{opp.title}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {opp.type}
                          </Badge>
                          <span className="text-sm text-gray-600">{opp.location}</span>
                        </div>
                        <p className="text-xs text-gray-500">{opp.contact}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Search Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Locations:</span>
                    <span className="font-semibold">{filteredLocations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bookmarked:</span>
                    <span className="font-semibold">{bookmarkedLocations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Districts Covered:</span>
                    <span className="font-semibold">{new Set(filteredLocations.map((l) => l.district)).size}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {filteredLocations.map((location) => {
                  const IconComponent = getFilterIcon(location.type)
                  return (
                    <div
                      key={location.id}
                      className={`p-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedLocation?.id === location.id ? "bg-blue-50 border border-[#002366]" : ""
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1 rounded ${getFilterColor(location.type)}`}>
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{location.name}</p>
                          <p className="text-xs text-gray-600">{location.district}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs">{location.rating}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
