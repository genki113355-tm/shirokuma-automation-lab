import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, BookOpen, Bug, TestTube, Box, GitBranch, Workflow, Rocket } from 'lucide-react';

export default function TopPage() {
  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto space-y-12 md:space-y-20 pb-32">
      
      {/* Hero Section */}
      <div className="flex flex-col xl:flex-row items-center justify-between bg-gradient-to-br from-cyan-900/40 to-navy-800/80 p-6 md:p-10 lg:p-16 rounded-2xl md:rounded-3xl border border-cyan-500/20 shadow-2xl gap-8 md:gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="xl:w-3/4 space-y-6 md:space-y-8 relative z-10">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-cyan-400 text-xs md:text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Rocket size={16} />
              <span>C++開発者のための実務効率化・自動化ガイド</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-black text-white leading-[1.1] md:leading-[1.1] tracking-tighter drop-shadow-2xl">
              <span className="block text-cyan-400 text-xl md:text-3xl lg:text-4xl mb-2 md:mb-4 tracking-widest font-bold">シロクマ C++開発自動化ラボ</span>
              C++開発の泥臭い作業、<br className="hidden md:block"/>全部「自動化」しませんか？
            </h1>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-200 tracking-tight pb-6 border-b border-white/10">
            Python, Docker, CI/CDを活用して、<span className="text-yellow-400">現場のC++開発をモダンにアップデート。</span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl">
            「ビルド環境を作るだけで一苦労」「テストデータの手打ちが面倒」「バグの検知が遅れる」……<br />
            そんなC++特有の課題を、他言語や最新ツールと組み合わせて解決します。<br />
            文法を覚えたその先にある、<strong>「問題を解決するためのC++の実践的エコシステム」</strong>を構築しましょう。
          </p>

          <div className="pt-4 flex flex-wrap gap-6">
            <Link to="/chapter/1" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-10 py-5 rounded-xl text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              自動化チュートリアルを始める <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* What we automate Section */}
      <div className="space-y-10 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">このサイトで実現できる「自動化」</h2>
          <p className="text-slate-400 text-lg">C++の面倒な作業を、様々なツールを組み合わせて効率化します。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AutomationCard 
            icon={<Box size={32} />}
            title="環境構築の自動化"
            tech="Docker / C++"
            description="「私のPCでは動くのに」を撲滅。コンテナ技術を用いて、チーム全員が1秒で同じC++ビルド環境を立ち上げられるようにします。"
          />
          <AutomationCard 
            icon={<TestTube size={32} />}
            title="テストの自動化"
            tech="Python / pybind11"
            description="C++でテスト用のドライバを書くのは大変です。PythonからC++を直接呼び出し、スクリプト言語の身軽さでテストを自動化します。"
          />
          <AutomationCard 
            icon={<GitBranch size={32} />}
            title="ビルド＆検査の自動化"
            tech="GitHub Actions"
            description="コードをPushするだけで、クラウド上で全自動でビルドとテストを実行。バグが混入した瞬間に検知できるCI/CDパイプラインを構築します。"
          />
          <AutomationCard 
            icon={<Bug size={32} />}
            title="メモリ漏れ検知の自動化"
            tech="AddressSanitizer"
            description="C++最大の敵であるメモリリークや不正アクセス。コンパイラの機能を使って、実行時に自動でバグをあぶり出します。"
          />
          <AutomationCard 
            icon={<Terminal size={32} />}
            title="ローカル作業の自動化"
            tech="Bash スクリプト"
            description="長くて複雑なビルドコマンドや、テストの繰り返し実行。堅牢なシェルスクリプトを書いて、コマンド一発で作業を終わらせます。"
          />
          <AutomationCard 
            icon={<Workflow size={32} />}
            title="実機テストの自動化"
            tech="UDP / HILシミュレーション"
            description="ハードウェアが手元になくても大丈夫。ネットワーク通信を模倣し、PC上だけで組み込み処理やソナーロジックを検証します。"
          />
        </div>
      </div>

      {/* Sister Sites Navigation */}
      <div className="bg-navy-800/50 rounded-2xl p-8 md:p-12 border border-slate-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BookOpen size={200} />
        </div>
        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">あなたの目的に合わせた学習ルート</h2>
            <p className="text-slate-400">シロクマ先生のサイト群は、目的に応じて使い分けることができます。</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.shirokuma-cpp.jp" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 transition-all group-hover:border-cyan-500/50 group-hover:bg-slate-800 h-full flex flex-col justify-between">
                <div>
                  <div className="text-cyan-400 text-sm font-bold mb-2">STEP 1: 設計・コア技術を学ぶ</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">シロクマC++ラボ</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    インベーダーゲーム開発を通じて、オブジェクト指向・モダンC++の設計力とアルゴリズム実装基盤を体系的に習得。
                  </p>
                </div>
                <div className="mt-4 text-xs font-mono text-cyan-400 font-bold flex items-center gap-1">
                  <span>サイトを見る</span> <span>↗</span>
                </div>
              </div>
            </a>

            <div className="bg-cyan-900/30 p-6 rounded-xl border border-cyan-500/50 relative h-full flex flex-col justify-between">
              <div className="absolute -top-3 -right-3 bg-cyan-500 text-navy-900 text-xs font-black px-3 py-1 rounded-full shadow-lg">現在地</div>
              <div>
                <div className="text-cyan-400 text-sm font-bold mb-2">STEP 2: 実務・自動化で使いこなす</div>
                <h3 className="text-xl font-bold text-white mb-2">シロクマC++自動化ラボ</h3>
                <p className="text-cyan-100/70 text-sm leading-relaxed">
                  Python/Docker/CMake/CIを活用し、泥臭い手動ビルド・テストを完全自動化。開発者のための効率化エコシステムを構築します。
                </p>
              </div>
              <div className="mt-4 text-xs font-mono text-cyan-300/60 font-bold">
                <span>当メディアで学習中</span>
              </div>
            </div>

            <a href="https://shirokuma-qt-cpp.jp" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 transition-all group-hover:border-emerald-500/50 group-hover:bg-slate-800 h-full flex flex-col justify-between">
                <div>
                  <div className="text-emerald-400 text-sm font-bold mb-2">STEP 3: Linux GUI・リアルタイム計器</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">シロクマQt×C++ラボ</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Qtフレームワークを活用し、Linux環境で動くプロ仕様のHMIやリアルタイム計器GUIダッシュボードを創り出します。
                  </p>
                </div>
                <div className="mt-4 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span>サイトを見る</span> <span>↗</span>
                </div>
              </div>
            </a>

            <a href="https://sonar-guide.jp" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 transition-all group-hover:border-blue-500/50 group-hover:bg-slate-800 h-full flex flex-col justify-between">
                <div>
                  <div className="text-blue-400 text-sm font-bold mb-2">STEP 4: ドメイン応用・音響信号処理</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">水中音響・ソナー技術入門</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    波の物理、FFT、LOFAR・DEMON信号処理など、C++の高速計算力を活かす水中音響工学の世界を探求。
                  </p>
                </div>
                <div className="mt-4 text-xs font-mono text-blue-400 font-bold flex items-center gap-1">
                  <span>サイトを見る</span> <span>↗</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

// カードコンポーネント
function AutomationCard({ icon, title, tech, description }: { icon: React.ReactNode, title: string, tech: string, description: string }) {
  return (
    <div className="bg-navy-800/40 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-navy-800/60 group">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-slate-800 rounded-lg text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-xs font-bold text-cyan-500/80 bg-cyan-500/10 px-2 py-1 rounded">{tech}</span>
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
