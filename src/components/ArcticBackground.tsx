import React from 'react';

export const ArcticBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* 🌌 オーロラ光彩レイヤー（画面上部） */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1600px] h-[550px] rounded-full blur-[100px] opacity-80 bg-gradient-to-r from-cyan-200/40 via-sky-200/35 via-emerald-200/25 to-blue-200/30" />
      {/* サブオーロラ光彩（右上の淡いゆらめき） */}
      <div className="absolute top-20 right-[-10%] w-[700px] h-[400px] rounded-full blur-[90px] opacity-60 bg-gradient-to-br from-emerald-100/40 to-cyan-100/30" />

      {/* 🏔️ 氷山シルエット（背景の幾何学ポリゴン） */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[360px] sm:h-[460px] md:h-[540px] opacity-90"
        viewBox="0 0 1440 400"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="icebergPeak1Auto" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="icebergPeak2Auto" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="icebergBaseAuto" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <polygon
          points="180,400 360,140 460,220 540,170 720,400"
          fill="url(#icebergPeak1Auto)"
          stroke="rgba(56, 189, 248, 0.22)"
          strokeWidth="1.2"
        />
        <polygon points="360,140 460,220 380,400" fill="rgba(224, 242, 254, 0.45)" />

        <polygon
          points="880,400 1080,180 1200,260 1340,400"
          fill="url(#icebergPeak2Auto)"
          stroke="rgba(6, 182, 212, 0.2)"
          strokeWidth="1.2"
        />
        <polygon points="1080,180 1200,260 1140,400" fill="rgba(207, 250, 254, 0.4)" />

        <polygon
          points="-40,400 120,240 240,400"
          fill="url(#icebergPeak1Auto)"
          stroke="rgba(56, 189, 248, 0.18)"
          strokeWidth="1"
        />
        <rect x="0" y="280" width="1440" height="120" fill="url(#icebergBaseAuto)" />
      </svg>

      {/* ❄️ 淡いきらめきドット */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-sky-400/60" />
        <div className="absolute top-1/3 left-[28%] w-1 h-1 rounded-full bg-cyan-400/50" />
        <div className="absolute top-1/5 right-[20%] w-2 h-2 rounded-full blur-[0.5px] bg-emerald-400/50" />
        <div className="absolute top-1/2 right-[12%] w-1.5 h-1.5 rounded-full bg-sky-400/50" />
      </div>
    </div>
  );
};
