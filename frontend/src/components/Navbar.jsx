import { useEffect, useState } from 'react';
import { ActivitySquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Analyze', href: '#analysis' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Classes', href: '#classes' },
    { name: 'Disclaimer', href: '#disclaimer' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg shadow-sm">
            <ActivitySquare className="text-white w-5 h-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-primary tracking-tight">Hydration<span className="text-secondary">AI</span></span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-medical-text/80 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#analysis" className="btn-primary py-2.5 px-5 text-sm">
            Start Screening
          </a>
        </div>

        <button className="lg:hidden text-primary" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="container flex flex-col py-5 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-medical-text/85 hover:text-primary font-semibold"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#analysis"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full mt-2"
              >
                Start Screening
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
