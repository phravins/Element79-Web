import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, Product } from './types';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Processing from './components/Processing';
import Collections from './components/Collections';
import Profile from './components/Profile';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import { useAuth } from './AuthContext';

export default function App() {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [history, setHistory] = useState<Screen[]>(['home']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigateTo = (screen: Screen) => {
    if (screen === currentScreen) return;
    if (screen === 'home') {
      setHistory(['home']);
    } else {
      setHistory(prev => [...prev, screen]);
    }
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !user.emailVerified) {
    return <Login />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <Dashboard onNavigate={navigateTo} />;
      case 'products': return <Products onSelectProduct={setSelectedProduct} />;
      case 'processing': return <Processing />;
      case 'collection': return <Collections />;
      case 'profile': return <Profile />;
      default: return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body pb-32">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-background flex items-center justify-between px-6 h-16 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          {history.length > 1 && (
            <button 
              onClick={goBack}
              className="p-2 -ml-2 hover:bg-surface-container-highest rounded-full transition-colors flex items-center justify-center text-on-surface"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant/20">
            <img 
              alt="User Profile" 
              src={user?.photoURL || "https://picsum.photos/seed/user/200"} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-primary font-headline">The Gilded Vault</span>
        </div>
        <button className="text-on-surface hover:bg-surface-container-highest transition-colors p-2 rounded-full">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Product Detail Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[#020F1E]/60 backdrop-blur-xl z-50 border-t border-outline-variant/15 shadow-[0_-4px_16px_rgba(2,15,30,0.08)]">
        <NavItem 
          icon="home" 
          label="Home" 
          active={currentScreen === 'home'} 
          onClick={() => navigateTo('home')} 
        />
        <NavItem 
          icon="inventory_2" 
          label="Collection" 
          active={currentScreen === 'collection'} 
          onClick={() => navigateTo('collection')} 
        />
        <NavItem 
          icon="precision_manufacturing" 
          label="Processing" 
          active={currentScreen === 'processing'} 
          onClick={() => navigateTo('processing')} 
        />
        <NavItem 
          icon="layers" 
          label="Products" 
          active={currentScreen === 'products'} 
          onClick={() => navigateTo('products')} 
        />
        <NavItem 
          icon="person" 
          label="Profile" 
          active={currentScreen === 'profile'} 
          onClick={() => navigateTo('profile')} 
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-3 py-1 transition-all active:scale-90 duration-150 rounded-xl ${
        active ? 'bg-primary-container text-primary' : 'text-on-surface-variant hover:text-primary'
      }`}
    >
      <span className={`material-symbols-outlined ${active ? 'filled' : ''}`}>{icon}</span>
      <span className="font-inter text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}
