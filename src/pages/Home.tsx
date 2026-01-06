import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import SystemDesignSection from '../sections/SystemDesign';
import Contact from '../sections/Contact';

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <SystemDesignSection />
            <Contact />
        </>
    );
}
