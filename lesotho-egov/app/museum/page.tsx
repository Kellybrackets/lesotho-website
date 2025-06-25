"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Play,
  Volume2,
  VolumeX,
  RotateCcw,
  ZoomIn,
  MapPin,
  Upload,
  Star,
  Award,
  MessageCircle,
  Globe,
} from "lucide-react"
import Image from "next/image"

const timelineEvents = [
  {
    year: "1600s",
    title: "Pre-colonial Lesotho",
    description: "Early Basotho settlements in the Caledon Valley, with communities living in harmony with the land.",
    category: "ancient",
    image: "/placeholder.svg?height=300&width=400",
    audio: "Ancient Basotho communities developed sophisticated agricultural and pastoral systems...",
  },
  {
    year: "1822",
    title: "Birth of King Moshoeshoe I",
    description:
      "The founder of the Basotho nation was born in Menkhoaneng, establishing the foundation of modern Lesotho.",
    category: "royal",
    image: "/placeholder.svg?height=300&width=400",
    audio: "Moshoeshoe I was born during a time of great upheaval in southern Africa...",
  },
  {
    year: "1824",
    title: "Moshoeshoe I Unification",
    description:
      "King Moshoeshoe I established his mountain fortress at Thaba Bosiu, uniting various clans into the Basotho nation.",
    category: "unification",
    image: "/placeholder.svg?height=300&width=400",
    audio: "The great king chose Thaba Bosiu as his stronghold, a mountain that could be defended...",
  },
  {
    year: "1868",
    title: "British Protectorate",
    description: "Basutoland became a British protectorate, protecting it from incorporation into South Africa.",
    category: "colonial",
    image: "/placeholder.svg?height=300&width=400",
    audio: "The decision to become a British protectorate was strategic, preserving Basotho independence...",
  },
  {
    year: "1966",
    title: "Independence Day",
    description:
      "Lesotho gained independence from Britain on October 4, 1966, with King Moshoeshoe II as head of state.",
    category: "independence",
    image: "/placeholder.svg?height=300&width=400",
    audio: "October 4th, 1966 marked the birth of the modern Kingdom of Lesotho...",
  },
  {
    year: "1993",
    title: "Founding of Parliament",
    description: "Establishment of democratic governance with the return to constitutional monarchy.",
    category: "democracy",
    image: "/placeholder.svg?height=300&width=400",
    audio: "The restoration of democratic governance brought stability and progress...",
  },
  {
    year: "1975",
    title: "National University Founded",
    description: "The National University of Lesotho was established, marking a milestone in education and innovation.",
    category: "innovation",
    image: "/placeholder.svg?height=300&width=400",
    audio: "Higher education became accessible to all Basotho, fostering intellectual growth...",
  },
]

const artifacts = [
  {
    id: "mokorotlo",
    name: "Mokorotlo Hat",
    description:
      "The traditional conical hat made from grass, symbolizing Basotho identity and featured on the national flag.",
    category: "clothing",
    model: "/placeholder.svg?height=300&width=300",
    audio: "The Mokorotlo is more than just a hat - it represents the very essence of being Basotho...",
  },
  {
    id: "blanket",
    name: "Basotho Blanket",
    description:
      "Traditional blankets with unique patterns that tell stories and indicate social status within Basotho society.",
    category: "clothing",
    model: "/placeholder.svg?height=300&width=300",
    audio: "Each pattern on a Basotho blanket tells a story, passed down through generations...",
  },
  {
    id: "spear",
    name: "Traditional Spear",
    description: "Ceremonial and hunting spears used by Basotho warriors and hunters.",
    category: "weapons",
    model: "/placeholder.svg?height=300&width=300",
    audio: "These spears were not just weapons, but symbols of manhood and responsibility...",
  },
  {
    id: "pottery",
    name: "Ancient Pottery",
    description: "Clay vessels used for storing grain, water, and traditional beer.",
    category: "household",
    model: "/placeholder.svg?height=300&width=300",
    audio: "Basotho pottery reflects the practical artistry of daily life in the mountains...",
  },
]

