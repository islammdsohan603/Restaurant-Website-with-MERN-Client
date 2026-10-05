'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Leaf, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Loader2, CheckCircle, Star,
} from 'lucide-react';
import { loginUser, saveToken, saveUser } from '@/lib/auth';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  email: string;
  password: string;
}

interface FieldErrors {
  [key: string]: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
      }
    },
    [errors]
  );

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Please enter a valid email address';
    if (!form.password)
      errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    setSuccessMessage('');

    const localErrors = validate();
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginUser(form);

      if (!res.success) {
        const fieldErrs: FieldErrors = {};
        res.errors?.forEach(({ field, message }) => {
          fieldErrs[field] = message;
        });
        setErrors(fieldErrs);
        setGlobalError(res.message || 'Login failed. Please check your credentials.');
        return;
      }

      // Persist auth
      if (res.token) saveToken(res.token);
      if (res.user) saveUser(res.user);

      setSuccessMessage(`${res.message || 'Welcome back!'} Redirecting…`);
      setTimeout(() => router.push('/'), 1400);
    } catch {
      setGlobalError('Unable to reach the server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex items-stretch">
       

      {/* Right: form panel */}
      <main className="flex-1 flex items-center justify-center px-5 sm:px-10 py-12">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <Link href="/" className="group flex items-center gap-2.5 mb-8 lg:hidden w-fit">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#D35400]/10 text-[#D35400]">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-wider text-[#1E232A] uppercase">
              Saffron <span className="text-[#D35400] font-normal">&</span> Sage
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E232A] leading-tight">
              Sign in
            </h1>
            <p className="text-[#4A5568] text-sm mt-2">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[#D35400] font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>

          {/* Global error */}
          {globalError && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-5" role="alert">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{globalError}</span>
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm mb-5" role="status">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-sm font-semibold text-[#1E232A]">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white/70 transition-all duration-200 outline-none
                    focus:ring-2 focus:ring-[#D35400]/30 focus:border-[#D35400]
                    ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#E8E2D5] hover:border-[#D35400]/50'}`}
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1.5 text-xs text-red-500" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="text-sm font-semibold text-[#1E232A]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[#D35400] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white/70 transition-all duration-200 outline-none
                    focus:ring-2 focus:ring-[#D35400]/30 focus:border-[#D35400]
                    ${errors.password ? 'border-red-400 bg-red-50/30' : 'border-[#E8E2D5] hover:border-[#D35400]/50'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-[#D35400] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1.5 text-xs text-red-500" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 bg-[#D35400] hover:bg-[#B94600] disabled:bg-[#D35400]/60 text-white font-semibold py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E8E2D5]" />
            <span className="text-xs text-[#4A5568]">New to Saffron & Sage?</span>
            <div className="flex-1 h-px bg-[#E8E2D5]" />
          </div>

          {/* Sign up CTA */}
          <Link
            href="/signup"
            className="w-full flex items-center justify-center gap-2 border border-[#E8E2D5] hover:border-[#D35400] text-[#1E232A] hover:text-[#D35400] font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:bg-[#D35400]/5"
          >
            Create a free account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}