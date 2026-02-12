'use client';

import React from 'react';
import { FaArrowsRotate, FaTriangleExclamation } from 'react-icons/fa6';

interface Props {
    title: React.ReactNode;
    subtitle: string;
    error: string | null;
    onRetry: () => void;
    children: React.ReactNode;
    topRight?: React.ReactNode;
    className?: string;
    lgColSpan?: number;
    isLoading?: boolean;
    isMetric?: boolean;
}

/**
 * DashboardCard: 대시보드의 각 섹션을 감싸는 공통 카드 레이아웃 컴포넌트입니다.
 * 독립적인 로딩 상태 처리, 에러 UI 표시 및 재시도 로직을 내장하고 있습니다.
 */
const DashboardCard: React.FC<Props> = ({
    title,       // 카드의 제목 (이미지/텍스트/노드 등)
    subtitle,    // 카드의 소제목/카테고리 (예: "Trend Analysis")
    isLoading,
    error,       // 에러 발생 시 표시할 메시지 (null이면 정상)
    onRetry,     // 에러 발생 시 나타나는 재시도 버튼 클릭 핸들러
    children,    // 카드 내부의 실제 데이터 렌더링 영역
    topRight,    // 카드 우측 상단에 옵션으로 표시할 요소
    className = "",
    lgColSpan = 2, // 그리드 시스템에서의 너비 비중
    isMetric = false
}) => {
    const colSpanClass = lgColSpan === 2 ? 'lg:col-span-2' : lgColSpan === 3 ? 'lg:col-span-3' : '';

    return (
        <div className={`${colSpanClass} bg-white dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-white/5 p-7 flex flex-col shadow-sm transition-colors relative overflow-hidden ${className}`}>
            {isMetric ? (
                <>
                    {/* [Metric Mode] 3단 수직 분할 레이아웃: 상단(소제목), 중앙(제목), 하단(컨텐츠) */}
                    <div className="flex justify-between items-center relative z-10">
                        <span className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.4em]">{subtitle}</span>
                        {topRight}
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center py-2">
                        <h3 className="text-5xl font-serif italic text-black dark:text-white tracking-tight flex items-center gap-3">
                            {title}
                        </h3>
                    </div>
                </>
            ) : (
                <>
                    {/* [Standard Mode] 일반 레이아웃: 소제목과 제목이 하나로 묶인 헤더 */}
                    <div className="flex justify-between items-start relative z-10 mb-6">
                        <div className="space-y-3">
                            <span className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.4em]">{subtitle}</span>
                            <h3 className="text-5xl font-serif italic text-black dark:text-white tracking-tight flex items-center gap-3">
                                {title}
                            </h3>
                        </div>
                        {topRight}
                    </div>
                </>
            )}

            {/* 카드 콘텐츠 영역: 에러/로딩/컨텐츠 통합 관리 */}
            <div className="relative z-10 flex-1 flex flex-col">
                {error ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-4 space-y-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                            <FaTriangleExclamation size={20} />
                        </div>
                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{error}</p>
                        <button
                            onClick={onRetry}
                            className="flex items-center gap-2 px-6 py-2.5 bg-neutral-100 dark:bg-white/5 hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-500 hover:text-violet-600 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all active:scale-95 border border-transparent hover:border-violet-200"
                        >
                            <FaArrowsRotate size={10} /> Re-Initialize
                        </button>
                    </div>
                ) : isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-2 space-y-2 animate-in fade-in duration-500">
                        <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 animate-spin">
                            <FaArrowsRotate size={14} />
                        </div>
                        <p className="text-[8px] font-bold text-violet-400 uppercase tracking-[0.2em] animate-pulse">Synchronizing...</p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardCard;
