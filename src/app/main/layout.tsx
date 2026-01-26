import Link from 'next/link';
import React from 'react';
    

export default function MainLayout({ children }: {children: React.ReactNode}) {
    return (
        <nav className="flex-1 px-4 space-y-2">
            <aside className='w-64 h-screen bg-[#2c2f36] text-white flex flex-col fixed left-0 top-0 overflow-y-auto'>
                <ul className='text-white'>
                    <li><Link href={"/"}>이미지 업로드 검색</Link></li>
                    <li><Link href={"/"}>카테고리 선택 검색</Link></li>
                    <li></li>
                </ul>
            </aside>
            <div>
                {children}
            </div>
        </nav>
    );
}