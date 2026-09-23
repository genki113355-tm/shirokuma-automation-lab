import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

export interface TermDefinition {
  term: string;
  reading?: string;
  category: 'インフラ' | 'ビルド' | 'テスト' | 'C++言語' | 'アーキテクチャ';
  summary: string;
  detail: string;
}

export const TERM_DICTIONARY: Record<string, TermDefinition> = {
  'CI/CD': {
    term: 'CI/CD',
    reading: 'シーアイ・シーディー',
    category: 'インフラ',
    summary: '継続的インテグレーション／継続的デリバリー',
    detail: 'コードをGitにpushするたびに、クラウド上のサーバーが自動でビルド・テスト・検証を実行し、バグの混入を即座に検知・合否判定する自動化の仕組みです。'
  },
  'CMakeターゲット': {
    term: 'CMakeターゲット',
    reading: 'シーメイクターゲット',
    category: 'ビルド',
    summary: 'ビルドの成果物（実行ファイルやライブラリ）の単位',
    detail: 'CMakeにおいて add_executable や add_library で定義される成果物のこと。コンパイル設定やインクルードパス、依存関係をターゲット単位で安全にカプセル化できます。'
  },
  'Docker multi-stage build': {
    term: 'Docker multi-stage build',
    reading: 'ドッカー マルチステージビルド',
    category: 'インフラ',
    summary: 'ビルド環境と実行環境を分離するコンテナ構築手法',
    detail: '1つのDockerfile内で「重いコンパイラを入れたビルド用コンテナ」と「最小限の実行用コンテナ」を分け、成果物のバイナリだけを転送することで、イメージサイズを数GBから数十MBへ激減させます。'
  },
  'AddressSanitizer': {
    term: 'AddressSanitizer (ASan)',
    reading: 'アドレスサニタイザー',
    category: 'テスト',
    summary: '高速メモリ破壊・不正アクセス検知ツール',
    detail: 'コンパイラ（GCC/Clang）のフラグ -fsanitize=address を有効化すると、配列外アクセスやメモリ解放後の不正参照（Use-After-Free）が発生した瞬間にスタックトレースを出力して停止します。'
  },
  'ASan': {
    term: 'ASan',
    reading: 'エイサン',
    category: 'テスト',
    summary: 'AddressSanitizer の略称',
    detail: 'AddressSanitizer（アドレスサニタイザー）の通称。実行速度低下が約2倍程度と軽微なため、CIパイプラインの自動テストに常時組み込んで運用されます。'
  },
  'pybind11': {
    term: 'pybind11',
    reading: 'パイバインド イレブン',
    category: 'C++言語',
    summary: 'モダンC++とPythonを直結するバインディングライブラリ',
    detail: 'ヘッダファイルのみで構成され、わずか数行のC++コードを書くだけでC++クラスや関数をPythonから直接import可能な共有ライブラリ（.so/.pyd）へ変換できる画期的なツールです。'
  },
  'CTest': {
    term: 'CTest',
    reading: 'シーテスト',
    category: 'テスト',
    summary: 'CMake標準付属のテスト一括自動実行マネージャー',
    detail: '何十個もあるテスト実行ファイルを1つずつ手動で叩く代わりに、ctest コマンド1発で並列実行し、合否サマリーの集計やCI向けJUnitレポート出力を全自動で行います。'
  },
  'GoogleTest': {
    term: 'GoogleTest (gtest)',
    reading: 'グーグルテスト',
    category: 'テスト',
    summary: 'Google社が開発したC++標準の単体テストフレームワーク',
    detail: 'C++コードの内部でTESTマクロやアサーション（EXPECT_EQなど）を使い、クラスや関数の境界値・例外動作をネイティブの超高速スピードで検証する単体テストの業界標準です。'
  },
  'EXPECT_NEAR': {
    term: 'EXPECT_NEAR',
    reading: 'エクススペクト ニア',
    category: 'テスト',
    summary: '浮動小数点の許容誤差つき比較マクロ',
    detail: 'doubleやfloatの計算結果は2進数表現による微小な丸め誤差が出るため、完全一致（EXPECT_EQ）ではなく、第3引数に許容誤差（例: 0.01）を指定して合否判定します。'
  },
  'フィクスチャ': {
    term: 'フィクスチャ (TEST_F)',
    reading: 'フィクスチャ',
    category: 'テスト',
    summary: 'テスト共通の初期化・後処理をまとめるクラス設計',
    detail: '複数のテストケースで共通して使うインスタンスの生成（SetUp）や解放（TearDown）を1つのクラスに集約し、テストコードの重複を排除して可読性を高める仕組みです。'
  },
  'Valgrind': {
    term: 'Valgrind',
    reading: 'ヴァルグリンド',
    category: 'テスト',
    summary: 'プログラムの動的メモリエラー・リーク解析ツール',
    detail: 'プログラムを実行しながらメモリの確保（new/malloc）と解放（delete/free）を1バイト単位でエミュレーション追跡し、目視では発見不可能なメモリリークを特定します。'
  },
  'ゼロコピー': {
    term: 'ゼロコピー (Zero-Copy)',
    reading: 'ゼロコピー',
    category: 'アーキテクチャ',
    summary: 'メモリの無駄な複製を行わない高速メモリアクセス設計',
    detail: 'PythonのNumPy配列とC++の間でデータをコピー（複製）せず、同じ物理メモリアドレスのポインタを直接参照することで、数万件の波形データでも遅延0で処理する設計です。'
  },
  'HILシミュレーション': {
    term: 'HILシミュレーション (HIL)',
    reading: 'ヒールシミュレーション',
    category: 'アーキテクチャ',
    summary: 'Hardware-in-the-Loop（実機模擬結合テスト）',
    detail: '本物のソナーやセンサー、ECUなどのハードウェアが手元になくても、PC上でUDP通信パケット等を模擬送信してC++制御ロジックの結合テストを全自動化する手法です。'
  },
  '共有ライブラリ': {
    term: '共有ライブラリ (.so / .dll)',
    reading: 'きょうゆうライブラリ',
    category: 'C++言語',
    summary: '実行時に複数のプログラムから呼び出せる動的ライブラリ',
    detail: 'Linuxでは .so（Shared Object）、Windowsでは .dll と呼ばれる形式。Pythonなどの外部言語からC++のバイナリ関数をロードして高速実行するために必須となります。'
  },
  'セグフォ': {
    term: 'セグフォ (Segmentation Fault)',
    reading: 'セグフォ',
    category: 'C++言語',
    summary: '不正なメモリアクセスによる強制終了エラー',
    detail: 'ヌルポインタの参照や解放済みメモリへのアクセス、配列外アクセスなど、OSから許可されていないメモリ領域を読み書きしようとした瞬間にOSがプロセスを強制停止するエラーです。'
  },
  'メモリリーク': {
    term: 'メモリリーク',
    reading: 'メモリリーク',
    category: 'C++言語',
    summary: 'new で確保したメモリの解放忘れバグ',
    detail: 'ヒープ領域に確保したメモリを delete せずに放置すると、プログラムが終了するまでメモリを占有し続け、長時間稼働するサーバーや組み込み機器がメモリ枯渇で突然クラッシュします。'
  }
};

