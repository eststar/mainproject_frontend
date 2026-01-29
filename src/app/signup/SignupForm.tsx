"use client";
import Link from "next/link";
import { FaArrowRight, FaShieldHalved } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { signupAPI } from "../api/loginservice/loginapi";
import { useRef } from "react";
import { useSetAtom } from "jotai";
import { authUserAtom } from "@/jotai/loginjotai";

export default function SignupForm() {
  const setAuth = useSetAtom(authUserAtom);
  const router = useRouter();
  const userIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = (userIdRef.current?.value || "").trim();
    const nickname = (nicknameRef.current?.value || "").trim();
    const password = (passwordRef.current?.value || "").trim();

    if (!id) {
      alert("아이디를 입력하세요");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요");
      return;
    }

    if (!nickname) {
      alert("닉네임을 입력하세요");
      return;
    }

    setAuth(null); //기존 로그인 정보 있으면 초기화

    try {
      
      await signupAPI({
        id: id,
        nickname: nickname,
        password: password
      });
      router.push("/main");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-8">
          <div className="group relative border-b border-white/10 focus-within:border-white transition-colors py-4">
            <label className="absolute -top-6 left-0 text-[10px] font-bold text-gray-500 uppercase tracking-widest">User ID</label>
            <input
              ref={userIdRef}
              id="id"
              type="text"
              placeholder="Curator"
              className="w-full bg-transparent border-none outline-none text-white text-base font-light placeholder:text-neutral-800 tracking-widest py-2"
              required
            />
          </div>
          <div className="group relative border-b border-white/10 focus-within:border-white transition-colors py-4">
            <label className="absolute -top-6 left-0 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nick Name</label>
            <input
              ref={nicknameRef}
              id="nickname"
              type="text"
              placeholder="Curator Alias"
              className="w-full bg-transparent border-none outline-none text-white text-base font-light placeholder:text-neutral-800 tracking-widest py-2"
              required
            />
          </div>
          <div className="group relative border-b border-white/10 focus-within:border-white transition-colors py-4">
            <label className="absolute -top-6 left-0 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-transparent border-none outline-none text-white text-base font-light placeholder:text-neutral-800 tracking-widest py-2"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <button
            type="submit"
            className="w-full py-7 bg-white text-black text-[11px] font-bold uppercase tracking-[0.8em] hover:bg-neutral-200 transition-all flex items-center justify-center gap-6 group shadow-2xl active:scale-95"
          >
            Register <FaArrowRight className="group-hover:translate-x-3 transition-transform" />
          </button>

          <div className="flex flex-col items-center gap-6">
            <Link href="/login" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
              Already a Curator? Log In
            </Link>
            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
              <FaShieldHalved size={14} className="opacity-40" /> 256-bit Encrypted
            </div>
          </div>
        </div>
      </form>
    </>
  );
}