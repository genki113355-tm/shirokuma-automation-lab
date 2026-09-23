import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Folder, FileCode, FileText, HardDrive, Map, CheckCircle2, X } from 'lucide-react';
import { useLab } from '../contexts/LabContext';

type LogEntry = {
  id: number;
  type: 'input' | 'output' | 'error' | 'system';
  content: React.ReactNode;
};

const SCENARIOS = [
  {
    id: 1,
    title: 'C++テスト自動化の仕組みを体験',
    description: '手作業のテストを自動化するまでの裏側の仕組みを、順を追ってトレースしてみましょう。',
    steps: [
      {
        command: 'cat tests/test_processor.py',
        matchKeywords: ['cat', 'test_processor.py'],
        instruction: 'まずはテストコードの中身を確認します。\n➔ `cat tests/test_processor.py` と入力',
        explanation: 'コードをよく見てみて。2行目で `from shirokuma_cpp import DataProcessor` と書いてあるよね。\nなんと、C++で作ったシステムをPythonのモジュールとして読み込んでいるんだ！\nこれなら、テストを書くのが簡単なPythonでC++のテストができちゃうね。'
      },
      {
        command: './build.sh',
        matchKeywords: ['./build.sh'],
        instruction: '次に、C++のコードをPythonから読み込める形式（共有ライブラリ）に変換します。\n➔ `./build.sh` と入力',
        explanation: 'お疲れ様！今実行したスクリプトが、C++のコードをコンパイルして「Pythonから呼び出せる魔法のファイル（.soファイル）」に変換してくれたんだよ。\nこれでテストの準備は完璧だ。'
      },
      {
        command: 'pytest',
        matchKeywords: ['pytest'],
        instruction: '準備が整いました。テストフレームワークを実行して、自動テストを走らせましょう。\n➔ `pytest` と入力',
        explanation: '素晴らしい！たった1つのコマンドで、さっきのPythonテストが一瞬で実行されたね。\n手作業で画面をポチポチしなくても、これでいつでもプログラムの正しさを証明できるよ！'
      }
    ]
  },
  {
    id: 2,
    title: '見えないメモリリークの特定',
    description: '動的解析ツールを使って、目視では見つけられないメモリの解放忘れを特定する流れをトレースします。',
    steps: [
      {
        command: 'cat src/main.cpp',
        matchKeywords: ['cat', 'main.cpp'],
        instruction: 'まずは問題のありそうなC++コードを確認します。\n➔ `cat src/main.cpp` と入力',
        explanation: 'コードの後半を見てごらん。 `new int[100]` でメモリを確保しているのに、どこにも `delete` が書かれていないよね。\nこれがシステムをクラッシュさせる「メモリリーク」の正体だよ。'
      },
      {
        command: 'valgrind ./app',
        matchKeywords: ['valgrind', './app'],
        instruction: 'Valgrindを使って、プログラム実行中のメモリ使用状況を監視・解析します。\n➔ `valgrind ./app` と入力',
        explanation: '赤い文字で `definitely lost: 400 bytes` と出たね！\nValgrindはこうやって、目で見つけにくいメモリの解放忘れをプログラムを実行しながら監視して教えてくれる、心強い相棒なんだ。'
      }
    ]
  },
  {
    id: 3,
    title: '「私のPCでは動いた」の撲滅',
    description: 'Dockerを使って、環境に依存しない統一されたビルド環境を構築する流れをトレースします。',
    steps: [
      {
        command: 'cat Dockerfile',
        matchKeywords: ['cat', 'Dockerfile'],
        instruction: '環境の設計図であるDockerfileの中身を確認します。\n➔ `cat Dockerfile` と入力',
        explanation: 'これが環境の設計図さ。UbuntuというOSの上に、g++やCMakeなど必要なツールをインストールする手順が全部書かれているね。'
      },
      {
        command: 'docker build -t app .',
        matchKeywords: ['docker', 'build'],
        instruction: 'この設計図をもとに、全員が同じ状態から始められるコンテナを作成します。\n➔ `docker build -t app .` と入力',
        explanation: 'できたね！このコマンドは、さっきの設計図を元に「必要なものがすべて揃った独立した部屋（コンテナ）」を作ってくれるんだ。\nこの設計図をチームに配れば、もう『私のPCでは動くのに』なんてトラブルは起きないよ！'
      }
    ]
  }
];

