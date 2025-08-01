"use client"

import type React from "react"

import { useState } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Link } from "lucide-react"

export default function Component() {
  const [url, setUrl] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQRCode = async () => {
    if (!url.trim()) return

    setIsGenerating(true)
    try {
      const qrDataURL = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      setQrCode(qrDataURL)
    } catch (error) {
      console.error("Error generating QR code:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCode) return

    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = qrCode
    link.click()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateQRCode()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Link className="h-6 w-6" />
            QR Code Generator
          </CardTitle>
          <CardDescription>Enter a URL to generate a QR code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <Button onClick={generateQRCode} className="w-full" disabled={!url.trim() || isGenerating}>
            {isGenerating ? "Generating..." : "Generate QR Code"}
          </Button>

          {qrCode && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg border">
                  <img src={qrCode || "/placeholder.svg"} alt="Generated QR Code" className="w-64 h-64" />
                </div>
              </div>

              <Button onClick={downloadQRCode} variant="outline" className="w-full bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
