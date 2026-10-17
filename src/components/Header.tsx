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
    <header className="h-14 border-b border-sky-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 lg:px-6 shadow-xs">
      
      {/* Left Nav Pills (Breadcrumbs) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-0 flex-1 py-1">
        <button 
          className="lg:hidden p-1.5 mr-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors shrink-0"
          onClick={toggleMobileMenu}
          aria-label="メニューを開く"
        >
          <Menu size={20} />
        </button>
        
        <Link 
          to="/" 
          className={`font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors shrink-0 ${
            isTop ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
          }`}
        >
          <Home size={14} />
          <span>TOP</span>
        </Link>
        
        {currentChapter && (
          <div className="flex items-center gap-1.5 ml-1 text-xs font-medium text-slate-600 shrink-0">
            <span className="flex items-center text-slate-400"><ChevronRight size={16} /></span>
            <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 whitespace-nowrap shadow-xs">
              <span className="text-cyan-900 font-bold">第{currentChapter}章</span>
              <span className="text-cyan-700/70 font-bold ml-1.5 text-[10px] tracking-wider">/ 全12章</span>
            </span>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={openLab}
          aria-label="コード実行ラボを開く"
          className="bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-cyan-900 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <Play size={14} fill="currentColor" className="text-cyan-700" />
          <span>コード実行ラボ</span>
        </button>
        <button 
          aria-label="環境構築スクリプトをダウンロード"
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors hidden sm:flex shadow-xs"
        >
          <Download size={14} />
          <span>環境構築スクリプト</span>
        </button>
      </div>
    </header>
  );
}
