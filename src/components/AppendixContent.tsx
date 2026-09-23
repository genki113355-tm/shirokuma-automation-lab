import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Zap, ArrowLeft, Terminal, Home } from 'lucide-react';
import { useLab } from '../contexts/LabContext';

export default function AppendixContent() {
  const { openLab } = useLab();
  const { id } = useParams();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    import(`../content/appendix/${id}.mdx`)
      .then((m) => {
        setModule(m);
        setLoading(false);
        if (m.meta?.title) {
          document.title = `${m.meta.title} | シロクマ C++開発自動化ラボ`;
        }
      })
      .catch((err) => {
        console.error(err);
        setModule(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-cyan-400 font-mono">Loading Appendix {id}...</div>;
  if (!module) return <div className="p-8 text-red-400 font-bold">Error: Appendix '{id}' not found. MDX content is missing.</div>;

  const Content = module.default;
  const { meta } = module;

  if (!meta) return <div className="p-8 text-red-500">Error: Metadata (export const meta) not found in Appendix '{id}'.</div>;

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

  const isCTest = id === 'ctest';
  const relatedChapter = isCTest ? 3 : 4;
  const relatedChapterName = isCTest ? '第3章（CMake/CTest統合）' : '第4章（GoogleTest網羅テスト）';
  const otherAppendix = isCTest
    ? { path: '/appendix/googletest', label: '【付録1】GoogleTest 逆引きリファレンスを見る ➔' }
    : { path: '/appendix/ctest', label: '【付録2】CTest 逆引きリファレンスを見る ➔' };

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 pb-32">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <Link to="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
          <Home size={13} /> TOP
        </Link>
        <span>/</span>
        <span className="text-slate-500">付録・逆引きリファレンス</span>
        <span>/</span>
        <span className="text-cyan-300 font-bold">{meta.title}</span>
      </nav>

      {/* Appendix Title Block */}
      <div className="bg-navy-800 border border-cyan-500/20 rounded-xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2.5 sm:px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5">
            <BookOpen size={14} /> 付録リファレンス
          </span>
          <span className="bg-navy-700 text-slate-300 border border-slate-600 px-2.5 sm:px-3 py-1 rounded text-xs font-medium">
            {meta.category}
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight tracking-tight">
          {meta.title}
        </h1>
        
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl mb-4">
          {meta.description}
        </p>

        {meta.responsibility && (
          <div className="text-xs sm:text-sm font-mono text-cyan-400 border-l-2 border-cyan-400 pl-3 py-0.5">
            <span className="font-bold">テーマ: </span>
            <span className="text-slate-300">{meta.responsibility}</span>
          </div>
        )}
      </div>

      {/* Highlight Bar */}
      {meta.evolution && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3.5 sm:p-4 flex items-start gap-3">
          <Zap size={20} className="text-yellow-400 shrink-0 mt-0.5" />
          <span className="text-yellow-400 font-bold text-xs sm:text-sm leading-relaxed">
            {meta.evolution}
          </span>
        </div>
      )}

      {/* Tags & Sister Appendix Link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {meta.tags && (
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag: string) => (
              <span key={tag} className="bg-navy-700 border border-slate-600 text-slate-300 text-xs px-2.5 sm:px-3 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={otherAppendix.path}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 rounded-lg"
        >
          {otherAppendix.label}
        </Link>
      </div>

      <hr className="border-slate-700/50 my-6 sm:my-10" />

      {/* MDX Content */}
      <div className="prose prose-invert prose-cyan max-w-none overflow-x-hidden break-words
                      prose-headings:text-slate-100 prose-headings:border-b prose-headings:border-cyan-500/20 prose-headings:pb-2 prose-headings:mt-8 sm:prose-headings:mt-10
                      prose-p:text-slate-300 prose-p:leading-relaxed 
                      prose-pre:overflow-x-auto prose-pre:max-w-full
                      prose-blockquote:not-italic prose-blockquote:quotes-none
                      prose-li:text-slate-300 prose-strong:text-cyan-300">
        <Content components={mdxComponents} />
      </div>

      {/* Bottom Navigation & Related Links */}
      <div className="pt-8 sm:pt-12 space-y-6">
        <div className="bg-gradient-to-r from-navy-800 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
              🚀 実践ハンズオン＆本編へ
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Zap className="text-cyan-400" size={24} /> 
              リファレンスで構文を確認したら、実際に動かしてみよう！
            </h4>
            <p className="text-sm text-slate-300 max-w-xl">
              {isCTest
                ? '第3章ではCMakeとCTestによるビルド＆テスト統合の基本を解説。コード実行ラボではブラウザ上でMakefile自動生成からCTest一括実行までを直接体験できます。'
                : '第4章ではGoogleTestによるC++単体テストの基礎を解説。コード実行ラボではブラウザ上でGoogleTestバイナリの実行やCTest連携を直接体験できます。'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              to={`/chapter/${relatedChapter}`}
              className="bg-navy-700 hover:bg-navy-600 text-white font-bold px-5 py-3 rounded-xl border border-cyan-500/30 flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft size={16} /> {relatedChapterName}に戻る
            </Link>
            <button
              onClick={() => openLab(relatedChapter)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
            >
              <Terminal size={16} /> 第{relatedChapter}章ミッションを開く
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
