import React, { useState } from 'react';
import { User } from '../types';
import { KeyRound, Mail, Phone, User as UserIcon, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    referral: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    const mockUser: User = {
      name: formData.name || 'MPK User',
      email: formData.email,
      mobile: formData.mobile,
      referralCode: 'MPK' + Math.floor(1000 + Math.random() * 9000),
      balance: 0,
      isKycVerified: false,
      isFaceVerified: false,
      referrals: 0
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-primary">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">M P K Technology</h1>
          <p className="text-gray-500">Welcome to your digital growth platform</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              isLogin ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              !isLogin ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {!isLogin && (
             <div className="relative">
             <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
             <input
               type="tel"
               placeholder="Mobile Number"
               required
               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
               value={formData.mobile}
               onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
             />
           </div>
          )}

          <div className="relative">
            <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                placeholder="Invitation Code (Optional)"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                value={formData.referral}
                onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLogin ? 'Login Securely' : 'Create Account'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};