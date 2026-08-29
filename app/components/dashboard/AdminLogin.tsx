import React, { useState } from "react";
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { usePortfolioData } from "~/context/PortfolioDataContext";

export function AdminLogin() {
  const { signIn } = usePortfolioData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setIsLoading(true);
    setErrorMessage(null);

    const res = await signIn(email, password);
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#8A60F1]/15 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-10 border-[#8A60F1]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#8A60F1] to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(138,96,241,0.5)]">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Admin Access
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-light">
                Sign in with your Supabase credentials to manage the portfolio.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] focus:shadow-[0_0_15px_rgba(138,96,241,0.2)] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8A60F1]">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8A60F1] focus:shadow-[0_0_15px_rgba(138,96,241,0.2)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 hover:from-[#7b51e0] hover:to-fuchsia-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(138,96,241,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Help Card */}
          <div className="pt-4 border-t border-[var(--card-border)] text-center space-y-2">
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Don't have an admin user created yet? Create one in your{" "}
              <a
                href="https://supabase.com/dashboard/project/gunjvczafsqdxoonbxfz/auth/users"
                target="_blank"
                rel="noreferrer"
                className="text-[#8A60F1] hover:underline inline-flex items-center gap-0.5 font-medium"
              >
                <span>Supabase Auth Panel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>

            <a
              href="/"
              className="inline-block text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline pt-2 transition-colors"
            >
              &larr; Back to Live Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