interface TermTooltipProps {
  name: string;
  children?: React.ReactNode;
}

export default function TermTooltip({ name, children }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const def = TERM_DICTIONARY[name] || {
    term: name,
    category: 'C++言語',
    summary: '専門用語解説',
    detail: `${name} の詳細解説です。`
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
        popupRef.current && !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const categoryColors: Record<string, string> = {
    'インフラ': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    'ビルド': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    'テスト': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    'C++言語': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    'アーキテクチャ': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  };

  return (
    <span className="relative inline-block" ref={triggerRef}>
      <span
        onClick={() => setIsOpen(prev => !prev)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-help inline-flex items-center gap-0.5 text-cyan-300 font-semibold underline decoration-dotted decoration-cyan-400/80 hover:text-cyan-200 hover:decoration-cyan-300 transition-colors"
        title={def.summary}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(prev => !prev);
          }
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {children || name}
        <HelpCircle size={12} className="text-cyan-400/80 inline shrink-0 ml-0.5" />
      </span>

      {/* Floating Tooltip Bubble */}
      {isOpen && (
        <div
          ref={popupRef}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-[#0b1322] border border-cyan-500/50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 text-left animate-fade-in pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-700/80">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white tracking-wide">
                {def.term}
              </span>
              {def.reading && (
                <span className="text-[10px] text-slate-400 font-mono">
                  ({def.reading})
                </span>
              )}
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${categoryColors[def.category] || categoryColors['C++言語']}`}>
              {def.category}
            </span>
          </div>

          {/* Summary */}
          <div className="text-xs font-bold text-cyan-300 mb-1 leading-snug">
            {def.summary}
          </div>

          {/* Detailed explanation */}
          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed m-0">
            {def.detail}
          </p>

          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#0b1322]" />
        </div>
      )}
    </span>
  );
}
