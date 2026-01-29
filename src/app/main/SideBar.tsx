'use client';

import {
  FaUser,
  FaHouse,
  FaMicrochip,
  FaArrowRightFromBracket,
  FaEllipsisVertical,
  FaGear,
  FaShieldHalved
} from 'react-icons/fa6';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { authUserAtom } from '@/jotai/loginjotai';
import { useAtom } from 'jotai';
import { logoutAPI } from '../api/loginservice/loginapi';
import { useRouter } from 'next/navigation';

export default function SideBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [authInfo, setAuthInfo ] = useAtom(authUserAtom);
  const router = useRouter();

  const navItems = [
    { id: 'home', label: 'Overview', icon: <FaHouse />, path: '/main' },
    { id: 'studio', label: 'Intelligence Studio', icon: <FaMicrochip />, path: '/main/studio' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserMenuClick = () => {
    

    if (!authInfo) {
      console.log("[로그인 안되어 있음]");

      alert("로그인 후 이용 가능합니다.");
      return;
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    if(!authInfo) return;
    try {
      await logoutAPI(authInfo);
      setAuthInfo(null);
      alert("로그아웃 되었습니다.");
      router.push("/main");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-[#121212] text-white flex flex-col fixed left-0 top-0 border-r border-white/5 z-50">
      <Link
        href="/"
        className="p-12 flex flex-col items-start border-b border-white/5 bg-[#0d0d0d] hover:bg-black transition-colors"
      >
        <h1 className="text-2xl font-serif italic tracking-[0.2em] uppercase mb-1 text-white">ATELIER</h1>
        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.5em]">Neural Archive v1.0</p>
      </Link>

      <nav className="flex-1 px-8 py-12 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all group ${pathname === item.path ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <span className={`transition-transform inline-block ${pathname === item.path ? '' : 'text-gray-600 group-hover:text-white'}`}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* 유저 로그인 있으면 구현 */
        authInfo &&

        <div className="p-6 border-t border-white/5 bg-[#0a0a0a] relative" ref={menuRef}>

          {/* Dropdown Menu (Floating) */}
          {isMenuOpen && (
            <div className="absolute bottom-full left-6 right-6 mb-4 bg-neutral-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-50">
              <div className="p-6 border-b border-white/5">
                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-2">Authenticated As</p>
                <p className="text-[11px] font-bold text-white uppercase tracking-widest">{authInfo.name}</p>
              </div>
              <div className="p-2">
                <Link
                  href="/main/profile" //임시
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                >
                  <FaGear size={12} className="opacity-40" /> Settings
                </Link>
                <Link
                  href="/main/profile" //임시
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                >
                  <FaShieldHalved size={12} className="opacity-40" /> Security
                </Link>
                <div className="my-2 h-1px bg-white/5 mx-4" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-red-500/10 text-[10px] font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-all"
                >
                  <FaArrowRightFromBracket size={12} /> Log Out
                </button>
              </div>
            </div>
          )}

          {/* Account Trigger Button */}
          <button
            onClick={handleUserMenuClick}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${isMenuOpen ? 'bg-white/10 border-white/20' : 'hover:bg-white/5 border-white/5 hover:border-white/10'} border`}
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-white/20 transition-all overflow-hidden shrink-0">
              {
                authInfo.profile ? (
                  <img src={authInfo.profile} alt="User Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUser size={16} className="text-gray-400" />
                )
              }
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white truncate">{authInfo.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Active</span>
              </div>
            </div>
            <FaEllipsisVertical size={12} className={`transition-all ${isMenuOpen ? 'rotate-90 text-white' : 'text-gray-500 group-hover:text-white'}`} />
          </button>
        </div>
      }
    </aside>
  );
};