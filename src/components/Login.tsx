import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  auth, 
  googleProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  sendEmailVerification,
  signOut
} from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../AuthContext';

type AuthMode = 'login' | 'signup' | 'forgot-password' | 'verify-email';

export default function Login() {
  const { user } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setMode('verify-email');
        }
      } else if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setMode('verify-email');
      } else if (mode === 'forgot-password') {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent! Check your inbox.");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setMessage("Verification email resent!");
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleVerifyCheck = async () => {
    if (auth.currentUser) {
      try {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          window.location.reload();
        } else {
          setError("Email not verified yet. Please check your inbox.");
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleBackToLogin = () => {
    setMode('login');
    setError(null);
    setMessage(null);
  };

  // Use useEffect for side effects like setting mode based on auth state
  useEffect(() => {
    if (user && !user.emailVerified && mode !== 'verify-email') {
      setMode('verify-email');
    }
  }, [user, mode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <span className="material-symbols-outlined text-4xl text-primary">
              {mode === 'verify-email' ? 'mail' : mode === 'forgot-password' ? 'lock_reset' : 'lock'}
            </span>
          </div>
          <h1 className="text-3xl font-headline font-extrabold text-primary">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot-password' && 'Reset Password'}
            {mode === 'verify-email' && 'Verify Email'}
          </h1>
          <p className="text-on-surface-variant text-sm mt-2">
            {mode === 'login' && 'Enter your credentials to access the vault.'}
            {mode === 'signup' && 'Join the elite refinery and start collecting.'}
            {mode === 'forgot-password' && 'We\'ll send you instructions to reset your password.'}
            {mode === 'verify-email' && `We've sent a verification link to ${auth.currentUser?.email}.`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mode !== 'verify-email' ? (
            <motion.form 
              key={mode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleEmailAuth} 
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {mode !== 'forgot-password' && (
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 ml-1">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              )}

              {error && (
                <div className="bg-error-container text-on-error-container p-3 rounded-xl text-xs font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-primary/10 text-primary p-3 rounded-xl text-xs font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">info</span>
                  {message}
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (
                  mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'
                )}
              </button>

              {mode === 'login' && (
                <div className="flex items-center justify-between px-1">
                  <button 
                    type="button"
                    onClick={() => setMode('forgot-password')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Create Account
                  </button>
                </div>
              )}

              {mode !== 'login' && (
                <button 
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Back to Sign In
                </button>
              )}

              {mode === 'login' && (
                <>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-outline-variant/20"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-surface-container-low px-2 text-on-surface-variant/60 font-bold tracking-widest">Or continue with</span>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-surface-container-highest text-on-surface font-bold py-4 rounded-xl flex items-center justify-center gap-3 border border-outline-variant/20 hover:bg-surface-container-high active:scale-[0.98] transition-all"
                  >
                    <img src="https://www.gstatic.com/firebase/anonymous-scan.png" className="w-6 h-6 invert" alt="Google" />
                    Sign in with Google
                  </button>
                </>
              )}
            </motion.form>
          ) : (
            <motion.div 
              key="verify"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Please check your email and click the verification link to activate your account. 
                  If you don't see it, check your spam folder.
                </p>
              </div>

              {error && (
                <div className="bg-error-container text-on-error-container p-3 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-primary/10 text-primary p-3 rounded-xl text-xs font-medium">
                  {message}
                </div>
              )}

              <div className="space-y-3">
                <button 
                  onClick={handleVerifyCheck}
                  className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  I've Verified My Email
                </button>
                
                <button 
                  onClick={handleResendVerification}
                  className="w-full bg-surface-container-highest text-on-surface font-bold py-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-high transition-all"
                >
                  Resend Email
                </button>

                <button 
                  onClick={() => signOut(auth)}
                  className="w-full text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors pt-2"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <p className="mt-8 text-xs text-on-surface-variant/40 max-w-xs text-center">
        By continuing, you agree to The Gilded Vault's Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
