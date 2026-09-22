import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const baseUrl = 'https://shirokuma-auto-cpp.jp';
const siteTitle = 'シロクマ C++開発自動化ラボ';
const siteDesc = 'Python、Docker、CI/CDを活用してC++開発の泥臭い手作業を全自動化。開発者のための実務効率化・自動化エコシステム構築ガイド。';

const PAGES = [
  {
    path: 'lab',
    title: 'コード実行ラボ（対話型ターミナル） | シロクマ C++開発自動化ラボ',
    desc: 'ブラウザ上でC++のビルド、pytest、Dockerコンテナ構築、Valgrindを疑似体験できる対話型ターミナル。',
    heading: 'コード実行ラボ',
    content: 'ブラウザ上で g++ や pytest, docker build などのコマンドを打ち込み、C++開発の自動化を疑似体験できる対話型ターミナルです。'
  },
  {
    path: 'chapter/1',
    title: '第1章: C++と自動化の重要性 | シロクマ C++開発自動化ラボ',
    desc: 'なぜC++開発においてビルドやテストの自動化が必要なのか？手動作業の限界と自動化のメリットを解説します。',
    heading: '【Chap 1】C++と自動化の重要性',
    content: 'C++開発における手作業（コンパイル、テスト、メモリチェック）の辛さと、それをPythonやDockerで自動化するアプローチについて学びます。'
  },
  {
    path: 'chapter/2',
    title: '第2章: Docker環境構築 | シロクマ C++開発自動化ラボ',
    desc: '「私のPCでは動いた」を撲滅するDockerを活用したC++ビルド環境のコンテナ化手法を解説。',
    heading: '【Chap 2】Docker環境構築',
    content: 'チーム開発における環境依存をなくすため、Dockerfileを記述し、UbuntuベースのC++ビルド環境を構築します。'
  },
  {
    path: 'chapter/3',
    title: '第3章: CMakeビルド自動化 | シロクマ C++開発自動化ラボ',
    desc: '手動g++コンパイルからの脱却。CMakeを使ったクロスプラットフォームなビルドプロセスの自動化。',
    heading: '【Chap 3】CMakeビルド自動化',
    content: '手動のg++コマンドから卒業し、CMakeLists.txtを記述してビルドプロセスをコード化・自動化する方法を学びます。'
  },
  {
    path: 'chapter/4',
    title: '第4章: CTest自動テスト | シロクマ C++開発自動化ラボ',
    desc: 'CMakeに組み込まれたテストランナー「CTest」を用いて、C++の単体テストを自動実行する基盤を作ります。',
    heading: '【Chap 4】CTest自動テスト',
    content: 'CTestを用いてC++の実行ファイルをテストとして登録し、一括でテストを実行・集計する自動化の第一歩を踏み出します。'
  },
  {
    path: 'chapter/5',
    title: '第5章: PythonからC++を直接叩く | シロクマ C++開発自動化ラボ',
    desc: 'pybind11を活用してC++の共有ライブラリをPythonから直接呼び出すバインディング技術。',
    heading: '【Chap 5】PythonからC++を直接叩く',
    content: 'Pythonの柔軟なエコシステム（pytestなど）を活用するため、pybind11を用いてC++コードをPythonモジュール化します。'
  },
  {
    path: 'chapter/6',
    title: '第6章: Python統合の実践 | シロクマ C++開発自動化ラボ',
    desc: 'C++モジュールとPythonスクリプトを連携させた実務レベルのテスト・制御手法。',
    heading: '【Chap 6】Python統合の実践',
    content: 'C++の高速な処理をPythonの柔軟なスクリプトから制御し、自動化システムのコアとなる連携部分を実践します。'
  },
  {
    path: 'chapter/7',
    title: '第7章: Pytestによる評価自動化 | シロクマ C++開発自動化ラボ',
    desc: 'Pythonの強力なテストフレームワークpytestを用いて、C++コードの挙動を簡潔かつ網羅的に自動テストします。',
    heading: '【Chap 7】Pytestによる評価自動化',
    content: 'C++のテストをあえてPython（pytest）で行うメリットと、パラメーター化テストなど高度なテスト自動化手法を解説。'
  },
  {
    path: 'chapter/8',
    title: '第8章: AddressSanitizerメモリチェック | シロクマ C++開発自動化ラボ',
    desc: 'C++特有のメモリリークや不正アクセスを自動検知するAddressSanitizer (ASan) の導入。',
    heading: '【Chap 8】AddressSanitizerメモリチェック',
    content: 'コンパイラにASanフラグを追加し、テスト実行時にメモリバグを自動的に検知してクラッシュさせるセキュアな自動化パイプライン。'
  },
  {
    path: 'chapter/9',
    title: '第9章: Sanitizerによるメモリ解析 | シロクマ C++開発自動化ラボ',
    desc: 'ValgrindやSanitizerのログを解析し、C++のメモリ障害を自動化フローの中で特定・報告する手法。',
    heading: '【Chap 9】Sanitizerによるメモリ解析',
    content: 'CI上でSanitizerの出力をパースし、メモリリークを発見した際に自動的にテストをフェイルさせる実践的な運用方法。'
  },
  {
    path: 'chapter/10',
    title: '第10章: GitHub Actionsによる自動化 | シロクマ C++開発自動化ラボ',
    desc: 'これまでに構築したビルド・テスト・メモリチェックの全工程を、GitHub Actionsで完全自動のCI/CDパイプラインに乗せる。',
    heading: '【Chap 10】GitHub Actionsによる自動化',
    content: 'ソースコードをPushするだけで、Docker上でのビルド、pytest、ASanチェックが全自動で走るCI環境を構築します。'
  },
  {
    path: 'chapter/11',
    title: '第11章: HILシミュレーションへの応用 | シロクマ C++開発自動化ラボ',
    desc: 'Hardware-in-the-Loop。実機と連携したC++の自動テストシステムへの応用と将来展望。',
    heading: '【Chap 11】HILシミュレーションへの応用',
    content: '実機ハードウェアとPCを連携させたシミュレーション環境において、Pythonスクリプトで一連の動作を自動化・検証する手法。'
  },
  {
    path: 'chapter/12',
    title: '第12章: 自動テストシステム構築の実践 | シロクマ C++開発自動化ラボ',
    desc: 'C++開発における「泥臭い手作業」を排除した、モダンな自動化エコシステム構築の総括。',
    heading: '【Chap 12】自動テストシステム構築の実践',
    content: '全カリキュラムの総括として、C++開発者に求められる「自動化・効率化」の全体像とマインドセットを振り返ります。'
  }
];

