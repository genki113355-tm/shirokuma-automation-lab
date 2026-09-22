import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChapterContent from './components/ChapterContent';
import TopPage from './components/TopPage';
import CodeLab from './components/CodeLab';
import Footer from './components/Footer';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isSubdirectory = window.location.pathname.startsWith('/auto');
  const basename = isSubdirectory ? '/auto' : '/';

  return (
    <Router basename={basename}>
      <div className="flex h-screen overflow-hidden bg-navy-900 text-slate-100 font-sans">
        <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
          {/* subtle background glow */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none"></div>
          
          <Header toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          
          <main className="flex-1 overflow-y-auto pb-20 relative z-0">
            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path="/chapter/:id" element={<ChapterContent />} />
              <Route path="/lab" element={<CodeLab />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
