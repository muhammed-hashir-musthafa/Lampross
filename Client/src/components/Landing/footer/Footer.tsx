import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  PinIcon as Pinterest,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-footer text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[50%_25%_20%] gap-8">
          
          <div className="space-y-6">
            <Image
              src="/assets/logo-invert.png"
              alt="Lampros"
              width={250}
              height={28}
            />
            <p className="text-sm text-gray-300 max-w-xs">
              A real tech company for Complete home solutions under one roof.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:careers.lampros@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  careers.lampros@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+917592800050"
                  className="hover:text-white transition-colors"
                >
                  +91 7592800050
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Calicut, Koduvally</span>
              </div>
            </div>
          </div>


          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/become-pro"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Become a pro
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Terms of services
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="mt-6 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Pinterest className="w-5 h-5" />
                <span className="sr-only">Pinterest</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
            <p className="text-sm text-gray-300">
              © Lampros 2024. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
