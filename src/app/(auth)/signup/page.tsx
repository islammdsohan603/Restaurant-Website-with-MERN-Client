'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Leaf, User, Mail, Phone, MapPin, Home, Lock, Eye, EyeOff,
  CheckCircle, AlertCircle, ArrowRight, Loader2,
} from 'lucide-react';
import { signupUser, saveToken, saveUser } from '@/lib/auth';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  currentAddress: string;
  password: string;
  confirmPassword: string;
}

interface FieldErrors {
  [key: string]: string;
}

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  currentAddress: '',
  password: '',
  confirmPassword: '',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ── Field change handler ─────────────────────────────────────────────────

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
      if (errors[name]) {
        setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
      }
    },
    [errors]
  );

  // ── Client-side pre-validation ───────────────────────────────────────────

  const validateLocally = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Please enter a valid email address';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10)
      errs.phone = 'Phone must be at least 10 digits';
    if (!form.address.trim() || form.address.trim().length < 5)
      errs.address = 'Address must be at least 5 characters';
    if (!form.currentAddress.trim() || form.currentAddress.trim().length < 5)
      errs.currentAddress = 'Current address must be at least 5 characters';
    if (!form.password || form.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword)
      errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  // ── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    setSuccessMessage('');

    const localErrors = validateLocally();
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await signupUser(form);

      if (!res.success) {
        const fieldErrs: FieldErrors = {};
        res.errors?.forEach(({ field, message }) => {
          fieldErrs[field] = message;
        });
        setErrors(fieldErrs);
        setGlobalError(res.message || 'Signup failed. Please try again.');
        return;
      }

      // Save token + user
      if (res.token) saveToken(res.token);
      if (res.user) saveUser(res.user);

      setSuccessMessage('Account created! Redirecting to login…');
      setTimeout(() => router.push('/login'), 1500);
    } catch {
      setGlobalError('Unable to reach the server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Password strength ────────────────────────────────────────────────────

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { label: 'Weak', color: '#ef4444', width: '20%' };
    if (score <= 2) return { label: 'Fair', color: '#f97316', width: '40%' };
    if (score <= 3) return { label: 'Good', color: '#eab308', width: '65%' };
    return { label: 'Strong', color: '#22c55e', width: '100%' };
  })();

  // ── Reusable field renderer ──────────────────────────────────────────────

  const renderField = (
    id: string,
    label: string,
    name: keyof FormState,
    placeholder: string,
    Icon: React.ElementType,
    type: string = 'text',
    extra?: React.ReactNode
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#1E232A]">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none">
          <Icon className="w-4 h-4" />
        </span>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          autoComplete={type === 'password' ? 'new-password' : 'off'}
          className={`w-full pl-10 pr-${extra ? '10' : '4'} py-3 rounded-xl border text-sm bg-white/70 transition-all duration-200 outline-none
            focus:ring-2 focus:ring-[#D35400]/30 focus:border-[#D35400]
            ${errors[name] ? 'border-red-400 bg-red-50/30' : 'border-[#E8E2D5] hover:border-[#D35400]/50'}`}
        />
        {extra}
      </div>
      {errors[name] && (
        <p className="flex items-center gap-1.5 text-xs text-red-500 mt-0.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left decorative panel — hidden on small screens */}
      <aside className="hidden lg:flex flex-col justify-between w-[42%] bg-[#1E232A] px-12 py-16 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D35400]/20 blur-3xl" />
        <div className="absolute bottom-16 right-0 w-64 h-64 rounded-full bg-[#D35400]/10 blur-2xl" />

        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3 w-fit">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D35400]/20 text-[#D35400] group-hover:bg-[#D35400] group-hover:text-white transition-colors duration-300">
            <Leaf className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-wider text-white uppercase leading-none">
              Saffron <span className="text-[#D35400] font-normal">&</span> Sage
            </span>
            <span className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-medium mt-0.5">
              Luxury Family Dining
            </span>
          </div>
        </Link>

        {/* Central copy */}
        <div className="space-y-6 relative z-10">
          <h2 className="font-serif text-4xl font-bold text-white leading-tight">
            Your table is<br />
            <span className="text-[#D35400]">always waiting.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xs">
            Create your Saffron & Sage account to unlock exclusive reservations, personalised menus, and priority seating.
          </p>
          <ul className="space-y-3">
            {[
              'Early access to Chef\'s Tasting events',
              'Personalised dining preferences saved',
              'One-click table reservations',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-[#D35400] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer quote */}
        <p className="text-slate-600 text-xs italic">
          &ldquo;Where every meal is a memory.&rdquo;
        </p>
      </aside>

      {/* Right: form panel */}
      <main className="flex-1 flex items-center justify-center px-5 sm:px-10 py-12 overflow-y-auto">
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
              Create account
            </h1>
            <p className="text-[#4A5568] text-sm mt-2">
              Already have an account?{' '}
              <Link href="/login" className="text-[#D35400] font-semibold hover:underline">
                Sign in
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
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            {renderField('signup-name', 'Full Name', 'name', 'e.g. James Anderson', User)}

            {/* Email */}
            {renderField('signup-email', 'Email Address', 'email', 'you@example.com', Mail, 'email')}

            {/* Phone */}
            {renderField('signup-phone', 'Phone Number', 'phone', '+1 (555) 000-0000', Phone, 'tel')}

            {/* Address */}
            {renderField('signup-address', 'Home Address', 'address', '452 Saffron Lane, Culinary District', Home)}

            {/* Current Address */}
            {renderField('signup-currentAddress', 'Current Address', 'currentAddress', 'Where you currently live', MapPin)}

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-password" className="text-sm font-semibold text-[#1E232A]">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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
              {/* Strength bar */}
              {passwordStrength && (
                <div className="mt-1.5 space-y-1">
                  <div className="h-1 w-full bg-[#E8E2D5] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}
                    />
                  </div>
                  <p className="text-xs" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label} password
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="flex items-center gap-1.5 text-xs text-red-500" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-confirmPassword" className="text-sm font-semibold text-[#1E232A]">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="signup-confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white/70 transition-all duration-200 outline-none
                    focus:ring-2 focus:ring-[#D35400]/30 focus:border-[#D35400]
                    ${errors.confirmPassword ? 'border-red-400 bg-red-50/30' : 'border-[#E8E2D5] hover:border-[#D35400]/50'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-[#D35400] transition-colors"
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Match indicator */}
              {form.confirmPassword && form.password && (
                <p className={`flex items-center gap-1.5 text-xs mt-0.5 ${form.password === form.confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                  {form.password === form.confirmPassword
                    ? <><CheckCircle className="w-3.5 h-3.5" /> Passwords match</>
                    : <><AlertCircle className="w-3.5 h-3.5" /> Passwords do not match</>}
                </p>
              )}
              {errors.confirmPassword && (
                <p className="flex items-center gap-1.5 text-xs text-red-500" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="signup-submit-btn"
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full flex items-center justify-center gap-2.5 bg-[#D35400] hover:bg-[#B94600] disabled:bg-[#D35400]/60 text-white font-semibold py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create My Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-[#4A5568]">
            By creating an account you agree to our{' '}
            <span className="text-[#D35400] cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-[#D35400] cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </main>
    </div>
  );
}