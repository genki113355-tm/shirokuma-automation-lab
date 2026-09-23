import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Zap, Play } from 'lucide-react';
import { useLab } from '../contexts/LabContext';

export default function ChapterContent() {
  const { openLab } = useLab();
  const { id } = useParams();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    import(`../content/chap${id}.mdx`)
      .then((m) => {
        setModule(m);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setModule(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-cyan-400">Loading Chapter {id}...</div>;
  if (!module) return <div className="p-8 text-red-400 font-bold">Error: Chapter {id} not found. MDX content is missing.</div>;

  const Content = module.default;
  const { meta } = module;

  if (!meta) return <div className="p-8 text-red-500">Error: Metadata (export const meta) not found in Chapter {id}.</div>;

  const mdxComponents = {
    table: (props: any) => (
      <div className="not-prose overflow-x-auto my-6 border border-slate-700/80 rounded-xl shadow-lg bg-navy-900/80">
        <table className="w-full border-collapse text-left text-xs sm:text-sm m-0" {...props} />
      </div>
    ),
    thead: (props: any) => (
      <thead className="bg-navy-950/90 border-b border-slate-700 text-cyan-300 font-semibold" {...props} />
    ),
    th: (props: any) => (
      <th className="p-3.5 text-cyan-300 font-bold border-b border-slate-700 whitespace-nowrap" {...props} />
    ),
    td: (props: any) => (
      <td className="p-3.5 border-b border-slate-800/80 text-slate-300 align-top leading-relaxed" {...props} />
    ),
    tr: (props: any) => (
      <tr className="hover:bg-cyan-500/5 transition-colors border-b border-slate-800/60 last:border-b-0" {...props} />
    ),
    blockquote: (props: any) => (
      <blockquote className="not-prose block border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-950/40 to-navy-900/60 px-5 py-4 rounded-r-xl my-6 text-slate-200 text-sm sm:text-base leading-relaxed shadow-md [&>p]:m-0 [&>p+p]:mt-2" {...props} />
    ),
  };

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 pb-32">
      
      {/* Chapter Title Block (Dynamic via MDX Meta) */}
      <div className="bg-navy-800 border border-cyan-500/20 rounded-xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2.5 sm:px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5">
            <Shield size={14} /> Chap {meta.chapterId}
          </span>
          <span className="bg-navy-700 text-slate-300 border border-slate-600 px-2.5 sm:px-3 py-1 rounded text-xs font-medium">
            {meta.category}
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight tracking-tight">
          第{meta.chapterId}章：{meta.title}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {meta.description}
        </p>

        {meta.responsibility && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-cyan-500 font-bold">担当領域:</span>
            <span className="text-slate-300">{meta.responsibility}</span>
          </div>
        )}
      </div>

      {/* Highlight Bar (Dynamic via MDX Meta) */}
      {meta.evolution && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3.5 sm:p-4 flex items-start gap-3">
          <Zap size={20} className="text-yellow-400 shrink-0 mt-0.5" />
          <span className="text-yellow-400 font-bold text-xs sm:text-sm leading-relaxed">
            演習・進化: {meta.evolution}
          </span>
        </div>
      )}

      {/* Tags (Dynamic via MDX Meta) */}
      {meta.tags && (
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag: string) => (
            <span key={tag} className="bg-navy-700 border border-slate-600 text-slate-300 text-xs px-2.5 sm:px-3 py-1 rounded-md hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}

      <hr className="border-slate-700/50 my-6 sm:my-10" />

      {/* MDX Content Rendered via @tailwindcss/typography */}
      <div className="prose prose-invert prose-cyan max-w-none overflow-x-hidden break-words
                      prose-headings:text-slate-100 prose-headings:border-b prose-headings:border-cyan-500/20 prose-headings:pb-2 prose-headings:mt-8 sm:prose-headings:mt-10
                      prose-p:text-slate-300 prose-p:leading-relaxed 
                      prose-pre:overflow-x-auto prose-pre:max-w-full
                      prose-blockquote:not-italic prose-blockquote:quotes-none
                      prose-li:text-slate-300 prose-strong:text-cyan-300">
        <Content components={mdxComponents} />
      </div>

      {/* Action Button & Next Stage Baton Pass */}
      <div className="pt-6 sm:pt-10 space-y-6">

        {/* ▶ 課題解決ミッション（CodeLab）への導線 */}
        {(() => {
          const chapterMissions: Record<number, { title: string; desc: string; buttonText: string }> = {
            1: {
              title: '【第1章 実践ミッション】Python×C++ 自動テスト連携を体験！',
              desc: '第1章で学んだ「C++の共有ライブラリ化」と「pytestによる一括検証」の全自動サイクルを、ブラウザ上で実際にコマンド入力して体験できます。',
              buttonText: '第1章のミッションに挑戦する',
            },
            2: {
              title: '【第2章 実践ミッション】Dockerで「私のPCでは動いた」を撲滅！',
              desc: 'Dockerfileの設計図確認からイメージのビルド、使い捨て隔離コンテナ内部でのテスト完走までをブラウザ上で体験できます。',
              buttonText: '第2章のミッションに挑戦する',
            },
            3: {
              title: '【第3章 実践ミッション】CMakeビルド自動化＆CTest一括テスト！',
              desc: '手書きMakefileの苦行から解放！CMakeLists.txtによるMakefile自動生成とCTestによる一括並列テストをブラウザ上で体験できます。',
              buttonText: '第3章のミッションに挑戦する',
            },
            9: {
              title: '【第9章 実践ミッション】Valgrindで見えないメモリリークを特定！',
              desc: 'deleteし忘れたC++プログラムを動的解析ツールValgrindにかけ、1バイト単位でメモリ漏れをあぶり出すデバッグ体験ができます。',
              buttonText: '第9章のミッションに挑戦する',
            },
          };

          const currentMission = chapterMissions[meta.chapterId];

          return (
            <div className="bg-gradient-to-r from-navy-800 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {currentMission ? `🎯 第${meta.chapterId}章 実践ハンズオン` : '🎯 コード実行ラボ（ハンズオン演習）'}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                  <Zap className="text-cyan-400" size={24} /> 
                  {currentMission ? currentMission.title : 'コード実行ラボで実際のC++自動化を体験しよう！'}
                </h4>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {currentMission ? currentMission.desc : 'ブラウザ上のコード実行ラボで、【第1章：テスト自動化】【第2章：Docker】【第3章：CMake/CTest】【第9章：メモリ解析】の実践ミッションを体験できます。'}
                </p>
              </div>
              <button
                onClick={() => openLab(currentMission ? meta.chapterId : 1)}
                className="w-full md:w-auto shrink-0 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-8 py-4 rounded-xl flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all hover:-translate-y-1 relative z-10 cursor-pointer"
              >
                <Play size={20} fill="currentColor" />
                {currentMission ? currentMission.buttonText : '実践ミッションを開く（第1・2・3・9章）'}
              </button>
            </div>
          );
        })()}

        {meta.chapterId === 12 && (
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-navy-900 to-[#062016] border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl relative overflow-hidden mt-8">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-2 text-center md:text-left relative z-10">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-emerald-300 font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40">NEXT STAGE 🖥️</span>
                <span>シロクマ技術探検隊・第3ステージ</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white">
                CI/CD環境を整えたら、次は【Qt×C++ラボ】で産業GUIを作る！
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                車載・産業機器のLinux環境で絶対にフリーズしないマルチスレッド設計と、リアルタイム波形描画・60fps計器ダッシュボード構築を完全習得。
              </p>
            </div>
            <a
              href="https://shirokuma-qt-cpp.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm whitespace-nowrap shadow-xl hover:shadow-emerald-500/25 transition transform hover:scale-105 active:scale-95 flex items-center gap-2 flex-shrink-0 relative z-10"
            >
              <span>Qt×C++ラボへ進む</span>
              <span>➡️</span>
            </a>
          </div>
        )}

        <div className="flex justify-between items-center flex-wrap gap-4 mt-8">
          <Link to="/" className="text-slate-400 hover:text-cyan-400 text-sm font-mono flex items-center gap-1 transition-colors">
            ⬅ 全章カリキュラム目次へ
          </Link>
          {meta.chapterId < 12 ? (
            <Link to={`/chapter/${meta.chapterId + 1}`} className="w-full sm:w-auto justify-center bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500 text-cyan-400 font-bold px-6 sm:px-8 py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              第{meta.chapterId + 1}章へ進む ➡
            </Link>
          ) : (
            <Link to="/" className="w-full sm:w-auto justify-center bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500 text-cyan-400 font-bold px-6 sm:px-8 py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🎉 全12章修了（トップへ）
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
