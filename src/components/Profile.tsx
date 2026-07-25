import React, { useRef, useState } from 'react';
import {
  Camera,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export type ProfileDataState = {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
};

const Profile = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Profile Form State
  const [profileData, setProfileData] = useState<ProfileDataState>({
    fullname: 'Patel User',
    email: 'user@pateleats.com',
    phone: '+880 1700 000000',
    address: '123 Food Street',
    city: 'Dhaka',
    country: 'Bangladesh',
  });

  // Handle Input Text Change
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Image File Upload & Preview
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
      };
      reader.readAsDataURL(file); // Convert image to Base64 preview
    }
  };

  // Submit Handler
  const updateProfileHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API Call
    setTimeout(() => {
      setLoading(false);
      alert('Profile updated successfully!');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form
        onSubmit={updateProfileHandler}
        className="space-y-8 bg-white dark:bg-[#0c1017] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/80 transition-colors"
      >
        {/* Header & Avatar Upload Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
          {/* Avatar with Clickable Overlay */}
          <div
            className="relative group cursor-pointer"
            onClick={() => imageRef.current?.click()}
          >
            <Avatar className="w-28 h-28 border-4 border-orange-500/20 shadow-md">
              <AvatarImage
                src={selectedProfilePicture}
                alt={profileData.fullname}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-orange-500 text-white">
                {profileData.fullname.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>

            {/* Hover Mask */}
            <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-1">
              <Camera className="w-6 h-6" />
              <span className="text-[10px] font-medium">Change</span>
            </div>

            {/* Hidden Input for File Upload */}
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              className="hidden"
            />
          </div>

          {/* User Title */}
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profileData.fullname || 'Your Name'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your profile photo and personal details
            </p>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label
              htmlFor="fullname"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={profileData.fullname}
                onChange={changeHandler}
                placeholder="John Doe"
                className="pl-10 dark:bg-gray-900/50 dark:border-gray-800"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={changeHandler}
                placeholder="user@example.com"
                className="pl-10 dark:bg-gray-900/50 dark:border-gray-800"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                name="phone"
                type="text"
                value={profileData.phone}
                onChange={changeHandler}
                placeholder="+880 1700 000000"
                className="pl-10 dark:bg-gray-900/50 dark:border-gray-800"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="address"
                name="address"
                type="text"
                value={profileData.address}
                onChange={changeHandler}
                placeholder="123 Street Name"
                className="pl-10 dark:bg-gray-900/50 dark:border-gray-800"
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label
              htmlFor="city"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              City
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="city"
                name="city"
                type="text"
                value={profileData.city}
                onChange={changeHandler}
                placeholder="Dhaka"
                className="pl-10 dark:bg-gray-900/50 dark:border-gray-800"
              />
            </div>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label
              htmlFor="country"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Country
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="country"
                name="country"
                type="text"
                value={profileData.country}
                onChange={changeHandler}
                placeholder="Bangladesh"
                className="pl-10 dark:bg-gray-900/50 dark:border-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
