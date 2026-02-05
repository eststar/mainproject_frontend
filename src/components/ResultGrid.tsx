'use client';

import React from 'react';
import { FaLayerGroup, FaMagnifyingGlass, FaWaveSquare } from 'react-icons/fa6';
import ProductCard from './ProductCard';
import { ProductType } from '@/types/ProductType';

interface ResultGridProps {
  title?: string;
  subtitle?: string;
  isActive?: boolean;
  products?: ProductType[] | null;
}

const ResultGrid: React.FC<ResultGridProps> = ({ 
  title = "Archive Selection", 
  subtitle = "Inventory Scan",
  isActive = false,
  products = null
}) => {
  return (
    <div className="space-y-10 py-10">
      {/* Header Section: 경계선을 명확히 하여 영역 분리 */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-neutral-200 pb-8 dark:border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
            <FaLayerGroup size={10} className="text-violet-500" />
            <span className="text-[9px] font-bold uppercase tracking-widest">{subtitle}</span>
          </div>
          <h3 className="font-serif text-4xl italic tracking-tighter text-neutral-900 dark:text-white">
            {title}
          </h3>
        </div>

        {/* AI Similarity Badge: 보라색 포인트 유지 */}
        {isActive && (
          <div className="flex items-center gap-3 rounded-full border border-violet-100 bg-violet-50 px-6 py-2.5 transition-colors hover:bg-violet-600 hover:text-white dark:border-violet-800 dark:bg-violet-900/10 dark:hover:bg-violet-700 group shadow-sm">
            {/* animate-pulse는 Tailwind 기본 내장 기능입니다 */}
            <FaWaveSquare size={10} className="text-violet-400 group-hover:text-white animate-pulse" />
            <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-violet-700 group-hover:text-white dark:text-violet-400">
              DNA Similarity: 
              <span className="font-serif text-[10px] italic">98.2%</span>
            </span>
          </div>
        )}
      </div>

      {/* Content Area: 조건부 렌더링 */}
      {isActive && products ? (
        
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item, idx) => (
            <ProductCard key={item.id} product={item} index={idx} />
          ))}
        </div>
      ) : (
        
        <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-neutral-200 bg-neutral-50/50 py-24 transition-colors hover:bg-neutral-100 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10 group">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-neutral-100 bg-white text-neutral-200 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:text-violet-500 dark:border-white/5 dark:bg-neutral-800 dark:text-neutral-700">
             <FaMagnifyingGlass size={20} className="animate-pulse" />
          </div>
          <p className="max-w-xs text-center text-[10px] font-bold uppercase tracking-widest leading-loose text-neutral-400 transition-colors group-hover:text-violet-600 dark:text-neutral-600">
            Awaiting parameters <br/> to initialize curation engine
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultGrid;