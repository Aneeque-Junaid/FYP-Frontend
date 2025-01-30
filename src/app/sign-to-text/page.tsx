"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";

const LANGUAGES = [
  { value: "ASL", label: "ASL" },
  { value: "Arabic", label: "Arabic" },
];

export default function SignToText() {
  /* REFS */
  const ws = useRef<WebSocket | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  /* STATES */
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [prediction, setPrediction] = useState("");
  // const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [questions, setQuestions] = useState<string[]>([]);
  // const [translatedText, setTranslatedText] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPredictionCorrect, setIsPredictionCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>("");
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0].value);

  /* ADDITIONAL STATES */
  const questionPool = [
    { word: "A", probability: 0.6 },
    { word: "B", probability: 0.6 },
    { word: "C", probability: 0.4 },
    { word: "E", probability: 0.4 },
    { word: "G", probability: 0.2 },
    { word: "H", probability: 0.2 },
    { word: "I", probability: 0.5 },
    { word: "J", probability: 0.5 },
    { word: "K", probability: 0.3 },
    { word: "L", probability: 0.8 },
    { word: "O", probability: 0.4 },
    { word: "R", probability: 0.3 },
    { word: "S", probability: 0.4 },
    { word: "T", probability: 0.3 },
    { word: "U", probability: 0.2 },
    { word: "V", probability: 0.3 },
    { word: "W", probability: 0.5 },
    { word: "X", probability: 0.3 },
    { word: "Y", probability: 0.6 },
    { word: "Thank you", probability: 0.7 },
    { word: "Sorry", probability: 0.2 },
    { word: "Please", probability: 0.4 },
    { word: "Hello", probability: 0.8 },
    { word: "I / Me", probability: 0.4 },
    { word: "Us", probability: 0.6 },
    { word: "My", probability: 0.7 },
    { word: "Do", probability: 0.4 },
    { word: "Go", probability: 0.2 },
    { word: "Busy", probability: 0.5 },
    { word: "Food", probability: 0.5 },
  ];

  const arabicQuesions = [
    { word: "ع", probability: 0.7 },
    { word: "ال", probability: 0.7 },
    { word: "ا", probability: 0.6 },
    { word: "ب", probability: 0.6 },
    { word: "ض", probability: 0.3 },
    { word: "د", probability: 0.3 },
    { word: "ف", probability: 0.6 },
    { word: "ح", probability: 0.2 },
    { word: "ه", probability: 0.2 },
    { word: "ج", probability: 0.2 },
    { word: "خ", probability: 0.3 },
    { word: "لا", probability: 0.6 },
    { word: "ل", probability: 0.4 },
    { word: "م", probability: 0.7 },
    { word: "ن", probability: 0.8 },
    { word: "ق", probability: 0.7 },
    { word: "ر", probability: 0.7 },
    { word: "ص", probability: 0.5 },
    { word: "س", probability: 0.5 },
    { word: "ش", probability: 0.6 },
    { word: "ط", probability: 0.4 },
    { word: "ذ", probability: 0.5 },
    { word: "ث", probability: 0.1 },
    { word: "ي", probability: 0.1 },
    { word: "ز", probability: 0.8 },
  ];

  const timerPercentage = (timeLeft / 120) * 100;

  /* HANDLERS */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const generateQuestions = useCallback(() => {
    const weightedQuestions = questionPool.flatMap(({ word, probability }) =>
      Array(Math.floor(probability * 100)).fill(word)
    );
    const shuffled = weightedQuestions.toSorted(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, [questionPool]);
  
  const generateArabicQuestions = useCallback(() => {
    const weightedQuestions = arabicQuesions.flatMap(({ word, probability }) =>
      Array(Math.floor(probability * 100)).fill(word)
    );
    const shuffled = weightedQuestions.toSorted(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, [arabicQuesions]);

  const handleSelectLanguage = (value: string) => {
    setSelectedLanguage(value);
  };

  // const stopCamera = () => {
  //   if (streamRef.current) {
  //     streamRef.current.getTracks().forEach((track) => track.stop());
  //   }
  //   if (videoRef.current) {
  //     videoRef.current.srcObject = null;
  //   }
  // };

  // const toggleRecording = () => {
  //   if (isRecording) {
  //     stopCamera();
  //     // Here you would typically send the recorded data to your backend for processing
  //     setTranslatedText(
  //       "Sample translated text. Replace this with actual backend integration."
  //     );
  //   } else {
  //     startCamera();
  //     setTranslatedText("");
  //   }
  //   setIsRecording(!isRecording);
  // };

  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestion(questions[nextIndex]);
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(120);
      setIsNextEnabled(false);
      setIsTimerActive(true);
      setIsPredictionCorrect(false);
      setPrediction("");
    } else {
      setCurrentQuestion(null);
    }
  };

  const sendFrame = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas
        .getContext("2d")
        ?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      canvas.toBlob((blob) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN && blob) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onloadend = () => {
            if (reader.result instanceof ArrayBuffer) {
              ws.current?.send(reader.result);
            }
          };
        }
      }, "image/jpeg");
    }
  };

  /* ***** EFFECTS ***** */
  useEffect(() => {
    if (!localStorage.getItem("jwt") || !localStorage.getItem("user"))
      router.push("/login");
  }, [router]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  /* ***** CAMERA EFFECT ***** */
  useEffect(() => {
    startCamera();
  }, []);

  /* ***** SOCKET EFFECT ***** */
  useEffect(() => {
    ws.current = new WebSocket(
      selectedLanguage.localeCompare("ASL") === 0
        ? "wss://api-model-yho2.onrender.com/ws"
        : "wss://api-model-yho2.onrender.com/ws/arabic"
    );

    ws.current.onopen = () => console.log("WebSocket connection established");
    ws.current.onmessage = (event) => {
      if (!isPredictionCorrect) setPrediction(event.data);
    };

    ws.current.onclose = () => console.log("WebSocket connection closed");

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [isPredictionCorrect, selectedLanguage]);

  /* ***** TIMER EFFECT ***** */
  useEffect(() => {
    if (!videoRef.current?.srcObject || !ws) {
      console.log(
        "Camera not ready yet or WebSocket connection not established"
      );

      return;
    }

    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsNextEnabled(true);
      setIsTimerActive(false);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive]);

  /* ***** GENERATE QUESTION EFFECT ***** */
  useEffect(() => {
    const gameQuestions =
      selectedLanguage.localeCompare("ASL") === 0
        ? generateQuestions()
        : generateArabicQuestions();
    setQuestions(gameQuestions);
    setCurrentQuestion(gameQuestions[0]);
  }, [selectedLanguage,generateQuestions, generateArabicQuestions]);

  // router.push(`/certificate/${"afshal"}/${100}`);

  /* ***** GETTING PREDICTION EFFECT ***** */
  useEffect(() => {
    if (prediction && currentQuestion && !isPredictionCorrect) {
      if (prediction === currentQuestion) {
        setScore((prev) => prev + 1);

        if (score === 4) {
          const { user } = JSON.parse(localStorage.getItem("user") ?? "{}");
          if (user) {
            router.push(`/certificate/${user.name}/${score}`);
          }
        }
        setIsNextEnabled(true);
        setIsTimerActive(false);
        setIsPredictionCorrect(true);
      }
    }
  }, [prediction, currentQuestion, isPredictionCorrect, score, router]);

  /* ***** SEND FRAME EFFECT ***** */
  useEffect(() => {
    const interval = setInterval(sendFrame, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 mb-[80px]">
      <h1 className="text-3xl font-bold mt-[30px]">Sign to Text Translator</h1>
      <Select options={LANGUAGES} onChange={handleSelectLanguage} />
      <div className="flex justify-center items-center">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-gray-500 progress-ring stroke-current"
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * timerPercentage) / 100}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            ></circle>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold text-gray-900">
            {timeLeft}s
          </div>
        </div>
      </div>

      <div className="w-[80%] h-[500px] aspect-video bg-muted rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      <Card className="w-[60%] max-w-3xl shadow-md">
        <CardHeader>
          <CardTitle>Current Question</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="font-bold text-center text-gray-900">
            {currentQuestion}
          </div>
          <div>
            <p className="text-[13px] text-gray-500">
              {isPredictionCorrect ? (
                <span className="text-green-600">
                  Your Prediction: {prediction} (Correct!)
                </span>
              ) : prediction ? (
                "Not detected yet. Keep trying!"
              ) : (
                "Waiting for prediction..."
              )}
            </p>
          </div>
          <Button
            onClick={moveToNextQuestion}
            disabled={!isNextEnabled}
            className="w-full bg-gray-900 hover:bg-gray-700 text-white"
          >
            Next Question
          </Button>
        </CardContent>
      </Card>

      {/* <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Camera Feed</CardTitle>
          <CardDescription>
            Show your signs to the camera for translation
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
          <Button onClick={toggleRecording}>
            {isRecording ? "Stop Recording" : "Start Recording"}
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
      )} */}
    </div>
  );
}
