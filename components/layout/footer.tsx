import Link from "next/link";
import { Plane, Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">EasyVoyage</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your AI-powered travel companion for personalized itineraries and seamless trip planning.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-muted-foreground hover:text-primary transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-muted-foreground hover:text-primary transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/plan" className="text-muted-foreground hover:text-primary transition-colors">
                  Plan a Trip
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href="mailto:info@easyvoyage.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@easyvoyage.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href="tel:+11234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background border border-border rounded-l-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md text-sm font-medium hover:bg-primary/90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EasyVoyage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}