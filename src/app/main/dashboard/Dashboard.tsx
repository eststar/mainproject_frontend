
'use client';

import React from 'react';
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaTags, 
  FaGem, 
  FaWaveSquare,
  FaBolt
} from 'react-icons/fa6';

export default function Dashboard() {
  // 대시보드 상단에 표시될 주요 지표(Metric) 배열
  const mainMetrics = [
    { label: 'Inventory Growth', value: '+12.5%', trend: 'up', sub: 'vs last month', icon: <FaBolt />, color: 'violet' },
    { label: 'Aesthetic DNA Score', value: '94.8', trend: 'up', sub: 'High Fidelity', icon: <FaGem />, color: 'indigo' },
    { label: 'Curation Rate', value: '820/d', trend: 'down', sub: '-4% from avg', icon: <FaWaveSquare />, color: 'black' },
    { label: 'Active Metadata', value: '45.2K', trend: 'up', sub: 'Optimal indexing', icon: <FaTags />, color: 'violet' },
  ];

  // 인벤토리 카테고리별 분포 데이터 배열
  const categories = [
    { name: 'Outerwear', count: 4281, percentage: 34 },
    { name: 'Tops', count: 3120, percentage: 25 },
    { name: 'Bottoms', count: 2890, percentage: 23 },
    { name: 'Accessories', count: 2191, percentage: 18 },
  ];

  return (
    <div className="space-y-10">
      {/* 주요 지표 그리드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainMetrics.map((metric, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-sm space-y-6 hover:border-violet-100 dark:hover:border-violet-800 transition-colors group">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm shadow-lg ${
                metric.color === 'violet' ? 'bg-violet-600 shadow-violet-100 dark:shadow-none' : 
                metric.color === 'indigo' ? 'bg-indigo-600 shadow-indigo-100 dark:shadow-none' : 'bg-black dark:bg-neutral-800 shadow-gray-100 dark:shadow-none'
              }`}>
                {metric.icon}
              </div>
              {/* 트렌드(상승/하락) 표시 영역 */}
              <div className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest ${metric.trend === 'up' ? 'text-violet-500' : 'text-red-400'}`}>
                {metric.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />} {metric.value}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-gray-300 dark:text-gray-600 uppercase tracking-widest group-hover:text-violet-300 dark:group-hover:text-violet-400 transition-colors">{metric.label}</p>
              <p className="text-3xl font-serif italic text-black dark:text-white tracking-tight">{metric.value}</p>
              <p className="text-[8px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{metric.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 카테고리 분포 시각화 섹션 (Progress Bar 형태) */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-[3rem] border border-black/5 dark:border-white/5 p-12 space-y-10 shadow-sm transition-colors">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-gray-300 dark:text-gray-600 uppercase tracking-[0.4em]">Inventory Mapping</span>
              <h3 className="text-3xl font-serif italic text-black dark:text-white tracking-tight">Category Distribution</h3>
            </div>
            <p className="text-[9px] font-bold text-violet-400 dark:text-violet-400 uppercase tracking-widest">Total: 12,482 Items</p>
          </div>

          <div className="space-y-8">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-widest">{cat.name}</span>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">{cat.count} items / {cat.percentage}%</span>
                </div>
                {/* 커스텀 프로그레스 바: 데이터 비율 표시 */}
                <div className="h-[2px] w-full bg-gray-50 dark:bg-neutral-800 overflow-hidden rounded-full">
                  <div 
                    className="h-full bg-linear-to-r from-violet-500 to-indigo-600 transition-all duration-1000 ease-out" 
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI 인사이트 카드: 시스템이 제안하는 분석 결과 표시 */}
        <div className="bg-linear-to-br from-violet-950 via-black to-black dark:from-violet-900 dark:via-black dark:to-black rounded-[3rem] p-12 text-white flex flex-col justify-between space-y-12 shadow-xl shadow-violet-900/10 border border-violet-900/20 relative overflow-hidden">
          {/* 내부 은은한 빛 효과 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-[60px]" />
          
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <FaGem className="text-violet-400" />
            </div>
            <div className="space-y-3">
              <h4 className="text-2xl font-serif italic tracking-tight">Curation Insight</h4>
              <p className="text-xs font-light text-violet-200/60 leading-relaxed italic">
                "Neural analysis detects a 14% increase in 'minimalist' aesthetic DNA within the Outerwear segment. Inventory rotation is recommended for high-fidelity alignment."
              </p>
            </div>
          </div>
          
          {/* 하단 상태 표시 영역 */}
          <div className="pt-8 border-t border-white/10 relative z-10">
             <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></div>
               <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-violet-400/60">AI Intelligence Optimal</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
