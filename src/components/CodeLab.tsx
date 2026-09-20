import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Folder, FileCode, FileText, HardDrive } from 'lucide-react';

type LogEntry = {
  id: number;
  type: 'input' | 'output' | 'error' | 'system';
  content: React.ReactNode;
};

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

      case 'g++':
        if (trimmed.includes('main.cpp')) {
          addLog('system', 'Compiling main.cpp...');
          await new Promise(resolve => setTimeout(resolve, 800));
          addLog('output', 'Compilation finished successfully.');
        } else {
          addLog('error', 'g++: fatal error: no input files');
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
          addLog('system', 'Sending build context to Docker daemon  4.096kB');
          await new Promise(resolve => setTimeout(resolve, 400));
          addLog('output', 'Step 1/5 : FROM ubuntu:22.04\n ---> 216c552ea5ba');
          await new Promise(resolve => setTimeout(resolve, 400));
          addLog('output', 'Step 2/5 : RUN apt-get update && apt-get install -y g++ cmake\n ---> Running in 8b4a2d9c1e3f');
          await new Promise(resolve => setTimeout(resolve, 800));
          addLog('output', <span className="text-green-400">Successfully built 9d8e7f6a5b4c</span>);
        } else {
          addLog('error', 'docker: "build" requires 1 argument.');
        }
        break;

      default:
        addLog('error', `bash: ${baseCmd}: command not found`);
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      processCommand(input);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
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
        
        {/* Explorer Sidebar */}
        <div className="hidden md:flex w-64 bg-navy-800/80 border border-slate-700 rounded-xl flex-col overflow-hidden shadow-xl">
          <div className="bg-navy-900/80 p-3 border-b border-slate-700 text-xs font-bold text-slate-400 tracking-wider">
            EXPLORER
          </div>
          <div className="p-4 overflow-y-auto font-mono text-sm">
            <div className="text-white font-bold mb-2 flex items-center gap-2">
              <Folder size={16} className="text-cyan-400" />
              shirokuma-lab/
            </div>
            <div className="pl-4 space-y-2">
              {FILE_TREE.map((item, idx) => (
                <div key={idx}>
                  {item.type === 'folder' ? (
                    <div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Folder size={14} className="text-blue-400" /> {item.name}
                      </div>
                      <div className="pl-4 mt-1 space-y-1">
                        {item.children?.map((child, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 cursor-default transition-colors">
                            {child.type === 'cpp' && <FileCode size={14} className="text-indigo-400" />}
                            {child.type === 'header' && <FileCode size={14} className="text-purple-400" />}
                            {child.type === 'python' && <FileCode size={14} className="text-yellow-400" />}
                            {child.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 cursor-default transition-colors">
                      {item.type === 'docker' && <HardDrive size={14} className="text-blue-500" />}
                      {item.type === 'txt' && <FileText size={14} className="text-slate-300" />}
                      {item.type === 'sh' && <TerminalIcon size={14} className="text-green-500" />}
                      {item.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div 
          className="flex-1 bg-[#1e1e1e] border border-slate-700 rounded-xl flex flex-col overflow-hidden shadow-2xl cursor-text relative"
          onClick={focusInput}
        >
          {/* Terminal Header */}
          <div className="bg-[#2d2d2d] border-b border-slate-700 p-3 flex items-center gap-4 select-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-slate-400 font-mono">bash - shirokuma@ubuntu: ~/shirokuma-lab</div>
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
        </div>
      </div>
    </div>
  );
}