const museums = [
  {
    name: "Thaba-Bosiu Cultural Village",
    location: "Maseru District",
    description: "Historic site where King Moshoeshoe I established his kingdom, now a living cultural village.",
    image: "/placeholder.svg?height=200&width=300",
    exhibits: ["Royal artifacts", "Traditional architecture", "Cultural performances"],
    phone: "+266 2231 2345",
    hours: "8:00 AM - 5:00 PM",
  },
  {
    name: "Morija Museum & Archives",
    location: "Maseru District",
    description: "Comprehensive collection of Basotho history, culture, and missionary heritage.",
    image: "/placeholder.svg?height=200&width=300",
    exhibits: ["Historical documents", "Traditional crafts", "Missionary artifacts"],
    phone: "+266 2236 0308",
    hours: "9:00 AM - 4:00 PM",
  },
  {
    name: "National Museum",
    location: "Maseru",
    description: "The premier museum showcasing Lesotho's natural and cultural heritage.",
    image: "/placeholder.svg?height=200&width=300",
    exhibits: ["Geological specimens", "Archaeological finds", "Contemporary art"],
    phone: "+266 2231 3034",
    hours: "9:00 AM - 4:30 PM",
  },
  {
    name: "Mokhotlong Heritage Centre",
    location: "Mokhotlong District",
    description: "Mountain heritage center focusing on highland culture and traditions.",
    image: "/placeholder.svg?height=200&width=300",
    exhibits: ["Highland artifacts", "Traditional music", "Pastoral culture"],
    phone: "+266 2295 0123",
    hours: "8:00 AM - 4:00 PM",
  },
]

