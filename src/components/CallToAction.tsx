import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"

export default function CallToAction () {
    return (
        <section id="CTA" className="mb-16">

            <div className="text-center px-4">
                <h2 className="text-3xl font-bold mb-4">Get Started in Minutes</h2>
                <p className="text-lg text-gray-600 mb-4">
                    Choose one of our powerful tools to begin your translation journey.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mx-auto py-8 px-4">
                <Card className="">
                <CardHeader>
                    <CardTitle>Sign to Text</CardTitle>
                    <CardDescription>Translate sign to text using your camera</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                        <Button asChild className="w-1/2">
                            <Link href="/sign-to-text">Get Started</Link>
                        </Button>
                    </div>
                </CardContent>
                </Card>

                <Card className="">
                <CardHeader>
                    <CardTitle>Text to Sign</CardTitle>
                    <CardDescription>Convert text into sign language images</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                        <Button asChild className="w-1/2">
                            <Link href="/text-to-sign">Try It Out</Link>
                        </Button>
                    </div>
                </CardContent>
                </Card>
            </div>
            
        </section>
    )
}