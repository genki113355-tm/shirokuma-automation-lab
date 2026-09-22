import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

// Code Splitting: 遅延読み込みで初期バンドルサイズを削減
const TopPage = lazy(() => import('./components/TopPage'));
const ChapterContent = lazy(() => import('./components/ChapterContent'));
const CodeLab = lazy(() => import('./components/CodeLab'));

// ローディングフォールバックUI
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      <div className="text-cyan-400 font-mono text-sm animate-pulse">LOADING MODULE...</div>
    </div>
  </div>
);

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
          
          <main className="flex-1 overflow-y-auto pb-20 relative z-0 flex flex-col">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<TopPage />} />
                <Route path="/chapter/:id" element={<ChapterContent />} />
                <Route path="/lab" element={<CodeLab />} />
              </Routes>
            </Suspense>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
