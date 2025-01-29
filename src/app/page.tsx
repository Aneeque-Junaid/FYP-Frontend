"use client";

import CallToAction from "@/components/CallToAction";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user") || !localStorage.getItem("jwt"))
      router.push("/login");
  }, []);

  return (
    <>
      <Hero />
      <Feature />
      <CallToAction />
    </>
  );
}
