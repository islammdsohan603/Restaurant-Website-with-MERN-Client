import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, Mail, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';

// Zod Schema for Forgot Password
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(undefined);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Zod Validation Check
    const result = forgotPasswordSchema.safeParse({ email });

    if (!result.success) {
      const fieldError = result.error.flatten().fieldErrors.email;
      setError(fieldError ? fieldError[0] : 'Invalid email');
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
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {/* Success Message or Form */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 my-4"
          >
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
              Reset link sent successfully to <br />
              <span className="font-semibold text-green-800">{email}</span>
            </div>
            <p className="text-xs text-gray-500">
              Please check your inbox (and spam folder) for further
              instructions.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={submitHandler} noValidate className="space-y-4">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={changeEventHandler}
                  placeholder="your.email@example.com"
                  className={`pl-10 focus-visible:ring-orange-500 ${
                    error ? 'border-red-500 focus-visible:ring-red-500' : ''
                  }`}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all shadow-md shadow-orange-100"
                >
                  Send Reset Link
                </Button>
              )}
            </motion.div>
          </form>
        )}

        <div className="border-t border-gray-100 my-6" />

        {/* Back to Login Link */}
        <p className="text-center text-sm text-gray-600">
          Remembered your password?{' '}
          <Link
            to="/login"
            className="inline-flex items-center gap-1 font-semibold text-orange-500 hover:text-orange-600 underline underline-offset-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
