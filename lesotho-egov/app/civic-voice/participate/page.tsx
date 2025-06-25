"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Vote, Calendar, Users, Star, CheckCircle, Clock, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"

const surveys = [
  {
    id: "survey-1",
    title: "Should passports auto-renew?",
    description: "Help us decide if passport renewals should be automatic for eligible citizens",
    category: "Policy",
    deadline: "2024-02-15",
    responses: 1247,
    target: 2000,
    status: "active",
    questions: [
      {
        id: "q1",
        text: "Do you support automatic passport renewal for citizens with clean records?",
        type: "yes-no",
      },
      {
        id: "q2",
        text: "What should be the maximum auto-renewal period?",
        type: "multiple",
        options: ["5 years", "10 years", "15 years", "No limit"],
      },
    ],
  },
  {
    id: "survey-2",
    title: "Digital Services Satisfaction",
    description: "Rate your experience with our online government services",
    category: "Service Quality",
    deadline: "2024-02-20",
    responses: 892,
    target: 1500,
    status: "active",
    questions: [
      {
        id: "q1",
        text: "How would you rate the overall user experience?",
        type: "rating",
      },
      {
        id: "q2",
        text: "Which service needs the most improvement?",
        type: "multiple",
        options: ["National ID", "Passport", "Tax Filing", "Land Registration", "Business Registration"],
      },
    ],
  },
  {
    id: "survey-3",
    title: "Public Transport Improvements",
    description: "Share your thoughts on improving public transportation in Lesotho",
    category: "Infrastructure",
    deadline: "2024-01-30",
    responses: 2156,
    target: 2000,
    status: "completed",
    questions: [],
  },
]

const policies = [
  {
    id: "policy-1",
    title: "Digital Identity Framework 2024",
    description: "New framework for digital identity verification and management",
    department: "Ministry of Home Affairs",
    publishDate: "2024-01-15",
    commentDeadline: "2024-02-15",
    status: "open",
    comments: 45,
  },
  {
    id: "policy-2",
    title: "E-Government Services Expansion",
    description: "Plan to expand digital government services to rural areas",
    department: "Ministry of Communications",
    publishDate: "2024-01-10",
    commentDeadline: "2024-02-10",
    status: "open",
    comments: 23,
  },
  {
    id: "policy-3",
    title: "Youth Employment Initiative",
    description: "New policies to create employment opportunities for young people",
    department: "Ministry of Labour",
    publishDate: "2024-01-05",
    commentDeadline: "2024-01-25",
    status: "closed",
    comments: 78,
  },
]

const events = [
  {
    id: "event-1",
    title: "Digital Transformation Town Hall",
    description: "Community discussion on digitizing government services",
    date: "2024-02-10",
    time: "14:00",
    location: "Maseru Community Center",
    type: "Town Hall",
    capacity: 200,
    registered: 156,
  },
  {
    id: "event-2",
    title: "Youth Policy Workshop",
    description: "Workshop to gather input on youth employment policies",
    date: "2024-02-15",
    time: "10:00",
    location: "National University of Lesotho",
    type: "Workshop",
    capacity: 100,
    registered: 67,
  },
  {
    id: "event-3",
    title: "Rural Development Forum",
    description: "Forum to discuss rural infrastructure and services",
    date: "2024-02-20",
    time: "09:00",
    location: "Berea District Council",
    type: "Forum",
    capacity: 150,
    registered: 89,
  },
]

