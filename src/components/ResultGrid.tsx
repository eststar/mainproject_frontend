import Image from 'next/image';
import { useState } from 'react';
import { FaLayerGroup, FaMagnifyingGlass } from 'react-icons/fa6';

interface ResultGridProps {
    title?: string;
    subtitle?: string;
    isActive?: boolean;
}

// // 이 데이터는 실제 API 연동 시에는 비어있는 상태로 들어오거나 props로 받아야 합니다.
const MOCK_ARCHIVE = [
    { id: '1', category: 'Outerwear', name: '', brand: '', price: 0, img: '#' },
    { id: '2', category: 'Tops', name: '', brand: '', price: 0, img: '#' },
    { id: '3', category: 'Bottoms', name: '', brand: '', price: 0, img: '#' },
    { id: '4', category: 'Outerwear', name: '', brand: '', price: 0, img: '#' },
];

export default function ResultGrid({
    title = "Neural Match Results",
    subtitle = "Archive Discovery",
    isActive = false
}: ResultGridProps) {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Accessories'];

    const filteredItems = activeFilter === 'All'
        ? MOCK_ARCHIVE
        : MOCK_ARCHIVE.filter(item => item.category === activeFilter);

    return (
        <div className="space-y-10 py-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-400">
                        <FaLayerGroup size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">{subtitle}</span>
                    </div>
                    <h3 className="text-4xl font-serif italic tracking-tighter text-black">{title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full border ${activeFilter === filter
                                    ? 'bg-black text-white border-black shadow-lg scale-105'
                                    : 'bg-transparent text-gray-400 border-gray-100 hover:border-black hover:text-black'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Content */}
            {isActive ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 animate-in fade-in zoom-in-95 duration-700">
                    {filteredItems.map((item, idx) => (
                        <div key={item.id} className="group space-y-6 cursor-pointer" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="aspect-3/4 overflow-hidden rounded-4xl bg-[#F5F4F0] relative">
                                {/* <Image src={item.img} alt={item.name} fill className="group-hover:scale-110 transition-transform duration-[2s]" /> */}
                                {/* 이미지가 '#'이면 회색 박스에 ID만 출력, 아니면 이미지 렌더링 */}
                                {item.img !== '#' ? (
                                    <Image src={item.img} alt={item.name} fill className="object-cover" />
                                ) : (
                                    <div className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                                        Item {item.id}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all" />
                            </div>
                            <div className="space-y-1 px-2">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{item.brand}</span>
                                    <span className="text-[11px] font-serif italic">${item.price}</span>
                                </div>
                                <h4 className="text-lg font-serif italic text-[#121212] tracking-tight">{item.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State: 레이아웃만 보여줌 */
                <div className="py-40 flex flex-col items-center justify-center border border-dashed border-[#EBEAE7] rounded-[4rem] bg-[#FAF9F6]/30">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm">
                        <FaMagnifyingGlass className="text-gray-200" size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.5em] text-center max-w-xs leading-loose">
                        Awaiting parameters to initialize <br /> archival cross-reference
                    </p>
                </div>
            )}
        </div>
    );
};