const videos = [
  {
    id: "founding",
    title: "The Founding of Lesotho",
    description: "Documentary about King Moshoeshoe I and the birth of the Basotho nation",
    duration: "25:30",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "moshoeshoe",
    title: "The Life of King Moshoeshoe I",
    description: "Biographical documentary about the great king and his legacy",
    duration: "32:15",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "blanket",
    title: "The Story Behind the Basotho Blanket",
    description: "Cultural documentary exploring the significance of traditional blankets",
    duration: "18:45",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

const artworks = [
  {
    id: 1,
    title: "Mountain Spirits",
    artist: "Palesa Mokoena",
    medium: "Digital Art",
    year: "2024",
    image: "/placeholder.svg?height=300&width=400",
    description: "Contemporary interpretation of traditional Basotho spiritual beliefs",
  },
  {
    id: 2,
    title: "Blanket Patterns",
    artist: "Thabo Letsie",
    medium: "Mixed Media",
    year: "2023",
    image: "/placeholder.svg?height=300&width=400",
    description: "Modern artistic exploration of traditional blanket designs",
  },
  {
    id: 3,
    title: "Highland Dreams",
    artist: "Mamello Khiba",
    medium: "Photography",
    year: "2024",
    image: "/placeholder.svg?height=300&width=400",
    description: "Photographic series capturing the beauty of Lesotho's mountains",
  },
]

const visitorComments = [
  {
    name: "Sarah M.",
    rating: 5,
    comment: "Amazing digital experience! I learned so much about Basotho culture.",
    date: "2024-01-20",
  },
  {
    name: "Thabo K.",
    rating: 5,
    comment: "The 3D artifacts are incredible. My children loved the interactive features.",
    date: "2024-01-18",
  },
  {
    name: "Maria L.",
    rating: 4,
    comment: "Great way to explore Lesotho's heritage from anywhere in the world.",
    date: "2024-01-15",
  },
]

const quizQuestions = [
  {
    question: "What year did Lesotho gain independence?",
    options: ["1966", "1993", "1975", "1822"],
    correct: 0,
  },
  {
    question: "Who founded the Basotho nation?",
    options: ["King Moshoeshoe I", "King Moshoeshoe II", "Thabo Letsie", "Mamello Khiba"],
    correct: 0,
  },
]

export default function MuseumPage() {
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState(0)
  const [selectedArtifact, setSelectedArtifact] = useState(artifacts[0])
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [kidsMode, setKidsMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [quizScore, setQuizScore] = useState(0)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "royal":
        return "bg-purple-100 text-purple-700"
      case "ancient":
        return "bg-amber-100 text-amber-700"
      case "unification":
        return "bg-blue-100 text-blue-700"
      case "colonial":
        return "bg-gray-100 text-gray-700"
      case "independence":
        return "bg-green-100 text-green-700"
      case "democracy":
        return "bg-red-100 text-red-700"
      case "innovation":
        return "bg-indigo-100 text-indigo-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const nextTimelineEvent = () => {
    setSelectedTimelineEvent((prev) => (prev + 1) % timelineEvents.length)
  }

  const prevTimelineEvent = () => {
    setSelectedTimelineEvent((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length)
  }

  const handleQuizAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === quizQuestions[currentQuiz].correct) {
      setQuizScore((prev) => prev + 1)
    }
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002366] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Digital Museum of Lesotho</h1>
              <p className="text-xl text-blue-200">Explore the rich heritage and culture of the Kingdom of Lesotho</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "st" : "en")}
                className="bg-white text-[#002366] border-white hover:bg-blue-50"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "Sesotho" : "English"}
              </Button>
              <Button
                variant={kidsMode ? "secondary" : "outline"}
                size="sm"
                onClick={() => setKidsMode(!kidsMode)}
                className={kidsMode ? "" : "bg-white text-[#002366] border-white hover:bg-blue-50"}
              >
                {kidsMode ? "Exit Kids Mode" : "Kids Mode"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="timeline" className="space-y-8">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="artifacts">3D Artifacts</TabsTrigger>
            <TabsTrigger value="museums">Museums</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="art">Digital Art</TabsTrigger>
            <TabsTrigger value="country">Learn About Lesotho</TabsTrigger>
            <TabsTrigger value="visitor">Visitor Book</TabsTrigger>
          </TabsList>

          {/* Virtual Timeline Carousel */}
          <TabsContent value="timeline">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-96">
                    <Image
                      src={timelineEvents[selectedTimelineEvent].image || "/placeholder.svg"}
                      alt={timelineEvents[selectedTimelineEvent].title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className={getCategoryColor(timelineEvents[selectedTimelineEvent].category)}>
                        {timelineEvents[selectedTimelineEvent].category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-[#002366]" />
                        <span className="text-2xl font-bold text-[#002366]">
                          {timelineEvents[selectedTimelineEvent].year}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={prevTimelineEvent}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={nextTimelineEvent}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{timelineEvents[selectedTimelineEvent].title}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      {timelineEvents[selectedTimelineEvent].description}
                    </p>

                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm" onClick={() => setIsAudioPlaying(!isAudioPlaying)}>
                        {isAudioPlaying ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                        {isAudioPlaying ? "Stop Audio" : "Play Audio"}
                      </Button>
                    </div>

                    <div className="flex justify-center mt-6 space-x-2">
                      {timelineEvents.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTimelineEvent(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === selectedTimelineEvent ? "bg-[#002366]" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3D Artifact Explorer */}
          <TabsContent value="artifacts">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#002366]">Artifacts Collection</h3>
                {artifacts.map((artifact) => (
                  <Card
                    key={artifact.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedArtifact.id === artifact.id ? "ring-2 ring-[#002366]" : ""
                    }`}
                    onClick={() => setSelectedArtifact(artifact)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{artifact.name}</h4>
                      <p className="text-sm text-gray-600">{artifact.category}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {selectedArtifact.name}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-6">
                      <Image
                        src={selectedArtifact.model || "/placeholder.svg"}
                        alt={selectedArtifact.name}
                        width={500}
                        height={400}
                        className="w-full h-64 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-lg">
                        <p className="text-white font-semibold">3D Model Viewer</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{selectedArtifact.description}</p>

                    <Button variant="outline" onClick={() => setIsAudioPlaying(!isAudioPlaying)}>
                      {isAudioPlaying ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                      {isAudioPlaying ? "Stop Audio" : "Listen to Story"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Museum Integration */}
          <TabsContent value="museums">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#002366]">Partner Museums</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {museums.map((museum, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Image
                        src={museum.image || "/placeholder.svg"}
                        alt={museum.name}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-2">{museum.name}</h4>
                        <p className="text-gray-600 mb-4">{museum.description}</p>

                        <div className="space-y-2 mb-4">
                          <p className="text-sm">
                            <strong>Location:</strong> {museum.location}
                          </p>
                          <p className="text-sm">
                            <strong>Phone:</strong> {museum.phone}
                          </p>
                          <p className="text-sm">
                            <strong>Hours:</strong> {museum.hours}
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold mb-2">Current Exhibits:</h5>
                          <div className="flex flex-wrap gap-2">
                            {museum.exhibits.map((exhibit, idx) => (
                              <Badge key={idx} variant="outline">
                                {exhibit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="bg-[#002366] hover:bg-blue-800">
                            <MapPin className="w-4 h-4 mr-2" />
                            Visit In Person
                          </Button>
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Virtual Tour
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="w-4 h-4 mr-2" />
                            School Tour
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Interactive Video Exhibits */}
          <TabsContent value="videos">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#002366]">Video Documentaries</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => setSelectedVideo(video.id)}
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all"
                        >
                          <Play className="w-12 h-12 text-white" />
                        </button>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold mb-2">{video.title}</h4>
                        <p className="text-sm text-gray-600">{video.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Digital Art Hall */}
          <TabsContent value="art">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#002366]">Digital Art Hall</h3>
                <Button className="bg-[#002366] hover:bg-blue-800">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Your Art
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {artworks.map((artwork) => (
                  <Card key={artwork.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Image
                        src={artwork.image || "/placeholder.svg"}
                        alt={artwork.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold mb-1">{artwork.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">by {artwork.artist}</p>
                        <p className="text-xs text-gray-500 mb-2">
                          {artwork.medium} • {artwork.year}
                        </p>
                        <p className="text-sm">{artwork.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Learn About Lesotho */}
          <TabsContent value="country">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#002366] mb-4">🇱🇸 Learn More About Lesotho</h3>
                <p className="text-lg text-gray-600">Discover the Kingdom in the Sky</p>
              </div>

              {/* National Flag and Symbolism */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">🇱🇸</span>
                    National Flag and Symbolism
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-b from-blue-500 via-white via-white to-green-500 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">MOKOROTLO</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded"></div>
                        <span>
                          <strong>Blue:</strong> Sky and rain - life-giving water
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-white border rounded"></div>
                        <span>
                          <strong>White:</strong> Peace and purity
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded"></div>
                        <span>
                          <strong>Green:</strong> Land and prosperity
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-black rounded"></div>
                        <span>
                          <strong>Black Mokorotlo:</strong> Cultural heritage and identity
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-[#002366]" />
                    Geographic Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-lg mb-4">
                        Lesotho is a unique landlocked country completely surrounded by South Africa, making it one of
                        only three enclaved countries in the world.
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">🏔️ Unique Geography:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Entirely above 1,000m elevation</li>
                          <li>• Highest low point in the world (1,400m)</li>
                          <li>• Known as "Kingdom in the Sky"</li>
                          <li>• Highest point: 3,482m (Thabana Ntlenyana)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-[#002366] mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive Map</p>
                        <p className="text-xs text-gray-500">Southern Africa Region</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Facts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    Key Facts About Lesotho
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Users className="w-8 h-8 text-[#002366] mx-auto mb-2" />
                      <h4 className="font-bold">Population</h4>
                      <p className="text-2xl font-bold text-[#002366]">~2.1M</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-[#002366] mx-auto mb-2" />
                      <h4 className="font-bold">Independence</h4>
                      <p className="text-lg font-bold text-[#002366]">Oct 4, 1966</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Award className="w-8 h-8 text-[#002366] mx-auto mb-2" />
                      <h4 className="font-bold">Government</h4>
                      <p className="text-sm font-semibold text-[#002366]">Constitutional Monarchy</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-bold mb-2">💧 Water Resources:</h4>
                    <p>
                      Lesotho is water-rich and exports water to South Africa through the Lesotho Highlands Water
                      Project, one of Africa's largest infrastructure projects.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Leadership */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">👑</span>
                    Current Leadership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <div className="w-20 h-20 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">👑</span>
                      </div>
                      <h4 className="font-bold text-lg">His Majesty King Letsie III</h4>
                      <p className="text-sm text-gray-600">King of Lesotho</p>
                      <p className="text-xs text-gray-500 mt-2">Reigning since 1996</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">🏛️</span>
                      </div>
                      <h4 className="font-bold text-lg">The Right Honourable Sam Matekane</h4>
                      <p className="text-sm text-gray-600">Prime Minister</p>
                      <p className="text-xs text-gray-500 mt-2">In office since 2022</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Districts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">🗺️</span>
                    Districts of Lesotho
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Lesotho is divided into 10 administrative districts:</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      "Maseru",
                      "Leribe",
                      "Berea",
                      "Mafeteng",
                      "Mohale's Hoek",
                      "Quthing",
                      "Qacha's Nek",
                      "Mokhotlong",
                      "Thaba-Tseka",
                      "Butha-Buthe",
                    ].map((district, index) => (
                      <div
                        key={district}
                        className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                      >
                        <h4 className="font-semibold text-sm text-[#002366]">{district}</h4>
                        <p className="text-xs text-gray-600">District {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Culture & Heritage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">🎭</span>
                    Culture & Heritage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3">🗣️ Languages:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-[#002366]">Native</Badge>
                          <span>
                            <strong>Sesotho</strong> - Spoken by all Basotho people
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">Official</Badge>
                          <span>
                            <strong>English</strong> - Used in government and education
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3">🎨 Cultural Symbols:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🎩</span>
                          <span>
                            <strong>Mokorotlo hat</strong> - Traditional conical grass hat
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🧥</span>
                          <span>
                            <strong>Seanamarena blanket</strong> - Traditional patterned blanket
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Economy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">💼</span>
                    Economy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-3xl mb-2 block">💧</span>
                      <h4 className="font-bold">Water Export</h4>
                      <p className="text-sm">Lesotho Highlands Water Project</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <span className="text-3xl mb-2 block">🌾</span>
                      <h4 className="font-bold">Agriculture</h4>
                      <p className="text-sm">Maize, wheat, sorghum</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <span className="text-3xl mb-2 block">🏭</span>
                      <h4 className="font-bold">Industry</h4>
                      <p className="text-sm">Textiles and garments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Climate & Geography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">🌤️</span>
                    Climate & Geography
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3">🌍 Two Main Seasons:</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <h5 className="font-semibold flex items-center">
                            <span className="text-xl mr-2">☀️</span>
                            Summer (October–March)
                          </h5>
                          <p className="text-sm text-gray-600">Warm & Rainy season</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h5 className="font-semibold flex items-center">
                            <span className="text-xl mr-2">❄️</span>
                            Winter (April–September)
                          </h5>
                          <p className="text-sm text-gray-600">Cold & Dry season</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <span className="text-4xl mb-3 block">🏔️</span>
                      <h4 className="font-bold text-lg">Highest Point</h4>
                      <p className="text-2xl font-bold text-[#002366]">3,482m</p>
                      <p className="text-sm text-gray-600">Thabana Ntlenyana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visitor Book & Feedback */}
          <TabsContent value="visitor">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-[#002366] mb-6">Share Your Experience</h3>
                <Card>
                  <CardContent className="pt-6">
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div>
                        <Label htmlFor="rating">Rating</Label>
                        <div className="flex space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-6 h-6 text-yellow-400 cursor-pointer hover:text-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="tradition">Tell us about your favorite Basotho tradition</Label>
                        <Textarea
                          id="tradition"
                          placeholder="Share what you learned or what interested you most..."
                          rows={4}
                        />
                      </div>
                      <Button className="w-full bg-[#002366] hover:bg-blue-800">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Share Your Thoughts
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#002366] mb-6">Visitor Comments</h3>
                <div className="space-y-4">
                  {visitorComments.map((comment, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{comment.name}</h4>
                          <div className="flex space-x-1">
                            {[...Array(comment.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.comment}</p>
                        <p className="text-xs text-gray-500">{comment.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
