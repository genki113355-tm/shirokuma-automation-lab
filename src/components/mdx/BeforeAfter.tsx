import { AlertTriangle, Lightbulb } from 'lucide-react';

interface BeforeAfterProps {
  beforeTitle?: string;
  beforeText: string;
  afterTitle?: string;
  afterText: string;
}

export default function BeforeAfter({ beforeTitle, beforeText, afterTitle, afterText }: BeforeAfterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 sm:my-10 not-prose">
      <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
        <h3 className="text-rose-900 font-bold text-sm mb-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-rose-600 shrink-0" /> {beforeTitle || '[Before] 現場での苦しみ'}
        </h3>
        <p className="text-slate-700 text-sm leading-relaxed">{beforeText}</p>
      </div>
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
        <h3 className="text-emerald-900 font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb size={16} className="text-emerald-600 shrink-0" /> {afterTitle || '[After] 身につく自動化・設計力'}
        </h3>
        <p className="text-slate-700 text-sm leading-relaxed">{afterText}</p>
      </div>
    </div>
  );
}
