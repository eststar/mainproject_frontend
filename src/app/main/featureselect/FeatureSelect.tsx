'use client';
import React, { useState, useTransition, Suspense } from 'react';
import ResultGrid from '@/components/ResultGrid';

export default function FeatureSelect() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<any[] | null>(null);
  
  const filterGroups = [
    { title: 'Silhouette', items: ['Oversized', 'Structured', 'Fluid', 'Draped', 'Minimal'] },
    { title: 'Material', items: ['Silk', 'Cashmere', 'Denim', 'Nylon', 'Wool'] },
    { title: 'Aesthetic', items: ['Brutalist', 'Avant-Garde', 'Street', 'Classic', 'Neo-Vintage'] }
  ];

  // const handleApply = async () => {
  //   startTransition(async () => {
  //     try {
  //       await serverAction({}); 
  //       await new Promise(resolve => setTimeout(resolve, 1500));
  //       setResults([]);
  //     } catch (error) {
  //       console.error("Curation failed", error);
  //     }
  //   });
  // };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white p-20 rounded-[4rem] border border-[#EBEAE7] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
        {isPending && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center animate-in fade-in duration-500">
            {/* Minimal line loader */}
            <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {filterGroups.map(group => (
          <div key={group.title} className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-gray-300 border-b border-gray-50 pb-4">{group.title}</h4>
            <div className="flex flex-col gap-3">
              {group.items.map(item => (
                <label key={item} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm font-light text-gray-500 group-hover:text-black transition-colors">{item}</span>
                  <input type="checkbox" className="w-5 h-5 rounded-full border-gray-200 checked:bg-black transition-all appearance-none border checked:border-black disabled:opacity-30" disabled={isPending} />
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-full pt-12 flex gap-6">
           <button 
             onClick={()=>{}}
             disabled={isPending}
             className="flex-1 py-6 bg-black text-white text-[10px] font-bold uppercase tracking-[0.6em] rounded-full hover:bg-gray-800 transition-all shadow-xl disabled:bg-gray-400"
           >
             {isPending ? 'Syncing Archive...' : 'Apply Intelligence'}
           </button>
           <button 
             onClick={handleReset}
             disabled={isPending}
             className="px-16 py-6 border border-[#EBEAE7] text-gray-400 text-[10px] font-bold uppercase tracking-[0.6em] rounded-full hover:bg-gray-50 transition-all disabled:opacity-30"
           >
             Reset
           </button>
        </div>
      </section>

      <section className="pt-12">
        <Suspense fallback={<div className="py-40 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 animate-pulse">Consulting Neural Archive...</div>}>
          <ResultGrid 
            title="Curated Selection" 
            subtitle="Metadata Matching"
            isActive={results !== null && !isPending}
          />
        </Suspense>
      </section>
    </>
    );
}