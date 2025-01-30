"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import generateCertificate from "@/app/utils/generateCertificate";

export default function CertificatePage() {
  const { name, score } = useParams();

  const handleGenerateCertificate = () => {
    const numericScore = Number(score);
    if (!isNaN(numericScore)) {
      generateCertificate(String(name), numericScore);
    } else {
      console.error("Invalid score:", score);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <h1 className="text-4xl font-bold text-center">🎉 Congratulations! 🎉</h1>
      <p className="text-center text-lg text-muted-foreground">
        You've successfully completed the quiz. Your efforts deserve
        recognition!
      </p>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Certificate of Completion</CardTitle>
          <CardDescription>
            Get your personalized certificate for this achievement.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="bg-muted w-full rounded-lg p-6 text-center">
            <p className="text-lg font-medium">
              Name: <span className="font-semibold">{name}</span>
            </p>
            <p className="text-lg font-medium">
              Score: <span className="font-semibold">{score}%</span>
            </p>
          </div>
          <Button
            onClick={handleGenerateCertificate}
            className="w-full max-w-sm"
          >
            Get Certificate
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
