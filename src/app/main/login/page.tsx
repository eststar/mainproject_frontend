

import { FaArrowRight, FaFingerprint, FaArrowLeft, FaKey } from 'react-icons/fa6';
import Link from 'next/link';

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 링크 대신 router 대신 Link로 구현하기"/main"
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black opacity-80" />
      
      <div className="absolute top-12 left-12 z-20">
        <Link 
          href="/main" 
          className="group flex items-center gap-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] hover:text-white transition-all"
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white/5 transition-all">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-white" size={16} />
          </div>
          <span className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">Back to Archive</span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-20 animate-in fade-in zoom-in-95 duration-1000">
        <div className="text-center space-y-8">
          <div className="inline-block p-4 rounded-full border border-white/5 bg-white/5 mb-4">
             <FaKey className="text-white/20" size={20} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-serif italic tracking-[0.6em] text-white uppercase ml-[0.6em]">ATELIER</h1>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.8em]">Security Protocol v.1.2</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-10">
            <div className="group relative border-b border-white/10 focus-within:border-white transition-colors py-4">
              <label className="absolute -top-6 left-0 text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Identifier</label>
              <input 
                type="email" 
                placeholder="ID@ATELIER.SO"
                className="w-full bg-transparent border-none outline-none text-white text-base font-light placeholder:text-neutral-800 tracking-[0.2em] py-2"
                required
              />
            </div>
            <div className="group relative border-b border-white/10 focus-within:border-white transition-colors py-4">
              <label className="absolute -top-6 left-0 text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Access Key</label>
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full bg-transparent border-none outline-none text-white text-base font-light placeholder:text-neutral-800 tracking-[0.2em] py-2"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <button 
              type="submit"
              className="w-full py-7 bg-white text-black text-[11px] font-bold uppercase tracking-[0.8em] hover:bg-neutral-200 transition-all flex items-center justify-center gap-6 group shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Authenticate <FaArrowRight className="group-hover:translate-x-3 transition-transform" />
            </button>
            
            <div className="flex flex-col items-center gap-6">
              <Link href="/main/signup" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                New Curator? Request Registry
              </Link>
              <div className="flex items-center gap-3 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                <FaFingerprint size={14} className="opacity-40" /> Biometric Bridge Ready
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
