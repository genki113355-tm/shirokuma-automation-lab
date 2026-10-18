import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 py-12 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand & Ecosystem */}
        <div className="space-y-4">
          <h3 className="text-slate-900 font-bold text-base mb-2 flex items-center gap-2">
            <img src="/images/characters/shirokuma_sensei.png" alt="シロクマ先生" className="w-6 h-6 rounded-full object-cover border border-cyan-400/50 inline-block" />
            <span>シロクマ技術学習エコシステム</span>
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            C++開発者のための、基礎から応用・自動化までを網羅する実践的な学習プラットフォーム群です。
          </p>
          <ul className="space-y-2.5 mt-4 text-sm font-medium">
            <li>
              <a href="https://shirokuma-tech.jp/" className="text-slate-900 font-bold hover:text-cyan-700 transition-colors flex items-center gap-2">
                <ExternalLink size={14} className="text-cyan-600" /> シロクマ技術総合ポータル (全ラボ統括)
              </a>
            </li>
            <li>
              <a href="https://shirokuma-tech.jp/cpp/" className="text-slate-700 hover:text-cyan-700 transition-colors flex items-center gap-2">
                <ExternalLink size={14} className="text-cyan-600" /> シロクマC++ラボ (コア設計)
              </a>
            </li>
            <li>
              <a href="https://shirokuma-tech.jp/qt/" className="text-slate-700 hover:text-emerald-700 transition-colors flex items-center gap-2">
                <ExternalLink size={14} className="text-emerald-600" /> シロクマQt×C++ラボ (GUI開発)
              </a>
            </li>
            <li>
              <a href="https://shirokuma-tech.jp/sonar/" className="text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-2">
                <ExternalLink size={14} className="text-blue-600" /> 水中音響・ソナー技術入門 (ドメイン応用)
              </a>
            </li>
            <li>
              <a href="https://shirokuma-tech.jp/nw/" className="text-slate-700 hover:text-sky-700 transition-colors flex items-center gap-2">
                <ExternalLink size={14} className="text-sky-600" /> ネスペ直前対策ナビ (NW高度資格)
              </a>
            </li>
            <li>
              <a href="https://shirokuma-tech.jp/ai-passport/" className="text-slate-700 hover:text-purple-700 transition-colors flex items-center gap-2">
                <ExternalLink size={14} className="text-purple-600" /> AIパスポートラボ (生成AI対策)
              </a>
            </li>
          </ul>
        </div>

        {/* E-E-A-T Info */}
        <div className="space-y-4">
          <h3 className="text-slate-900 font-bold text-base mb-2">運営者情報・監修</h3>
          <div className="text-sm space-y-2 text-slate-600">
            <p><strong className="text-slate-900 font-semibold">運営チーム:</strong> シロクマ技術開発室</p>
            <p><strong className="text-slate-900 font-semibold">専門領域:</strong> 組込みLinux / C++ / Qt / 音響信号処理 (Sonar)</p>
            <p className="leading-relaxed mt-2 text-xs text-slate-500">
              実務経験に基づいた「現場で使える自動化・品質保証」のノウハウを提供しています。
            </p>
          </div>
        </div>

        {/* Legal & Contact */}
        <div className="space-y-4">
          <h3 className="text-slate-900 font-bold text-base mb-2">法的情報・お問い合わせ</h3>
          <ul className="text-sm space-y-2 text-slate-600 font-medium">
            <li><a href="#" className="hover:text-slate-900 transition-colors">プライバシーポリシー</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">免責事項</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">お問い合わせ</a></li>
          </ul>
          <p className="text-xs text-slate-500 mt-6">
            © {new Date().getFullYear()} Shirokuma Auto C++ Lab. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
