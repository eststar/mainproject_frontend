"use client"

import { FaArrowLeft, FaCompass } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import SignupForm from './SignupForm';

export default function SignupPage() {
  

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black flex flex-col lg:flex-row">
      <div className="hidden lg:block relative w-1/2 h-full overflow-hidden border-r border-white/10">
        <Image 
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop"
          alt="Curator Aesthetic"
          fill
          className="object-cover opacity-60 scale-110 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-black" />
        
        <div className="absolute bottom-20 left-20 right-20 space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
            <FaCompass className="text-white/40" size={24} />
          </div>
          <div className="space-y-4">
            <h2 className="text-6xl font-serif italic text-white tracking-tighter leading-tight">Join the <br/> Archival Movement</h2>
            <p className="text-sm font-light text-gray-400 max-w-sm leading-relaxed uppercase tracking-widest">
              Access the neural studio. Curate the future of visual DNA with our proprietary intelligence engine.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 h-full bg-[#0a0a0a] flex flex-col justify-center items-center p-10 lg:p-24 relative overflow-y-auto">
        <div className="absolute top-12 left-12 lg:left-24 z-20">
          <Link 
            href="/main" 
            className="group flex items-center gap-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] hover:text-white transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-all">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-white" size={14} />
            </div>
            <span className="opacity-0 lg:group-hover:opacity-100 transition-all">Cancel Registry</span>
          </Link>
        </div>

        <div className="w-full max-w-md space-y-16 py-20 lg:py-0 animate-in fade-in slide-in-from-right-10 duration-1000">
          <header className="space-y-6">
            <h1 className="text-3xl font-serif italic tracking-[0.5em] text-white uppercase border-b border-white/10 pb-6">Registry</h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.6em]">New Curator Application</p>
          </header>
          <SignupForm />
         
        </div>
      </div>
    </main>
  );
}
