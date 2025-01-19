"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen relative overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-block">
              <span className="bg-white text-black text-sm font-semibold py-1 px-3 rounded-full">
                AI-Powered Translation
              </span>
            </div>
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight mb-[35px]">
              Break Down <br />
              <span className="text-gray-300 relative">
                Language Barriers
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="4"
                  viewBox="0 0 300 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2L298 2"
                    stroke="url(#paint0_linear)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="2"
                      y1="2"
                      x2="298"
                      y2="2"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0" />
                      <stop offset="0.5" stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-md mb-8 text-gray-400 max-w-lg leading-relaxed">
              Our AI-powered sign language translator bridges the gap between
              spoken and sign languages, making communication seamless and
              inclusive for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-200 text-black font-semibold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Link href="#" className="flex items-center">
                  Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
              >
                <Link href="#">Learn More</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-600 rounded-2xl blur opacity-30"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Sign Language Illustration"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </motion.div>
    </section>
  );
}
