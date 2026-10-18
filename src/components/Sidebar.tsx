import { useEffect } from 'react';
import { ChevronDown, Beaker, Play, X, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen?: boolean, setIsOpen?: (v: boolean) => void }) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const closeDrawer = () => {
    if (setIsOpen) setIsOpen(false);
  };

  // モバイルメニュー展開時の背景スクロールロック
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

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
      <div className={`fixed lg:static top-0 left-0 h-screen w-72 max-w-[85vw] bg-white border-r border-sky-200 shadow-sm flex flex-col flex-shrink-0 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Mobile Close Button */}
        <button 
          className="lg:hidden absolute top-2 right-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-slate-800 bg-slate-100 rounded-full cursor-pointer"
          onClick={closeDrawer}
          aria-label="メニューを閉じる"
        >
          <X size={20} />
        </button>

        {/* Brand */}
      <Link to="/" onClick={closeDrawer} className="p-4 border-b border-sky-200 flex items-center gap-3 hover:bg-sky-50/50 transition-colors">
        <img
          src="/images/characters/shirokuma_sensei.png"
          alt="シロクマ先生"
          className="w-10 h-10 rounded-xl object-cover border-2 border-cyan-400 shadow-sm"
        />
        <div>
          <h1 className="text-slate-900 font-black text-lg leading-tight">シロクマ<br/>C++開発自動化ラボ</h1>
          <p className="text-[10px] text-cyan-800 font-bold">〜実務の手作業を駆逐する〜</p>
        </div>
      </Link>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Quick Nav / 付録ショートカット */}
        <div className="pb-1 space-y-1.5">
          <Link
            to="/appendix/googletest"
            onClick={closeDrawer}
            className={`flex items-center justify-between p-2 rounded-lg border text-xs font-bold transition-all ${
              isActive('/appendix/googletest')
                ? 'bg-cyan-100 border-cyan-400 text-cyan-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-cyan-300 hover:text-cyan-900 hover:bg-cyan-50/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-cyan-600 shrink-0" />
              <span>【付録1】GoogleTest リファレンス</span>
            </div>
            <span className="text-[10px] bg-cyan-100 text-cyan-900 border border-cyan-300 px-1.5 py-0.5 rounded font-mono shrink-0 font-bold">
              単体
            </span>
          </Link>
          <Link
            to="/appendix/ctest"
            onClick={closeDrawer}
            className={`flex items-center justify-between p-2 rounded-lg border text-xs font-bold transition-all ${
              isActive('/appendix/ctest')
                ? 'bg-teal-100 border-teal-400 text-teal-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-300 hover:text-teal-900 hover:bg-teal-50/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-teal-600 shrink-0" />
              <span>【付録2】CTest 実践リファレンス</span>
            </div>
            <span className="text-[10px] bg-teal-100 text-teal-900 border border-teal-300 px-1.5 py-0.5 rounded font-mono shrink-0 font-bold">
              ランナー
            </span>
          </Link>
        </div>

        <div>
          <div className="flex items-center gap-2 text-slate-700 text-xs font-bold mb-3">
            <Beaker size={14} className="text-cyan-600" />
            <span>環境構築編</span>
          </div>
          <ul className="space-y-2">
            <Link to="/chapter/1" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/1') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/1') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 1】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">理論</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/1') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>手動評価の限界と自動化エコシステム</p>
              </li>
            </Link>
            
            <Link to="/chapter/2" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/2') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/2') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 2】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">実践</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/2') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>Dockerによる再現性のあるビルド</p>
              </li>
            </Link>
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between text-slate-700 text-xs font-bold mb-3">
            <div className="flex items-center gap-2">
              <Play size={14} className="text-cyan-600" />
              <span>自動評価編 (10章)</span>
            </div>
            <ChevronDown size={14} />
          </div>
          <ul className="space-y-2">
            <Link to="/chapter/3" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/3') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/3') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 3】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">実践</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/3') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>CMakeによるビルドとテスト統合</p>
              </li>
            </Link>
            <Link to="/chapter/4" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/4') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/4') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 4】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">実践</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/4') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>GoogleTestによるC++網羅テスト</p>
              </li>
            </Link>
            <Link to="/chapter/5" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/5') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/5') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 5】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">実践</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/5') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>PythonからC++を直接叩く</p>
              </li>
            </Link>
            <Link to="/chapter/6" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/6') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/6') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 6】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">実践</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/6') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>NumPyによるテストデータ生成</p>
              </li>
            </Link>
            <Link to="/chapter/7" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/7') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/7') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 7】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">実践</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/7') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>Pythonによる誤差評価・グラフ化</p>
              </li>
            </Link>
          </ul>
        </div>

        {/* --- CI/CD・インフラ編 --- */}
        <div>
          <div className="flex items-center justify-between text-slate-700 text-xs font-bold mb-3 mt-6">
            <div className="flex items-center gap-2">
              <Play size={14} className="text-cyan-600" />
              <span>CI/CD・インフラ編</span>
            </div>
            <ChevronDown size={14} />
          </div>
          <ul className="space-y-2">
            <Link to="/chapter/8" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/8') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/8') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 8】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">インフラ</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/8') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>シェルスクリプトでの一括実行</p>
              </li>
            </Link>
            <Link to="/chapter/9" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/9') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/9') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 9】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">デバッグ</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/9') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>Sanitizerによるメモリ解析</p>
              </li>
            </Link>
            <Link to="/chapter/10" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/10') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/10') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 10】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">CI/CD</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/10') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>GitHub Actionsによる自動化</p>
              </li>
            </Link>
          </ul>
        </div>

        {/* --- アドバンスド編 --- */}
        <div>
          <div className="flex items-center justify-between text-slate-700 text-xs font-bold mb-3 mt-6">
            <div className="flex items-center gap-2">
              <Play size={14} className="text-cyan-600" />
              <span>アドバンスド編</span>
            </div>
            <ChevronDown size={14} />
          </div>
          <ul className="space-y-2">
            <Link to="/chapter/11" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/11') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/11') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 11】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">HIL</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/11') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>HILシミュレーションへの応用</p>
              </li>
            </Link>
            <Link to="/chapter/12" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/chapter/12') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/chapter/12') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【Chap 12】</span>
                  <span className="text-slate-600 text-[10px] border border-slate-200 bg-white px-1.5 rounded font-medium">総括</span>
                </div>
                <p className={`text-sm ${isActive('/chapter/12') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>自動テストシステム構築の実践</p>
              </li>
            </Link>
          </ul>
        </div>

        {/* --- 付録・逆引きリファレンス --- */}
        <div>
          <div className="flex items-center justify-between text-slate-700 text-xs font-bold mb-3 mt-6">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-cyan-600" />
              <span>付録・実践リファレンス</span>
            </div>
            <ChevronDown size={14} />
          </div>
          <ul className="space-y-2">
            <Link to="/appendix/googletest" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/appendix/googletest') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/appendix/googletest') ? 'text-cyan-900 font-black' : 'text-slate-500 font-bold'}`}>【付録 1】</span>
                  <span className="text-cyan-800 text-[10px] border border-cyan-300 px-1.5 rounded bg-cyan-50 font-bold">単体テスト</span>
                </div>
                <p className={`text-sm ${isActive('/appendix/googletest') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>GoogleTest 逆引き実践リファレンス</p>
              </li>
            </Link>
            <Link to="/appendix/ctest" onClick={closeDrawer} className="block">
              <li className={`border rounded-lg p-3 cursor-pointer transition-all ${isActive('/appendix/ctest') ? 'bg-cyan-50/80 border-2 border-cyan-400 shadow-xs' : 'bg-slate-50/70 border-slate-200/80 hover:border-cyan-300 hover:bg-sky-50/40'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${isActive('/appendix/ctest') ? 'text-teal-900 font-black' : 'text-slate-500 font-bold'}`}>【付録 2】</span>
                  <span className="text-teal-800 text-[10px] border border-teal-300 px-1.5 rounded bg-teal-50 font-bold">テストランナー</span>
                </div>
                <p className={`text-sm ${isActive('/appendix/ctest') ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>CTest 逆引き実践リファレンス</p>
              </li>
            </Link>
          </ul>
        </div>

        {/* 相互リンク（技術学習エコシステム） */}
        <div className="border border-slate-200 pt-4 mt-6 bg-slate-50/70 rounded-xl p-3 space-y-2">
          <div className="text-[10px] font-mono text-cyan-900 font-bold mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>🔗</span>
              <span>技術学習エコシステム</span>
            </span>
            <span className="text-[9px] text-slate-600 font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200">
              相互リンク
            </span>
          </div>

          <div className="space-y-1.5">
            {/* 0. 総合トップ */}
            <a
              href="/"
              className="group flex items-center justify-between p-2 rounded-lg bg-white hover:bg-cyan-50/50 border border-cyan-200 hover:border-cyan-400 transition shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🏛️</span>
                  <div className="text-xs font-bold text-cyan-900 group-hover:text-cyan-700 truncate">
                    総合ポータル
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  全4ラボの学習記録・修了証を集約
                </div>
              </div>
              <span className="text-xs text-cyan-700 group-hover:text-cyan-900 font-mono flex-shrink-0">
                ➔
              </span>
            </a>

            {/* 1. シロクマC++ラボ */}
            <a
              href="/cpp/"
              className="group flex items-center justify-between p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-cyan-400 transition shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">👾</span>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 truncate">
                    シロクマC++ラボ
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  ゲーム開発で学ぶC++設計
                </div>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-cyan-600 font-mono flex-shrink-0">
                ↗
              </span>
            </a>

            {/* 2. シロクマQt×C++ラボ */}
            <a
              href="/qt/"
              className="group flex items-center justify-between p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-cyan-400 transition shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🖥️</span>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 truncate">
                    シロクマQt×C++ラボ
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  QML / 60fps波形描画 / 実務GUI
                </div>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-cyan-600 font-mono flex-shrink-0">
                ↗
              </span>
            </a>

            {/* 3. 水中音響・ソナー技術入門 */}
            <a
              href="/sonar/"
              className="group flex items-center justify-between p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 transition shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🌊</span>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 truncate">
                    水中音響・ソナー入門
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  波の物理 / FFT / 音響解析
                </div>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-blue-600 font-mono flex-shrink-0">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Characters */}
        <div className="border border-slate-200 pt-3 bg-slate-50/70 rounded-xl p-3 space-y-3">
          <div className="flex items-center gap-3">
            <img src="/images/characters/shirokuma_sensei.png" alt="シロクマ先生" className="w-10 h-10 rounded-full border-2 border-cyan-500 object-cover bg-white shadow-xs" />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">シロクマ先生 (Sensei)</p>
              <p className="text-[10px] text-slate-600">低レイヤ・数理アルゴリズム専門家</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src="/images/characters/penguin_student.jpg" alt="ペンギン生徒" className="w-10 h-10 rounded-full border-2 border-slate-400 object-cover bg-white shadow-xs" />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">ペンギン生徒 (Student)</p>
              <p className="text-[10px] text-slate-600">手動評価に苦しむ若手エンジニア</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

