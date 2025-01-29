"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchSignVideos } from "../utils/api";
import { useRouter } from "next/navigation";

interface Video {
  word: string;
  video_url: string;
}

export default function TextToSign() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [signVideos, setSignVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to translate.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const videos = await fetchSignVideos(inputText);
      setSignVideos(videos);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user") || !localStorage.getItem("jwt"))
      router.push("/login");
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold">Text to Sign Translator</h1>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Enter Text</CardTitle>
          <CardDescription>
            Type the text you want to translate to sign language
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Input
            placeholder="Enter text here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={handleTranslate} disabled={loading}>
            {loading ? "Translating..." : "Translate to Sign"}
          </Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>

      {signVideos.length > 0 && (
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Sign Language Translation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {signVideos.map((video, index) => (
                <div key={index}>
                  <p className="text-center text-xl">{video.word}</p>
                  <video
                    key={index}
                    src={video.video_url}
                    controls
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
