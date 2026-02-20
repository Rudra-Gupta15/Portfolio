import './App.css';
import StarBackground from './components/StarBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import { Certifications, Achievements } from './components/Extras';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useMagneticTilt from './components/useMagneticTilt';

export default function App() {
  useMagneticTilt('.cert-card, .ach-card, .tl-card');
  return (
    <>
      <StarBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
