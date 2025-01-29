"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

// const metadata = {
//   title: "Sign Language Translator",
//   description:
//     "A modern web app for translating between sign language and text",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId="1092107067426-ru4r1hr167uib2tdd10g2v62j4cpu5fh.apps.googleusercontent.com">
          {pathname !== "/login" && <Navbar />}
          <div className="min-h-[90vh]">{children}</div>
          {pathname !== "/login" && <Footer />}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
