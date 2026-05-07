import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { 
  Wallet, 
  ArrowRight, 
  CreditCard, 
  Activity, 
  Landmark,
  PiggyBank,
  Lock,
  Globe,
  Search,
  Bell,
  Download,
  Eye,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function Comptes({ accounts, auth }) {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0] || null);

  const accountTypes = {
    'current': { icon: Wallet, label: 'Compte courant', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    'savings': { icon: PiggyBank, label: 'Compte épargne', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    'salary': { icon: Lock, label: 'Compte salaire', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    'currency': { icon: Globe, label: 'Compte devises', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  };

  return (
    // <AppLayout breadcrumbs={[{ title: 'Comptes', href: '/comptes' }]}>
    <>
      <Head title="Mes Comptes - LionsBank" />

      <div className="ml-10 min-h-screen py-10 pr-10 pl-0 text-slate-900 dark:text-white relative transition-colors duration-500 m-0 w-full max-w-none">
        <div className="w-full space-y-12 relative z-10 m-0 p-0 max-w-none">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Comptes</h1>
          <div className="flex items-center gap-4">
             <div className="relative group hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 dark:text-white/20 group-focus-within:text-[rgb(28,212,132)] transition-colors" />
                <input 
                    placeholder="Rechercher..."
                    className="w-64 h-12 bg-white dark:bg-[#062B29]/50 border border-slate-200 dark:border-white/5 rounded-2xl pl-11 pr-4 text-sm outline-none focus:border-[rgb(28,212,132)] transition-all shadow-sm dark:shadow-none"
                />
             </div>
             <div className="flex items-center gap-3 pl-2">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[rgb(28,212,132)] to-emerald-600 flex items-center justify-center text-[#041F1E] font-black shadow-lg">
                    {auth.user.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-right">
                    <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{auth.user.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1">Client Elite</p>
                </div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Mes Comptes List */}
            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Mes comptes</h3>
                <div className="space-y-4">
                    {accounts.map((account, i) => {
                        const typeInfo = accountTypes[account.type] || accountTypes['current'];
                        const isSelected = selectedAccount?.id === account.id;
                        
                        return (
                            <motion.div
                                key={account.id}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => setSelectedAccount(account)}
                                className={`group relative p-6 rounded-[2rem] border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                                    isSelected 
                                    ? "bg-white dark:bg-[#062B29] border-[rgb(28,212,132)]/50 shadow-xl" 
                                    : "bg-white dark:bg-[#062B29]/30 border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10"
                                }`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`h-14 w-14 rounded-2xl ${typeInfo.bg} ${typeInfo.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                        <typeInfo.icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">{typeInfo.label}</p>
                                        <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                                            {Number(account.balance).toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}
                                        </h4>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mt-1">•••• {account.account_number.slice(-4)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-[8px] uppercase tracking-[0.2em] px-3">Actif</Badge>
                                        <p className="text-[9px] font-bold text-slate-300 dark:text-white/10 uppercase tracking-widest mt-2">Dernière activité: Aujourd'hui</p>
                                    </div>
                                    <ChevronRight className={`h-5 w-5 ${isSelected ? 'text-[rgb(28,212,132)]' : 'text-slate-200 dark:text-white/5'}`} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Right Column: Détails du compte */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Détails du compte</h3>
                {selectedAccount ? (
                    <Card className="bg-white dark:bg-[#062B29]/50 border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-sm dark:shadow-none overflow-hidden sticky top-24">
                        <CardHeader className="p-10 pb-0 text-center flex flex-col items-center">
                            <div className={`h-20 w-20 rounded-3xl ${accountTypes[selectedAccount.type]?.bg} ${accountTypes[selectedAccount.type]?.color} flex items-center justify-center mb-6`}>
                                {(() => {
                                    const Icon = accountTypes[selectedAccount.type]?.icon || Wallet;
                                    return <Icon className="h-10 w-10" />;
                                })()}
                            </div>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white">{accountTypes[selectedAccount.type]?.label}</h4>
                            <div className="mt-2 flex items-center justify-center gap-4">
                                <h3 className="text-3xl font-black text-[rgb(28,212,132)]">
                                    {Number(selectedAccount.balance).toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}
                                </h3>
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-[8px] uppercase tracking-widest">Actif</Badge>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mt-4">•••• {selectedAccount.account_number.slice(-4)}</p>
                        </CardHeader>

                        <CardContent className="p-10 space-y-8">
                            <div className="grid grid-cols-1 gap-y-6">
                                {[
                                    { label: 'Titulaire', value: auth.user.name },
                                    { label: 'IBAN', value: `MA64 0000 0000 0000 0000 ${selectedAccount.account_number.slice(-4)}`, hasCopy: true },
                                    { label: 'Type', value: accountTypes[selectedAccount.type]?.label },
                                    { label: 'Devise', value: 'MAD' },
                                    { label: 'Date d\'ouverture', value: '15/03/2022' },
                                ].map((info, i) => (
                                    <div key={i} className="border-b border-slate-50 dark:border-white/5 pb-4 last:border-0">
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mb-1">{info.label}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-black text-slate-900 dark:text-white">{info.value}</span>
                                            {info.hasCopy && <Eye className="h-3 w-3 text-[rgb(28,212,132)] cursor-pointer" />}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4">
                                <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mb-4">Actions</p>
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#041F1E] border border-slate-100 dark:border-white/5 hover:border-[rgb(28,212,132)]/50 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-slate-400 group-hover:text-[rgb(28,212,132)]" />
                                        <span className="text-xs font-bold text-slate-600 dark:text-white/60">Relevé de compte</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-[rgb(28,212,132)] uppercase">Télécharger</span>
                                        <ChevronRight className="h-4 w-4 text-[rgb(28,212,132)]" />
                                    </div>
                                </button>
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#041F1E] border border-slate-100 dark:border-white/5 hover:border-[rgb(28,212,132)]/50 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Activity className="h-5 w-5 text-slate-400 group-hover:text-[rgb(28,212,132)]" />
                                        <span className="text-xs font-bold text-slate-600 dark:text-white/60">Voir les transactions</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-[rgb(28,212,132)] uppercase">Voir</span>
                                        <ChevronRight className="h-4 w-4 text-[rgb(28,212,132)]" />
                                    </div>
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem]">
                        <p className="text-slate-400 dark:text-white/20 font-bold uppercase tracking-widest text-xs">Sélectionnez un compte</p>
                    </div>
                )}
            </div>
        </div>
        </div>
      </div>
      </>
    // </AppLayout>
  );
}
