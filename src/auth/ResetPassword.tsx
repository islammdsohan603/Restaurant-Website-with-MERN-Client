import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, LockKeyhole, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';

// Zod Schema for Reset Password
const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (error) setError(undefined);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Zod Validation Check
    const result = resetPasswordSchema.safeParse({ newPassword });

    if (!result.success) {
      const fieldError = result.error.flatten().fieldErrors.newPassword;
      setError(fieldError ? fieldError[0] : 'Invalid password');
      return;
    }

    setLoading(true);

    // API Call Simulation
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-4">
      {/* Container Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="p-3 bg-orange-100 text-orange-500 rounded-full mb-2"
          >
            <UtensilsCrossed className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Enter your new password below to reset your account password.
          </p>
        </div>

        {/* Success Message or Form */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 my-4"
          >
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
              Password reset successfully! 🎉
            </div>
            <p className="text-xs text-gray-500">
              You can now log in using your new password.
            </p>
            <Link to="/login" className="block pt-2">
              <Button className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md shadow-orange-100">
                Go to Login
              </Button>
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={submitHandler} noValidate className="space-y-4">
            {/* New Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                New Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={changeEventHandler}
                  placeholder="Enter new password"
                  className={`pl-10 focus-visible:ring-orange-500 ${
                    error ? 'border-red-500 focus-visible:ring-red-500' : ''
                  }`}
                />
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {error && (
                <span className="text-xs text-red-500 mt-1 block font-medium">
                  {error}
                </span>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              {loading ? (
                <Button
                  disabled
                  className="w-full bg-orange-400 text-white font-medium"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all shadow-md shadow-orange-100"
                >
                  Reset Password
                </Button>
              )}
            </motion.div>
          </form>
        )}

        <div className="border-t border-gray-100 my-6" />

        {/* Back to Login Link */}
        <p className="text-center text-sm text-gray-600">
          Back to{' '}
          <Link
            to="/login"
            className="inline-flex items-center gap-1 font-semibold text-orange-500 hover:text-orange-600 underline underline-offset-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
