import { Screen } from '../types';

export default function Dashboard({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-on-surface">Dashboard</h1>
        <p className="text-on-surface-variant text-sm mt-1">Refinery operations and vault holdings overview.</p>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="SIMs Collected" value="124,502" />
        <KPICard label="Gold Recovered" value="842.5g" />
        <KPICard label="Monthly Revenue" value="$56,210" />
        <KPICard label="Open Orders" value="14" />
      </section>

      <section className="flex flex-wrap gap-4">
        <ActionButton 
          icon="add_circle" 
          label="Log Collection" 
          onClick={() => onNavigate('collection')} 
          primary 
        />
        <ActionButton 
          icon="precision_manufacturing" 
          label="Start Batch" 
          onClick={() => onNavigate('processing')} 
        />
        <ActionButton 
          icon="layers" 
          label="Add Product" 
          onClick={() => onNavigate('products')} 
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-headline font-bold text-on-surface">Recent Batches</h2>
          <button className="text-primary text-sm font-medium hover:underline" onClick={() => onNavigate('processing')}>
            View All History
          </button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-5 pb-4 -mx-2 px-2">
          <BatchCard id="#B-9021" count="12,400" yieldVal="82.4g" status="processing" />
          <BatchCard id="#B-8994" count="8,200" yieldVal="54.1g" status="complete" />
          <BatchCard id="#B-8872" count="24,100" yieldVal="168.9g" status="complete" />
        </div>
      </section>

      <section>
        <div className="bg-surface-container-low rounded-xl overflow-hidden flex flex-col md:flex-row border border-outline-variant/10">
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Refinery Insight</span>
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">Optimization Alert: SIM Purity Trends</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Current batches show a 4% increase in gold density from carrier-specific SIM shipments. 
              Adjust refinery furnace temperature to 1064°C for maximum recovery.
            </p>
            <button className="text-primary font-bold flex items-center gap-2 group">
              Update Refinery Parameters
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
          <div className="md:w-1/2 h-64 md:h-auto bg-surface-container-highest relative">
            <img 
              alt="Gold Refinery Analytics" 
              className="w-full h-full object-cover mix-blend-overlay opacity-50" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQhPt0OTJH7CTizyG9oG5dYkl65LS3RqLcmPUHI_kzLX9zm_qjvyFQ-YdFBIoFCDi9eAJOfLb8gMU8RGgVRv1hZKk7ynLM4vCvPYPbIiJubL5N33id126UAecI03ppU1yVJ9b_BHotPVhoOuYPmyeEK59ddCVSfHRoNcB9h00lOzh6_L0zRaBHvLU4M4Ms1TOhNMgjSqWCK0bN-wY-zCrgwQIYbJJ4wg8YWGCMjFRP4TNXGfTfaDZ8xZXzNwLWI-8twkn5VVoA7H4"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function KPICard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between">
      <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest mb-2">{label}</span>
      <span className="text-3xl font-headline font-extrabold text-primary">{value}</span>
    </div>
  );
}

function ActionButton({ icon, label, onClick, primary }: { icon: string, label: string, onClick: () => void, primary?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 font-bold px-6 py-3 rounded-lg transition-all active:scale-95 ${
        primary 
          ? 'bg-primary text-on-primary hover:brightness-110' 
          : 'bg-surface-container-highest text-primary border border-primary/20 hover:bg-surface-container-highest/80'
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </button>
  );
}

function BatchCard({ id, count, yieldVal, status }: { id: string, count: string, yieldVal: string, status: 'processing' | 'complete' }) {
  return (
    <div className="min-w-[280px] bg-surface-container-high p-5 rounded-xl border border-outline-variant/10">
      <div className="flex justify-between items-start mb-4">
        <span className="text-on-surface-variant text-xs font-mono">ID: {id}</span>
        {status === 'processing' ? (
          <span className="bg-primary-container text-primary text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            PROCESSING
          </span>
        ) : (
          <span className="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-1 rounded-full">
            COMPLETE
          </span>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-on-surface-variant text-sm">Card Count</span>
          <span className="text-on-surface font-semibold">{count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant text-sm">{status === 'processing' ? 'Est. Gold Yield' : 'Final Gold Yield'}</span>
          <span className="text-primary font-bold">{yieldVal}</span>
        </div>
      </div>
    </div>
  );
}
