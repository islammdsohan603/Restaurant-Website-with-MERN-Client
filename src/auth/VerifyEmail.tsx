import React, {
  useRef,
  useState,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, MailCheck, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (error) setError('');

      if (value !== '' && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  // Handle Backspace Focus
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  // Handle Submit Form
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalOtp = otp.join('');

    if (finalOtp.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    console.log('Submitted OTP:', finalOtp);

    // Simulated API Call
    setTimeout(() => {
      setLoading(false);
      navigate('/');
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
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="p-3 bg-orange-100 text-orange-500 rounded-full mb-3"
          >
            <UtensilsCrossed className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Enter the 6-digit verification code sent to your email address.
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={submitHandler} noValidate className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between gap-2"
          >
            {otp.map((digit: string, idx: number) => (
              <Input
                key={idx}
                ref={element => {
                  inputRef.current[idx] = element;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                className="w-10 h-12 md:w-12 md:h-14 text-center text-lg md:text-2xl font-bold rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all shadow-xs"
              />
            ))}
          </motion.div>

          {/* Validation Error Message */}
          {error && (
            <span className="text-xs text-red-500 block text-center font-medium">
              {error}
            </span>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <Button
                disabled
                className="w-full bg-orange-400 text-white font-medium py-6 text-base"
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-base transition-all shadow-md shadow-orange-100"
              >
                Verify Code
              </Button>
            )}
          </motion.div>
        </form>

        <div className="border-t border-gray-100 my-6" />

        {/* Resend Code Section */}
        <p className="text-center text-sm text-gray-600">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={() => console.log('Resend code requested')}
            className="font-semibold text-orange-500 hover:text-orange-600 underline underline-offset-4 cursor-pointer"
          >
            Resend Code
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
