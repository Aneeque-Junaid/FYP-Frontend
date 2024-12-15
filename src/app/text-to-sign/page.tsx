'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function TextToSign() {
  const [inputText, setInputText] = useState('')
  const [signImages, setSignImages] = useState<string[]>([])

  const handleTranslate = () => {
    // This is where you would integrate with your backend to get the sign images
    // For now, we'll just use placeholder images
    const placeholderImages = Array(inputText.split(' ').length).fill('/placeholder.svg')
    setSignImages(placeholderImages)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold">Text to Sign Translator</h1>
      
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Enter Text</CardTitle>
          <CardDescription>Type the text you want to translate to sign language</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Input
            placeholder="Enter text here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={handleTranslate}>Translate to Sign</Button>
        </CardContent>
      </Card>
      {signImages.length > 0 && (
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Sign Language Translation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {signImages.map((src, index) => (
                <img key={index} src={src} alt={`Sign ${index + 1}`} className="w-full aspect-square object-cover rounded-lg" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

