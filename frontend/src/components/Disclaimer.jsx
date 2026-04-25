import { AlertCircle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <section id="disclaimer" className="py-14">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 md:flex-row md:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <AlertCircle className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-2">Medical Disclaimer</h3>
            <p className="text-sm text-medical-subtext leading-relaxed">
              This system is intended for <span className="font-bold text-primary">screening and educational purposes only</span>. It is not a clinical diagnostic tool and should not replace professional medical advice, diagnosis, or treatment. If symptoms persist or worsen, consult a qualified healthcare professional promptly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;
