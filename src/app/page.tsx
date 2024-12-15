import CallToAction from "@/components/CallToAction"
import Feature from "@/components/Feature"
import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <CallToAction />
    </>
  )
}

