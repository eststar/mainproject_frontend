import React, { useState, useRef } from 'react';
import { 
  FaImage, 
  FaXmark, 
  FaTag, 
  FaPalette, 
  FaLayerGroup
} from 'react-icons/fa6';

import Image from 'next/image';

interface ImageAnalyzerProps {
  onAction?: (data: any) => void;
  isExternalLoading?: boolean;
}

export default function ImageAnalyzer({ onAction, isExternalLoading }: ImageAnalyzerProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

//   const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const base64 = (reader.result as string).split(',')[1];
//         setPreview(URL.createObjectURL(file));
//         setIsAnalyzing(true);
//         setAnalysisData(null);
        
//         try {
//           const data = await analyzeImage(base64);
//           setAnalysisData(data);
//           // 부모 페이지의 Action 호출
//           if (onAction) onAction(data);
//         } catch (error) {
//           console.error("Analysis failed:", error);
//         } finally {
//           setIsAnalyzing(false);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  const isLoading = isAnalyzing || isExternalLoading;

  return (
    <div className="bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden border border-[#EBEAE7]">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left: Upload Frame */}
        <div 
          className="w-full lg:w-[550px] bg-[#121212] p-16 flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden"
          onClick={() => !isLoading && fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} className="hidden" onChange={()=>{}} accept="image/*" />
          
          {preview ? (
            <div className="relative w-full h-full animate-in fade-in duration-1000">
              <Image src={preview} alt="Source Analysis" fill className="rounded-[2.5rem] shadow-2xl" />
              {!isLoading && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setPreview(null); setAnalysisData(null); }} 
                  className="absolute top-8 right-8 p-4 bg-white text-black rounded-full hover:scale-110 transition-all shadow-xl z-20"
                >
                  <FaXmark size={14} />
                </button>
              )}
            </div>
          ) : (
            <div className="text-center space-y-8 z-10">
              <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto transition-all group-hover:bg-white/20">
                <FaImage size={28} className="text-white opacity-40 group-hover:opacity-100" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-serif italic text-white tracking-widest uppercase">Imprint Vision</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Initialize Scan</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Intelligence Report */}
        <div className="flex-1 p-20 flex flex-col justify-center bg-white relative">
          <div className="absolute top-12 left-12 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">
            <span className="w-12 h-px bg-gray-200"></span>
            Intelligence Core
          </div>

          {isLoading ? (
            <div className="space-y-12 animate-pulse">
              <div className="w-16 h-16 border-l-[3px] border-t-[3px] border-black rounded-full animate-spin"></div>
              <div className="space-y-4">
                <h4 className="text-4xl font-serif italic tracking-tight text-black">Processing Archive...</h4>
              </div>
            </div>
          ) : analysisData ? (
            <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-1000">
              <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <FaTag size={10} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Taxonomy</span>
                  </div>
                  <div className="text-4xl font-serif italic text-black border-b border-[#F0EFEC] pb-4">{analysisData.category}</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <FaLayerGroup size={10} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Tactility</span>
                  </div>
                  <div className="text-4xl font-serif italic text-black border-b border-[#F0EFEC] pb-4">{analysisData.texture}</div>
                </div>

                <div className="col-span-2 space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <FaPalette size={10} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Chromatic Identity</span>
                  </div>
                  <div className="text-5xl font-serif italic text-black uppercase tracking-tighter">
                    {analysisData.color} <span className="text-gray-200 px-6 font-light">/</span> {analysisData.pattern}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-10 border-t border-[#F0EFEC]">
                {analysisData.tags?.map((tag: string) => (
                  <span key={tag} className="px-6 py-2 bg-[#FAF9F6] text-[10px] font-bold text-black uppercase tracking-widest border border-[#EBEAE7]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-xl space-y-10">
              <h3 className="text-7xl font-serif leading-[0.95] italic tracking-tighter text-black">
                Neural <br/> Vision
              </h3>
              <p className="text-base font-light text-gray-500 leading-relaxed">
                Unlock the DNA of any garment. Our intelligence engine deconstructs visual markers to provide high-fidelity curation and similarity matching.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

