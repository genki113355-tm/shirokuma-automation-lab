const fs = require('fs');
let code = fs.readFileSync('src/components/CodeLab.tsx', 'utf8');

const targetReturn = `  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto h-[calc(100vh-3.5rem)] flex flex-col">`;

const replacementReturn = `  if (!isLabOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-[1400px] h-full max-h-[900px] flex flex-col bg-navy-900 border border-cyan-500/30 rounded-2xl shadow-2xl relative overflow-hidden">
        <button onClick={closeLab} className="absolute top-4 right-4 z-50 text-slate-400 hover:text-white bg-navy-800 hover:bg-navy-700 p-2 rounded-full transition-colors flex items-center justify-center border border-slate-700/50 shadow-lg cursor-pointer">
          <X size={20} />
        </button>
        <div className="p-4 lg:p-8 flex flex-col h-full min-h-0">`;

code = code.replace(targetReturn, replacementReturn);

const bottomTarget = `      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-slate-700/50 gap-6">
        <Link to="/" className="text-slate-400 hover:text-cyan-400 text-sm font-bold flex items-center gap-2 transition-colors order-2 sm:order-1">
          <ArrowLeft size={16} /> トップ（目次）へ戻る
        </Link>
        <Link to="/chapter/1" className="bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)] w-full sm:w-auto order-1 sm:order-2">
          第1章へ進む <ArrowRight size={20} />
        </Link>
      </div>`;

const bottomReplacement = `      {/* Navigation Links */}
      <div className="flex justify-center mt-6 pt-6 border-t border-slate-700/50 shrink-0">
        <button onClick={closeLab} className="bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)] w-full sm:w-auto cursor-pointer">
          ミッションを終了して元のページに戻る
        </button>
      </div>
      </div>`;

code = code.replace(bottomTarget, bottomReplacement);
fs.writeFileSync('src/components/CodeLab.tsx', code, 'utf8');
