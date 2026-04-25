import { useEffect, useState } from 'react';
import { ActivitySquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Analyze', href: '#analysis' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Classes', href: '#classes' },
    { name: 'Disclaimer', href: '#disclaimer' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isOpen ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" onClick={closeMenu} className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-2 shadow-sm">
            <ActivitySquare className="h-5 w-5 text-white" />
          </div>

          <span className="text-lg font-bold tracking-tight text-primary sm:text-xl">
            Sumia Khan Hydration<span className="text-secondary">AI</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-medical-text/80 transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}

          <a href="#analysis" className="btn-primary px-5 py-2.5 text-sm">
            Start Screening
          </a>
        </div>

        <button
          type="button"
          className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary shadow-sm lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22 }}
              className="fixed left-4 right-4 top-20 z-[60] overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl lg:hidden"
            >
              <div className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-2xl px-4 py-3 text-sm font-bold text-medical-text/85 transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}

                <a
                  href="#analysis"
                  onClick={closeMenu}
                  className="btn-primary mt-2 w-full justify-center"
                >
                  Start Screening
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;