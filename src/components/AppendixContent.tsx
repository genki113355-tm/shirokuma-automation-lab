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

  if (loading) return <div className="p-8 text-cyan-800 font-bold font-mono">Loading Appendix {id}...</div>;
  if (!module) return <div className="p-8 text-red-400 font-bold">Error: Appendix '{id}' not found. MDX content is missing.</div>;

  const Content = module.default;
  const { meta } = module;

  if (!meta) return <div className="p-8 text-red-500">Error: Metadata (export const meta) not found in Appendix '{id}'.</div>;

  const mdxComponents = {
    table: (props: any) => (
      <div className="not-prose overflow-x-auto my-6 border border-slate-200 rounded-xl shadow-sm bg-white">
        <table className="w-full border-collapse text-left text-xs sm:text-sm m-0" {...props} />
      </div>
    ),
    thead: (props: any) => (
      <thead className="bg-slate-100 border-b border-slate-200 text-slate-900 font-bold" {...props} />
    ),
    th: (props: any) => (
      <th className="p-3.5 text-slate-900 font-bold border-b border-slate-200 whitespace-nowrap" {...props} />
    ),
    td: (props: any) => (
      <td className="p-3.5 border-b border-slate-100 text-slate-700 align-top leading-relaxed" {...props} />
    ),
    tr: (props: any) => (
      <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0" {...props} />
    ),
    blockquote: (props: any) => (
      <blockquote className="not-prose block border-l-4 border-cyan-500 bg-sky-50/80 px-5 py-4 rounded-r-xl my-6 text-slate-800 text-sm sm:text-base leading-relaxed shadow-sm [&>p]:m-0 [&>p+p]:mt-2" {...props} />
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
      <nav className="flex items-center gap-2 text-xs text-slate-600 font-mono">
        <Link to="/" className="hover:text-cyan-700 transition-colors flex items-center gap-1 font-medium">
          <Home size={13} /> TOP
        </Link>
        <span>/</span>
        <span className="text-slate-500">付録・逆引きリファレンス</span>
        <span>/</span>
        <span className="text-cyan-900 font-bold">{meta.title}</span>
      </nav>

      {/* Appendix Title Block */}
      <div className="bg-white/95 border border-sky-200/80 rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="bg-cyan-100 text-cyan-900 border border-cyan-300 px-2.5 sm:px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <BookOpen size={14} className="text-cyan-700" /> 付録リファレンス
          </span>
          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 sm:px-3 py-1 rounded text-xs font-medium">
            {meta.category}
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
          {meta.title}
        </h1>
        
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl mb-4">
          {meta.description}
        </p>

        {meta.responsibility && (
          <div className="text-xs sm:text-sm font-mono text-cyan-800 border-l-2 border-cyan-500 pl-3 py-0.5 font-medium">
            <span className="font-bold">テーマ: </span>
            <span className="text-slate-700">{meta.responsibility}</span>
          </div>
        )}
      </div>

      {/* Highlight Bar */}
      {meta.evolution && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
          <Zap size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <span className="text-amber-900 font-bold text-xs sm:text-sm leading-relaxed">
            {meta.evolution}
          </span>
        </div>
      )}

      {/* Tags & Sister Appendix Link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {meta.tags && (
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag: string) => (
              <span key={tag} className="bg-slate-100 border border-slate-200 text-slate-700 text-xs px-2.5 sm:px-3 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={otherAppendix.path}
          aria-label={otherAppendix.label}
          className="text-xs font-bold text-cyan-900 hover:text-cyan-700 hover:underline flex items-center gap-1 bg-cyan-100 border border-cyan-300 px-3 py-1.5 rounded-lg shadow-xs"
        >
          {otherAppendix.label}
        </Link>
      </div>

      <hr className="border-slate-200 my-6 sm:my-10" />

      {/* MDX Content */}
      <div className="prose prose-slate max-w-none overflow-x-hidden break-words
                      prose-headings:text-slate-900 prose-headings:font-bold prose-headings:border-b prose-headings:border-sky-200/80 prose-headings:pb-2 prose-headings:mt-8 sm:prose-headings:mt-10
                      prose-p:text-slate-700 prose-p:leading-relaxed 
                      prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:bg-[#0d1117] prose-pre:text-slate-100
                      prose-blockquote:not-italic prose-blockquote:quotes-none
                      prose-li:text-slate-700 prose-strong:text-cyan-900 prose-strong:font-bold
                      prose-code:text-cyan-900 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-slate-200 prose-code:before:content-none prose-code:after:content-none
                      prose-a:text-cyan-700 hover:prose-a:text-cyan-800 prose-a:font-semibold">
        <Content components={mdxComponents} />
      </div>

      {/* Bottom Navigation & Related Links */}
      <div className="pt-8 sm:pt-12 space-y-6">
        <div className="bg-gradient-to-r from-sky-50 via-cyan-50 to-white border border-sky-300 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-cyan-100 text-cyan-900 border border-cyan-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
              🚀 実践ハンズオン＆本編へ
            </span>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <Zap className="text-cyan-600" size={24} /> 
              リファレンスで構文を確認したら、実際に動かしてみよう！
            </h4>
            <p className="text-sm text-slate-700 max-w-xl">
              {isCTest
                ? '第3章ではCMakeとCTestによるビルド＆テスト統合の基本を解説。コード実行ラボではブラウザ上でMakefile自動生成からCTest一括実行までを直接体験できます。'
                : '第4章ではGoogleTestによるC++単体テストの基礎を解説。コード実行ラボではブラウザ上でGoogleTestバイナリの実行やCTest連携を直接体験できます。'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              to={`/chapter/${relatedChapter}`}
              aria-label={`${relatedChapterName}に戻る`}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl border border-slate-300 flex items-center justify-center gap-2 text-sm transition-colors shadow-xs"
            >
              <ArrowLeft size={16} /> {relatedChapterName}に戻る
            </Link>
            <button
              onClick={() => openLab(relatedChapter)}
              aria-label={`第${relatedChapter}章のコード実行ラボミッションを開く`}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
            >
              <Terminal size={16} /> 第{relatedChapter}章ミッションを開く
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
