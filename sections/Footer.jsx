import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-400 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-semibold text-gray-900">
                Smart Service Marketplace
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Smart Service Marketplace. <br />
              All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              FOLLOW US
            </h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-gray-900">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-gray-900">
                <Github size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-900">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
