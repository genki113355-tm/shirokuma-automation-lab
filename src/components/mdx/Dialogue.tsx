import React from 'react';

interface DialogueProps {
  character: 'shirokuma' | 'penguin';
  title: string;
  children: React.ReactNode;
}

export default function Dialogue({ character, title, children }: DialogueProps) {
  const isPenguin = character === 'penguin';
  
  const avatarSrc = isPenguin ? "/images/penguin-guide-simple.jpg" : "/images/polar-bear-guide.png";
  
  // キャラクターごとのテーマカラー
  const borderColor = isPenguin ? "border-slate-500/60" : "border-cyan-500/60";
  const titleColor = isPenguin ? "text-slate-300" : "text-cyan-400";
  
  return (
    <div className={`flex items-start gap-5 my-10 not-prose ${isPenguin ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* アバター画像 */}
      <div className="w-16 h-16 shrink-0 mt-2 relative z-10">
        <img 
          src={avatarSrc} 
          alt={character} 
          className="w-full h-full object-cover rounded-full shadow-[0_0_15px_rgba(0,0,0,0.4)] border-2 border-navy-900" 
        />
      </div>

      {/* 吹き出し本体 */}
      <div className={`relative flex-1 bg-[#1e2a3b] border ${borderColor} rounded-xl p-5 shadow-lg`}>
        
        {/* 吹き出しのしっぽ（三角） */}
        <div className={`absolute top-7 w-4 h-4 bg-[#1e2a3b] transform rotate-45 ${
          isPenguin 
            ? '-right-2 border-t border-r ' + borderColor // 右向き（ペンギン）
            : '-left-2 border-b border-l ' + borderColor  // 左向き（シロクマ）
        }`}></div>
        
        {/* テキストコンテンツ */}
        <div className="relative z-10">
          <h4 className={`text-xs font-bold mb-2 ${titleColor}`}>{title}</h4>
          <div className="text-sm text-slate-100 leading-relaxed font-medium">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
