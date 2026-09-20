import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Trophy, CheckCircle, Terminal } from 'lucide-react';

export default function TopPage() {
  return (
    <div className="p-8 md:p-12 max-w-[1600px] mx-auto space-y-16 pb-32">
      
      {/* Hero Section */}
      <div className="flex flex-col xl:flex-row items-center justify-between bg-gradient-to-br from-cyan-900/40 to-navy-800/80 p-10 lg:p-14 rounded-2xl border border-cyan-500/20 shadow-2xl gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* テキストエリアをさらに広く取る */}
        <div className="xl:w-2/3 space-y-8 relative z-10">
          
          {/* サイト名 (H1: 大文字でバーンと見せる) */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full text-cyan-400 text-sm font-bold">
              <span>🚀</span> <span>インフラ・Python連携で手作業から脱却</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-none tracking-tighter drop-shadow-2xl">
              <span className="block text-cyan-400 text-2xl md:text-3xl lg:text-4xl mb-3 tracking-widest font-bold">SHIROKUMA</span>
              C++自動化ラボ
            </h1>
          </div>

          {/* 副題 (H2: キャッチコピー) */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-200 tracking-tight pb-6 border-b border-white/10">
            <span className="inline-block">C++の数理ロジックを、</span>
            <span className="text-yellow-400 inline-block">全自動で評価しよう。</span>
          </h2>

          {/* 概要説明 */}
          <p className="text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed">
            防衛、宇宙、信号処理……ミッションクリティカルな実務において、C++の高度な数理ロジックの「正しさ」をどう保証していますか？<br />
            Linuxインフラ、Docker、pybind11、CI/CDを駆使して、泥臭い手作業から脱却する最新のエコシステムを構築しましょう。
          </p>

          <div className="pt-4">
            <Link to="/chapter/1" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-10 py-5 rounded-lg text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              第1章から学習をスタート <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        
        {/* 画像エリアの比率を調整 */}
        <div className="xl:w-1/3 flex justify-center relative z-10 shrink-0">
          <img src="/images/cpp-automation-hero.jpg" alt="C++ Automation Overview" className="w-full max-w-md xl:max-w-full rounded-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] object-cover" />
        </div>
      </div>

      {/* About This Site (対象者 & ゴール) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Target Audience */}
        <div className="bg-navy-800/80 border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
              <Target size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">対象となるエンジニア</h2>
          </div>
          <ul className="space-y-5">
            {[
              "テスト結果をCSVに出力し、毎回Excelでグラフを作って目視確認している方",
              "「私のPCではビルドできるのに…」という環境依存に悩むC++開発者",
              "防衛、宇宙、プラント制御、音響信号処理などのドメインに関わる方",
              "C++の計算速度と、Pythonの柔軟な分析エコシステムを両立させたい方"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <CheckCircle size={18} className="text-cyan-500 shrink-0 mt-1" />
                <span className="text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Goals / Achievements */}
        <div className="bg-navy-800/80 border border-slate-700 rounded-2xl p-8 hover:border-yellow-500/30 transition-colors shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400">
              <Trophy size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">このラボで得られるスキル</h2>
          </div>
          <ul className="space-y-5">
            {[
              "OSに依存しない再現性100%の「Docker + CMake」ビルド環境構築",
              "C++の高速コア処理をPythonから一瞬で呼び出す「pybind11」の実装力",
              "Python（Matplotlib等）を用いた、数理アルゴリズムの自動誤差評価（RMSE等）",
              "数百パターンのテストとグラフ生成をコマンド一発で終わらせるパイプライン"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <Terminal size={18} className="text-yellow-500 shrink-0 mt-1" />
                <span className="text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>

      {/* Character Section */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-cyan-400 tracking-wider">CHARACTER</h2>
          <p className="text-slate-400 text-sm mt-1">ラボの登場人物</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-navy-800/50 border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <img src="/images/polar-bear-guide-pointing.png" alt="シロクマ先生" className="w-32 h-32 rounded-full border-4 border-cyan-500 bg-navy-900 mb-6 object-cover shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-transform group-hover:scale-105" />
            <h3 className="text-xl font-bold text-cyan-400 mb-2">シロクマ先生 (Sensei)</h3>
            <p className="text-sm text-cyan-100 italic mb-4">「自動化への投資は、君自身の時間をハックすることなんだよ」</p>
            <p className="text-slate-400 text-sm leading-relaxed">2頭身の愛らしいシロクマ。見た目とは裏腹に、低レイヤ技術、数理アルゴリズム、Linuxインフラ、C++の堅牢な設計に深い造詣を持つ超専門家。</p>
          </div>
          
          <div className="bg-navy-800/50 border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden group hover:border-slate-400/30 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-30"></div>
            <img src="/images/penguin-guide-simple.jpg" alt="ペンギンくん" className="w-32 h-32 rounded-full border-4 border-slate-500 bg-navy-900 mb-6 object-cover shadow-lg transition-transform group-hover:scale-105" />
            <h3 className="text-xl font-bold text-slate-100 mb-2">ペンギンくん (Penguin)</h3>
            <p className="text-sm text-slate-200 italic mb-4">「今日も手作業で定時が過ぎたっス！もっと楽してぇ〜！」</p>
            <p className="text-slate-400 text-sm leading-relaxed">実務でC++コードの手動ビルドや目視評価に日々追われている若手エンジニア。過酷な現場で苦しむ読者の代弁者。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
