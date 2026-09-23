const fs = require('fs');
let code = fs.readFileSync('src/components/CodeLab.tsx', 'utf8');

const target = `      case 'ls':
        addLog('output', (
          <div className="flex gap-4 text-cyan-200">
            <span className="text-blue-400 font-bold">src/</span>
            <span className="text-blue-400 font-bold">tests/</span>
            <span>CMakeLists.txt</span>
            <span>Dockerfile</span>
            <span className="text-green-400">build.sh</span>
          </div>
        ));
        break;`;

const replacement = `      case 'ls':
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
          addLog('error', \`cat: \${file}: No such file or directory\`);
        }
        break;`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/CodeLab.tsx', code, 'utf8');
