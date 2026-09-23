import { Play, Download, ChevronRight, Home, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLab } from '../contexts/LabContext';

export default function Header({ toggleMobileMenu }: { toggleMobileMenu?: () => void }) {
  const location = useLocation();
  const isTop = location.pathname === '/';
  const chapterMatch = location.pathname.match(/\/chapter\/(\d+)/);
  const currentChapter = chapterMatch ? chapterMatch[1] : null;
  const { openLab } = useLab();

  return (
    <header className="h-14 border-b border-cyan-500/20 bg-navy-800/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 lg:px-6">
      
      {/* Left Nav Pills (Breadcrumbs) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-0 flex-1 py-1">
        <button 
          className="lg:hidden p-1.5 mr-1 text-slate-300 hover:text-white hover:bg-navy-700 rounded-md transition-colors shrink-0"
          onClick={toggleMobileMenu}
          aria-label="メニューを開く"
        >
          <Menu size={20} />
        </button>
        
        <Link 
          to="/" 
          className={`font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors shrink-0 ${
            isTop ? 'bg-cyan-500 text-navy-900 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-navy-700 text-slate-300 hover:text-white hover:bg-navy-600'
          }`}
        >
          <Home size={14} />
          <span>TOP</span>
        </Link>
        
        {currentChapter && (
          <div className="flex items-center gap-1.5 ml-1 text-xs font-medium text-slate-400 shrink-0">
            <span className="flex items-center text-slate-500"><ChevronRight size={16} /></span>
            
            <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 whitespace-nowrap">
              <span className="text-cyan-400 font-bold">第{currentChapter}章</span>
              
              <div className="hidden sm:flex items-center gap-1 border-l border-cyan-500/30 pl-3">
                {Array.from({ length: 12 }).map((_, i) => {
                  const chapNum = i + 1;
                  const isCurrent = chapNum === parseInt(currentChapter);
                  const isPast = chapNum < parseInt(currentChapter);
                  
                  return (
                    <div 
                      key={chapNum}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCurrent ? 'w-4 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]' :
                        isPast ? 'w-1.5 bg-cyan-700' : 'w-1.5 bg-slate-600/50'
                      }`}
                      title={`第${chapNum}章`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={openLab}
          className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Play size={14} fill="currentColor" />
          <span>コード実行ラボ</span>
        </button>
        <button className="bg-navy-700 hover:bg-navy-600 border border-slate-600 text-slate-200 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors hidden sm:flex">
          <Download size={14} />
          <span>環境構築スクリプト</span>
        </button>
      </div>
    </header>
  );
}
