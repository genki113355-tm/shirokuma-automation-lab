import { Play, Download, ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isTop = location.pathname === '/';
  const chapterMatch = location.pathname.match(/\/chapter\/(\d+)/);
  const currentChapter = chapterMatch ? chapterMatch[1] : null;

  return (
    <header className="h-14 border-b border-cyan-500/20 bg-navy-800/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6">
      
      {/* Left Nav Pills (Breadcrumbs) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Link 
          to="/" 
          className={`font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-2 whitespace-nowrap transition-colors ${
            isTop ? 'bg-cyan-500 text-navy-900 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-navy-700 text-slate-300 hover:text-white hover:bg-navy-600'
          }`}
        >
          <Home size={14} />
          <span>TOP</span>
        </Link>
        
        <div className="flex items-center gap-2 ml-2 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1 text-slate-500"><ChevronRight size={14} /> 章一覧</span>
          {['1', '2', '3', '4'].map(chap => {
            const isActive = currentChapter === chap;
            return (
              <Link 
                key={chap} 
                to={`/chapter/${chap}`} 
                className={`px-3 py-1 rounded-full transition-colors ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'border border-transparent hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                C{chap}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors">
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
