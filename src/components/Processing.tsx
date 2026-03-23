import { MOCK_BATCHS } from '../constants';

export default function Processing() {
  const activeBatches = MOCK_BATCHS.filter(b => b.status === 'processing');
  const completedBatches = MOCK_BATCHS.filter(b => b.status === 'complete');

  return (
    <div className="space-y-10">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-on-surface-variant font-label text-sm tracking-widest uppercase">Processing Queue</h1>
          <p className="text-4xl font-headline font-extrabold text-on-surface">Live Refinery Status</p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-[12px] min-w-[280px] border-l-4 border-primary">
          <span className="text-on-surface-variant font-label text-xs uppercase tracking-tighter">Total Gold Recovered</span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-headline font-black gold-gradient-text">1,248.52</span>
            <span className="text-primary font-bold">oz</span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-headline font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">settings_slow_motion</span>
            Active Batches
          </h2>
          <span className="bg-primary-container text-primary text-xs px-3 py-1 rounded-full font-medium">
            {activeBatches.length} Running
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeBatches.map(batch => (
            <div key={batch.id} className="bg-surface-container-highest p-6 rounded-[12px] flex flex-col gap-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-on-surface font-bold text-lg">{batch.name}</p>
                  <p className="text-on-surface-variant text-xs font-medium">{batch.method}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold uppercase tracking-wider pulse-gold">
                    <span className="w-1.5 h-1.5 bg-on-primary rounded-full"></span>
                    Processing
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2">
                <div>
                  <p className="text-on-surface-variant text-[10px] uppercase font-semibold">Input Count</p>
                  <p className="text-on-surface font-headline font-bold">{batch.inputCount} Units</p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-[10px] uppercase font-semibold">Est. Yield</p>
                  <p className="text-primary font-headline font-bold">{batch.estYield.toFixed(2)} oz</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-on-surface-variant">
                  <span>REFINEMENT PROGRESS</span>
                  <span>{batch.progress}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(247,189,72,0.4)] transition-all duration-1000" 
                    style={{ width: `${batch.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                <span className="text-xs text-on-surface-variant italic">Started {batch.startedAt}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-on-surface-variant">PAUSE</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full relative flex items-center px-0.5 cursor-pointer">
                    <div className="w-3 h-3 bg-primary rounded-full ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 pt-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-headline font-bold whitespace-nowrap">Completed Batches</h2>
          <div className="h-px w-full bg-outline-variant/20"></div>
        </div>
        <div className="space-y-4">
          {completedBatches.map(batch => (
            <div key={batch.id} className="bg-surface-container-low p-5 rounded-[12px] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary-container text-primary">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">{batch.name}</p>
                  <p className="text-on-surface-variant text-xs">{batch.method} • {batch.startedAt}</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-10">
                <div className="text-right">
                  <p className="text-on-surface-variant text-[10px] uppercase font-bold">Yield</p>
                  <p className="text-primary font-bold">{batch.estYield.toFixed(2)} oz</p>
                </div>
                <span className="bg-surface-container-highest text-on-surface text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">Complete</span>
              </div>
            </div>
          ))}
          <div className="flex justify-center pt-4">
            <button className="text-primary font-bold text-sm hover:underline flex items-center gap-2">
              View Full Archive
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
