'use client';

import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

export default function IntroPage() {
  return (
    /* 고정 다크 배경: bg-neutral-950 */
    <main className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white">

      {/* 1. 배경 이미지: 다크 감성에 맞춰 투명도 30% 고정 */}
      <Image
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
        alt="Fashion Hero Background"
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-30 scale-105 transition-transform duration-[10s] hover:scale-100"
      />

      {/* 2. 시그니처 보라색 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-950/40 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-black/40" />

      {/* 3. 콘텐츠 레이어 */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-10 py-12">

        {/* Header 영역 */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/10 pb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">Issue No. 001</div>
          <h1 className="font-serif text-2xl italic tracking-[0.3em] text-violet-100">ATELIER</h1>
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">2026 Archive</div>
        </header>

        {/* Hero Section: 고정된 다크 스타일 타이포그래피 */}
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="mb-8 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-violet-300">New Protocol Ready</span>
          </div>

          {/* 하이엔드 텍스트 그라데이션 고정 */}
          <h2 className="mb-12 bg-linear-to-b from-white to-violet-200 bg-clip-text font-serif text-[12vw] leading-[0.85] italic tracking-tighter text-transparent md:text-[10vw]">
            Curated <br /> Intelligence
          </h2>

          <p className="mx-auto max-w-md text-sm font-light uppercase leading-relaxed tracking-widest text-neutral-400">
            A high-fidelity visual archive for the modern curator. <br />
            Analyze, filter, and discover the DNA of fashion.
          </p>

          {/* Access 버튼: 고정 화이트 스타일 */}
          <Link
            href="/main"
            className="group mt-16 bg-white px-16 py-6 text-black transition-all duration-500 hover:bg-violet-600 hover:text-white shadow-2xl shadow-violet-500/20 active:scale-95"
          >
            <span className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em]">
              Access the Archive
              <FaArrowRight className="transition-transform group-hover:translate-x-2" />
            </span>
          </Link>
        </div>

        {/* Footer 영역 */}
        <footer className="mx-auto flex w-full max-w-7xl items-end justify-between opacity-30">
          <div className="text-[8px] font-bold uppercase tracking-[0.5em]">© 2026 ATELIER Studio</div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em]">
            <span className="cursor-pointer hover:text-violet-400 transition-colors">Vision</span>
            <span className="cursor-pointer hover:text-violet-400 transition-colors">Protocol</span>
          </div>
        </footer>
      </div>
    </main>
  );
}