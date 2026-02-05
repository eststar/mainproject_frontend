'use client';

import React, { useState, useRef } from 'react';
import { FaCloudArrowUp, FaXmark, FaMagnifyingGlass } from 'react-icons/fa6';
// import { searchArchive } from '../../../services/apiService';
import Image from 'next/image';

interface UploadPanelProps {
  onResultFound: (results: any[] | null) => void;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

/**
 * [UploadPanel]
 * 이미지 업로드 기반 탐색 패널입니다.
 * 모든 애니메이션 클래스를 제거하고 표준 v4 문법을 적용했습니다.
 */
export default function UploadPanel({ onResultFound, isPending, startTransition }: UploadPanelProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (!preview) return;
    
    startTransition(async () => {
      // try {
      //   const results = await searchArchive({ mode: 'visual', image: preview });
      //   onResultFound(results);
      // } catch (e) {
      //   console.error("비주얼 검색 실패:", e);
      // }
    });
  };

  return (
    <div className="space-y-10">
      <div className="max-w-2xl mx-auto">
        {!preview ? (
          /* [업로드 대기 상태] */
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group aspect-video border-2 border-dashed border-neutral-200 dark:border-white/5 rounded-4xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-violet-400 dark:hover:border-violet-500 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-white dark:bg-neutral-900/50 flex items-center justify-center text-gray-400 group-hover:text-violet-600 transition-colors">
              <FaCloudArrowUp size={24} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Upload reference for indexing
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
        ) : (
          /* [업로드 완료 상태] */
          <div className="relative aspect-video rounded-4xl overflow-hidden border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900/50">
            {/* Next.js Image Component */}
            <Image 
              src={preview} 
              alt="Target" 
              fill 
              className="object-contain p-4" 
              unoptimized // Base64 미리보기 이미지이므로 최적화 제외
            />
            <button 
              onClick={() => setPreview(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors shadow-lg"
            >
              <FaXmark size={14} />
            </button>
          </div>
        )}

        {/* 분석 실행 버튼 */}
        <div className="mt-8">
          <button 
            onClick={handleSearch}
            disabled={!preview || isPending}
            className="w-full py-5 bg-violet-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full disabled:opacity-30 flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg"
          >
            {isPending ? (
              /* animate-pulse는 Tailwind 표준 클래스입니다. */
              <span className="animate-pulse">Processing DNA...</span>
            ) : (
              <>
                <FaMagnifyingGlass size={12} /> 
                <span>Scan Reference</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}