const FILE_TREE = [
  { name: 'src', type: 'folder', children: [
    { name: 'main.cpp', type: 'cpp' },
    { name: 'data_processor.h', type: 'header' },
    { name: 'data_processor.cpp', type: 'cpp' }
  ]},
  { name: 'tests', type: 'folder', children: [
    { name: 'test_processor.py', type: 'python' }
  ]},
  { name: 'CMakeLists.txt', type: 'txt' },
  { name: 'Dockerfile', type: 'docker' },
  { name: 'build.sh', type: 'sh' }
];

export default function CodeLab() {
  const { isLabOpen, closeLab } = useLab();
  const [activeScenarioId, setActiveScenarioId] = useState(1);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  const [scenarioProgress, setScenarioProgress] = useState<Record<number, number>>({ 1: 0 });
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  
  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId);
  const currentStepIndex = scenarioProgress[activeScenarioId] || 0;
  const currentStep = activeScenario?.steps[currentStepIndex];

  const [history, setHistory] = useState<LogEntry[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLabOpen) return;
    setShowSuccessOverlay(false);
    
    setHistory([
      { id: Date.now(), type: 'system', content: 'Welcome to Shirokuma Auto C++ Execution Lab.' },
      { id: Date.now()+1, type: 'system', content: 'Initializing interactive guided tracing...' }
    ]);
    
    if (activeScenario) {
      const stepIndex = scenarioProgress[activeScenario.id] || 0;
      const step = activeScenario.steps[stepIndex];
      
      if (step) {
        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { 
              id: Date.now() + 2, 
              type: 'system', 
              content: (
                <div className="text-cyan-400 mt-4 p-3 bg-cyan-900/20 border-l-4 border-cyan-500 mb-2 rounded-r-lg shadow-lg animate-fade-in">
                  <div className="font-bold text-lg mb-1 flex items-center gap-2">
                    <Map size={18} /> 【STEP {stepIndex + 1}/{activeScenario.steps.length}】
                  </div>
                  <div className="text-slate-200 whitespace-pre-wrap">{step.instruction}</div>
                </div>
              )
            }
          ]);
        }, 300);
      } else if (completedScenarios.includes(activeScenario.id)) {
        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { 
              id: Date.now() + 2, 
              type: 'system', 
              content: (
                <div className="text-emerald-400 mt-4 p-3 bg-emerald-900/20 border-l-4 border-emerald-500 mb-2 rounded-r-lg shadow-lg">
                  <div className="font-bold text-lg mb-1 flex items-center gap-2">
                    <CheckCircle2 size={18} /> このシナリオはコンプリート済みです
                  </div>
                  <div className="text-slate-200">ターミナルを自由に操作できます。最初からやり直す場合はリロードしてください。</div>
                </div>
              )
            }
          ]);
        }, 300);
      }
    }
  }, [activeScenarioId, isLabOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const addLog = (type: LogEntry['type'], content: React.ReactNode) => {
    setHistory(prev => [...prev, { id: Date.now() + Math.random(), type, content }]);
  };

  const processCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addLog('input', trimmed);
    setInput('');
    setIsProcessing(true);

    const args = trimmed.split(' ').filter(Boolean);
    const baseCmd = args[0].toLowerCase();

    await new Promise(resolve => setTimeout(resolve, 300));

    let isStandardCommand = false;

    switch (baseCmd) {
      case 'help':
        isStandardCommand = true;
        addLog('output', (
          <div className="text-slate-300">
            Available commands:<br/>
            <span className="text-cyan-400">ls</span> - List files in current directory<br/>
            <span className="text-cyan-400">cat &lt;file&gt;</span> - View file contents<br/>
            <span className="text-cyan-400">clear</span> - Clear terminal
          </div>
        ));
        break;
      
      case 'clear':
        isStandardCommand = true;
        setHistory([]);
        break;

      case 'ls':
        isStandardCommand = true;
        addLog('output', (
          <div className="flex gap-4 text-cyan-200">
            <span className="text-blue-400 font-bold">src/</span>
            <span className="text-blue-400 font-bold">tests/</span>
            <span>CMakeLists.txt</span>
            <span>Dockerfile</span>
            <span className="text-green-400">build.sh</span>
          </div>
        ));
        break;

      case 'cat':
        isStandardCommand = true;
        if (args.length < 2) {
          addLog('error', 'cat: missing operand');
          break;
        }
        const file = args[1];
        if (file.includes('test_processor.py')) {
          addLog('output', (
            <div className="text-slate-300 whitespace-pre-wrap font-mono text-sm">
              <span className="text-purple-400">import</span> pytest<br/>
              <span className="text-purple-400">from</span> shirokuma_cpp <span className="text-purple-400">import</span> DataProcessor<br/>
              <br/>
              <span className="text-blue-400">def</span> <span className="text-yellow-200">test_process_data_empty</span>():<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;processor = DataProcessor()<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">assert</span> processor.process([]) == <span className="text-green-300">0</span><br/>
              <br/>
              <span className="text-blue-400">def</span> <span className="text-yellow-200">test_process_data_normal</span>():<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;processor = DataProcessor()<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">assert</span> processor.process([<span className="text-green-300">1</span>, <span className="text-green-300">2</span>, <span className="text-green-300">3</span>]) == <span className="text-green-300">6</span><br/>
            </div>
          ));
        } else if (file.includes('main.cpp') || file.includes('data_processor')) {
          addLog('output', (
            <div className="text-slate-300 whitespace-pre-wrap font-mono text-sm">
              <span className="text-purple-400">#include</span> <span className="text-green-300">&lt;iostream&gt;</span><br/>
              <br/>
              <span className="text-blue-400">int</span> <span className="text-yellow-200">main</span>() {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span className="text-green-300">"Shirokuma Auto C++ Lab"</span> &lt;&lt; std::endl;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// メモリリークを引き起こすバグの例</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">int</span>* data = <span className="text-purple-400">new</span> <span className="text-blue-400">int</span>[<span className="text-green-300">100</span>];<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-300">0</span>;<br/>
              {'}'}
            </div>
          ));
        } else if (file.includes('Dockerfile')) {
          addLog('output', (
            <div className="text-slate-300 whitespace-pre-wrap font-mono text-sm">
              <span className="text-purple-400">FROM</span> ubuntu:22.04<br/>
              <span className="text-purple-400">RUN</span> apt-get update && apt-get install -y g++ cmake python3 python3-pip<br/>
              <span className="text-purple-400">RUN</span> pip3 install pytest<br/>
              <span className="text-purple-400">COPY</span> . /app<br/>
              <span className="text-purple-400">WORKDIR</span> /app<br/>
              <span className="text-purple-400">CMD</span> ["./build.sh"]
            </div>
          ));
        } else {
          addLog('error', `cat: ${file}: No such file or directory`);
        }
        break;

      case './build.sh':
        isStandardCommand = true;
        addLog('system', 'Building C++ extensions for Python...');
        await new Promise(resolve => setTimeout(resolve, 800));
        addLog('output', (
          <div className="text-slate-400 font-mono text-xs">
            Scanning dependencies of target shirokuma_cpp<br/>
            [ 50%] Building CXX object CMakeFiles/shirokuma_cpp.dir/src/data_processor.cpp.o<br/>
            [100%] Linking CXX shared module shirokuma_cpp.so<br/>
            <span className="text-green-400 font-bold">[100%] Built target shirokuma_cpp</span>
          </div>
        ));
        break;

      case 'pytest':
        isStandardCommand = true;
        addLog('system', '========================= test session starts ==========================');
        await new Promise(resolve => setTimeout(resolve, 600));
        addLog('output', (
          <div>
            platform linux -- Python 3.10.12, pytest-7.4.0<br/>
            collected 3 items<br/><br/>
            tests/test_processor.py <span className="text-green-400">.</span>
            <span className="text-green-400">.</span>
            <span className="text-green-400">.</span>
            <span className="text-green-400 ml-4">[100%]</span><br/><br/>
            <span className="text-green-400 font-bold">========================== 3 passed in 0.15s ===========================</span>
          </div>
        ));
        break;

      case 'valgrind':
        isStandardCommand = true;
        addLog('system', '==12345== Memcheck, a memory error detector');
        await new Promise(resolve => setTimeout(resolve, 600));
        addLog('output', (
          <div className="text-slate-300">
            ==12345== HEAP SUMMARY:<br/>
            ==12345==     in use at exit: 400 bytes in 1 blocks<br/>
            ==12345==   total heap usage: 45 allocs, 44 frees, 8,192 bytes allocated<br/>
            ==12345== <br/>
            <span className="text-red-400 font-bold">==12345== LEAK SUMMARY:</span><br/>
            <span className="text-red-400">==12345==    definitely lost: 400 bytes in 1 blocks</span><br/>
            ==12345== <br/>
            ==12345== ERROR SUMMARY: 1 errors from 1 contexts
          </div>
        ));
        break;

      case 'docker':
        isStandardCommand = true;
        if (trimmed.includes('build')) {
          addLog('system', 'Sending build context to Docker daemon  4.096kB');
          await new Promise(resolve => setTimeout(resolve, 400));
          addLog('output', 'Step 1/5 : FROM ubuntu:22.04\n ---> 216c552ea5ba');
          await new Promise(resolve => setTimeout(resolve, 400));
          addLog('output', 'Step 2/5 : RUN apt-get update && apt-get install -y g++ cmake\n ---> Running in 8b4a2d9c1e3f');
          await new Promise(resolve => setTimeout(resolve, 800));
          addLog('output', <span className="text-green-400">Successfully built 9d8e7f6a5b4c</span>);
        }
        break;

      default:
        addLog('error', `bash: ${baseCmd}: command not found`);
    }

    // Step verification logic
    const isMatch = currentStep && currentStep.matchKeywords.every(kw => trimmed.includes(kw));

    if (isMatch) {
      setTimeout(() => {
        addLog('system', (
          <div className="mt-4 p-4 bg-slate-800/90 border border-slate-600 rounded-2xl rounded-tl-none relative shadow-xl ml-4 animate-fade-in">
            <div className="absolute -top-5 -left-5 text-4xl drop-shadow-md">
              🐻‍❄️
            </div>
            <div className="font-bold text-cyan-300 mb-2">
              シロクマ先生の解説
            </div>
            <div className="text-slate-200 leading-relaxed text-sm">
              {currentStep.explanation.split('\n').map((line, i) => (
                <span key={i}>{line}<br/></span>
              ))}
            </div>
          </div>
        ));
      }, 500);

      const nextStepIndex = currentStepIndex + 1;
      const newProgress = { ...scenarioProgress, [activeScenarioId]: nextStepIndex };
      setScenarioProgress(newProgress);

      if (nextStepIndex >= activeScenario!.steps.length) {
        if (!completedScenarios.includes(activeScenarioId)) {
          setCompletedScenarios(prev => [...prev, activeScenarioId]);
        }
        setTimeout(() => setShowSuccessOverlay(true), 3500);
      } else {
        const nextStep = activeScenario!.steps[nextStepIndex];
        setTimeout(() => {
          addLog('system', (
            <div className="text-cyan-400 mt-6 p-3 bg-cyan-900/20 border-l-4 border-cyan-500 mb-2 rounded-r-lg shadow-lg animate-fade-in">
              <div className="font-bold text-lg mb-1 flex items-center gap-2">
                <Map size={18} /> 【STEP {nextStepIndex + 1}/{activeScenario!.steps.length}】
              </div>
              <div className="text-slate-200 whitespace-pre-wrap">{nextStep.instruction}</div>
            </div>
          ));
        }, 2000);
      }
    } else if (currentStep && !isStandardCommand) {
      addLog('error', (
        <div className="text-yellow-400 mt-2">
          ⚠️ 現在のステップの目標と異なります。<br/>
          <span className="text-yellow-200">指示: <code className="bg-navy-900 px-1 rounded">{currentStep.command}</code> と入力してトレースを進めてください。</span>
        </div>
      ));
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      if (!input) return;

      // 1. チュートリアルの現在のステップの正解コマンドに前方一致すれば優先して補完
      if (currentStep && currentStep.command.startsWith(input)) {
        setInput(currentStep.command);
        return;
      }

      // 2. 一般的な辞書補完（コマンドやファイルパス）
      const words = input.split(' ');
      const lastWord = words[words.length - 1];

      if (words.length === 1) {
        const cmds = ['cat ', 'ls', 'clear', 'pytest', './build.sh', 'valgrind ', 'docker '];
        const match = cmds.find(c => c.startsWith(input));
        if (match) setInput(match);
      } else if (lastWord) {
        const paths = ['tests/test_processor.py', 'src/main.cpp', 'Dockerfile', './app', 'build -t app .'];
        const match = paths.find(p => p.startsWith(lastWord));
        if (match) {
          words[words.length - 1] = match;
          setInput(words.join(' '));
        }
      }
    } else if (e.key === 'Enter' && !isProcessing) {
      processCommand(input);
    }
  };

  if (!isLabOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-[1400px] h-full max-h-[900px] flex flex-col bg-navy-900 border border-cyan-500/30 rounded-2xl shadow-2xl relative overflow-hidden">
        <button onClick={closeLab} className="absolute top-4 right-4 z-50 text-slate-400 hover:text-white bg-navy-800 hover:bg-navy-700 p-2 rounded-full transition-colors flex items-center justify-center border border-slate-700/50 shadow-lg cursor-pointer">
          <X size={20} />
        </button>
        <div className="p-4 lg:p-8 flex flex-col h-full min-h-0">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
              <TerminalIcon size={32} className="text-cyan-400" />
              コード実行ラボ
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base">
              手順をトレースしながら、C++の自動化技術の「仕組み」を実際に体験・理解できます。
            </p>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
            
            {/* Left Sidebar: Scenarios & Explorer */}
            <div className="hidden md:flex w-80 flex-col gap-4 overflow-hidden shrink-0">
              
              {/* Scenarios Panel */}
              <div className="bg-navy-800/80 border border-slate-700 rounded-xl flex flex-col flex-1 shadow-xl overflow-hidden min-h-0">
                <div className="bg-navy-900/80 p-3 border-b border-slate-700 text-xs font-bold text-cyan-400 tracking-wider flex items-center gap-2">
                  <Map size={14} /> ハンズオン手順
                </div>
                <div className="p-4 overflow-y-auto space-y-4">
                  {SCENARIOS.map(scenario => {
                    const isCompleted = completedScenarios.includes(scenario.id);
                    const isActive = activeScenarioId === scenario.id;
                    const stepIdx = scenarioProgress[scenario.id] || 0;
                    
                    return (
                      <div 
                        key={scenario.id}
                        onClick={() => setActiveScenarioId(scenario.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${isActive ? 'bg-cyan-900/30 border-cyan-500/50' : 'bg-navy-900/50 border-slate-700 hover:border-cyan-500/30'} ${isCompleted && !isActive ? 'opacity-70' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`text-sm font-bold ${isActive ? 'text-cyan-400' : 'text-slate-300'}`}>
                            {scenario.title}
                          </div>
                          {isCompleted && <CheckCircle2 size={16} className="text-emerald-400" />}
                        </div>
                        {isActive && (
                          <div className="mt-3">
                            <p className="text-xs text-slate-400 mb-4">{scenario.description}</p>
                            <div className="space-y-2">
                              {scenario.steps.map((step, idx) => {
                                const isStepCompleted = idx < stepIdx;
                                const isStepActive = idx === stepIdx;
                                return (
                                  <div key={idx} className={`flex items-start gap-2 text-xs ${isStepActive ? 'text-cyan-300' : isStepCompleted ? 'text-slate-500' : 'text-slate-600'}`}>
                                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${isStepActive ? 'bg-cyan-500 text-navy-900' : isStepCompleted ? 'bg-slate-700' : 'border border-slate-700'}`}>
                                      {isStepCompleted ? <CheckCircle2 size={10} /> : idx + 1}
                                    </div>
                                    <code className="font-mono">{step.command}</code>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explorer Sidebar */}
              <div className="bg-navy-800/80 border border-slate-700 rounded-xl flex flex-col h-1/3 shadow-xl overflow-hidden shrink-0">
                <div className="bg-navy-900/80 p-3 border-b border-slate-700 text-xs font-bold text-slate-400 tracking-wider">
                  EXPLORER
                </div>
                <div className="p-4 overflow-y-auto font-mono text-xs">
                  <div className="text-white font-bold mb-2 flex items-center gap-2">
                    <Folder size={14} className="text-cyan-400" />
                    shirokuma-lab/
                  </div>
                  <div className="pl-4 space-y-1.5">
                    {FILE_TREE.map((item, idx) => (
                      <div key={idx}>
                        {item.type === 'folder' ? (
                          <div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <Folder size={12} className="text-blue-400" /> {item.name}
                            </div>
                            <div className="pl-4 mt-1 space-y-1">
                              {item.children?.map((child, cIdx) => (
                                <div key={cIdx} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 cursor-default transition-colors">
                                  {child.type === 'cpp' && <FileCode size={12} className="text-indigo-400" />}
                                  {child.type === 'header' && <FileCode size={12} className="text-purple-400" />}
                                  {child.type === 'python' && <FileCode size={12} className="text-yellow-400" />}
                                  {child.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 cursor-default transition-colors">
                            {item.type === 'docker' && <HardDrive size={12} className="text-blue-500" />}
                            {item.type === 'txt' && <FileText size={12} className="text-slate-300" />}
                            {item.type === 'sh' && <TerminalIcon size={12} className="text-green-500" />}
                            {item.name}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Window */}
            <div 
              className="flex-1 bg-[#1e1e1e] border border-slate-700 rounded-xl flex flex-col overflow-hidden shadow-2xl cursor-text relative"
              onClick={focusInput}
            >
              {/* Terminal Header */}
              <div className="bg-[#2d2d2d] border-b border-slate-700 p-3 flex items-center justify-between select-none">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">bash - shirokuma@ubuntu: ~/shirokuma-lab</div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const textToCopy = history.map(h => typeof h.content === 'string' ? h.content : '').filter(Boolean).join('\n');
                    navigator.clipboard.writeText(textToCopy);
                  }}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-xs px-2 py-1 bg-navy-800 rounded border border-slate-700 transition-colors"
                  title="ログをコピー"
                >
                  <FileText size={12} /> Copy
                </button>
              </div>

              {/* Terminal Content */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm md:text-base leading-relaxed">
                {history.map((log) => (
                  <div key={log.id} className="mb-1 break-words">
                    {log.type === 'input' && (
                      <div>
                        <span className="text-green-400">shirokuma@ubuntu</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~/shirokuma-lab</span>
                        <span className="text-white">$ {log.content}</span>
                      </div>
                    )}
                    {log.type === 'output' && <div className="text-slate-300 whitespace-pre-wrap">{log.content}</div>}
                    {log.type === 'error' && <div className="text-red-400 whitespace-pre-wrap">{log.content}</div>}
                    {log.type === 'system' && <div className="text-slate-500 italic whitespace-pre-wrap">{log.content}</div>}
                  </div>
                ))}

                {/* Active Input Line */}
                <div className="flex items-center mt-2">
                  <span className="text-green-400">shirokuma@ubuntu</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~/shirokuma-lab</span>
                  <span className="text-white mx-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white outline-none border-none focus:ring-0 p-0"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
                
                <div ref={bottomRef} className="h-4" />
              </div>

              {isProcessing && (
                <div className="absolute top-4 right-4 text-cyan-400 flex items-center gap-2 text-xs font-bold animate-pulse">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                  PROCESSING
                </div>
              )}
              {showSuccessOverlay && (
                <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10 animate-fade-in">
                  <div className="bg-navy-900 border border-emerald-500/50 p-8 rounded-2xl max-w-md text-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">シナリオコンプリート！</h3>
                    <p className="text-slate-300 text-sm mb-6">
                      素晴らしい！{activeScenario?.title} の仕組みを完全にトレースしました。
                    </p>
                    <div className="space-y-3">
                      <button 
                        onClick={closeLab}
                        className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold px-8 py-3 rounded-xl transition-transform hover:scale-105 w-full cursor-pointer"
                      >
                        元のページに戻って学習を続ける
                      </button>
                      <button 
                        onClick={() => setShowSuccessOverlay(false)}
                        className="text-slate-400 hover:text-white text-sm font-bold px-8 py-2 rounded-xl transition-colors w-full cursor-pointer"
                      >
                        ターミナルに戻る
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center mt-6 pt-6 border-t border-slate-700/50 shrink-0">
            <button onClick={closeLab} className="bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)] w-full sm:w-auto cursor-pointer">
              ラボを終了して元のページに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