export default function ParticipatePage() {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null)
  const [surveyResponses, setSurveyResponses] = useState<Record<string, any>>({})
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)

  const handleSurveyResponse = (surveyId: string, questionId: string, response: any) => {
    setSurveyResponses((prev) => ({
      ...prev,
      [`${surveyId}-${questionId}`]: response,
    }))
  }

  const submitSurvey = (surveyId: string) => {
    // Save to localStorage
    const responses = Object.keys(surveyResponses)
      .filter((key) => key.startsWith(surveyId))
      .reduce(
        (acc, key) => {
          acc[key] = surveyResponses[key]
          return acc
        },
        {} as Record<string, any>,
      )

    localStorage.setItem(`survey-${surveyId}`, JSON.stringify(responses))
    setSelectedSurvey(null)
    alert("Thank you for your participation! Your responses have been recorded.")
  }

  const submitFeedback = () => {
    const feedbackData = {
      rating,
      comment: feedback,
      timestamp: new Date().toISOString(),
    }

    const existingFeedback = JSON.parse(localStorage.getItem("serviceFeedback") || "[]")
    existingFeedback.push(feedbackData)
    localStorage.setItem("serviceFeedback", JSON.stringify(existingFeedback))

    setFeedback("")
    setRating(0)
    alert("Thank you for your feedback!")
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
          <h1 className="text-3xl font-bold">Participate in Governance</h1>
          <p className="text-blue-200">Shape the future of Lesotho through your participation</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="surveys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="surveys">Surveys</TabsTrigger>
            <TabsTrigger value="policies">Policy Notices</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* Surveys Tab */}
          <TabsContent value="surveys">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#002366] mb-2">Active Surveys</h2>
                <p className="text-gray-600">Your voice matters - participate in shaping government policies</p>
              </div>

              {selectedSurvey ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{surveys.find((s) => s.id === selectedSurvey)?.title}</CardTitle>
                      <Button variant="outline" onClick={() => setSelectedSurvey(null)}>
                        Back to Surveys
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {surveys
                      .find((s) => s.id === selectedSurvey)
                      ?.questions.map((question, index) => (
                        <div key={question.id} className="mb-6">
                          <h4 className="font-semibold mb-3">
                            {index + 1}. {question.text}
                          </h4>

                          {question.type === "yes-no" && (
                            <div className="flex space-x-4">
                              <Button
                                variant={
                                  surveyResponses[`${selectedSurvey}-${question.id}`] === "yes" ? "default" : "outline"
                                }
                                onClick={() => handleSurveyResponse(selectedSurvey, question.id, "yes")}
                              >
                                Yes
                              </Button>
                              <Button
                                variant={
                                  surveyResponses[`${selectedSurvey}-${question.id}`] === "no" ? "default" : "outline"
                                }
                                onClick={() => handleSurveyResponse(selectedSurvey, question.id, "no")}
                              >
                                No
                              </Button>
                            </div>
                          )}

                          {question.type === "multiple" && question.options && (
                            <div className="space-y-2">
                              {question.options.map((option) => (
                                <Button
                                  key={option}
                                  variant={
                                    surveyResponses[`${selectedSurvey}-${question.id}`] === option
                                      ? "default"
                                      : "outline"
                                  }
                                  onClick={() => handleSurveyResponse(selectedSurvey, question.id, option)}
                                  className="w-full justify-start"
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          )}

                          {question.type === "rating" && (
                            <div className="flex space-x-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Button
                                  key={star}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSurveyResponse(selectedSurvey, question.id, star)}
                                >
                                  <Star
                                    className={`w-6 h-6 ${
                                      (surveyResponses[`${selectedSurvey}-${question.id}`] || 0) >= star
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                    <Button
                      onClick={() => submitSurvey(selectedSurvey)}
                      className="w-full bg-[#002366] hover:bg-blue-800"
                    >
                      Submit Survey
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {surveys.map((survey) => (
                    <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{survey.title}</CardTitle>
                            <Badge variant="outline" className="mt-2">
                              {survey.category}
                            </Badge>
                          </div>
                          <Badge
                            className={
                              survey.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {survey.status === "active" ? (
                              <Clock className="w-3 h-3 mr-1" />
                            ) : (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {survey.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{survey.description}</p>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Responses</span>
                              <span>
                                {survey.responses}/{survey.target}
                              </span>
                            </div>
                            <Progress value={(survey.responses / survey.target) * 100} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Ends: {survey.deadline}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {survey.responses} responses
                            </span>
                          </div>
                        </div>

                        {survey.status === "active" && (
                          <Button
                            onClick={() => setSelectedSurvey(survey.id)}
                            className="w-full mt-4 bg-[#002366] hover:bg-blue-800"
                          >
                            <Vote className="w-4 h-4 mr-2" />
                            Participate
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Policy Notices Tab */}
          <TabsContent value="policies">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#002366] mb-2">Public Policy Notices</h2>
                <p className="text-gray-600">Review and comment on proposed government policies</p>
              </div>

              <div className="space-y-4">
                {policies.map((policy) => (
                  <Card key={policy.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{policy.title}</CardTitle>
                          <p className="text-gray-600 mt-1">{policy.department}</p>
                        </div>
                        <Badge
                          className={
                            policy.status === "open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {policy.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{policy.description}</p>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Published:</span>
                          <p>{policy.publishDate}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Comment Deadline:</span>
                          <p>{policy.commentDeadline}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Comments:</span>
                          <p className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {policy.comments}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Read Full Policy
                        </Button>
                        {policy.status === "open" && (
                          <Button size="sm" className="bg-[#002366] hover:bg-blue-800">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Add Comment
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#002366] mb-2">Town Halls & Events</h2>
                <p className="text-gray-600">Join community discussions and government events</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="outline">{event.type}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{event.description}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span>
                            {event.date} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Registration</span>
                          <span>
                            {event.registered}/{event.capacity}
                          </span>
                        </div>
                        <Progress value={(event.registered / event.capacity) * 100} className="h-2" />
                      </div>

                      <Button className="w-full mt-4 bg-[#002366] hover:bg-blue-800">Register to Attend</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#002366] mb-2">Service Feedback</h2>
                <p className="text-gray-600">Help us improve by rating the government services you've used</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Rate Your Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Overall Service Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button key={star} variant="ghost" size="sm" onClick={() => setRating(star)}>
                          <Star
                            className={`w-8 h-8 ${rating >= star ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Comments</label>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Tell us about your experience with our services..."
                      rows={4}
                    />
                  </div>

                  <Button
                    onClick={submitFeedback}
                    className="w-full bg-[#002366] hover:bg-blue-800"
                    disabled={rating === 0}
                  >
                    Submit Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
