import React from 'react';
import { User } from '../types';
import { Share2, Users, DollarSign, Activity } from 'lucide-react';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const copyReferral = () => {
    navigator.clipboard.writeText(user.referralCode);
    alert("Referral code copied!");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Namaste, {user.name} 🙏</h1>
          <p className="text-gray-500">Welcome to your dashboard.</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${user.isKycVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {user.isKycVerified ? 'Verified Account' : 'KYC Pending'}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-xs text-blue-600 font-medium uppercase">Earnings</p>
          <p className="text-2xl font-bold text-blue-900">₹{user.balance}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
          <Activity className="w-6 h-6 text-orange-600 mb-2" />
          <p className="text-xs text-orange-600 font-medium uppercase">Task Rate</p>
          <p className="text-2xl font-bold text-orange-900">₹6-12</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
          <Users className="w-6 h-6 text-purple-600 mb-2" />
          <p className="text-xs text-purple-600 font-medium uppercase">Referrals</p>
          <p className="text-2xl font-bold text-purple-900">{user.referrals}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <Share2 className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-xs text-green-600 font-medium uppercase">Bonus</p>
          <p className="text-2xl font-bold text-green-900">50%</p>
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg">
        <div className="md:flex justify-between items-center">
          <div>
             <h3 className="text-xl font-bold mb-2">Invite Friends & Earn 50%</h3>
             <p className="text-gray-400 text-sm mb-4 md:mb-0 max-w-md">
               Share your invitation code. When your friends watch ads, you get 50% of their earnings instantly.
             </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col items-center gap-2">
             <span className="text-xs text-gray-400 uppercase tracking-wider">Your Invite Code</span>
             <span className="text-2xl font-mono font-bold tracking-widest">{user.referralCode}</span>
             <button 
               onClick={copyReferral}
               className="text-xs bg-primary hover:bg-amber-600 text-white px-4 py-1.5 rounded-full transition-colors w-full"
             >
               Copy Code
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};