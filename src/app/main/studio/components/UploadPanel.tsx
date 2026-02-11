'use client';

import React, { useState, useRef } from 'react';
import { FaCloudArrowUp, FaXmark, FaMagnifyingGlass } from 'react-icons/fa6';
import Image from 'next/image';
import { RecommendData } from '@/types/ProductType';
import { getRecommendList } from '@/app/api/productService/productapi';
import { postImage } from '@/app/api/imageService/Imageapi';

interface UploadPanelProps {
  onResultFound: (results: any[] | null) => void;
  onAnalysisStart: (imgUrl: string, name?: string) => void;
  onAnalysisCancel: () => void;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

export default function UploadPanel({ onResultFound, onAnalysisStart, onAnalysisCancel, isPending, startTransition }: UploadPanelProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onAnalysisStart(result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setSelectedFile(null);
    onAnalysisCancel();
    // 검색 결과도 같이 초기화를 원할 경우
    onResultFound(null);
  };

  const handleSearch = () => {
    if (!selectedFile) return;

    startTransition(async () => {
      // 1. 즉시 결과 페이지(로딩 상태)로 진입
      onResultFound([]);

      try {
        // 2. 이미지 서버 전송
        const uploadResult = await postImage(selectedFile);
        console.log("Upload Success:", uploadResult);

        // 3. 분석 후 추천 리스트 가져오기 (가상의 딜레이 포함 시나리오)
        // 실제 API 연결 시 productId 등을 uploadResult에서 받아올 수 있습니다.
        const results: RecommendData[] = await getRecommendList("AKA3CA001");

        onResultFound(results);
      } catch (e) {
        console.error("검색 실패:", e);
        // 에러 시 사용자에게 알림을 주거나 빈 결과 전달
        onResultFound(null);
      }
    });
  };

  return (
    <div className="h-full flex flex-col justify-center py-10 lg:py-0">
      <div className="max-w-2xl mx-auto w-full">
        {!preview ? (
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
          <div className="relative aspect-video rounded-4xl overflow-hidden border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900/50">
            <Image
              src={preview}
              alt="Target"
              fill
              className="object-contain p-4"
              unoptimized
            />
            <button
              onClick={handleCancel}
              className="absolute top-6 right-6 w-10 h-10 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors shadow-lg"
            >
              <FaXmark size={14} />
            </button>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleSearch}
            disabled={!preview || isPending}
            className="w-full py-5 bg-violet-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full disabled:opacity-30 flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg"
          >
            {isPending ? (
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