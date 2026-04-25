import { ActivitySquare, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary pb-8 pt-16 text-white">
      <div className="container">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo & Description */}
          <div className="col-span-2 space-y-6 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white p-2">
                <ActivitySquare className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">
               Sumia Khan Hydration<span className="text-secondary-light">AI</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-primary-light/90">
              An AI-powered screening tool designed to support early hydration assessment,
              urine color analysis, and kidney stone risk awareness through simple image-based insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="mb-6 text-lg font-bold">Quick Links</h4>
            <ul className="space-y-4 text-sm opacity-85">
              <li>
                <a href="#home" className="transition-colors hover:text-secondary-light">
                  Home
                </a>
              </li>
              <li>
                <a href="#analysis" className="transition-colors hover:text-secondary-light">
                  Analysis
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-secondary-light">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#classes" className="transition-colors hover:text-secondary-light">
                  Classifications
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="mb-6 text-lg font-bold">Resources</h4>
            <ul className="space-y-4 text-sm opacity-85">
              <li>
                <a href="#disclaimer" className="transition-colors hover:text-secondary-light">
                  Medical Disclaimer
                </a>
              </li>
              <li>
                <a href="#analysis" className="transition-colors hover:text-secondary-light">
                  API Integration
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-secondary-light">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-secondary-light">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-6 text-lg font-bold">Contact Us</h4>
            <ul className="space-y-4 text-sm opacity-85">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary-light" />
                <span>sumiakhanzoology@gmail.com</span>
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-secondary-light" />
                <span>Government girls degree college Yar Hussain, Swabi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/15 pt-6 text-center text-sm opacity-70">
          <p>© 2026 Urine Hydration & Kidney Stone Risk Screening System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;