const SISTER_SITES_HTML = `
  <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b;">
    <h3 style="font-size: 18px; color: #22d3ee; margin-bottom: 15px;">シロクマ技術学習エコシステム</h3>
    <p style="font-size: 14px; color: #94a3b8; margin-bottom: 10px;">
      C++の開発環境を自動化した後は、設計手法やGUI開発、特定ドメインへの応用も学んでみましょう。
    </p>
    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
      <li>
        🔹 <strong>C++のコア設計とオブジェクト指向を深く学ぶなら：</strong><br/>
        <a href="https://www.shirokuma-cpp.jp/" rel="noopener" style="color: #38bdf8; text-decoration: none;">シロクマC++ラボ</a>
      </li>
      <li>
        🔹 <strong>C++を用いたLinux向けリアルタイム計器・GUI開発を学ぶなら：</strong><br/>
        <a href="https://shirokuma-qt-cpp.jp/" rel="noopener" style="color: #34d399; text-decoration: none;">シロクマQt×C++ラボ</a>
      </li>
      <li>
        🔹 <strong>C++の計算能力を活かした音波・信号処理（ドメイン知識）を学ぶなら：</strong><br/>
        <a href="https://sonar-guide.jp/" rel="noopener" style="color: #60a5fa; text-decoration: none;">水中音響・ソナー技術入門</a>
      </li>
    </ul>
  </footer>
`;

