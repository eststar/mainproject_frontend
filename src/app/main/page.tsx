'use client';

import React from 'react';
import { FaArrowRight, FaMicrochip, FaChartLine, FaShieldHalved } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

export default function MainPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-16">
      
      {/* Header: justify-between은 이미 flex를 포함하므로 block 제거 */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 dark:border-violet-900/20 pb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-500 uppercase tracking-widest">Central Console</span>
            <div className="h-px w-12 bg-violet-200 dark:bg-violet-800"></div>
          </div>
          <h2 className="text-6xl font-serif italic tracking-tighter text-neutral-900 dark:text-white">Overview</h2>
        </div>
        <div className="flex items-center gap-4 px-5 py-2 bg-violet-50 dark:bg-violet-950/30 rounded-full border border-violet-100 dark:border-violet-900/40">
           <FaShieldHalved className="text-violet-500" size={12} />
           <span className="text-[10px] font-bold text-violet-800 dark:text-violet-300 uppercase tracking-widest">System Integrity: 100%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Card 1: Archive Studio */}
        <Link 
          href="/main/studio"
          className="lg:col-span-2 group relative h-[560px] bg-neutral-900 rounded-[3rem] overflow-hidden border border-neutral-200 dark:border-white/5 transition-shadow hover:shadow-xl"
        >
          <Image 
            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop"
            alt="Studio Background"
            fill
            priority
            className="opacity-30 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-12 left-12 right-12 space-y-8">
            <div className="w-20 h-20 rounded-4xl bg-violet-600/20 backdrop-blur-3xl flex items-center justify-center border border-white/10">
              <FaMicrochip className="text-white text-4xl" />
            </div>
            <div className="space-y-4">
              <h3 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">Archive Studio</h3>
              <p className="text-lg md:text-xl font-light text-violet-100/60 max-w-lg leading-relaxed font-serif italic">
                Neural indexing for aesthetic curation.
              </p>
            </div>
            {/* transition-all은 기본 제공 클래스입니다. */}
            <div className="flex items-center gap-6 text-[11px] font-bold text-white uppercase tracking-widest transition-all group-hover:gap-10">
              Initialize Engine <FaArrowRight className="text-violet-400 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </Link>

        {/* Card 2: Statistics Dashboard */}
        <Link 
          href="/main/statistics"
          className="relative flex flex-col justify-between overflow-hidden rounded-[3rem] border border-neutral-200 bg-white p-10 dark:border-white/5 dark:bg-neutral-900/50 md:p-14 group shadow-sm transition-colors hover:border-violet-500/40"
        >
          <div className="relative z-10 space-y-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-600 shadow-lg group-hover:bg-violet-500">
              <FaChartLine className="text-white text-2xl" />
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-violet-500">Archival Scale</h4>
              <p className="text-7xl font-serif italic tracking-tighter text-neutral-900 dark:text-white">12,482</p>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">+12.4%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Growth</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col gap-6 border-t border-neutral-200 pt-12 dark:border-white/5">
            <div className="flex items-center gap-4">
               {/* animate-pulse는 Tailwind 공식 기본 클래스입니다. (완전 제거를 원하시면 이 줄의 animate-pulse만 지우세요) */}
               <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse"></div>
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest dark:text-violet-700">Sync Active</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-bold text-neutral-900 uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100 dark:text-violet-100">
              View Analytics <FaArrowRight className="transition-transform group-hover:translate-x-2" />
            </div>
          </div>

          <div className="absolute -right-24 -bottom-24 pointer-events-none opacity-5 transition-transform duration-1000 group-hover:rotate-12 dark:text-white">
            <FaChartLine size={400} />
          </div>
        </Link>
      </div>
    </div>
  );
}