import { motion } from 'framer-motion';

const ProbabilityBars = ({ probabilities, activeClass }) => {
  const entries = Object.entries(probabilities || {});

  return (
    <div className="space-y-4">
      {entries.map(([name, value], index) => {
        const formattedValue = Number(value || 0).toFixed(1);
        const isActive = name.toLowerCase() === String(activeClass || '').toLowerCase();
        
        return (
          <div key={name} className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span className={isActive ? 'text-primary' : 'text-medical-subtext'}>
                {name}
              </span>
              <span className={isActive ? 'text-primary' : 'text-medical-subtext'}>
                {formattedValue}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, Number(value || 0)))}%` }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                className={`h-full rounded-full ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-secondary' 
                    : 'bg-slate-300'
                }`}
              ></motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProbabilityBars;
