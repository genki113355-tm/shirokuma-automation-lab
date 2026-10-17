
interface DialogueProps {
  character: 'shirokuma' | 'penguin';
  title: string;
  children: React.ReactNode;
}

export default function Dialogue({ character, title, children }: DialogueProps) {
  const isPenguin = character === 'penguin';
  
  const avatarSrc = isPenguin ? "/images/penguin-guide-simple.jpg" : "/images/polar-bear-guide.png";
  
  // キャラクターごとのテーマカラー
  const borderColor = isPenguin ? "border-slate-300" : "border-cyan-400/80";
  const titleColor = isPenguin ? "text-slate-700 font-bold" : "text-cyan-800 font-bold";
  const avatarBorder = isPenguin ? "border-slate-300" : "border-cyan-400";
  
  return (
    <div className={`flex items-start gap-4 sm:gap-5 my-8 sm:my-10 not-prose ${isPenguin ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* アバター画像 */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 mt-1 relative z-10">
        <img 
          src={avatarSrc} 
          alt={character} 
          className={`w-full h-full object-cover rounded-full shadow-md border-2 ${avatarBorder} bg-white`} 
        />
      </div>

      {/* 吹き出し本体 */}
      <div className={`relative flex-1 bg-white border-2 ${borderColor} rounded-xl p-4 sm:p-5 shadow-sm`}>
        
        {/* 吹き出しのしっぽ（三角） */}
        <div className={`absolute top-6 w-3.5 h-3.5 bg-white transform rotate-45 ${
          isPenguin 
            ? '-right-[8px] border-t-2 border-r-2 ' + borderColor // 右向き（ペンギン）
            : '-left-[8px] border-b-2 border-l-2 ' + borderColor  // 左向き（シロクマ）
        }`}></div>
        
        {/* テキストコンテンツ */}
        <div className="relative z-10">
          <h4 className={`text-xs mb-1.5 flex items-center gap-1.5 ${titleColor}`}>{title}</h4>
          <div className="text-sm text-slate-800 leading-relaxed font-normal">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
