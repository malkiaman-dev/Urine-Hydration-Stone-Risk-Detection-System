import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, ShieldCheck, Stethoscope } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pb-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent" />
      <div className="absolute -right-24 top-20 -z-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                Corporate Medical AI Platform
              </span> */}

              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-primary sm:text-5xl lg:text-6xl">
                Urine Hydration &
                <span className="gradient-text block">Kidney Stone Risk Screening System</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-medical-subtext sm:text-lg">
                Upload a urine sample image and receive AI-assisted screening insights for hydration status, stone risk probability, and recommended next actions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#analysis" className="btn-primary group">
                  Upload & Analyze
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#how-it-works" className="btn-secondary">
                  How It Works
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-medical-subtext">Secure Workflow</span>
                </div>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-medical-subtext">ML Probability Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-medical-subtext">Clinical Context</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative z-10"
            >
              <div className="card-premium overflow-hidden rounded-3xl border border-primary/10">
                <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Live Screening Dashboard</p>
                  <h3 className="mt-1 text-xl font-bold">Risk Stratification Summary</h3>
                </div>

                <div className="space-y-5 p-6">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-medical-subtext">Model Outputs</p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-white p-3">
                        <p className="text-xs text-medical-subtext">Hydration</p>
                        <p className="font-bold text-primary">Dehydrated</p>
                      </div>
                      <div className="rounded-xl bg-white p-3">
                        <p className="text-xs text-medical-subtext">Confidence</p>
                        <p className="font-bold text-primary">94.6%</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Recommended Advice</p>
                    <p className="mt-2 text-sm font-medium text-medical-text">
                      Increase water intake and continue periodic screening to reduce moderate stone risk patterns.
                    </p>
                  </div>
                </div>
              </div>

              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 -top-5 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-premium md:block"
              >
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                    <ShieldCheck className="h-5 w-5 text-accent-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-medical-subtext">System Status</p>
                    <p className="font-semibold text-primary">Operational</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
