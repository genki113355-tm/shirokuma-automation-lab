import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Zap, Play, GitBranch, FolderGit2, ExternalLink, CheckSquare, BookOpen } from 'lucide-react';
import { useLab } from '../contexts/LabContext';
import TermTooltip from './TermTooltip';
import RelatedLab from './mdx/RelatedLab';

interface PrerequisiteItem {
  label: string;
  term?: string;
}

const PREREQUISITES_MAP: Record<number, { title: string; items: PrerequisiteItem[] }> = {
  1: {
    title: '第1章で必要な前提知識',
    items: [
      { label: 'C++の基本的な関数・クラス定義（ヘッダと実装の分離）' },
      { label: 'ターミナル（Linux/macOS/WSL）での基本コマンド（ls, cd, cat）' },
      { label: 'Pythonの基本文法とテストの概念（import, assert）' }
    ]
  },
  2: {
    title: '第2章で必要な前提知識',
    items: [
      { label: 'Linuxの基本ファイルシステム構造（/app, /usr, /var など）' },
      { label: 'コンパイラ（g++）がソースをバイナリに変換する流れ' },
      { label: 'Dockerの基本概念（Dockerfile ➔ イメージ ➔ コンテナ）', term: 'Docker multi-stage build' }
    ]
  },
  3: {
    title: '第3章で必要な前提知識',
    items: [
      { label: 'Makefileにおけるターゲットと依存関係の基本役割' },
      { label: '静的ライブラリ（.a）と実行可能バイナリの違い', term: 'CMakeターゲット' },
      { label: 'CMakeLists.txt によるビルド自動生成の考え方', term: 'CTest' }
    ]
  },
  4: {
    title: '第4章で必要な前提知識',
    items: [
      { label: '単体テスト（Unit Test）による関数入出力の自動検証', term: 'GoogleTest' },
      { label: '浮動小数点数（float/double）の2進数丸め誤差の性質', term: 'EXPECT_NEAR' },
      { label: 'テストの共通初期化処理をカプセル化する設計', term: 'フィクスチャ' }
    ]
  },
  5: {
    title: '第5章で必要な前提知識',
    items: [
      { label: 'C++の共有ライブラリ（.so / .pyd）と動的ロードの仕組み', term: '共有ライブラリ' },
      { label: 'Pythonから外部C/C++モジュールを直接importする流れ', term: 'pybind11' },
      { label: 'C++クラスとPythonオブジェクトの型変換バインディング' }
    ]
  },
  6: {
    title: '第6章で必要な前提知識',
    items: [
      { label: 'NumPy配列（ndarray）のメモリ連続性とバッファプロトコル' },
      { label: 'C++ポインタとNumPy配列のゼロコピーデータ共有', term: 'ゼロコピー' },
      { label: 'テスト用信号波形データ（正弦波・ノイズ）の配列生成' }
    ]
  },
  7: {
    title: '第7章で必要な前提知識',
    items: [
      { label: 'pytestのパラメタライズテスト（@pytest.mark.parametrize）' },
      { label: 'Matplotlibを用いた波形比較グラフの画像保存（savefig）' },
      { label: '自動テスト合否判定とグラフ画像レポートの同時出力' }
    ]
  },
  8: {
    title: '第8章で必要な前提知識',
    items: [
      { label: 'Bashシェルスクリプトの基本構文（変数、if文、終了ステータス $?）' },
      { label: '標準出力・標準エラー出力のリダイレクト（> / 2>&1）とパイプ（|）' },
      { label: '複数テストコマンドのシーケンス実行とエラー時の安全停止（set -e）' }
    ]
  },
  9: {
    title: '第9章で必要な前提知識',
    items: [
      { label: 'ヒープメモリの動的確保（new / malloc）と解放（delete / free）', term: 'メモリリーク' },
      { label: '不正メモリアクセスによるセグフォの発生要因', term: 'セグフォ' },
      { label: 'AddressSanitizer (ASan) と Valgrind の役割と使い分け', term: 'AddressSanitizer' }
    ]
  },
  10: {
    title: '第10章で必要な前提知識',
    items: [
      { label: 'Gitの基本操作（git commit, git push, ブランチ運用）' },
      { label: 'GitHub ActionsのワークフローYAML構文（on, jobs, steps）' },
      { label: 'クラウド上でビルドとテストを全自動実行するCIゲートウェイ', term: 'CI/CD' }
    ]
  },
  11: {
    title: '第11章で必要な前提知識',
    items: [
      { label: 'ネットワーク通信の基礎（UDPソケット、ポート番号、パケット送受信）' },
      { label: '実機ハードウェアを模擬するHILシミュレーションの目的', term: 'HILシミュレーション' },
      { label: 'C++受信サーバとPython模擬クライアントの非同期連携' }
    ]
  },
  12: {
    title: '第12章で必要な前提知識',
    items: [
      { label: 'Docker、CMake、GoogleTest、pybind11、CI/CDの全自動テストパイプライン' },
      { label: '手動Excel目視テストを完全自動化するための設計思想と運用ベストプラクティス' }
    ]
  }
};

