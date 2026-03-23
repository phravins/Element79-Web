import { signOut, auth, db, doc, updateDoc } from '../firebase';
import { useAuth } from '../AuthContext';
import { useState } from 'react';

export default function Profile() {
  const { user, userProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...updates,
        lastSynced: new Date().toISOString()
      });
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user || !userProfile) return null;

  return (
    <div className="space-y-8">
      <section className="flex flex-col items-center text-center space-y-2">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 mb-2">
          <img 
            src={user.photoURL || 'https://picsum.photos/seed/user/200'} 
            alt={user.displayName || 'User'} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
          {user.displayName || 'Alexander Thorne'}
        </h1>
        <p className="font-label text-sm font-medium text-primary bg-primary-container/40 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
          {userProfile.role === 'admin' ? 'Principal Admin' : 'Vault Member'}
        </p>
      </section>

      <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <h2 className="font-label text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-4">Business Activity</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="font-headline text-3xl font-bold text-primary tracking-tighter">1,240.50<span className="text-sm ml-1">oz</span></p>
            <p className="font-label text-on-surface-variant text-[10px] uppercase font-bold">Total Refined</p>
          </div>
          <div className="space-y-1">
            <p className="font-headline text-3xl font-bold text-on-surface tracking-tighter">99.9%</p>
            <p className="font-label text-on-surface-variant text-[10px] uppercase font-bold">Avg. Purity</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-outline-variant/10 flex items-center justify-between">
          <div>
            <p className="text-on-surface font-semibold">Vault Performance</p>
            <p className="text-on-surface-variant text-xs">Refining efficiency up 12%</p>
          </div>
          <div className="h-10 w-24 flex items-end gap-1">
            <div className="w-2 h-4 bg-primary/20 rounded-t-sm"></div>
            <div className="w-2 h-6 bg-primary/40 rounded-t-sm"></div>
            <div className="w-2 h-8 bg-primary/60 rounded-t-sm"></div>
            <div className="w-2 h-10 bg-primary rounded-t-sm"></div>
            <div className="w-2 h-7 bg-primary/80 rounded-t-sm"></div>
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-primary to-[#f6be3b] text-on-primary font-bold py-4 rounded-lg flex items-center justify-center gap-3 shadow-lg shadow-primary/10 hover:opacity-90 active:scale-[0.98] transition-all">
        <span className="material-symbols-outlined">picture_as_pdf</span>
        Export Business Report (PDF)
      </button>

      <div className="space-y-3">
        <h3 className="font-headline text-lg font-bold text-on-surface px-1">Settings</h3>
        <div className="bg-surface-container-low rounded-xl overflow-hidden">
          <SettingsItem 
            icon="notifications_active" 
            label="Notifications" 
            onClick={() => updateProfile({ notifications: !userProfile.notifications })}
            value={userProfile.notifications ? 'On' : 'Off'}
          />
          <SettingsItem 
            icon="sync" 
            label="Data Sync" 
            sublabel={`Last synced ${new Date(userProfile.lastSynced).toLocaleTimeString()}`} 
            onClick={() => updateProfile({})}
          />
          <SettingsItem 
            icon="payments" 
            label="Currency" 
            value={userProfile.currency}
            onClick={() => {
              const currencies = ['USD', 'EUR', 'GBP'];
              const next = currencies[(currencies.indexOf(userProfile.currency) + 1) % currencies.length];
              updateProfile({ currency: next });
            }}
          />
          <div className="flex items-center justify-between p-4 border-t border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">dark_mode</span>
              </div>
              <span className="font-medium text-on-surface">Dark Mode</span>
            </div>
            <div 
              onClick={() => updateProfile({ darkMode: !userProfile.darkMode })}
              className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${userProfile.darkMode ? 'bg-primary' : 'bg-outline-variant'}`}
            >
              <div className={`w-4 h-4 bg-on-primary rounded-full transition-all ${userProfile.darkMode ? 'ml-auto' : 'ml-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="w-full py-4 text-on-error-container font-bold flex items-center justify-center gap-2 rounded-lg bg-error-container/20 border border-error-container/20 hover:bg-error-container/30 transition-colors mt-8"
      >
        <span className="material-symbols-outlined text-lg">logout</span>
        Logout
      </button>

      {isSaving && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-surface-container-highest text-primary px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-pulse">
          <span className="material-symbols-outlined text-sm animate-spin">sync</span>
          Updating Vault...
        </div>
      )}
    </div>
  );
}

function SettingsItem({ icon, label, sublabel, value, onClick }: { icon: string, label: string, sublabel?: string, value?: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 hover:bg-surface-container-highest/50 transition-colors cursor-pointer group border-b border-outline-variant/10 last:border-none"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-on-surface">{label}</span>
          {sublabel && <span className="text-xs text-on-surface-variant">{sublabel}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm font-bold text-primary">{value}</span>}
        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
      </div>
    </div>
  );
}
