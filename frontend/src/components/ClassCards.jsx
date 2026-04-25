import { motion } from 'framer-motion';
import { ShieldCheck, Droplet, AlertTriangle } from 'lucide-react';

const classes = [
  {
    id: 1,
    label: 'Class 1',
    title: 'Normal Hydration',
    subtitle: 'No Stone Risk',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-500',
    icon: ShieldCheck,
    colorDesc: 'Pale Yellow',
    description: 'Urine appears pale yellow, indicating optimal hydration. No sign of kidney stone risk.',
    details: ['Well hydrated', 'Healthy kidney function', 'Normal urination frequency', 'No action required'],
  },
  {
    id: 2,
    label: 'Class 2',
    title: 'Dehydrated',
    subtitle: 'Moderate Stone Risk',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-orange-500',
    icon: Droplet,
    colorDesc: 'Dark Yellow',
    description: 'Urine appears dark yellow. Mild dehydration detected with moderate risk of stone formation.',
    details: ['Mildly dehydrated', 'Increased mineral concentration', 'Risk of crystal formation', 'Increase daily water intake'],
  },
  {
    id: 3,
    label: 'Class 3',
    title: 'High Risk',
    subtitle: 'Kidney Stone Risk',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-rose-600',
    icon: AlertTriangle,
    colorDesc: 'Brown / Cloudy',
    description: 'Urine appears brown or cloudy, indicating severe dehydration and high risk of kidney stones.',
    details: ['Severely dehydrated', 'High risk of stone formation', 'Possible infection indicators', 'Seek medical attention'],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ClassCards = () => {
  return (
    <section id="classes" className="py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Classification System</h2>
          <p className="text-medical-subtext max-w-xl mx-auto">
            Our model classifies urine samples into three distinct categories based on color analysis and hydration biomarkers.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {classes.map((cls) => {
            const Icon = cls.icon;
            return (
              <motion.div
                key={cls.id}
                variants={item}
                className="card-premium group overflow-hidden rounded-3xl"
              >
                <div className={`h-2 bg-gradient-to-r ${cls.gradientFrom} ${cls.gradientTo}`}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${cls.color} ${cls.bg} px-3 py-1 rounded-full border ${cls.border}`}>
                        {cls.label}
                      </span>
                      <h3 className="text-2xl font-bold text-primary mt-3">{cls.title}</h3>
                      <p className={`text-sm font-semibold ${cls.color}`}>{cls.subtitle}</p>
                    </div>
                    <div className={`rounded-xl border p-3 ${cls.bg} ${cls.border}`}>
                      <Icon className={`w-7 h-7 ${cls.color}`} />
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 mb-5 p-3 rounded-lg ${cls.bg} border ${cls.border}`}>
                    <div 
                      className="w-5 h-5 rounded-full border border-white/50 shadow-sm flex-shrink-0"
                      style={{
                        backgroundColor: cls.id === 1 ? '#FDFD96' : cls.id === 2 ? '#FFCC00' : '#8B4513',
                      }}
                    ></div>
                    <span className={`text-sm font-bold ${cls.color}`}>Urine color: {cls.colorDesc}</span>
                  </div>

                  <p className="text-medical-subtext text-sm mb-6 leading-relaxed">
                    {cls.description}
                  </p>

                  <ul className="space-y-2">
                    {cls.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-medical-text">
                        <div className={`h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r ${cls.gradientFrom} ${cls.gradientTo}`} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ClassCards;
