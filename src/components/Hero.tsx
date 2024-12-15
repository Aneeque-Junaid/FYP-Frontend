import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


export default function Hero() {
    return (
      <section className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white py-20 min-h-[90vh] ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 ">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center sm:text-left">
                Break Down Language Barriers
              </h1>
              <p className="text-xl mb-8 text-center sm:text-left">
                Our AI-powered sign language translator bridges the gap between spoken and sign languages.
              </p>
              <div className='flex justify-center sm:justify-start'>
                <Button asChild size="lg">
                  <Link href="#">Try It Now</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Sign Language Illustration"
                width={250}
                height={250}
                className="rounded-lg shadow-lg w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] "
              />
            </div>
          </div>
        </div>
      </section>
    )
}