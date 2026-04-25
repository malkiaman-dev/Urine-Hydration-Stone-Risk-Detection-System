import { motion } from 'framer-motion';

const ProbabilityBars = ({ probabilities, activeClass }) => {
  const entries = Object.entries(probabilities || {});

  return (
    <div className="space-y-4">
      {entries.map(([name, value], index) => {
        const probability =
          typeof value === 'number'
            ? value
            : Number(value?.probability || 0);

        const label =
          typeof value === 'object'
            ? value?.class_name || value?.hydration || name
            : name;

        const isActive =
          label.toLowerCase() === String(activeClass || '').toLowerCase() ||
          value?.hydration?.toLowerCase() === String(activeClass || '').toLowerCase();

        return (
          <div key={name} className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span className={isActive ? 'text-primary' : 'text-medical-subtext'}>
                {label}
              </span>

              <span className={isActive ? 'text-primary' : 'text-medical-subtext'}>
                {probability.toFixed(1)}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(0, Math.min(100, probability))}%`,
                }}
                transition={{
                  duration: 1,
                  delay: 0.2 + index * 0.1,
                }}
                className={`h-full rounded-full ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary'
                    : 'bg-slate-300'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProbabilityBars;