import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
      </main>

      <Contact />
    </div>
  );
}

export default App;