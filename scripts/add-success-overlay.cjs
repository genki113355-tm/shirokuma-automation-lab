const fs = require('fs');
let code = fs.readFileSync('src/components/CodeLab.tsx', 'utf8');

const terminalContentEnd = `          {isProcessing && (
            <div className="absolute top-4 right-4 text-cyan-400 flex items-center gap-2 text-xs font-bold animate-pulse">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              PROCESSING
            </div>
          )}`;

const successOverlay = `          {isProcessing && (
            <div className="absolute top-4 right-4 text-cyan-400 flex items-center gap-2 text-xs font-bold animate-pulse">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              PROCESSING
            </div>
          )}
          {activeMission && completedMissions.includes(activeMission.id) && (
            <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10 animate-fade-in">
              <div className="bg-navy-900 border border-emerald-500/50 p-8 rounded-2xl max-w-md text-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">ミッションクリア！</h3>
                <p className="text-slate-300 text-sm mb-8">
                  素晴らしい！{activeMission.title}の自動化に成功しました。
                </p>
                <button 
                  onClick={closeLab}
                  className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold px-8 py-3 rounded-xl transition-transform hover:scale-105 w-full cursor-pointer"
                >
                  元のページに戻って学習を続ける
                </button>
              </div>
            </div>
          )}`;

code = code.replace(terminalContentEnd, successOverlay);
fs.writeFileSync('src/components/CodeLab.tsx', code, 'utf8');
