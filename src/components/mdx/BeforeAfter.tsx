import { AlertTriangle, Lightbulb } from 'lucide-react';

interface BeforeAfterProps {
  beforeTitle?: string;
  beforeText: string;
  afterTitle?: string;
  afterText: string;
}

export default function BeforeAfter({ beforeTitle, beforeText, afterTitle, afterText }: BeforeAfterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 not-prose">
      <div className="bg-navy-800 border border-red-500/30 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
        <h3 className="text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
          <AlertTriangle size={16} /> {beforeTitle || '[Before] 現場での苦しみ'}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">{beforeText}</p>
      </div>
      <div className="bg-navy-800 border border-yellow-500/30 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/50"></div>
        <h3 className="text-yellow-400 font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb size={16} /> {afterTitle || '[After] 身につく設計力'}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">{afterText}</p>
      </div>
    </div>
  );
}
