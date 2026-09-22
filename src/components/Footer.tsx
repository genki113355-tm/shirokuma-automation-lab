import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-slate-800 text-slate-400 py-12 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand & Ecosystem */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg mb-2">🐻‍❄️ シロクマ技術学習エコシステム</h3>
          <p className="text-sm leading-relaxed">
            C++開発者のための、基礎から応用・自動化までを網羅する実践的な学習プラットフォーム群です。
          </p>
          <ul className="space-y-2 mt-4 text-sm">
            <li>
              <a href="https://www.shirokuma-cpp.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                <ExternalLink size={14} /> シロクマC++ラボ (コア設計)
              </a>
            </li>
            <li>
              <a href="https://shirokuma-qt-cpp.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                <ExternalLink size={14} /> シロクマQt×C++ラボ (GUI開発)
              </a>
            </li>
            <li>
              <a href="https://sonar-guide.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <ExternalLink size={14} /> 水中音響・ソナー技術入門 (ドメイン応用)
              </a>
            </li>
          </ul>
        </div>

        {/* E-E-A-T Info */}
        <div className="space-y-4">
          <h3 className="text-white font-bold mb-2">運営者情報・監修</h3>
          <div className="text-sm space-y-2">
            <p><strong className="text-slate-300">運営チーム:</strong> シロクマ技術開発室</p>
            <p><strong className="text-slate-300">専門領域:</strong> 組込みLinux / C++ / Qt / 音響信号処理 (Sonar)</p>
            <p className="leading-relaxed mt-2 text-xs">
              実務経験に基づいた「現場で使える自動化・品質保証」のノウハウを提供しています。
            </p>
          </div>
        </div>

        {/* Legal & Contact */}
        <div className="space-y-4">
          <h3 className="text-white font-bold mb-2">法的情報・お問い合わせ</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
            <li><a href="#" className="hover:text-white transition-colors">免責事項</a></li>
            <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
          </ul>
          <p className="text-xs mt-6">
            © {new Date().getFullYear()} Shirokuma Auto C++ Lab. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
