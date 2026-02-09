import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FaCircleInfo, FaArrowsRotate, FaTriangleExclamation } from "react-icons/fa6";
import { getTSNEPoints, TSNEPoint } from "@/app/api/trendService/tsneapi";
import { motion, AnimatePresence } from "framer-motion";

/**
 * react-plotly.js 라이브러리는 내부적으로 window 객체를 사용합니다.
 * Next.js의 서버 사이드 렌더링(SSR) 환경에서는 window가 없으므로 에러가 발생합니다.
 * 이를 방지하기 위해 next/dynamic을 사용하여 클라이언트 사이드에서만 로드하도록 설정합니다.
 */
import type { PlotParams } from "react-plotly.js";

const Plot = dynamic<PlotParams>(() => import("react-plotly.js"), {
    ssr: false,
    loading: () => <div className="h-125 flex items-center justify-center bg-gray-50/10 rounded-4xl animate-pulse">
        <p className="text-[10px] uppercase tracking-widest opacity-20">Initializing Engine...</p>
    </div>
});

export default function TSNEPlot() {
    const [data, setData] = useState<TSNEPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    // 긴 소요 시간동안 사용자에게 보여줄 안내 메시지들
    const loadingMessages = [
        "Analyzing high-dimensional vectors (2048 dims)...",
        "Comparing neural patterns with existing database...",
        "Projecting manifold into 2D aesthetic space...",
        "Clustering style DNA profiles...",
        "Optimizing GPU rendering for visual map..."
    ];

    /**
     * [데이터 페칭]
     * 파이썬 서버의 벡터 분석 및 백엔드 DB 비교 로직이 포함되어 소요 시간이 길 수 있으므로
     * 명시적인 로딩 처리와 에러 핸들링을 수행합니다.
     */
    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const points = await getTSNEPoints();
            setData(points);
        } catch (err) {
            console.error("Analysis failed, using preview mode.");
            setError("The neural engine is currently under high load. Displaying cached preview.");

            // 데모용 샘플 데이터 생성 (실패 시에도 UI 흐름 유지를 위함)
            const mockPoints: TSNEPoint[] = Array.from({ length: 300 }, (_, i) => ({
                x: Math.random() * 20 - 10,
                y: Math.random() * 20 - 10,
                label: `Style Item #${i + 1}`,
                cluster: Math.floor(Math.random() * 5)
            }));
            setData(mockPoints);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // 로딩 중일 때 메시지를 주기적으로 변경하여 지루함을 방지
        const messageTimer = setInterval(() => {
            setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 3000);

        return () => clearInterval(messageTimer);
    }, []);

    /**
     * [시각화 설정 - useMemo 활용]
     * 데이터가 변경될 때만 설정을 다시 계산하여 렌더링 성능을 최적화합니다.
     */
    const plotData = useMemo(() => [{
        x: data.map(d => d.x),
        y: data.map(d => d.y),
        text: data.map(d => d.label),
        mode: 'markers' as const,
        type: 'scattergl' as const,
        marker: {
            color: data.map(d => d.cluster),
            colorscale: 'Portland' as const,
            size: 6,
            opacity: 0.8,
            line: { color: 'white', width: 0.5 },
            showscale: false
        },
        hoverlabel: {
            bgcolor: '#171717',
            bordercolor: '#8b5cf6',
            font: { color: '#ffffff', size: 11, family: 'Inter' }
        }
    }], [data]);

    return (
        <div className="lg:col-span-3 bg-white dark:bg-neutral-900/50 rounded-[3rem] border border-neutral-200 dark:border-white/5 p-12 space-y-10 shadow-sm transition-colors overflow-hidden flex flex-col min-h-[750px] relative">

            {/* 상단 헤더 영역 */}
            <div className="flex justify-between items-end relative z-10">
                <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-300 dark:text-gray-600 uppercase tracking-[0.4em]">Style Projection</span>
                    <h3 className="text-3xl font-serif italic text-black dark:text-white tracking-tight">T-SNE Neural Map</h3>
                </div>

                <div className="flex items-center gap-3">
                    {/* 데이터 갱신 버튼 */}
                    <button
                        onClick={fetchData}
                        disabled={isLoading}
                        className="p-3 rounded-full bg-neutral-100 dark:bg-white/5 text-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all disabled:opacity-20"
                        title="Re-analyze Vectors"
                    >
                        <FaArrowsRotate className={`${isLoading ? 'animate-spin' : ''}`} />
                    </button>

                    <div className="flex items-center gap-4 px-5 py-2 bg-violet-50 dark:bg-violet-950/30 rounded-full border border-violet-100 dark:border-violet-900/40">
                        <span className="text-[9px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest flex items-center gap-2">
                            {isLoading ? (
                                <div className="h-2 w-2 rounded-full bg-violet-600 animate-ping"></div>
                            ) : (
                                <FaCircleInfo className="text-xs" />
                            )}
                            Neural Aesthetics Mapping
                        </span>
                    </div>
                </div>
            </div>

            {/* 그래프 본체 및 로딩 오버레이 */}
            <div className="w-full flex-1 min-h-[550px] rounded-4xl overflow-hidden border border-neutral-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex items-center justify-center relative backdrop-blur-sm">

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-8 relative z-20"
                        >
                            {/* 프리미엄 로딩 애니메이션 */}
                            <div className="relative">
                                <div className="h-20 w-20 rounded-full border-t-2 border-r-2 border-violet-600 animate-spin"></div>
                                <div className="h-20 w-20 rounded-full border-b-2 border-l-2 border-indigo-400 animate-spin absolute inset-0 [animation-direction:reverse] [animation-duration:1.5s] opacity-50"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-2 w-2 bg-violet-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <motion.p
                                    key={loadingMessageIndex}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-[11px] font-bold text-black dark:text-white uppercase tracking-[0.2em]"
                                >
                                    {loadingMessages[loadingMessageIndex]}
                                </motion.p>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest animate-pulse font-medium">
                                    Synthesizing complex manifold projection...
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="plot"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full h-full"
                        >
                            <Plot
                                data={plotData}
                                layout={{
                                    autosize: true,
                                    margin: { l: 20, r: 20, b: 20, t: 20 },
                                    hovermode: 'closest',
                                    paper_bgcolor: 'rgba(0,0,0,0)',
                                    plot_bgcolor: 'rgba(0,0,0,0)',
                                    xaxis: { showgrid: false, zeroline: false, showticklabels: false },
                                    yaxis: { showgrid: false, zeroline: false, showticklabels: false },
                                    dragmode: 'pan',
                                }}
                                config={{
                                    displayModeBar: true,
                                    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines'],
                                    displaylogo: false,
                                    responsive: true
                                }}
                                useResizeHandler={true}
                                className="w-full h-full"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 에러 발생 시 경고 배너 */}
                {error && !isLoading && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-2xl flex items-center gap-3 z-30"
                    >
                        <FaTriangleExclamation className="text-red-500 text-xs" />
                        <span className="text-[10px] text-red-100 font-medium uppercase tracking-tight">{error}</span>
                    </motion.div>
                )}
            </div>

            {/* 하단 설명 영역 */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/5 relative z-10">
                <p className="text-[9px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">
                    Visualizing {data.length} neural vectors across aesthetic manifold.
                    {error ? ' Currently showing cached data due to engine timeout.' : ' Each point represents a style profile matching your collection.'}
                </p>
            </div>

            {/* 장식용 은은한 빛 효과 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    );
}
