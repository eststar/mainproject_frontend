import FeatureSelect from "./FeatureSelect";

// Next.js Server Component
export default function FeatureSelectPage() {
  // // 시뮬레이션된 Server Action
  // const curateArchive = async (filters: any) => {
  //   console.log("Server Action: Curating archive with filters", filters);
  //   return [];
  // };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in slide-in-from-right-6 duration-700">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-10 h-px bg-black/10"></span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">Module 02</span>
        </div>
        <div className="flex justify-between items-end">
          <h2 className="text-6xl font-serif italic tracking-tighter">Curation Intelligence</h2>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] pb-2">v.1.0-metadata-engine</p>
        </div>
      </div>

      <FeatureSelect />
    </div>
  );
}
