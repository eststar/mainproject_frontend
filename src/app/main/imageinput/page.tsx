import React from 'react';
import ImageInput from './ImageInput';

export default function ImageInputPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-10 h-px bg-black/10"></span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">Module 01</span>
        </div>
        <div className="flex justify-between items-end">
          <h2 className="text-6xl font-serif italic tracking-tighter">Visual DNA Analysis</h2>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] pb-2">v.1.0-neural-engine</p>
        </div>
      </div>

      {/* Client Component에게 Server Action 전달 */}
      <ImageInput /* serverAction={()=>{}} */ />
    </div>
  );
}