import React from 'react';
import Dashboard from './Dashboard';

//나인온스 자체 제품 통계? 외부 상품 통계?
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-10 h-px bg-black/10"></span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">Analytics Module</span>
        </div>
        <div className="flex justify-between items-end">
          <h2 className="text-6xl font-serif italic tracking-tighter">Insights Archive</h2>
          <div className="text-right">
             <p className="text-[10px] font-bold text-black uppercase tracking-[0.3em]">Real-time Sync</p>
             <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em] mt-1">Visual DNA Tracking Active</p>
          </div>
        </div>
      </div>

      <Dashboard />
    </div>
  );
}