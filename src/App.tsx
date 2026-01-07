import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <main className="bg-white dark:bg-neutral-900 min-h-screen text-neutral-900 dark:text-white transition-colors duration-300 relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
      <ChatWidget />
      <Footer />
    </main>
  );
}

export default App;
