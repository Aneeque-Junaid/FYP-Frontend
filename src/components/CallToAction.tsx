"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Type } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  icon: React.ReactNode;
}

interface AnimatedButtonProps {
  href: string;
  text: string;
  variant: "default" | "outline" | "ghost" | "link";
  className?: string;
}

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden mb-16 py-24 bg-black text-white">
      <BackgroundAnimation />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Get Started in Minutes
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
            Empower your conversations with our cutting-edge translation tools.
            Start your journey to seamless communication today.
          </p>
          <AnimatedButton href="#tools" text="Explore Tools" variant="default"
            className="bg-white text-black hover:bg-gray-100" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          id="tools"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ToolCard
            title="Sign to Text"
            description="Translate sign language to text in real-time using your camera"
            href="/sign-to-text"
            buttonText="Get Started"
            icon={<Camera className="h-8 w-8 mb-4" />}
          />
          <ToolCard
            title="Text to Sign"
            description="Convert text into accurate sign language visuals instantly"
            href="/text-to-sign"
            buttonText="Try It Out"
            icon={<Type className="h-8 w-8 mb-4" />}
          />
        </motion.div>
      </div>
    </section>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function ToolCard({ title, description, href, buttonText, icon }: ToolCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white text-black border-2 border-black group">
        <CardHeader className="pb-8">
          <div className="bg-black text-white p-3 inline-block rounded-lg mb-4 group-hover:scale-90 transition-transform duration-300">
            {icon}
          </div>
          <CardTitle className="text-xl text-black">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <AnimatedButton
            href={href}
            text={buttonText}
            variant="outline"
            className="w-full bg-white text-black border-2 border-black hover:bg-black hover:text-white group-hover:bg-black group-hover:text-white"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AnimatedButton({ href, text, variant, className }: AnimatedButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size="lg"
      className={`rounded-full ${className} transition-all duration-300`}
    >
      <Link href={href} className="flex items-center justify-center">
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: -4 }}
          className="flex items-center"
        >
          {text}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            whileHover={{ x: 4, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.div>
        </motion.span>
      </Link>
    </Button>
  );
}

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          backgroundPosition: ["0px 0px", "200px 200px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff0d 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
