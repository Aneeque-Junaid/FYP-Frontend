import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/Navbar"
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sign Language Translator',
  description: 'A modern web app for translating between sign language and text',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <Navbar />
              <div className='min-h-[90vh]'>
                {children}
              </div>
            <Footer />
      </body>
    </html>
  )
}

