import React, { useState } from 'react';
import { User, Transaction } from '../types';
import { Wallet as WalletIcon, ArrowUpRight, History, CreditCard, Lock } from 'lucide-react';

interface WalletProps {
  user: User;
  transactions: Transaction[];
  onWithdraw: (amount: number, details: any) => void;
}

export const Wallet: React.FC<WalletProps> = ({ user, transactions, onWithdraw }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifsc: '',
    holderName: ''
  });

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(withdrawAmount) > user.balance) {
      alert("Insufficient Balance");
      return;
    }
    onWithdraw(Number(withdrawAmount), bankDetails);
    setWithdrawAmount('');
    setBankDetails({ accountNumber: '', ifsc: '', holderName: '' });
    alert("Withdrawal request submitted successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-secondary to-blue-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="relative z-10">
          <p className="text-blue-200 text-sm font-medium mb-1">Total Balance</p>
          <h1 className="text-4xl font-bold mb-4">₹{user.balance.toFixed(2)}</h1>
          <div className="flex gap-4 text-sm">
             <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
               <span className="w-2 h-2 bg-green-400 rounded-full"></span>
               Available to Withdraw
             </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Withdrawal Form */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="text-primary" />
            Bank Withdrawal
          </h2>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Amount (₹)</label>
              <input
                type="number"
                min="100"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Min. ₹100"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                  />
               </div>
               <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    value={bankDetails.ifsc}
                    onChange={(e) => setBankDetails({...bankDetails, ifsc: e.target.value})}
                  />
               </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Account Holder Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                value={bankDetails.holderName}
                onChange={(e) => setBankDetails({...bankDetails, holderName: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-blue-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Secure Withdraw
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <History className="text-gray-500" />
            Recent History
          </h2>
          <div className="space-y-4 h-64 overflow-y-auto pr-2">
            {transactions.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No transactions yet.</p>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                  <div className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};