"use client"
import { 
  FaImage, 
  FaXmark, 
  FaWandMagicSparkles, 
  FaTag, 
  FaPalette, 
  FaLayerGroup,
  FaArrowRightLong
} from 'react-icons/fa6';
import Image from 'next/image';

import { useState, useRef } from 'react';
import { useTransition } from 'react';
import { Suspense } from 'react';

import ImageAnalyzer from './ImageAnalyzer';
import ResultGrid from '@/components/ResultGrid';

// interface ImageInputClientProps {
//   serverAction: () => {}};
// }

export default function ImageInput(/* { serverAction } */) {

  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<any[] | null>(null);

  // 이벤트 핸들러: 상태를 변경해야 하므로 컴포넌트 내부에 위치
  // const handleAction = async (analysisData: any) => {
  //   startTransition(async () => {
  //     try {
  //       const data = await serverAction(analysisData);
  //       // 네트워크 지연 시뮬레이션
  //       await new Promise(resolve => setTimeout(resolve, 1500));
  //       setResults(data || []); 
  //     } catch (error) {
  //       console.error("Action failed", error);
  //     }
  //   });
  // };

  return (
    <>
      <section>
        <ImageAnalyzer 
          onAction={()=>{}/* handleAction */} 
          isExternalLoading={isPending}
        />
      </section>

      <section className="pt-12">
        {/* Suspense fallback으로 컴포넌트 외부의 Skeleton 사용 */}
        <Suspense fallback={<ResultGridSkeleton />}>
          <ResultGrid 
            isActive={results !== null && !isPending} 
            title="Neural Match Results"
            subtitle="Archive Discovery"
          />
        </Suspense>
      </section>
    </>
  );
};


const ResultGridSkeleton = () => (
  <div className="space-y-10 py-16 animate-pulse">
    <div className="flex justify-between items-end border-b border-black/5 pb-10">
      <div className="space-y-4">
        <div className="w-24 h-3 bg-gray-100 rounded"></div>
        <div className="w-64 h-10 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3].map(i => <div key={i} className="w-20 h-8 bg-gray-100 rounded-full"></div>)}
      </div>
    </div>
    <div className="grid grid-cols-4 gap-10">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="space-y-6">
          <div className="aspect-3/4 bg-gray-100 rounded-4xl"></div>
          <div className="space-y-2">
            <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
            <div className="w-full h-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);