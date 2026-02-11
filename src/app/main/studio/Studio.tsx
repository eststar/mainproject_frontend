"use client"
import React, { useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// 컴포넌트들
import ResultGrid from './components/ResultGrid';
import ModeTabs from './components/ModeTabs';
import DiscoveryPanel from './components/DiscoveryPanel';
import UploadPanel from './components/UploadPanel';
import AnalysisSection from './components/AnalysisSection';

import { ProductType, RecommendData } from '@/types/ProductType';

export type StudioMode = 'imageDiscovery' | 'imageInput';

export default function Studio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const mode: StudioMode = modeParam === 'imageInput' ? 'imageInput' : 'imageDiscovery';

  const [isPending, startTransition] = useTransition();

  // [핵심 데이터] 결과 데이터와 분석용 이미지 정보
  const [results, setResults] = useState<RecommendData[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [analysisImage, setAnalysisImage] = useState<string | null>(null);
  const [analysisName, setAnalysisName] = useState<string | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 결과 처리 핸들러
  const handleSearchResult = (data: RecommendData[] | null, category?: string) => {
    setResults(data);
    // console.log("추천 데이터", data);

    if (category) setActiveCategory(category);
    setIsAnalyzing(false);
  };

  // 분석 시작 핸들러
  const handleAnalysisStart = (imgUrl: string, name?: string) => {
    setAnalysisImage(imgUrl);
    setAnalysisName(name);
    setIsAnalyzing(true);
  };

  // 결과 화면에서 다시 검색 화면으로 돌아가기
  const handleBackToSearch = () => {
    setResults(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6 lg:space-y-10 max-w-7xl mx-auto w-full px-4 lg:px-0">
      {!results && (
        <ModeTabs mode={mode} onModeChange={(newMode) => {
          setResults(null);
          router.push(`/main/studio?mode=${newMode}`, { scroll: false });
        }} />
      )}

      {results ? (
        /* 결과 화면: 분석 정보 카드와 결과 그리드 카드를 분리하여 표시 */
        <div className="space-y-10 animate-in fade-in slide-in-from-right duration-500 pb-20">

          {/* Card 1: Analysis Section (스크롤 없이 전체 노출) */}
          <div className="bg-white dark:bg-neutral-900/50 rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-200 dark:border-white/5 shadow-xl p-6 lg:p-12">
            <button
              onClick={handleBackToSearch}
              className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-widest hover:underline mb-10"
            >
              ← Back to Discovery
            </button>
            <AnalysisSection
              sourceImage={analysisImage}
              productName={analysisName}
              isLoading={isAnalyzing}
            />
          </div>

          {/* Card 2: Strategic Result Grid (고정 높이 및 내부 스크롤) */}
          <div className="bg-white dark:bg-neutral-900/50 rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-200 dark:border-white/5 shadow-xl p-6 lg:p-12 h-[800px] lg:h-[900px] flex flex-col">
            <ResultGrid
              isActive={true}
              isPending={isPending}
              products={results}
              title="Neural Recommendations"
              onProductClick={(product: any) => {
                setAnalysisImage(product.imageUrl);
                setAnalysisName(product.productName);
                // 클릭 시 상단 분석표로 스크롤 이동 (선택 사항)
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      ) : (
        /* 입력 화면: 단일 카드 레이아웃 유지 */
        <div className={`
          bg-white dark:bg-neutral-900/50 
          rounded-4xl lg:rounded-[2.5rem] 
          border border-neutral-200 dark:border-white/5 
          shadow-xl overflow-hidden flex flex-col 
          transition-all duration-500 ease-in-out
          min-h-[500px]
          ${mode === 'imageInput' ? 'lg:h-[600px]' : 'lg:h-[1100px]'}
        `}>
          <div className="flex-1 flex flex-col p-6 lg:p-12 overflow-hidden h-full">
            {mode === 'imageDiscovery' ? (
              <DiscoveryPanel
                onResultFound={handleSearchResult}
                onAnalysisStart={handleAnalysisStart}
                isPending={isPending}
                startTransition={startTransition}
              />
            ) : (
              <UploadPanel
                onResultFound={handleSearchResult}
                onAnalysisStart={handleAnalysisStart}
                onAnalysisCancel={() => setAnalysisImage(null)}
                isPending={isPending}
                startTransition={startTransition}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}