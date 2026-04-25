import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  Loader2,
  Microscope,
  UploadCloud,
  X,
  ImageIcon,
} from 'lucide-react';
import axios from 'axios';
import ResultCard from './ResultCard';

const UploadAnalyzer = () => {
  const apiBaseUrl =
    import.meta.env.VITE_API_URL ||
    'https://urine-hydration-stone-risk-detection-2o5a.onrender.com';

  const API_URL = `${apiBaseUrl.replace(/\/$/, '')}/predict`;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const validateAndSetImage = (file) => {
    if (file) {
      const maxSizeMB = 5;
      const sizeInMB = file.size / (1024 * 1024);

      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (PNG, JPG, JPEG, or WEBP).');
        return;
      }

      if (sizeInMB > maxSizeMB) {
        setError(`Image size exceeds ${maxSizeMB}MB. Please upload a smaller file.`);
        return;
      }

      if (preview) URL.revokeObjectURL(preview);

      const objectUrl = URL.createObjectURL(file);

      setImage(file);
      setPreview(objectUrl);
      setError(null);
      setResult(null);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    validateAndSetImage(file);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    validateAndSetImage(file);
  };

  const removeImage = () => {
    setImage(null);
    setResult(null);
    setError(null);

    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please upload an image first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (requestError) {
      console.error('Prediction API Error:', requestError);

      if (requestError.response?.status === 422) {
        setError(
          'Invalid request format. Ensure backend expects multipart form field named "file".'
        );
      } else {
        setError(
          requestError.response?.data?.detail ||
            'Unable to connect to backend. Please try again later.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="analysis" className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary">Upload & Analyze</h2>
          <p className="mt-3 text-medical-subtext">
            Upload a clear urine sample image for AI-powered hydration and kidney
            stone risk screening.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div
              onDragOver={onDragOver}
              onDrop={onDrop}
              className={`relative h-80 overflow-hidden rounded-3xl border-2 border-dashed bg-white transition-all duration-300 ${
                preview
                  ? 'border-primary/25'
                  : 'border-slate-300 hover:border-primary/50'
              }`}
            >
              {preview ? (
                <div className="relative h-full w-full p-4">
                  <img
                    src={preview}
                    alt="Uploaded urine sample preview"
                    className="h-full w-full rounded-2xl bg-slate-50 object-contain"
                  />

                  <button
                    onClick={removeImage}
                    className="absolute right-6 top-6 rounded-full bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600"
                    aria-label="Remove uploaded image"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <UploadCloud className="h-8 w-8 text-primary" />
                  </div>

                  <p className="text-lg font-bold text-primary">
                    Drag & drop image here
                  </p>

                  <p className="mt-1 text-sm text-medical-subtext">
                    or click anywhere in this box to browse files
                  </p>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-medical-subtext">
                    PNG / JPG / JPEG / WEBP · Max 5MB
                  </p>

                  <p className="mt-2 max-w-xs text-xs font-medium text-amber-600">
                    Please upload only a clear urine sample image.
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    accept="image/*"
                  />
                </div>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="btn-primary w-full disabled:bg-slate-300"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing Screening...
                </>
              ) : (
                <>
                  <Activity className="h-5 w-5" />
                  Analyze Sample
                </>
              )}
            </button>
          </div>

          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-premium flex h-full flex-col items-center justify-center rounded-3xl p-8 text-center"
                >
                  <div className="relative mb-5">
                    <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary/10 border-t-primary" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Microscope className="h-8 w-8 text-primary/50" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary">
                    Analyzing Biomarkers
                  </h3>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ResultCard result={result} />
                </motion.div>
              ) : (
                <motion.div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-10 text-center">
                  <ImageIcon className="h-7 w-7 text-slate-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadAnalyzer;