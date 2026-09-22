import { ChevronDown, Beaker, Play, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen?: boolean, setIsOpen?: (v: boolean) => void }) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const closeDrawer = () => {
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed lg:static top-0 left-0 h-screen w-72 max-w-[85vw] bg-navy-800 border-r border-cyan-500/20 flex flex-col flex-shrink-0 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Mobile Close Button */}
        <button 
          className="lg:hidden absolute top-3 right-3 p-2 text-slate-400 hover:text-white bg-navy-900/50 rounded-full"
          onClick={closeDrawer}
          aria-label="メニューを閉じる"
        >
          <X size={20} />
        </button>

        {/* Brand */}
      <Link to="/" onClick={closeDrawer} className="p-4 border-b border-cyan-500/20 flex items-center gap-3 hover:bg-navy-700/50 transition-colors">
        <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center text-2xl shadow-[0_0_10px_rgba(6,182,212,0.2)]">
          🐻‍❄️
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">シロクマ<br/>C++開発自動化ラボ</h1>
          <p className="text-[10px] text-cyan-400">〜実務の手作業を駆逐する〜</p>
        </div>
      </Link>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-slate-300 text-xs font-bold mb-3">
            <Beaker size={14} className="text-cyan-400" />
            <span>環境構築編</span>
          </div>
          <ul className="space-y-2">
            <Link to="/chapter/1" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/1') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/1') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 1】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">理論</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/1') ? 'text-white' : 'text-slate-300'}`}>手動評価の限界と自動化エコシステム</p>
              </li>
            </Link>
            
            <Link to="/chapter/2" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/2') ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/2') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 2】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">実践</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/2') ? 'text-white' : 'text-slate-300'}`}>Dockerによる再現性のあるビルド</p>
              </li>
            </Link>
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold mb-3">
            <div className="flex items-center gap-2">
              <Play size={14} className="text-cyan-400" />
              <span>自動評価編 (10章)</span>
            </div>
            <ChevronDown size={14} />
          </div>
          <ul className="space-y-2">
            <Link to="/chapter/3" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/3') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/3') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 3】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">実践</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/3') ? 'text-white' : 'text-slate-300'}`}>CMakeによるビルドとテスト統合</p>
              </li>
            </Link>
            <Link to="/chapter/4" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/4') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/4') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 4】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">実践</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/4') ? 'text-white' : 'text-slate-300'}`}>GoogleTestによるC++網羅テスト</p>
              </li>
            </Link>
            <Link to="/chapter/5" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/5') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/5') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 5】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">実践</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/5') ? 'text-white' : 'text-slate-300'}`}>PythonからC++を直接叩く</p>
              </li>
            </Link>
            <Link to="/chapter/6" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/6') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/6') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 6】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">実践</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/6') ? 'text-white' : 'text-slate-300'}`}>NumPyによるテストデータ生成</p>
              </li>
            </Link>
            <Link to="/chapter/7" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/7') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/7') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 7】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">実践</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/7') ? 'text-white' : 'text-slate-300'}`}>Pythonによる誤差評価・グラフ化</p>
              </li>
            </Link>
          </ul>
        </div>

        {/* --- CI/CD・インフラ編 --- */}
        <div>
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold mb-3 mt-6">
            <div className="flex items-center gap-2">
              <Play size={14} className="text-cyan-400" />
              <span>CI/CD・インフラ編</span>
            </div>
            <ChevronDown size={14} />
          </div>
          <ul className="space-y-2">
            <Link to="/chapter/8" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/8') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/8') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 8】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">インフラ</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/8') ? 'text-white' : 'text-slate-300'}`}>シェルスクリプトでの一括実行</p>
              </li>
            </Link>
            <Link to="/chapter/9" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/9') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/9') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 9】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">デバッグ</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/9') ? 'text-white' : 'text-slate-300'}`}>Sanitizerによるメモリ解析</p>
              </li>
            </Link>
            <Link to="/chapter/10" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/10') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/10') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 10】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">CI/CD</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/10') ? 'text-white' : 'text-slate-300'}`}>GitHub Actionsによる自動化</p>
              </li>
            </Link>
          </ul>
        </div>

        {/* --- アドバンスド編 --- */}
        <div>
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold mb-3 mt-6">
            <div className="flex items-center gap-2">
              <Play size={14} className="text-cyan-400" />
              <span>アドバンスド編</span>
            </div>
            <ChevronDown size={14} />
          </div>
          <ul className="space-y-2">
            <Link to="/chapter/11" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/11') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/11') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 11】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">HIL</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/11') ? 'text-white' : 'text-slate-300'}`}>HILシミュレーションへの応用</p>
              </li>
            </Link>
            <Link to="/chapter/12" onClick={closeDrawer} className="block">
              <li className={`border rounded-md p-3 cursor-pointer transition-colors ${isActive('/chapter/12') ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-navy-700/50 border-cyan-500/10 hover:border-cyan-500/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold ${isActive('/chapter/12') ? 'text-cyan-400' : 'text-slate-400'}`}>【Chap 12】</span>
                  <span className="text-slate-400 text-[10px] border border-slate-600 px-1.5 rounded">総括</span>
                </div>
                <p className={`text-sm font-medium ${isActive('/chapter/12') ? 'text-white' : 'text-slate-300'}`}>自動テストシステム構築の実践</p>
              </li>
            </Link>
          </ul>
        </div>

        {/* Characters */}
        <div className="border-t border-cyan-500/20 pt-4 bg-navy-900/30 rounded-lg p-3 space-y-3">
          <div className="flex items-center gap-3">
            <img src="/images/polar-bear-guide-pointing.png" alt="シロクマ" className="w-10 h-10 rounded-full border-2 border-cyan-500 object-cover bg-navy-800" />
            <div>
              <p className="text-sm font-bold text-white leading-none mb-1">シロクマ先生 (Sensei)</p>
              <p className="text-[10px] text-slate-400">低レイヤ・数理アルゴリズム専門家</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src="/images/penguin-guide-simple.jpg" alt="ペンギンくん" className="w-10 h-10 rounded-full border-2 border-slate-500 object-cover bg-navy-800" />
            <div>
              <p className="text-sm font-bold text-white leading-none mb-1">ペンギンくん (Penguin)</p>
              <p className="text-[10px] text-slate-400">手動評価に苦しむ若手エンジニア</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

