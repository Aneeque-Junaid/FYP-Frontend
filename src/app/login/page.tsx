"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignIn() {
  const router = useRouter();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      axios
        .post("https://sign-language-backend-afshal1-afshal1s-projects.vercel.app/api/auth/login", {
          accessToken: tokenResponse.access_token,
        })
        .then((res) => {
          localStorage.setItem("jwt", res.data.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(jwtDecode(res.data.data.token))
          );

          setTimeout(() => {
            router.push("/");
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Sign Language Translator
      </h1>
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-400">
            Sign in
          </CardTitle>
          <CardDescription
            className="text-center text-gray-500"
            style={{
              marginTop: 15,
            }}
          >
            Use your Google account to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            type="button"
            onClick={() => handleGoogleSignIn()}
            className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_13183_10121)">
                <path
                  d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                  fill="#4285F4"
                />
                <path
                  d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                  fill="#34A853"
                />
                <path
                  d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                  fill="#FBBC04"
                />
                <path
                  d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_13183_10121">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
      <div className="mt-8 text-center text-sm text-gray-400 max-w-md">
        By signing in, you agree to our
        <a href="#" className="text-blue-400 hover:underline">
          {" "}
          Terms of Service
        </a>{" "}
        and
        <a href="#" className="text-blue-400 hover:underline">
          {" "}
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
