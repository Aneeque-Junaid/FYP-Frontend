import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-xl font-bold text-primary">Sign Language Translator</h2>
          <p className="text-sm text-gray-600">Bridging communication gaps</p>
        </div>
        <nav>
          <ul className="flex gap-4 md:gap-8">
            <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

