'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignToText() {
  const [isRecording, setIsRecording] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      streamRef.current = stream
    } catch (err) {
      console.error("Error accessing the camera:", err)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopCamera()
      // Here you would typically send the recorded data to your backend for processing
      setTranslatedText("Sample translated text. Replace this with actual backend integration.")
    } else {
      startCamera()
      setTranslatedText('')
    }
    setIsRecording(!isRecording)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold">Sign to Text Translator</h1>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Camera Feed</CardTitle>
          <CardDescription>Show your signs to the camera for translation</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          </div>
          <Button onClick={toggleRecording}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        </CardContent>
      </Card>
      {translatedText && (
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Translated Text</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{translatedText}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

