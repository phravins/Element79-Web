import { useState, useEffect } from 'react';
import { db, collection, addDoc, onSnapshot, query, orderBy, OperationType, handleFirestoreError, deleteDoc, doc } from '../firebase';
import { useAuth } from '../AuthContext';
import { CollectionLog } from '../types';

export default function Collections() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<CollectionLog[]>([]);
  const [sourceName, setSourceName] = useState('');
  const [sourceType, setSourceType] = useState('Telecom operator');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;

    const path = 'collections';
    const q = query(collection(db, path), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .filter(log => log.userId === user.uid);
      setLogs(logsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSecureToVault = async () => {
    if (!user || !sourceName || !quantity) return;

    setIsSubmitting(true);
    const path = 'collections';
    try {
      await addDoc(collection(db, path), {
        sourceName,
        sourceType,
        quantity: Number(quantity),
        cost: Number(cost) || 0,
        date: new Date().toISOString(),
        userId: user.uid
      });
      setSourceName('');
      setQuantity('');
      setCost('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLog = async (id: string) => {
    const path = 'collections';
    try {
      await deleteDoc(doc(db, path, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <div className="space-y-10">
      <section className="mb-10">
        <h2 className="font-headline text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-6">New Acquisition</h2>
        <div className="bg-surface-container-low rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-medium tracking-wide text-on-surface-variant font-label uppercase">Source Name</label>
              <input 
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-lg focus:ring-1 focus:ring-primary text-on-surface placeholder:text-outline/50 h-12 px-4" 
                placeholder="e.g. Neo-Tokyo IT Corp" 
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-medium tracking-wide text-on-surface-variant font-label uppercase">Source Type</label>
              <div className="relative">
                <select 
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value)}
                  className="w-full appearance-none bg-surface-container-highest border-none rounded-lg focus:ring-1 focus:ring-primary text-on-surface h-12 px-4 pr-10"
                >
                  <option>Telecom operator</option>
                  <option>Repair shop</option>
                  <option>Corporate IT</option>
                  <option>E-waste drive</option>
                  <option>Online bulk</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-outline pointer-events-none">expand_more</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-medium tracking-wide text-on-surface-variant font-label uppercase">Quantity (Units)</label>
              <input 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-lg focus:ring-1 focus:ring-primary text-on-surface h-12 px-4" 
                placeholder="0" 
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-medium tracking-wide text-on-surface-variant font-label uppercase">Acquisition Cost</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-primary font-bold">$</span>
                <input 
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-lg focus:ring-1 focus:ring-primary text-on-surface h-12 pl-8 pr-4" 
                  placeholder="0.00" 
                  type="number"
                />
              </div>
            </div>
          </div>
          <button 
            onClick={handleSecureToVault}
            disabled={isSubmitting || !sourceName || !quantity}
            className="w-full bg-gradient-to-br from-primary to-[#f6be3b] text-on-primary font-bold h-12 rounded-lg active:scale-95 transition-all shadow-lg shadow-primary/10 disabled:opacity-50"
          >
            {isSubmitting ? 'Securing...' : 'Secure to Vault'}
          </button>
        </div>
      </section>

      <section className="mb-6 flex items-center gap-3">
        <div className="relative flex-grow">
          <span className="material-symbols-outlined absolute left-4 top-3 text-on-surface-variant text-xl">search</span>
          <input 
            className="w-full bg-surface-container-low border-none rounded-full h-12 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary" 
            placeholder="Search collection logs..." 
            type="text"
          />
        </div>
        <button className="w-12 h-12 flex items-center justify-center bg-surface-container-low rounded-full text-on-surface-variant">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="font-headline text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-4 px-2">Recent Logs</h2>
        {logs.map(log => (
          <div key={log.id} className="relative group">
            <div 
              onClick={() => handleDeleteLog(log.id)}
              className="absolute inset-y-0 right-0 w-16 bg-error-container rounded-xl flex items-center justify-center text-on-error-container opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="relative bg-surface-container-low p-5 rounded-xl flex items-center justify-between hover:translate-x-[-4px] transition-transform duration-300">
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold text-lg">{log.sourceName}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-surface-container-highest text-primary text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
                    {log.sourceType}
                  </span>
                  <span className="text-on-surface-variant text-xs font-medium">
                    {new Date(log.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-primary font-headline text-xl font-extrabold tracking-tight">{log.quantity.toLocaleString()}</span>
                <span className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">Cards</span>
              </div>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant/40 italic">
            No collection logs found. Secure your first acquisition to the vault.
          </div>
        )}
      </section>

      <button className="fixed bottom-28 right-6 w-14 h-14 rounded-2xl bg-primary text-on-primary shadow-2xl shadow-primary/20 flex items-center justify-center active:scale-90 transition-transform z-40">
        <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
      </button>
    </div>
  );
}
