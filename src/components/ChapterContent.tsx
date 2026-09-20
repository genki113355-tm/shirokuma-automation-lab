import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Zap } from 'lucide-react';

export default function ChapterContent() {
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

  return (
    <div className="p-8 md:p-12 max-w-[1600px] mx-auto space-y-8 pb-32">
      
      {/* Chapter Title Block (Dynamic via MDX Meta) */}
      <div className="bg-navy-800 border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-3 py-1 rounded text-xs font-bold flex items-center gap-2">
            <Shield size={14} /> Chap {meta.chapterId}
          </span>
          <span className="bg-navy-700 text-slate-300 border border-slate-600 px-3 py-1 rounded text-xs font-medium">
            {meta.category}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          第{meta.chapterId}章：{meta.title}
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          {meta.description}
        </p>

        {meta.responsibility && (
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="text-cyan-500 font-bold">担当領域:</span>
            <span className="text-slate-300">{meta.responsibility}</span>
          </div>
        )}
      </div>

      {/* Highlight Bar (Dynamic via MDX Meta) */}
      {meta.evolution && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
          <Zap size={20} className="text-yellow-400 shrink-0 mt-0.5" />
          <span className="text-yellow-400 font-bold text-sm leading-relaxed">
            演習・進化: {meta.evolution}
          </span>
        </div>
      )}

      {/* Tags (Dynamic via MDX Meta) */}
      {meta.tags && (
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag: string) => (
            <span key={tag} className="bg-navy-700 border border-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-md hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}

      <hr className="border-slate-700/50 my-10" />

      {/* MDX Content Rendered via @tailwindcss/typography */}
      <div className="prose prose-invert prose-cyan max-w-none 
                      prose-headings:text-slate-100 prose-headings:border-b prose-headings:border-cyan-500/20 prose-headings:pb-2 prose-headings:mt-10
                      prose-p:text-slate-300 prose-p:leading-relaxed 
                      prose-li:text-slate-300 prose-strong:text-cyan-300">
        <Content />
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-10">
        {meta.chapterId < 12 ? (
          <Link to={`/chapter/${meta.chapterId + 1}`} className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500 text-cyan-400 font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            第{meta.chapterId + 1}章へ進む →
          </Link>
        ) : (
          <Link to="/" className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500 text-cyan-400 font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            トップページへ戻る
          </Link>
        )}
      </div>
    </div>
  );
}
