import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Folder, FileCode, FileText, HardDrive, Target, CheckCircle2, X } from 'lucide-react';
import { useLab } from '../contexts/LabContext';

type LogEntry = {
  id: number;
  type: 'input' | 'output' | 'error' | 'system';
  content: React.ReactNode;
};

const MISSIONS = [
  {
    id: 1,
    title: '手動テスト地獄からの解放',
    problem: 'コードを変更するたびに、手作業で100個のケースをテストしていて日が暮れそうです。',
    goal: 'Pythonのテストフレームワークを使って、C++のロジックを一括テストしましょう。',
    command: 'pytest',
    hint: 'まずは cat tests/test_processor.py で仕組みを見てから、pytest で実行！'
  },
  {
    id: 2,
    title: '見えないメモリリークを暴け',
    problem: '長時間稼働させるとサーバーがクラッシュします。メモリリークが疑われますが、目視では見つかりません。',
    goal: '動的解析ツールを使って、メモリリークの箇所を特定しましょう。',
    command: 'valgrind ./app',
    hint: 'valgrind ./app と入力してEnter'
  },
  {
    id: 3,
    title: '「私のPCでは動いた」撲滅',
    problem: '自分のMacではビルドできるのに、CIサーバー（Linux）だとビルドがコケます。',
    goal: 'Dockerを使って、どこでも同じ環境でビルドできるコンテナを作りましょう。',
    command: 'docker build -t app .',
    hint: 'docker build -t app . と入力してEnter'
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
  const [activeMissionId, setActiveMissionId] = useState(1);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  
  useEffect(() => {
    setShowSuccessOverlay(false);
    const mission = MISSIONS.find(m => m.id === activeMissionId);
    if (mission) {
      setHistory(prev => [
        ...prev,
        { 
          id: Date.now() + Math.random(), 
          type: 'system', 
          content: (
            <div className="text-cyan-400 mt-2 p-2 bg-cyan-900/20 border-l-2 border-cyan-500 mb-2">
              <strong>【MISSION: {mission.title}】</strong><br/>
              {mission.problem}<br/>
              ➔ <strong>{mission.goal}</strong><br/>
              <span className="text-cyan-200">💡 ヒント: <code className="bg-navy-900 px-1 rounded">{mission.hint}</code></span>
            </div>
          )
        }
      ]);
    }
  }, [activeMissionId]);
  const activeMission = MISSIONS.find(m => m.id === activeMissionId);

  const [history, setHistory] = useState<LogEntry[]>([
    { id: 1, type: 'system', content: 'Welcome to Shirokuma Auto C++ Execution Lab.' },
    { id: 2, type: 'system', content: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    switch (baseCmd) {
      case 'help':
        addLog('output', (
          <div className="text-slate-300">
            Available commands:<br/>
            <span className="text-cyan-400">ls</span> - List files in current directory<br/>
            <span className="text-cyan-400">g++ main.cpp</span> - Compile C++ code<br/>
            <span className="text-cyan-400">./a.out</span> - Execute compiled binary<br/>
            <span className="text-cyan-400">pytest</span> - Run Python automated tests<br/>
            <span className="text-cyan-400">valgrind ./a.out</span> - Run memory check<br/>
            <span className="text-cyan-400">docker build .</span> - Build container image<br/>
            <span className="text-cyan-400">clear</span> - Clear terminal
          </div>
        ));
        break;
      
      case 'clear':
        setHistory([]);
        break;

      case 'ls':
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
              <span className="text-slate-500">// ... implementation of data processor ...</span>
            </div>
          ));
        } else if (file.includes('Dockerfile')) {
          addLog('output', (
            <div className="text-slate-300 whitespace-pre-wrap font-mono text-sm">
              <span className="text-purple-400">FROM</span> ubuntu:22.04<br/>
              <span className="text-purple-400">RUN</span> apt-get update && apt-get install -y g++ cmake<br/>
              <span className="text-purple-400">COPY</span> . /app<br/>
              <span className="text-purple-400">WORKDIR</span> /app<br/>
              <span className="text-purple-400">CMD</span> ["./build.sh"]
            </div>
          ));
        } else {
          addLog('error', `cat: ${file}: No such file or directory`);
        }
        break;

      case 'g++':
        if (trimmed.includes('main.cpp')) {
          addLog('system', 'Compiling main.cpp...');
          await new Promise(resolve => setTimeout(resolve, 800));
          addLog('output', 'Compilation finished successfully.');
        } else {
          addLog('error', (
            <div>
              g++: fatal error: no input files<br/>
              <span className="text-cyan-400 mt-1 inline-block">💡 ヒント: コンパイルする対象ファイルが指定されていません。例: <code className="bg-navy-900 px-1 rounded">g++ main.cpp</code></span>
            </div>
          ));
        }
        break;

      case './a.out':
      case './app':
        addLog('output', (
          <div className="text-slate-300">
            [INFO] Starting data processing...<br/>
            [INFO] Loaded 1000 records.<br/>
            <span className="text-green-400">[SUCCESS] Processing complete in 12ms.</span>
          </div>
        ));
        break;

      case 'pytest':
        addLog('system', '========================= test session starts ==========================');
        await new Promise(resolve => setTimeout(resolve, 400));
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
        if (args.length < 2) {
          addLog('error', (
            <div>
              valgrind: no program specified<br/>
              <span className="text-cyan-400 mt-1 inline-block">💡 ヒント: メモリチェックする対象の実行ファイルを指定してください。例: <code className="bg-navy-900 px-1 rounded">valgrind ./app</code></span>
            </div>
          ));
          break;
        }
        addLog('system', '==12345== Memcheck, a memory error detector');
        await new Promise(resolve => setTimeout(resolve, 600));
        addLog('output', (
          <div className="text-slate-300">
            ==12345== HEAP SUMMARY:<br/>
            ==12345==     in use at exit: 0 bytes in 0 blocks<br/>
            ==12345==   total heap usage: 45 allocs, 45 frees, 8,192 bytes allocated<br/>
            ==12345== <br/>
            <span className="text-green-400 font-bold">==12345== All heap blocks were freed -- no leaks are possible</span><br/>
            ==12345== <br/>
            ==12345== ERROR SUMMARY: 0 errors from 0 contexts
          </div>
        ));
        break;

      case 'docker':
        if (trimmed.includes('build')) {
          if (!trimmed.endsWith('.')) {
            addLog('error', (
              <div>
                ERROR: "docker build" requires exactly 1 argument.<br/>
                <span className="text-cyan-400 mt-1 inline-block">💡 ヒント: ビルド対象のディレクトリ（カレントディレクトリを示す <code className="bg-navy-900 px-1 rounded">.</code>）を指定し忘れましたか？例: <code className="bg-navy-900 px-1 rounded">docker build .</code></span>
              </div>
            ));
            break;
          }
          addLog('system', 'Sending build context to Docker daemon  4.096kB');
          await new Promise(resolve => setTimeout(resolve, 400));
          addLog('output', 'Step 1/5 : FROM ubuntu:22.04\n ---> 216c552ea5ba');
          await new Promise(resolve => setTimeout(resolve, 400));
          addLog('output', 'Step 2/5 : RUN apt-get update && apt-get install -y g++ cmake\n ---> Running in 8b4a2d9c1e3f');
          await new Promise(resolve => setTimeout(resolve, 800));
          addLog('output', <span className="text-green-400">Successfully built 9d8e7f6a5b4c</span>);
        } else {
          addLog('error', 'docker: command not found or invalid syntax');
        }
        break;

      default:
        addLog('error', `bash: ${baseCmd}: command not found`);
    }

    // Check if mission completed
    if (activeMission && trimmed === activeMission.command) {
      if (!completedMissions.includes(activeMission.id)) {
        setCompletedMissions(prev => [...prev, activeMission.id]);
        addLog('system', (
          <div className="mt-4 p-3 bg-emerald-900/30 border border-emerald-500/50 rounded-lg text-emerald-400 font-bold flex items-center gap-2 animate-pulse">
            <CheckCircle2 size={18} />
            ミッション「{activeMission.title}」を達成しました！
          </div>
        ));
      }
      setTimeout(() => setShowSuccessOverlay(true), 1500);
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
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
          ブラウザ上でコマンドを打ち込み、C++のビルドや自動テストを疑似体験できます。
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        
        {/* Left Sidebar: Missions & Explorer */}
        <div className="hidden md:flex w-72 flex-col gap-4 overflow-hidden">
          
          {/* Missions Panel */}
          <div className="bg-navy-800/80 border border-slate-700 rounded-xl flex flex-col flex-1 shadow-xl overflow-hidden">
            <div className="bg-navy-900/80 p-3 border-b border-slate-700 text-xs font-bold text-cyan-400 tracking-wider flex items-center gap-2">
              <Target size={14} /> MISSIONS
            </div>
            <div className="p-4 overflow-y-auto space-y-4">
              {MISSIONS.map(mission => {
                const isCompleted = completedMissions.includes(mission.id);
                const isActive = activeMissionId === mission.id;
                return (
                  <div 
                    key={mission.id}
                    onClick={() => setActiveMissionId(mission.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${isActive ? 'bg-cyan-900/30 border-cyan-500/50' : 'bg-navy-900/50 border-slate-700 hover:border-cyan-500/30'} ${isCompleted ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`text-sm font-bold ${isActive ? 'text-cyan-400' : 'text-slate-300'}`}>
                        {mission.title}
                      </div>
                      {isCompleted && <CheckCircle2 size={16} className="text-emerald-400" />}
                    </div>
                    {isActive && (
                      <div className="text-xs text-slate-400 space-y-2 mt-2">
                        <p><strong className="text-slate-300">問題:</strong> {mission.problem}</p>
                        <p><strong className="text-slate-300">目標:</strong> {mission.goal}</p>
                        {!isCompleted && (
                          <div className="bg-navy-900 p-2 rounded border border-slate-700 text-cyan-200 mt-2">
                            💡 ヒント: <code className="bg-black/50 px-1 py-0.5 rounded">{mission.hint}</code>
                          </div>
                        )}
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
                alert('ログをクリップボードにコピーしました');
              }}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-xs px-2 py-1 bg-navy-800 rounded border border-slate-700 transition-colors"
              title="実行ログをコピー"
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
            <div className="flex items-center">
              <span className="text-green-400">shirokuma@ubuntu</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~/shirokuma-lab</span>
              <span className="text-white mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
                maxLength={100}
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
                <h3 className="text-2xl font-black text-white mb-2">ミッションクリア！</h3>
                <p className="text-slate-300 text-sm mb-6">
                  素晴らしい！{activeMission?.title}の自動化に成功しました。
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
                    ターミナルに戻る（再プレイ）
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
          ミッションを終了して元のページに戻る
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}
