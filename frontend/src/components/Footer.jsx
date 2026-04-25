import { ActivitySquare, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg">
                <ActivitySquare className="text-primary h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">Hydration<span className="text-secondary-light">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed text-primary-light/90">
              Corporate-grade AI screening interface for hydration monitoring and kidney stone risk awareness.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm opacity-85">
              <li><a href="#home" className="hover:text-secondary-light transition-colors">Home</a></li>
              <li><a href="#analysis" className="hover:text-secondary-light transition-colors">Analysis</a></li>
              <li><a href="#how-it-works" className="hover:text-secondary-light transition-colors">How It Works</a></li>
              <li><a href="#classes" className="hover:text-secondary-light transition-colors">Classifications</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm opacity-85">
              <li><a href="#disclaimer" className="hover:text-secondary-light transition-colors">Medical Disclaimer</a></li>
              <li><a href="#analysis" className="hover:text-secondary-light transition-colors">API Integration</a></li>
              <li><a href="#" className="hover:text-secondary-light transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary-light transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm opacity-85">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary-light" />
                <span>sumiakhanzoology@gmail.com</span>
              </li>
              {/* <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary-light" />
                <span>+1 (555) 000-0000</span>
              </li> */}
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-secondary-light" />
                <span>Government girls degree college Yar Hussain, swabi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm opacity-70 md:flex-row">
          <p>© 2026 Urine Hydration & Kidney Stone Risk Screening System. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="#" className="transition-colors hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
