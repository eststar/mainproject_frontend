import { FaLock, FaUserPlus } from 'react-icons/fa6';
import Link from 'next/link';

//메인 페이지 header 영역 디자인
export default function Header() {
  return (
    <header className="h-24 bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-14 sticky top-0 z-40">
      <div className="flex-1">

        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">System Ready</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/signup"
          className="flex items-center gap-3 px-6 py-3 border border-black/10 text-black text-[9px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-black hover:text-white transition-all active:scale-95"
        >
          <FaUserPlus size={10} />
          JOIN
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-4 px-8 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-neutral-800 transition-all shadow-lg active:scale-95"
        >
          <FaLock size={10} className="text-gray-400" />
          LOGIN
        </Link>
      </div>

    </header>
  );
}