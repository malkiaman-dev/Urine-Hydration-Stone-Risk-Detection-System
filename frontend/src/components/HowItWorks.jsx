import { motion } from 'framer-motion';
import { Camera, Cpu, BarChart3, HeartPulse } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: 'Capture Sample',
    description: 'Take a clear photo of the urine sample in a transparent container under natural lighting.',
  },
  {
    icon: Cpu,
    title: 'AI Processing',
    description: 'Our neural network analyzes the color spectrum and transparency of the sample.',
  },
  {
    icon: BarChart3,
    title: 'Risk Assessment',
    description: 'The system calculates hydration levels and assesses potential kidney stone risks.',
  },
  {
    icon: HeartPulse,
    title: 'Actionable Insights',
    description: 'Receive personalized advice based on your classification and confidence levels.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">How It Works</h2>
          <p className="text-medical-subtext max-w-xl mx-auto">
            A streamlined workflow designed for clear screening outcomes and fast healthcare-oriented decision support.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 shadow-premium transition-colors duration-300 group-hover:bg-primary">
                  <step.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-premium">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold mb-4 mx-auto">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-medical-subtext leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
