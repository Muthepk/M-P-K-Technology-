import React, { useState } from 'react';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Tasks } from './components/Tasks';
import { Stories } from './components/Stories';
import { Wallet } from './components/Wallet';
import { KYC } from './components/KYC';
import { User, AppView, Transaction } from './types';
import { LayoutDashboard, CheckSquare, BookOpen, Wallet as WalletIcon, UserCheck, HelpCircle, LogOut, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setView(AppView.AUTH);
  };

  const addEarnings = (amount: number) => {
    if (!user) return;
    const newTx: Transaction = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      amount,
      type: 'credit',
      description: 'Task Completion Reward',
      status: 'success'
    };
    setTransactions([newTx, ...transactions]);
    setUser({ ...user, balance: user.balance + amount });
  };

  const handleWithdraw = (amount: number, details: any) => {
    if (!user) return;
    const newTx: Transaction = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      amount,
      type: 'debit',
      description: `Withdrawal to ${details.accountNumber}`,
      status: 'pending'
    };
    setTransactions([newTx, ...transactions]);
    setUser({ ...user, balance: user.balance - amount });
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const NavItem = ({ viewName, label, icon: Icon }: any) => (
    <button
      onClick={() => {
        setView(viewName);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        view === viewName 
          ? 'bg-primary/10 text-primary font-semibold border-r-4 border-primary' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800 tracking-tight">MPK <span className="text-primary">Tech</span></span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <NavItem viewName={AppView.DASHBOARD} label="Dashboard" icon={LayoutDashboard} />
          <NavItem viewName={AppView.TASKS} label="Earn Money" icon={CheckSquare} />
          <NavItem viewName={AppView.STORIES} label="Spiritual Wisdom" icon={BookOpen} />
          <NavItem viewName={AppView.WALLET} label="My Wallet" icon={WalletIcon} />
          <NavItem viewName={AppView.KYC} label="Verification (KYC)" icon={UserCheck} />
          <NavItem viewName={AppView.SUPPORT} label="Help & Support" icon={HelpCircle} />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
           <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors w-full px-4 py-2">
             <LogOut className="w-5 h-5" />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
          <span className="font-bold text-gray-800">MPK Tech</span>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {view === AppView.DASHBOARD && <Dashboard user={user} />}
          {view === AppView.TASKS && <Tasks onComplete={addEarnings} />}
          {view === AppView.STORIES && <Stories />}
          {view === AppView.WALLET && <Wallet user={user} transactions={transactions} onWithdraw={handleWithdraw} />}
          {view === AppView.KYC && <KYC user={user} onUpdateUser={updateUser} />}
          
          {view === AppView.SUPPORT && (
             <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm text-center">
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <HelpCircle className="w-8 h-8 text-blue-500" />
               </div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Need Help?</h2>
               <p className="text-gray-500 mb-6">Our support team is available to assist you with any issues related to earnings, withdrawals, or account verification.</p>
               <a href="mailto:mpksupport1421@gmail.com" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors">
                 mpksupport1421@gmail.com
               </a>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;