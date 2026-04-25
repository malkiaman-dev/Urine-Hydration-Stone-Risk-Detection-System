import { AlertTriangle, Droplet, Info, ShieldCheck, TrendingUp } from 'lucide-react';
import ProbabilityBars from './ProbabilityBars';

const ResultCard = ({ result }) => {
  const {
    class_name,
    hydration,
    stone_risk,
    urine_color,
    confidence,
    advice,
    probabilities,
  } = result;

  const normalizedProbabilities = probabilities
    ? Object.fromEntries(
        Object.entries(probabilities).map(([key, value]) => {
          const probability =
            typeof value === 'number' ? value : Number(value?.probability || 0);

          return [
            key,
            {
              label: value?.class_name || key,
              hydration: value?.hydration || key,
              probability,
            },
          ];
        })
      )
    : {};

  const getRiskTheme = () => {
    if (class_name === 'Class 1') {
      return {
        badge: 'Low Risk',
        className: 'text-accent-dark bg-accent/10 border-accent/20',
        icon: <ShieldCheck className="h-4 w-4" />,
      };
    }

    if (class_name === 'Class 2') {
      return {
        badge: 'Moderate Risk',
        className: 'text-amber-700 bg-amber-50 border-amber-200',
        icon: <Droplet className="h-4 w-4" />,
      };
    }

    return {
      badge: 'High Risk',
      className: 'text-red-700 bg-red-50 border-red-200',
      icon: <AlertTriangle className="h-4 w-4" />,
    };
  };

  const riskTheme = getRiskTheme();

  return (
    <div className="card-premium flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="border-b border-slate-100 p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-primary">Prediction Result</h3>
            <p className="text-sm text-medical-subtext">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${riskTheme.className}`}
          >
            {riskTheme.icon}
            {riskTheme.badge}
          </div>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-4xl font-black text-primary">
            {Number(confidence || 0).toFixed(1)}%
          </span>
          <span className="mb-1 text-sm font-medium text-medical-subtext">
            Confidence
          </span>
        </div>
      </div>

      <div className="flex-grow space-y-7 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="mb-1 text-xs font-bold uppercase text-medical-subtext">Class</p>
            <p className="text-lg font-bold text-primary">{class_name}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="mb-1 text-xs font-bold uppercase text-medical-subtext">
              Hydration
            </p>
            <p className="text-lg font-bold text-primary">{hydration}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="mb-1 text-xs font-bold uppercase text-medical-subtext">
              Stone Risk
            </p>
            <p className="text-lg font-bold text-primary">{stone_risk}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="mb-1 text-xs font-bold uppercase text-medical-subtext">
              Detected Color
            </p>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border border-slate-200"
                style={{
                  backgroundColor: urine_color?.toLowerCase().includes('pale')
                    ? '#FDFD96'
                    : urine_color?.toLowerCase().includes('dark')
                    ? '#FFCC00'
                    : '#8B4513',
                }}
              />
              <p className="text-lg font-bold text-primary">{urine_color}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
              Class Probabilities
            </h4>
          </div>

          <ProbabilityBars
            probabilities={normalizedProbabilities}
            activeClass={hydration}
          />
        </div>

        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-lg bg-primary p-1.5">
              <Info className="h-5 w-5 text-white" />
            </div>
            <h4 className="text-lg font-bold text-primary">Advice</h4>
          </div>
          <p className="font-medium leading-relaxed text-medical-text">{advice}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold text-medical-subtext">
        <span>Screening report only • Not a diagnosis</span>
        <span>Ref #{Math.floor(Math.random() * 9000) + 1000}</span>
      </div>
    </div>
  );
};

export default ResultCard;