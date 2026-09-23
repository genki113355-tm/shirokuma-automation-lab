import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, BookOpen, Bug, TestTube, Box, GitBranch, Workflow, Rocket, CheckCircle2 } from 'lucide-react';

export default function TopPage() {
  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto space-y-12 md:space-y-20 pb-32">
      
      {/* Hero Section */}
      <div className="flex flex-col xl:flex-row items-center justify-between bg-gradient-to-br from-cyan-900/40 to-navy-800/80 p-5 sm:p-8 md:p-10 lg:p-16 rounded-2xl md:rounded-3xl border border-cyan-500/20 shadow-2xl gap-8 md:gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* 左側: タイトルとストーリー */}
        <div className="xl:w-1/2 space-y-6 md:space-y-8 relative z-10 w-full min-w-0">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-cyan-400 text-xs md:text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)] max-w-full">
              <Rocket size={16} className="shrink-0" />
              <span className="truncate">C++開発者のための実務効率化・自動化ガイド</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-black text-white leading-[1.3] md:leading-[1.1] tracking-tighter drop-shadow-2xl">
              <span className="block text-cyan-400 text-base sm:text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-4 tracking-widest font-bold">シロクマC++開発自動化ラボ</span>
              <span className="inline-block">C++開発の</span><span className="inline-block">泥臭い作業、</span><br className="hidden xl:block"/>
              <span className="inline-block">全部「全自動化」</span><span className="inline-block">しませんか？</span>
            </h1>
          </div>

          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200 tracking-tight pb-4 sm:pb-6 border-b border-white/10 leading-relaxed">
            <span className="inline-block">Python, Docker, CI/CDを活用して、</span>
            <span className="text-yellow-400 inline-block">現場のC++開発を</span><span className="text-yellow-400 inline-block">モダンにアップデート。</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl">
            <span className="inline-block">「ビルド環境を作るだけで一苦労」</span>
            <span className="inline-block">「テストを手動で実行するのが面倒」</span>
            <span className="inline-block">「バグの検知が遅れる」……</span><br className="hidden sm:block"/>
            <span className="inline-block">C++開発者が実際に直面する課題を解決するために、</span>
            <span className="inline-block">開発プロセスを進化させましょう。</span><br className="hidden sm:block"/>
            <span className="inline-block"><strong>手動ビルド ➔ CMake ➔ 自動テスト ➔ ASan ➔ Docker ➔ GitHub Actions</strong></span>
            <span className="inline-block ml-1">という完全自動CI/CDのワークフローを実践します。</span>
          </p>
        </div>

        {/* 右側: ターミナル体験とMISSION */}
        <div className="xl:w-1/2 w-full relative z-10 flex flex-col gap-6">
          <div className="bg-slate-900/90 border border-slate-700/60 p-5 rounded-2xl shadow-xl relative backdrop-blur-sm">
            <div className="absolute -top-3 left-6 bg-amber-500 text-slate-950 text-[11px] font-black px-3 py-0.5 rounded-sm shadow-sm tracking-widest">MISSION</div>
            <p className="text-sm sm:text-base text-slate-100 font-bold mb-2">Q. このプロジェクトのテストを毎回「手動」で実行するのをやめたい。</p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              コードをプッシュした瞬間に、クリーンな環境(Docker)でビルドされ、自動テストとメモリ漏れ検査(ASan)が走り、安全が証明される完全なCI/CDパイプラインを構築せよ。
            </p>
          </div>

          {/* ターミナルモックアップ */}
          <div className="w-full rounded-xl bg-[#0d1117] border border-slate-700/50 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
            <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-slate-700/50 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="ml-2 text-slate-400 font-bold text-[10px]">CI/CD Pipeline Execution</span>
            </div>
            <div className="p-4 space-y-2 text-slate-300">
              <div className="flex gap-2">
                <span className="text-emerald-400">➜</span>
                <span className="text-cyan-400">~/project</span>
                <span>git push origin main</span>
              </div>
              <div className="text-slate-500">Enumerating objects: 5, done.</div>
              <div className="text-slate-500">Writing objects: 100% (3/3), 312 bytes, done.</div>
              <div className="text-blue-400 animate-pulse mt-2">● Triggering GitHub Actions Workflow...</div>
              
              <div className="pt-2 border-l-2 border-slate-700 pl-3 ml-1 space-y-1">
                <div className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={14} className="text-emerald-500" /> [BUILD] Compiling with CMake (Docker)</div>
                <div className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={14} className="text-emerald-500" /> [TEST] 23 tests passed successfully</div>
                <div className="flex items-center gap-2 text-slate-300"><CheckCircle2 size={14} className="text-emerald-500" /> [ASAN] No memory errors detected</div>
              </div>
              
              <div className="text-emerald-400 font-bold mt-2 pt-2 border-t border-slate-800">✓ All checks have passed. Ready for deployment.</div>
            </div>
          </div>

          <div className="flex justify-center sm:justify-start">
            <Link to="/chapter/1" className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)] w-full sm:w-auto">
              自動化チュートリアルを始める<ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* What we automate Section */}
      <div className="space-y-6 sm:space-y-10 relative z-10">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">このサイトで実現できる「自動化」</h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg">C++の面倒な作業を、様々なツールを組み合わせて効率化します。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AutomationCard 
            icon={<Box size={28} />}
            title="ビルド環境の自動化"
            tech="Docker / CMake"
            description="「私のPCでは動くのに...」をなくすため、Dockerでコンパイル環境をパッケージ化。全員が同じ環境で一瞬でビルドできるようにします。"
          />
          <AutomationCard 
            icon={<TestTube size={28} />}
            title="単体テストの自動化"
            tech="Google Test / CTest"
            description="手動でポチポチ確認する時代は終わり。テストコードを書き、CMakeと連携してコマンド一発で全機能を検証する基盤を作ります。"
          />
          <AutomationCard 
            icon={<GitBranch size={28} />}
            title="ビルド・検査の自動化"
            tech="GitHub Actions"
            description="コードをPushするだけで、クラウド上で全自動でビルドとテストを実行。バグが混入した瞬間に検知できるCI/CDパイプラインを構築します。"
          />
          <AutomationCard 
            icon={<Bug size={28} />}
            title="メモリ漏れ検知の自動化"
            tech="AddressSanitizer"
            description="C++最大の敵であるメモリリークや不正アクセス。コンパイラの機能を使って、実行時に自動でバグをあぶり出します。"
          />
          <AutomationCard 
            icon={<Terminal size={28} />}
            title="ローカル作業の自動化"
            tech="Bash スクリプト"
            description="長くて複雑なビルドコマンドや、テストの繰り返し実行。強力なシェルスクリプトを書き、コマンド一発で作業を終わらせます。"
          />
          <AutomationCard 
            icon={<Workflow size={28} />}
            title="実機テストの自動化"
            tech="UDP / HILシミュレーション"
            description="ハードウェアが手元になくても大丈夫。ネットワーク通信を模倣し、PC上だけで組み込み処理やソナーロジックを検証します。"
          />
        </div>
      </div>

      {/* Sister Sites Navigation */}
      <div className="bg-navy-800/50 rounded-2xl p-5 sm:p-8 md:p-12 border border-slate-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <BookOpen size={200} />
        </div>
        <div className="relative z-10 space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">あなたの目的に合わせた学習ルート</h2>
            <p className="text-slate-400 text-sm sm:text-base">シロクマ先生のサイト群は、目的に応じて使い分けることができます。</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <a href="https://www.shirokuma-cpp.jp" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-slate-800/80 p-5 sm:p-6 rounded-xl border border-slate-700 transition-all group-hover:border-cyan-500/50 group-hover:bg-slate-800 h-full flex flex-col justify-between">
                <div>
                  <div className="text-cyan-400 text-xs sm:text-sm font-bold mb-2">STEP 1: 設計のコア技術を学ぶ</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">シロクマC++ラボ</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    インベーダーゲーム開発を通じて、オブジェクト指向やモダンC++の設計力とアルゴリズム実装基盤を体系的に習得。
                  </p>
                </div>
                <div className="mt-4 text-xs font-mono text-cyan-400 font-bold flex items-center gap-1">
                  <span>サイトを見る</span> <span>➔</span>
                </div>
              </div>
            </a>

            <div className="bg-cyan-900/30 p-5 sm:p-6 rounded-xl border border-cyan-500/50 relative h-full flex flex-col justify-between">
              <div className="absolute -top-3 -right-2 sm:-right-3 bg-cyan-500 text-navy-900 text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">現在地</div>
              <div>
                <div className="text-cyan-400 text-xs sm:text-sm font-bold mb-2">STEP 2: 実務・自動化で使いこなす</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">シロクマC++開発自動化ラボ</h3>
                <p className="text-cyan-100/70 text-xs sm:text-sm leading-relaxed">
                  Python/Docker/CMake/CIを活用し、泥臭い手動ビルドやテストを完全自動化。開発者のための効率化エコシステムを構築します。
                </p>
              </div>
              <div className="mt-4 text-xs font-mono text-cyan-300/60 font-bold">
                <span>当メディアで学習中</span>
              </div>
            </div>

            <a href="https://shirokuma-qt-cpp.jp" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-slate-800/80 p-5 sm:p-6 rounded-xl border border-slate-700 transition-all group-hover:border-emerald-500/50 group-hover:bg-slate-800 h-full flex flex-col justify-between">
                <div>
                  <div className="text-emerald-400 text-xs sm:text-sm font-bold mb-2">STEP 3: Linux GUI・リアルタイム計器</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">シロクマQt×C++ラボ</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Qtフレームワークを活用し、Linux環境で動くプロ仕様のHMIやリアルタイム計器GUIダッシュボードを創り出します。
                  </p>
                </div>
                <div className="mt-4 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span>サイトを見る</span> <span>➔</span>
                </div>
              </div>
            </a>

            <a href="https://sonar-guide.jp" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-slate-800/80 p-5 sm:p-6 rounded-xl border border-slate-700 transition-all group-hover:border-blue-500/50 group-hover:bg-slate-800 h-full flex flex-col justify-between">
                <div>
                  <div className="text-blue-400 text-xs sm:text-sm font-bold mb-2">STEP 4: ドメイン応用・音響信号処理</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">水中音響・ソナー技術入門</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    波の物理、FFT、LOFAR・DEMON信号処理など、C++の高速計算力を活かす水中音響工学の世界を探求。
                  </p>
                </div>
                <div className="mt-4 text-xs font-mono text-blue-400 font-bold flex items-center gap-1">
                  <span>サイトを見る</span> <span>➔</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

function AutomationCard({ icon, title, tech, description }: { icon: React.ReactNode, title: string, tech: string, description: string }) {
  return (
    <div className="bg-navy-800/40 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-navy-800/60 group">
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="p-2.5 sm:p-3 bg-slate-800 rounded-lg text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-xl font-bold text-white truncate">{title}</h3>
          <span className="text-[10px] sm:text-xs font-bold text-cyan-500/80 bg-cyan-500/10 px-2 py-0.5 sm:py-1 rounded inline-block mt-0.5">{tech}</span>
        </div>
      </div>
      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
