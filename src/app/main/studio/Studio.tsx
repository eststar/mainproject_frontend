"use client"
import React, { useState, useTransition } from 'react';
import ResultGrid from '@/components/ResultGrid';
import ModeTabs from './ModeTabs';
import DiscoveryPanel from './DiscoveryPanel';
import UploadPanel from './UploadPanel';


import { ProductType } from '@/types/ProductType';
import { AuthUser } from '@/types/AuthTypes';
// interface StudioClientProps {
//   serverAction: (data: any) => Promise<any[] | null>;
// }

const BASEURL = process.env.NEXT_PUBLIC_BACK_API_URL;

//임시 이미지(프로필 사진 리스트) GET
export const getProfileImgs = async ()=>{
    const reqUrl = `${BASEURL}/api/members/list`;
        
    try {
        const response = await fetch(reqUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            // 서버 에러 메시지를 확인하기 위해 로그 추가
            console.error("Server error:", response.status, response.statusText);
        }
        const data = await response.json();
               
        
        return data;
    } catch (error) {
        console.error("error:", error);    
    }
}

export type StudioMode = 'imageInput' | 'imageDiscovery';

//이미지 입력 및 출력 수행할 컴포넌트
export default function Studio(/* { serverAction }: StudioClientProps */) {
  // [상태] 비동기 데이터 요청 상태 관리 
  const [isPending, startTransition] = useTransition();  
  // [상태] 현재 검색 모드
  const [mode, setMode] = useState<StudioMode>('imageDiscovery');  
  // [상태] 검색 결과 데이터
  const [results, setResults] = useState<any[] | null>(null);  
  // [상태] 활성화된 카테고리 정보
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // 화면에 표시할 카테고리 목록 상수
  const categories = ['Outerwear', 'Tops', 'Bottoms', 'Accessories'];

  /**
   * [핸들러] 모드 전환 시 상태 초기화
   */
  const handleModeChange = (newMode: StudioMode) => {
    if (mode === newMode) return;
    setMode(newMode);
    setResults(null); 
    setActiveCategory(null);
  };

  /**
   * [핸들러] 검색 결과 처리 콜백
   */
  const handleSearchResult = (data: any[] | null, category?: string) => {
    setResults(data);
    if (category) setActiveCategory(category);
  };


  return (
   <div className="space-y-10">
      {/* 1. 모드 전환 탭 */}
      <ModeTabs mode={mode} onModeChange={handleModeChange} />

      {/* 2. 메인 입력 패널 영역 */}
      <div className="bg-white dark:bg-neutral-900/40 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl overflow-hidden min-h-[500px]">
        {/* 애니메이션 클래스(animate-in 등)를 모두 제거하여 정적으로 렌더링됩니다. */}
        <div className="p-10 lg:p-14">
          {mode === 'imageDiscovery' ? (
            <DiscoveryPanel 
              key="discovery-panel"
              onResultFound={handleSearchResult} 
              isPending={isPending}
              startTransition={startTransition}
            />
          ) : (
            <UploadPanel 
              key="upload-panel"
              onResultFound={handleSearchResult} 
              isPending={isPending}
              startTransition={startTransition}
            />
          )}
        </div>
      </div>

      {/* 3. 최종 검색 결과 출력 영역 */}
      <ResultGrid 
        isActive={results !== null && !isPending} 
        products={results} 
        title={mode === 'imageInput' ? "Archival Matches" : "Neural Recommendations"}
        subtitle={mode === 'imageInput' ? "Visual Search" : `Similar to selected ${activeCategory || 'Items'}`}
      />
    </div>
  );
}