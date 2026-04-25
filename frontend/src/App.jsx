import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadAnalyzer from './components/UploadAnalyzer';
import HowItWorks from './components/HowItWorks';
import ClassCards from './components/ClassCards';
import Disclaimer from './components/Disclaimer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-medical-bg text-medical-text">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <UploadAnalyzer />
        <HowItWorks />
        <ClassCards />
        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
