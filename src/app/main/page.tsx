import { FaArrowRight, FaCamera, FaSliders } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';


export default function MainPage() {
  return (
     <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
      <div className="space-y-4">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">Dashboard Overview</span>
        <h2 className="text-6xl font-serif italic tracking-tighter text-[#121212]">Welcome to the Studio</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Visual Input Card */}
        <Link 
          href="/main/imageinput"
          className="group relative h-[450px] bg-[#121212] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all hover:scale-[1.02] block"
        >
          <Image 
            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop"
            alt="Visual DNA Scan Backdrop"
            fill
            className="opacity-40 group-hover:scale-110 transition-transform duration-[5s]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 space-y-4">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <FaCamera className="text-white" />
            </div>
            <h3 className="text-3xl font-serif italic text-white tracking-tight">Visual DNA Scan</h3>
            <p className="text-sm font-light text-gray-400">Upload and deconstruct visual markers using AI.</p>
            <div className="pt-4 flex items-center gap-4 text-[10px] font-bold text-white uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all">
              Initialize Module(이미지로 탐색) <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Feature Select Card */}
        <Link 
          href="/main/featureselect"
          className="group relative h-[450px] bg-white rounded-[3rem] overflow-hidden cursor-pointer border border-[#EBEAE7] shadow-xl transition-all hover:scale-[1.02] block"
        >
          <Image 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Intelligence Filters Backdrop"
            fill
            className="opacity-10 group-hover:scale-110 transition-transform duration-[5s]"
          />
          <div className="absolute bottom-12 left-12 right-12 space-y-4 text-black">
            <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center border border-black/10">
              <FaSliders />
            </div>
            <h3 className="text-3xl font-serif italic tracking-tight">Intelligence Filters</h3>
            <p className="text-sm font-light text-gray-500">Refine the archive through deep metadata parameters.</p>
            <div className="pt-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all">
              Deploy Filters(특징 선택으로 탐색) <FaArrowRight />
            </div>
          </div>
        </Link>
      </div>

      {/* <div className="pt-10 border-t border-black/5">
         <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-gray-300">Recent Activity</h4>
            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">View All Archive</button>
         </div>
         <div className="mt-10 py-20 text-center border border-dashed border-[#EBEAE7] rounded-[3rem]">
            <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest italic">No recent scans detected in current session</p>
         </div>
      </div> */}
    </div>
  );
}