export default function ChapterContent() {
  const { openLab } = useLab();
  const { id } = useParams();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setLoading(true);
    setCheckedItems({});
    import(`../content/chap${id}.mdx`)
      .then((m) => {
        setModule(m);
        setLoading(false);
        if (m.meta?.title) {
          document.title = `${m.meta.title} | シロクマ C++開発自動化ラボ`;
        }
        if (m.meta?.description) {
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', m.meta.description);
          const ogDesc = document.querySelector('meta[property="og:description"]');
          if (ogDesc) ogDesc.setAttribute('content', m.meta.description);
          const twDesc = document.querySelector('meta[name="twitter:description"]');
          if (twDesc) twDesc.setAttribute('content', m.meta.description);
        }
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

  const mdxComponents = {
    Term: (props: any) => <TermTooltip {...props} />,
    RelatedLab: (props: any) => <RelatedLab {...props} />,
    table: (props: any) => (
      <div className="not-prose overflow-x-auto my-6 border border-slate-700/80 rounded-xl shadow-lg bg-navy-900/80">
        <table className="w-full border-collapse text-left text-xs sm:text-sm m-0" {...props} />
      </div>
    ),
    thead: (props: any) => (
      <thead className="bg-navy-950/90 border-b border-slate-700 text-cyan-300 font-semibold" {...props} />
    ),
    th: (props: any) => (
      <th className="p-3.5 text-cyan-300 font-bold border-b border-slate-700 whitespace-nowrap" {...props} />
    ),
    td: (props: any) => (
      <td className="p-3.5 border-b border-slate-800/80 text-slate-300 align-top leading-relaxed" {...props} />
    ),
    tr: (props: any) => (
      <tr className="hover:bg-cyan-500/5 transition-colors border-b border-slate-800/60 last:border-b-0" {...props} />
    ),
    blockquote: (props: any) => (
      <blockquote className="not-prose block border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-950/40 to-navy-900/60 px-5 py-4 rounded-r-xl my-6 text-slate-200 text-sm sm:text-base leading-relaxed shadow-md [&>p]:m-0 [&>p+p]:mt-2" {...props} />
    ),
  };

  const chapterIdNum = Number(meta.chapterId);
  const currentPrerequisites = PREREQUISITES_MAP[chapterIdNum];
  const snapshotChapterStr = String(chapterIdNum).padStart(2, '0');

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 pb-32">
      
      {/* Chapter Title Block (Dynamic via MDX Meta) */}
      <div className="bg-navy-800 border border-cyan-500/20 rounded-xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2.5 sm:px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5">
            <Shield size={14} /> Chap {meta.chapterId}
          </span>
          <span className="bg-navy-700 text-slate-300 border border-slate-600 px-2.5 sm:px-3 py-1 rounded text-xs font-medium">
            {meta.category}
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight tracking-tight">
          第{meta.chapterId}章：{meta.title}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {meta.description}
        </p>

        {meta.responsibility && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-cyan-500 font-bold">担当領域:</span>
            <span className="text-slate-300">{meta.responsibility}</span>
          </div>
        )}
      </div>

      {/* 【HIGH-1】GitHub Code Snapshot Card */}
      <div className="bg-gradient-to-r from-navy-800 to-slate-900 border border-slate-700/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="bg-slate-700 text-slate-200 border border-slate-600 text-[11px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-1.5">
              <GitBranch size={12} className="text-cyan-400" />
              chapter-{snapshotChapterStr}
            </span>
            <span className="text-xs text-cyan-400 font-bold">公式コードスナップショット</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <FolderGit2 size={16} className="text-cyan-400 shrink-0" />
            第{meta.chapterId}章の開始コード・完成状態はこちら（GitHub）
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            CMakeLists.txt や Dockerfile のタイポで動かなくなった場合も安心。この章の完成状態コードをGitHubで閲覧、またはクローンしてそのまま再開できます。
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <code className="text-[11px] bg-navy-950 px-2 py-1 rounded border border-slate-700 font-mono text-cyan-300 select-all">
              git checkout chapter-{snapshotChapterStr}
            </code>
            <span className="text-[11px] text-slate-400">または snapshots/chapter-{snapshotChapterStr}/ を参照</span>
          </div>
        </div>
        <a
          href={`https://github.com/genki113355-tm/shirokuma-automation-lab/tree/master/snapshots/chapter-${snapshotChapterStr}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHubで第${meta.chapterId}章のコードスナップショットを開く`}
          className="shrink-0 bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer group"
        >
          <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          <span>GitHubでコードを見る</span>
        </a>
      </div>

      {/* 【HIGH-2】Prerequisites Checklist */}
      {currentPrerequisites && (
        <div className="bg-navy-800/90 border border-cyan-500/20 rounded-xl p-4 sm:p-5 shadow-md">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <CheckSquare size={16} className="text-cyan-400" />
              <h3 className="text-xs sm:text-sm font-bold text-white">
                📋 {currentPrerequisites.title}（チェックリスト）
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              ※クリックでチェック可能。専門用語はホバーで解説表示
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {currentPrerequisites.items.map((item, idx) => {
              const isChecked = checkedItems[idx] || false;
              return (
                <label
                  key={idx}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                      : 'bg-navy-900/60 border-slate-700/80 text-slate-300 hover:border-cyan-500/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCheck(idx)}
                    className="mt-0.5 rounded border-slate-600 text-cyan-500 focus:ring-0 bg-navy-950 cursor-pointer"
                  />
                  <span className="leading-snug">
                    {item.term ? (
                      <>
                        <TermTooltip name={item.term} />
                        <span className="ml-1 text-slate-300">
                          {item.label.replace(item.term, '')}
                        </span>
                      </>
                    ) : (
                      item.label
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Highlight Bar (Dynamic via MDX Meta) */}
      {meta.evolution && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3.5 sm:p-4 flex items-start gap-3">
          <Zap size={20} className="text-yellow-400 shrink-0 mt-0.5" />
          <span className="text-yellow-400 font-bold text-xs sm:text-sm leading-relaxed">
            演習・進化: {meta.evolution}
          </span>
        </div>
      )}

      {/* Tags (Dynamic via MDX Meta) */}
      {meta.tags && (
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag: string) => (
            <span key={tag} className="bg-navy-700 border border-slate-600 text-slate-300 text-xs px-2.5 sm:px-3 py-1 rounded-md hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}

      <hr className="border-slate-700/50 my-6 sm:my-10" />

      {/* MDX Content Rendered via @tailwindcss/typography */}
      <div className="prose prose-invert prose-cyan max-w-none overflow-x-hidden break-words
                      prose-headings:text-slate-100 prose-headings:border-b prose-headings:border-cyan-500/20 prose-headings:pb-2 prose-headings:mt-8 sm:prose-headings:mt-10
                      prose-p:text-slate-300 prose-p:leading-relaxed 
                      prose-pre:overflow-x-auto prose-pre:max-w-full
                      prose-blockquote:not-italic prose-blockquote:quotes-none
                      prose-li:text-slate-300 prose-strong:text-cyan-300">
        <Content components={mdxComponents} />
      </div>

      {/* Action Button & Next Stage Baton Pass */}
      <div className="pt-6 sm:pt-10 space-y-6">

        {/* ▶ 課題解決ミッション（CodeLab）への導線 */}
        {(() => {
          const chapterMissions: Record<number, { title: string; desc: string; buttonText: string }> = {
            1: {
              title: '【第1章 実践ミッション】Python×C++ 自動テスト連携を体験！',
              desc: '第1章で学んだ「C++の共有ライブラリ化」と「pytestによる一括検証」の全自動サイクルを、ブラウザ上で実際にコマンド入力して体験できます。',
              buttonText: '第1章のミッションに挑戦する',
            },
            2: {
              title: '【第2章 実践ミッション】Dockerで「私のPCでは動いた」を撲滅！',
              desc: 'Dockerfileの設計図確認からイメージのビルド、使い捨て隔離コンテナ内部でのテスト完走までをブラウザ上で体験できます。',
              buttonText: '第2章のミッションに挑戦する',
            },
            3: {
              title: '【第3章 実践ミッション】CMakeビルド自動化＆CTest一括テスト！',
              desc: '手書きMakefileの苦行から解放！CMakeLists.txtによるMakefile自動生成とCTestによる一括並列テストをブラウザ上で体験できます。',
              buttonText: '第3章のミッションに挑戦する',
            },
            4: {
              title: '【第4章 実践ミッション】GoogleTestで数理ロジックを単体検証！',
              desc: 'Excelでの波形目視チェックを完全駆逐！TESTマクロとEXPECT_NEAR（浮動小数点比較）を用いたC++単体テストの直接実行とCTest連携をブラウザ上で体験できます。',
              buttonText: '第4章のミッションに挑戦する',
            },
            5: {
              title: '【第5章 実践ミッション】PythonからC++を直接叩く（pybind11）！',
              desc: '面倒なラッパー地獄を脱出！PYBIND11_MODULEによるC++クラスのPythonモジュール化と、Pythonワンライナー直接実行＆pytest一括検証をブラウザ上で体験できます。',
              buttonText: '第5章のミッションに挑戦する',
            },
            9: {
              title: '【第9章 実践ミッション】Valgrindで見えないメモリリークを特定！',
              desc: 'deleteし忘れたC++プログラムを動的解析ツールValgrindにかけ、1バイト単位でメモリ漏れをあぶり出すデバッグ体験ができます。',
              buttonText: '第9章のミッションに挑戦する',
            },
          };

          const currentMission = chapterMissions[meta.chapterId];

          return (
            <div className="bg-gradient-to-r from-navy-800 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {currentMission ? `🎯 第${meta.chapterId}章 実践ハンズオン` : '🎯 コード実行ラボ（ハンズオン演習）'}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                  <Zap className="text-cyan-400" size={24} /> 
                  {currentMission ? currentMission.title : 'コード実行ラボで実際のC++自動化を体験しよう！'}
                </h4>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {currentMission ? currentMission.desc : 'ブラウザ上のコード実行ラボで、C++自動テスト連携・Docker・CMake・GoogleTest・pybind11・Valgrindの実践ミッションを体験できます。'}
                </p>
              </div>
              <button
                onClick={() => openLab(currentMission ? meta.chapterId : 1)}
                aria-label={`第${meta.chapterId}章のコード実行ラボを開く`}
                className="w-full md:w-auto shrink-0 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-8 py-4 rounded-xl flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all hover:-translate-y-1 relative z-10 cursor-pointer"
              >
                <Play size={20} fill="currentColor" />
                {currentMission ? currentMission.buttonText : 'コード実行ラボを開く（第1〜5・9章のミッション）'}
              </button>
            </div>
          );
        })()}

        {/* 【MEDIUM-1】Chapter 12 → 付録リファレンスへの導線強化 */}
        {meta.chapterId === 12 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy-800 via-cyan-950/50 to-navy-900 border border-cyan-500/40 shadow-2xl relative overflow-hidden mt-8 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-5">
              <div className="space-y-1.5">
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  📚 次のステップ：付録リファレンス
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  実務の現場で差がつく！2大付録・逆引き実践リファレンス
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  全12章のカリキュラム完走おめでとうございます！実務の大規模プロジェクトで即戦力として活躍できるよう、現場で直面する高度な構文やオプションを完全網羅した逆引きリファレンスを用意しました。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Appendix 1 */}
              <div className="p-5 rounded-xl bg-navy-900/80 border border-cyan-500/30 flex flex-col justify-between space-y-4 hover:border-cyan-400 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <BookOpen size={14} /> 【付録1】GoogleTest 逆引きリファレンス
                    </span>
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded font-mono font-bold">
                      単体テスト網羅
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    EXPECT vs ASSERTの使い分け、浮動小数点アサーション（EXPECT_NEAR）、フィクスチャ（TEST_F）、パラメータ化テスト（TEST_P）、CLIフィルタ（--gtest_filter）を完全整理。
                  </p>
                </div>
                <Link
                  to="/appendix/googletest"
                  aria-label="GoogleTest逆引き実践リファレンスを読む"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <span>GoogleTestリファレンスを読む</span>
                  <span>➔</span>
                </Link>
              </div>

              {/* Appendix 2 */}
              <div className="p-5 rounded-xl bg-navy-900/80 border border-teal-500/30 flex flex-col justify-between space-y-4 hover:border-teal-400 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                      <BookOpen size={14} /> 【付録2】CTest 実践リファレンス
                    </span>
                    <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded font-mono font-bold">
                      テストランナー
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    コマンドライン引数（-R 絞り込み、-j 並列実行、--output-on-failure）、タイムアウト設定、依存関係（DEPENDS）、CI向けJUnit XML出力までを完全網羅。
                  </p>
                </div>
                <Link
                  to="/appendix/ctest"
                  aria-label="CTest実践リファレンスを読む"
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <span>CTestリファレンスを読む</span>
                  <span>➔</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {meta.chapterId === 12 && (
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-navy-900 to-[#062016] border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl relative overflow-hidden mt-8">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-2 text-center md:text-left relative z-10">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-emerald-300 font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40">NEXT STAGE 🖥️</span>
                <span>シロクマ技術探検隊・第3ステージ</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white">
                CI/CD環境を整えたら、次は【Qt×C++ラボ】で産業GUIを作る！
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                車載・産業機器のLinux環境で絶対にフリーズしないマルチスレッド設計と、リアルタイム波形描画・60fps計器ダッシュボード構築を完全習得。
              </p>
            </div>
            <a
              href="https://shirokuma-qt-cpp.jp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Qt×C++ラボ（外部サイト）を開く"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm whitespace-nowrap shadow-xl hover:shadow-emerald-500/25 transition transform hover:scale-105 active:scale-95 flex items-center gap-2 flex-shrink-0 relative z-10 cursor-pointer"
            >
              <span>Qt×C++ラボへ進む</span>
              <span>➡️</span>
            </a>
          </div>
        )}

        <div className="flex justify-between items-center flex-wrap gap-4 mt-8 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              aria-label="全章カリキュラム目次へ戻る" 
              className="text-slate-400 hover:text-cyan-400 text-xs sm:text-sm font-mono flex items-center gap-1 transition-colors"
            >
              ⬅ 全章カリキュラム目次へ
            </Link>
            {chapterIdNum > 1 && (
              <Link
                to={`/chapter/${chapterIdNum - 1}`}
                aria-label={`第${chapterIdNum - 1}章へ戻る`}
                className="text-slate-400 hover:text-cyan-400 text-xs sm:text-sm font-mono flex items-center gap-1 transition-colors border-l border-slate-700 pl-3"
              >
                ⬅ 第{chapterIdNum - 1}章
              </Link>
            )}
          </div>
          {chapterIdNum < 12 ? (
            <Link 
              to={`/chapter/${chapterIdNum + 1}`} 
              aria-label={`第${chapterIdNum + 1}章へ進む`}
              className="w-full sm:w-auto justify-center bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500 text-cyan-400 font-bold px-6 sm:px-8 py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              第{chapterIdNum + 1}章へ進む ➡
            </Link>
          ) : (
            <Link 
              to="/" 
              aria-label="全12章修了、トップページへ戻る"
              className="w-full sm:w-auto justify-center bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500 text-cyan-400 font-bold px-6 sm:px-8 py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              🎉 全12章修了（トップへ）
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
