import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SmartAssistant from "@/components/smart-assistant"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lesotho.com - Kingdom of Lesotho Digital Services",
  description:
    "Official digital service platform for the Kingdom of Lesotho. Access government services, documents, and explore Lesotho's rich culture and history.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SmartAssistant />
      </body>
    </html>
  )
}
