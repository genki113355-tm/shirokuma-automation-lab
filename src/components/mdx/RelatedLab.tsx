import { ExternalLink, BookOpen, Layers } from 'lucide-react';

interface RelatedLabProps {
  target: 'cpp' | 'qt' | 'sonar';
  title: string;
  description: string;
  url: string;
  badge?: string;
}

export default function RelatedLab({ target, title, description, url, badge }: RelatedLabProps) {
  const isQt = target === 'qt';
  const isSonar = target === 'sonar';

  const defaultBadge = isQt 
    ? 'シロクマ技術探検隊・第3ステージ（産業GUI/リアルタイム）'
    : isSonar
    ? 'ドメイン応用編（音波・信号処理）'
    : 'シロクマ技術探検隊・第1ステージ（C++コア設計・アルゴリズム）';

  const themeClasses = isQt
    ? {
        border: 'border-emerald-300 hover:border-emerald-400',
        bg: 'from-emerald-50/90 via-teal-50/60 to-white',
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/20',
        icon: 'text-emerald-600',
        shadow: 'hover:shadow-lg',
      }
    : {
        border: 'border-sky-300 hover:border-cyan-400',
        bg: 'from-sky-50/90 via-cyan-50/60 to-white',
        badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
        btnBg: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/20',
        icon: 'text-cyan-600',
        shadow: 'hover:shadow-lg',
      };

  return (
    <div className={`not-prose my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r ${themeClasses.bg} border ${themeClasses.border} shadow-md ${themeClasses.shadow} transition-all relative overflow-hidden group`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${themeClasses.badgeBg}`}>
              <Layers size={12} />
              {badge || defaultBadge}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
            <BookOpen size={18} className={themeClasses.icon} />
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0 max-w-2xl">
            {description}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title}（外部ラボサイト）を開く`}
          className={`shrink-0 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer ${themeClasses.btnBg}`}
        >
          <span>関連ラボで学ぶ</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