async function generateSEO() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('dist/index.html not found. Run npm run build first.');
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // 1. トップページ (dist/index.html) のプリレンダリングとJSON-LD追加
  {
    const topJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          'name': siteTitle,
          'url': `${baseUrl}/`,
          'description': siteDesc,
          'inLanguage': 'ja',
          'publisher': {
            '@type': 'Organization',
            'name': 'シロクマ技術開発室'
          }
        },
        {
          '@type': 'Course',
          'name': 'C++開発自動化・効率化チュートリアル',
          'description': '手作業ビルドからCMake、Pythonテスト、ASanメモリ検査、Docker、GitHub Actionsによる完全自動CI/CDまでを学ぶ実践型カリキュラム。',
          'provider': {
            '@type': 'Organization',
            'name': 'シロクマ技術開発室'
          }
        }
      ]
    };

    const topInitialContent = `
      <div style="max-width: 960px; margin: 40px auto; padding: 24px; font-family: sans-serif; line-height: 1.6; color: #e2e8f0; background: #0b1322; border-radius: 16px; border: 1px solid #1e293b;">
        <h1 style="font-size: 32px; color: #ffffff; margin-bottom: 8px;">${siteTitle}</h1>
        <p style="font-size: 18px; color: #22d3ee; margin-bottom: 20px;">C++開発の泥臭い作業、全部「全自動化」しませんか？</p>
        <p style="font-size: 16px; color: #94a3b8; margin-bottom: 24px;">${siteDesc}</p>
        
        <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #334155;">
          <h2 style="font-size: 20px; color: #f59e0b; margin-top: 0;">🎯 MISSION: テストの全自動化</h2>
          <p style="color: #cbd5e1; margin-bottom: 0;">「このプロジェクトのテストを毎回手動で実行するのをやめたい」――手動ビルド ➔ CMake ➔ 自動テスト ➔ ASan ➔ Docker ➔ GitHub Actions による完全自動CI/CDのワークフローを構築せよ。</p>
        </div>

        <h2 style="font-size: 22px; color: #ffffff; margin-bottom: 16px;">📚 全12章カリキュラム一覧</h2>
        <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px; color: #cbd5e1; font-size: 15px;">
          ${PAGES.filter(p => p.path.startsWith('chapter/')).map(p => `
            <li><a href="/${p.path}" style="color: #38bdf8; text-decoration: none;"><strong>${p.heading}</strong></a> - ${p.desc}</li>
          `).join('')}
        </ol>

        <div style="margin-top: 30px;">
          <a href="/chapter/1" style="display: inline-block; padding: 12px 24px; background: #06b6d4; color: #0f172a; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 16px;">第1章から学習を開始する ➔</a>
        </div>

        ${SISTER_SITES_HTML}
      </div>
    `;

    let topHtml = baseHtml;
    // JSON-LD 注入
    topHtml = topHtml.replace(
      '</head>',
      `  <script type="application/ld+json">${JSON.stringify(topJsonLd)}</script>\n  </head>`
    );
    // クローラー用初期コンテンツ注入
    topHtml = topHtml.replace(
      /<div id="root">.*?<\/div>/s,
      `<div id="root">${topInitialContent}</div>`
    );

    fs.writeFileSync(indexHtmlPath, topHtml, 'utf8');
    console.log('✅ Successfully prerendered TOP page (dist/index.html)');
  }

  // 2. 各サブページのプリレンダリング
  for (const page of PAGES) {
    const pageDir = path.join(distDir, ...page.path.split('/'));
    fs.mkdirSync(pageDir, { recursive: true });

    const pageUrl = `${baseUrl}/${page.path}`;

    // 構造化データ (JSON-LD)
    const pageJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          'headline': page.title,
          'description': page.desc,
          'url': pageUrl,
          'inLanguage': 'ja',
          'author': {
            '@type': 'Organization',
            'name': 'シロクマ技術開発室'
          },
          'publisher': {
            '@type': 'Organization',
            'name': siteTitle
          },
          'about': [
            { '@type': 'ComputerLanguage', 'name': 'C++' },
            { '@type': 'SoftwareApplication', 'name': 'Docker' },
            { '@type': 'SoftwareApplication', 'name': 'CMake' },
            { '@type': 'SoftwareApplication', 'name': 'GitHub Actions' }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'TOP',
              'item': `${baseUrl}/`
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': page.heading,
              'item': pageUrl
            }
          ]
        }
      ]
    };

    // クローラー用・JSオフ時の初期コンテンツ
    const initialContent = `
      <div style="max-width: 900px; margin: 40px auto; padding: 20px; font-family: sans-serif; line-height: 1.6; color: #e2e8f0; background: #0b1322; border-radius: 16px; border: 1px solid #1e293b;">
        <nav style="margin-bottom: 20px; font-size: 14px;">
          <a href="/" style="color: #22d3ee; text-decoration: none;">🏠 TOP</a> / <span>${page.heading}</span>
        </nav>
        <h1 style="font-size: 28px; margin-bottom: 12px; color: #ffffff;">${page.heading}</h1>
        <p style="font-size: 16px; color: #94a3b8; margin-bottom: 30px;">${page.content}</p>
        
        <div style="background: #164e63; padding: 20px; border-radius: 12px; border: 1px solid #06b6d4;">
          <h2 style="font-size: 20px; color: #22d3ee; margin-top: 0;">🚀 C++開発自動化ラボ</h2>
          <p style="color: #cbd5e1;">JavaScriptを有効にすると、C++の擬似ビルドやテストを体験できる「コード実行ラボ」等のインタラクティブ機能を利用できます。</p>
          <p><a href="/lab" style="display: inline-block; padding: 10px 20px; background: #0891b2; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">コード実行ラボを起動</a></p>
        </div>

        ${SISTER_SITES_HTML}
      </div>
    `;

    let pageHtml = baseHtml;

    // Title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/s,
      `<title>${escapeHtml(page.title)}</title>`
    );

    // Meta Description
    pageHtml = pageHtml.replace(
      /<meta name="description" content=".*?" \/>/s,
      `<meta name="description" content="${escapeHtml(page.desc)}" />`
    );

    // Canonical
    if (pageHtml.includes('<link rel="canonical"')) {
      pageHtml = pageHtml.replace(
        /<link rel="canonical" href=".*?" \/>/s,
        `<link rel="canonical" href="${pageUrl}" />`
      );
    } else {
      pageHtml = pageHtml.replace(
        '</head>',
        `  <link rel="canonical" href="${pageUrl}" />\n  </head>`
      );
    }

    // OGP Tags
    if (pageHtml.includes('<meta property="og:title"')) {
      pageHtml = pageHtml.replace(
        /<meta property="og:title" content=".*?" \/>/s,
        `<meta property="og:title" content="${escapeHtml(page.title)}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta property="og:description" content=".*?" \/>/s,
        `<meta property="og:description" content="${escapeHtml(page.desc)}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta property="og:url" content=".*?" \/>/s,
        `<meta property="og:url" content="${pageUrl}" />`
      );
    }

    // JSON-LD 注入
    pageHtml = pageHtml.replace(
      '</head>',
      `  <script type="application/ld+json">${JSON.stringify(pageJsonLd)}</script>\n  </head>`
    );

    // Inject initial content into root
    pageHtml = pageHtml.replace(
      /<div id="root">.*?<\/div>/s,
      `<div id="root">${initialContent}</div>`
    );

    fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml, 'utf8');
  }

  console.log(`✅ Successfully prerendered ${PAGES.length} static HTML pages for SEO!`);

  // Sitemap generation
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls = [
    `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    ...PAGES.map((p) => `  <url>\n    <loc>${baseUrl}/${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
  ].join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('✅ Generated sitemap.xml');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

generateSEO().catch((err) => {
  console.error('❌ Error generating SEO:', err);
  process.exit(1);
});
