'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Leaf, User, Phone, MapPin, Home, Lock, Eye, EyeOff,
  Edit3, Save, X, CheckCircle, AlertCircle, Loader2,
  LogOut, ShieldCheck, Calendar, ArrowLeft, Mail,
} from 'lucide-react';
import {
  isLoggedIn, getUser, removeToken, saveUser,
  fetchProfile, updateProfile,
  type AuthUser, type ApiError,
} from '@/lib/auth';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'personal' | 'address' | 'security';

interface EditState {
  name: string;
  phone: string;
  address: string;
  currentAddress: string;
}

interface PasswordState {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface FieldErrors { [key: string]: string }

const INITIAL_PASSWORD: PasswordState = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
};

const passwordStrength = (p: string) => {
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
};

// ─── Reusable Field Components ────────────────────────────────────────────────

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-4 py-4 border-b border-[#E8E2D5]/60 last:border-0">
    <div className="p-2 rounded-xl bg-[#D35400]/8 text-[#D35400] shrink-0 mt-0.5">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-xs font-medium text-[#4A5568] uppercase tracking-wide">{label}</span>
      <span className="text-sm font-semibold text-[#1E232A] mt-0.5 break-words">{value || '—'}</span>
    </div>
  </div>
);

const FormField = ({
  id, label, name, value, onChange, placeholder, error, type = 'text', icon: Icon,
}: {
  id: string; label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; error?: string; type?: string; icon: React.ElementType;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-[#1E232A]">{label}</label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none">
        <Icon className="w-4 h-4" />
      </span>
      <input
        id={id} name={name} type={type} placeholder={placeholder} value={value}
        onChange={onChange} autoComplete="off"
        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white/70 transition-all duration-200 outline-none
          focus:ring-2 focus:ring-[#D35400]/30 focus:border-[#D35400]
          ${error ? 'border-red-400 bg-red-50/30' : 'border-[#E8E2D5] hover:border-[#D35400]/50'}`}
      />
    </div>
    {error && (
      <p className="flex items-center gap-1.5 text-xs text-red-500" role="alert">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
      </p>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');

  // Edit state
  const [editInfo, setEditInfo] = useState<EditState>({ name: '', phone: '', address: '', currentAddress: '' });
  const [editErrors, setEditErrors] = useState<FieldErrors>({});
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState('');
  const [infoGlobalError, setInfoGlobalError] = useState('');

  // Address state (reuses editInfo.address + editInfo.currentAddress)
  const [addrErrors, setAddrErrors] = useState<FieldErrors>({});
  const [isSavingAddr, setIsSavingAddr] = useState(false);
  const [addrSuccess, setAddrSuccess] = useState('');
  const [addrGlobalError, setAddrGlobalError] = useState('');

  // Password state
  const [passwords, setPasswords] = useState<PasswordState>(INITIAL_PASSWORD);
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [pwErrors, setPwErrors] = useState<FieldErrors>({});
  const [isSavingPw, setIsSavingPw] = useState(false);
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwGlobalError, setPwGlobalError] = useState('');

  // ── Auth guard + initial fetch ───────────────────────────────────────────

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
      return;
    }

    const loadProfile = async () => {
      try {
        // Seed immediately from localStorage for instant render
        const cached = getUser();
        if (cached) {
          setUser(cached);
          setEditInfo({
            name: cached.name,
            phone: cached.phone,
            address: cached.address,
            currentAddress: cached.currentAddress,
          });
        }

        // Then fetch fresh from server
        const res = await fetchProfile();
        if (res.success && res.user) {
          setUser(res.user);
          saveUser(res.user);
          setEditInfo({
            name: res.user.name,
            phone: res.user.phone,
            address: res.user.address,
            currentAddress: res.user.currentAddress,
          });
        } else if (!res.success) {
          setProfileError(res.message);
        }
      } catch {
        setProfileError('Unable to load profile. Please check your connection.');
      } finally {
        setIsLoadingProfile(false);
      }
    };

    void loadProfile();
  }, [router]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  const handleEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditInfo((p) => ({ ...p, [name]: value }));
      setEditErrors((p) => { const n = { ...p }; delete n[name]; return n; });
      setAddrErrors((p) => { const n = { ...p }; delete n[name]; return n; });
    },
    []
  );

  const handlePwChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPasswords((p) => ({ ...p, [name]: value }));
      setPwErrors((p) => { const n = { ...p }; delete n[name]; return n; });
    },
    []
  );

  // ── Save personal info ───────────────────────────────────────────────────

  const savePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoSuccess('');
    setInfoGlobalError('');

    const errs: FieldErrors = {};
    if (!editInfo.name.trim() || editInfo.name.trim().length < 2)
      errs.name = 'Name must be at least 2 characters';
    if (!editInfo.phone.trim() || editInfo.phone.replace(/\D/g, '').length < 10)
      errs.phone = 'Phone must be at least 10 digits';
    if (Object.keys(errs).length) { setEditErrors(errs); return; }

    setIsSavingInfo(true);
    try {
      const res = await updateProfile({ name: editInfo.name.trim(), phone: editInfo.phone.trim() });
      if (res.success && res.user) {
        setUser(res.user);
        saveUser(res.user);
        setInfoSuccess('Personal info updated successfully!');
        setTimeout(() => setInfoSuccess(''), 3500);
      } else {
        const fe: FieldErrors = {};
        res.errors?.forEach((e: ApiError) => { fe[e.field] = e.message; });
        setEditErrors(fe);
        setInfoGlobalError(res.message || 'Update failed.');
      }
    } catch {
      setInfoGlobalError('Unable to reach server. Please try again.');
    } finally {
      setIsSavingInfo(false);
    }
  };

  // ── Save address info ────────────────────────────────────────────────────

  const saveAddressInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddrSuccess('');
    setAddrGlobalError('');

    const errs: FieldErrors = {};
    if (!editInfo.address.trim() || editInfo.address.trim().length < 5)
      errs.address = 'Address must be at least 5 characters';
    if (!editInfo.currentAddress.trim() || editInfo.currentAddress.trim().length < 5)
      errs.currentAddress = 'Current address must be at least 5 characters';
    if (Object.keys(errs).length) { setAddrErrors(errs); return; }

    setIsSavingAddr(true);
    try {
      const res = await updateProfile({ address: editInfo.address.trim(), currentAddress: editInfo.currentAddress.trim() });
      if (res.success && res.user) {
        setUser(res.user);
        saveUser(res.user);
        setAddrSuccess('Address updated successfully!');
        setTimeout(() => setAddrSuccess(''), 3500);
      } else {
        const fe: FieldErrors = {};
        res.errors?.forEach((e: ApiError) => { fe[e.field] = e.message; });
        setAddrErrors(fe);
        setAddrGlobalError(res.message || 'Update failed.');
      }
    } catch {
      setAddrGlobalError('Unable to reach server. Please try again.');
    } finally {
      setIsSavingAddr(false);
    }
  };

  // ── Save password ────────────────────────────────────────────────────────

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwSuccess('');
    setPwGlobalError('');

    const errs: FieldErrors = {};
    if (!passwords.currentPassword) errs.currentPassword = 'Current password is required';
    if (!passwords.newPassword || passwords.newPassword.length < 6)
      errs.newPassword = 'New password must be at least 6 characters';
    if (!passwords.confirmNewPassword)
      errs.confirmNewPassword = 'Please confirm your new password';
    else if (passwords.newPassword !== passwords.confirmNewPassword)
      errs.confirmNewPassword = 'Passwords do not match';
    if (Object.keys(errs).length) { setPwErrors(errs); return; }

    setIsSavingPw(true);
    try {
      const res = await updateProfile(passwords);
      if (res.success) {
        setPwSuccess('Password changed successfully!');
        setPasswords(INITIAL_PASSWORD);
        setTimeout(() => setPwSuccess(''), 3500);
      } else {
        const fe: FieldErrors = {};
        res.errors?.forEach((e: ApiError) => { fe[e.field] = e.message; });
        setPwErrors(fe);
        setPwGlobalError(res.message || 'Password update failed.');
      }
    } catch {
      setPwGlobalError('Unable to reach server. Please try again.');
    } finally {
      setIsSavingPw(false);
    }
  };

  // ── Render states ────────────────────────────────────────────────────────

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#E8E2D5] border-t-[#D35400] animate-spin" />
          <p className="text-sm text-[#4A5568] font-medium">Loading your profile…</p>
        </div>
      </div>
    );
  }

  if (profileError && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1E232A]">Something went wrong</h2>
          <p className="text-[#4A5568] text-sm">{profileError}</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-[#D35400] text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
            Sign In Again
          </Link>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'personal', label: 'Personal Info', icon: Edit3 },
    { id: 'address', label: 'Addresses', icon: MapPin },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ];

  const pwStrength = passwordStrength(passwords.newPassword);

  // ── Main render ──────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E2D5] py-3.5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D35400]/10 text-[#D35400] group-hover:bg-[#D35400] group-hover:text-white transition-colors duration-300">
              <Leaf className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-serif text-lg font-bold tracking-wider text-[#1E232A] uppercase leading-none">
              Saffron <span className="text-[#D35400] font-normal">&</span> Sage
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-[#4A5568] hover:text-[#D35400] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to site</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {/* Hero profile card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1E232A] to-[#2d3748] rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
          {/* Decorative blobs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#D35400]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#D35400]/10 blur-2xl" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D35400] to-[#B94600] flex items-center justify-center text-white text-3xl font-bold font-serif shadow-lg">
                {user?.name?.charAt(0).toUpperCase() ?? 'U'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#1E232A]" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {user?.name}
              </h1>
              <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
              {user?.createdAt && (
                <p className="text-slate-500 text-xs mt-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Member since {formatDate(user.createdAt)}
                </p>
              )}
            </div>

            {/* Badge */}
            <div className="shrink-0 bg-[#D35400]/20 border border-[#D35400]/30 px-3 py-1.5 rounded-full">
              <span className="text-xs font-semibold text-[#D35400] tracking-wide uppercase">
                Dining Member
              </span>
            </div>
          </div>
        </div>

        {/* Tabs + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs */}
          <nav className="lg:w-52 shrink-0">
            <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {tabs.map(({ id, label, icon: Icon }) => (
                <li key={id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap
                      ${activeTab === id
                        ? 'bg-[#D35400] text-white shadow-sm'
                        : 'text-[#4A5568] hover:bg-[#E8E2D5]/50 hover:text-[#1E232A]'
                      }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tab panels */}
          <div className="flex-1 min-w-0">

            {/* ── Overview Tab ─────────────────────────────────────────── */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl border border-[#E8E2D5] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E8E2D5] flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-[#1E232A]">Your Details</h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('personal')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#D35400] hover:underline"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
                <div className="px-6">
                  <InfoRow icon={User} label="Full Name" value={user?.name ?? ''} />
                  <InfoRow icon={Mail} label="Email Address" value={user?.email ?? ''} />
                  <InfoRow icon={Phone} label="Phone Number" value={user?.phone ?? ''} />
                  <InfoRow icon={Home} label="Home Address" value={user?.address ?? ''} />
                  <InfoRow icon={MapPin} label="Current Address" value={user?.currentAddress ?? ''} />
                </div>
                {/* Quick-action cards */}
                <div className="px-6 pb-6 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('personal')}
                    className="flex items-center gap-3 p-4 rounded-xl border border-[#E8E2D5] hover:border-[#D35400] hover:bg-[#D35400]/5 transition-all text-left group"
                  >
                    <div className="p-2 rounded-lg bg-[#D35400]/10 text-[#D35400] group-hover:bg-[#D35400] group-hover:text-white transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1E232A]">Edit Info</p>
                      <p className="text-xs text-[#4A5568]">Update name & phone</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('security')}
                    className="flex items-center gap-3 p-4 rounded-xl border border-[#E8E2D5] hover:border-[#D35400] hover:bg-[#D35400]/5 transition-all text-left group"
                  >
                    <div className="p-2 rounded-lg bg-[#D35400]/10 text-[#D35400] group-hover:bg-[#D35400] group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1E232A]">Security</p>
                      <p className="text-xs text-[#4A5568]">Change your password</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* ── Personal Info Tab ────────────────────────────────────── */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-2xl border border-[#E8E2D5] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E8E2D5]">
                  <h2 className="font-serif text-lg font-bold text-[#1E232A]">Personal Information</h2>
                  <p className="text-xs text-[#4A5568] mt-0.5">Update your name and phone number.</p>
                </div>
                <form onSubmit={savePersonalInfo} noValidate className="px-6 py-6 space-y-5">
                  {/* Email (read-only) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1E232A]">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email" value={user?.email ?? ''} readOnly
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8E2D5] text-sm bg-[#E8E2D5]/20 text-[#4A5568] cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-[#4A5568]">Email cannot be changed.</p>
                  </div>

                  <FormField id="edit-name" label="Full Name" name="name" value={editInfo.name}
                    onChange={handleEditChange} placeholder="Your full name" error={editErrors.name} icon={User} />
                  <FormField id="edit-phone" label="Phone Number" name="phone" value={editInfo.phone}
                    onChange={handleEditChange} placeholder="+1 (555) 000-0000" error={editErrors.phone}
                    icon={Phone} type="tel" />

                  {infoGlobalError && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {infoGlobalError}
                    </div>
                  )}
                  {infoSuccess && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0" /> {infoSuccess}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      id="save-personal-btn" type="submit" disabled={isSavingInfo}
                      className="flex items-center gap-2 bg-[#D35400] hover:bg-[#B94600] disabled:bg-[#D35400]/60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition-all"
                    >
                      {isSavingInfo ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save Changes</>}
                    </button>
                    <button type="button" onClick={() => setActiveTab('overview')}
                      className="flex items-center gap-1.5 text-sm text-[#4A5568] hover:text-[#1E232A] transition-colors">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Address Tab ──────────────────────────────────────────── */}
            {activeTab === 'address' && (
              <div className="bg-white rounded-2xl border border-[#E8E2D5] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E8E2D5]">
                  <h2 className="font-serif text-lg font-bold text-[#1E232A]">Addresses</h2>
                  <p className="text-xs text-[#4A5568] mt-0.5">Update your home or current address.</p>
                </div>
                <form onSubmit={saveAddressInfo} noValidate className="px-6 py-6 space-y-5">
                  <FormField id="edit-address" label="Home Address" name="address" value={editInfo.address}
                    onChange={handleEditChange} placeholder="452 Saffron Lane, Culinary District"
                    error={addrErrors.address} icon={Home} />
                  <FormField id="edit-currentAddress" label="Current Address" name="currentAddress"
                    value={editInfo.currentAddress} onChange={handleEditChange}
                    placeholder="Where you currently live" error={addrErrors.currentAddress} icon={MapPin} />

                  {addrGlobalError && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {addrGlobalError}
                    </div>
                  )}
                  {addrSuccess && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0" /> {addrSuccess}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button id="save-address-btn" type="submit" disabled={isSavingAddr}
                      className="flex items-center gap-2 bg-[#D35400] hover:bg-[#B94600] disabled:bg-[#D35400]/60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition-all">
                      {isSavingAddr ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save Address</>}
                    </button>
                    <button type="button" onClick={() => setActiveTab('overview')}
                      className="flex items-center gap-1.5 text-sm text-[#4A5568] hover:text-[#1E232A] transition-colors">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Security Tab ─────────────────────────────────────────── */}
            {activeTab === 'security' && (
              <div className="space-y-5">
                {/* Change Password */}
                <div className="bg-white rounded-2xl border border-[#E8E2D5] shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#E8E2D5]">
                    <h2 className="font-serif text-lg font-bold text-[#1E232A]">Change Password</h2>
                    <p className="text-xs text-[#4A5568] mt-0.5">Choose a strong password to keep your account secure.</p>
                  </div>
                  <form onSubmit={savePassword} noValidate className="px-6 py-6 space-y-5">
                    {/* Current password */}
                    {[
                      { id: 'pw-current', label: 'Current Password', name: 'currentPassword' as const, key: 'current' as const, placeholder: 'Your current password' },
                      { id: 'pw-new', label: 'New Password', name: 'newPassword' as const, key: 'new' as const, placeholder: 'Min. 6 characters' },
                      { id: 'pw-confirm', label: 'Confirm New Password', name: 'confirmNewPassword' as const, key: 'confirm' as const, placeholder: 'Re-enter new password' },
                    ].map(({ id, label, name, key, placeholder }) => (
                      <div key={id} className="flex flex-col gap-1.5">
                        <label htmlFor={id} className="text-sm font-semibold text-[#1E232A]">{label}</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none">
                            <Lock className="w-4 h-4" />
                          </span>
                          <input id={id} name={name} type={showPw[key] ? 'text' : 'password'}
                            placeholder={placeholder} value={passwords[name]}
                            onChange={handlePwChange} autoComplete="new-password"
                            className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white/70 transition-all duration-200 outline-none
                              focus:ring-2 focus:ring-[#D35400]/30 focus:border-[#D35400]
                              ${pwErrors[name] ? 'border-red-400 bg-red-50/30' : 'border-[#E8E2D5] hover:border-[#D35400]/50'}`}
                          />
                          <button type="button"
                            onClick={() => setShowPw((p) => ({ ...p, [key]: !p[key] }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-[#D35400] transition-colors"
                            aria-label={showPw[key] ? 'Hide' : 'Show'}>
                            {showPw[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {/* Strength bar for new password */}
                        {name === 'newPassword' && pwStrength && (
                          <div className="space-y-1 mt-1">
                            <div className="h-1 w-full bg-[#E8E2D5] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-500"
                                style={{ width: pwStrength.width, backgroundColor: pwStrength.color }} />
                            </div>
                            <p className="text-xs" style={{ color: pwStrength.color }}>{pwStrength.label} password</p>
                          </div>
                        )}
                        {/* Match indicator for confirm */}
                        {name === 'confirmNewPassword' && passwords.confirmNewPassword && (
                          <p className={`flex items-center gap-1.5 text-xs ${passwords.newPassword === passwords.confirmNewPassword ? 'text-green-600' : 'text-red-500'}`}>
                            {passwords.newPassword === passwords.confirmNewPassword
                              ? <><CheckCircle className="w-3.5 h-3.5" /> Passwords match</>
                              : <><AlertCircle className="w-3.5 h-3.5" /> Passwords do not match</>}
                          </p>
                        )}
                        {pwErrors[name] && (
                          <p className="flex items-center gap-1.5 text-xs text-red-500" role="alert">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {pwErrors[name]}
                          </p>
                        )}
                      </div>
                    ))}

                    {pwGlobalError && (
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {pwGlobalError}
                      </div>
                    )}
                    {pwSuccess && (
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 shrink-0" /> {pwSuccess}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      <button id="save-password-btn" type="submit" disabled={isSavingPw}
                        className="flex items-center gap-2 bg-[#D35400] hover:bg-[#B94600] disabled:bg-[#D35400]/60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition-all">
                        {isSavingPw ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</> : <><ShieldCheck className="w-4 h-4" /> Change Password</>}
                      </button>
                      <button type="button" onClick={() => { setPasswords(INITIAL_PASSWORD); setPwErrors({}); }}
                        className="flex items-center gap-1.5 text-sm text-[#4A5568] hover:text-[#1E232A] transition-colors">
                        <X className="w-4 h-4" /> Clear
                      </button>
                    </div>
                  </form>
                </div>

                {/* Danger zone */}
                <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-red-100">
                    <h3 className="font-serif text-lg font-bold text-[#1E232A]">Session</h3>
                    <p className="text-xs text-[#4A5568] mt-0.5">Sign out of your account on this device.</p>
                  </div>
                  <div className="px-6 py-5">
                    <button type="button" onClick={handleLogout}
                      className="flex items-center gap-2 border border-red-300 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200">
                      <LogOut className="w-4 h-4" /> Sign Out of Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
