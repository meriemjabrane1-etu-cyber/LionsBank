import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Wallet, ArrowRight, CreditCard, Activity, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

type Account = {
  id: number;
  account_number: string;
  balance: string | number;
  type: string;
  transactions_count: number;
};

interface Props {
  accounts: Account[];
}

export default function Comptes({ accounts }: Props) {
  const breadcrumbs = [{ title: 'Accounts', href: '/comptes' }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Accounts - LionsBank" />

      <div className="p-6 lg:p-8 space-y-8">
        <header>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <Landmark className="h-8 w-8 text-[rgb(28,212,132)]" />
                My <span className="text-[rgb(28,212,132)]">Accounts</span>
            </h1>
            <p className="mt-2 text-white/40">Secure management of your liquidity and holdings.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account, i) => (
                <motion.div
                    key={account.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#062B29] to-[#041F1E] border border-white/10 p-8 hover:border-[rgb(28,212,132)]/50 transition-all duration-500 shadow-2xl"
                >
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[rgb(28,212,132)]/5 blur-3xl pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-10">
                        <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[rgb(28,212,132)] shadow-lg group-hover:bg-[rgb(28,212,132)] group-hover:text-[#041F1E] transition-all">
                            {account.type === 'current' ? <Wallet className="h-7 w-7" /> : <CreditCard className="h-7 w-7" />}
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">System ID</span>
                            <p className="text-xs font-mono text-white/60">#{account.id.toString().padStart(4, '0')}</p>
                        </div>
                    </div>

                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(28,212,132)] mb-1 block">Account Number</span>
                        <h3 className="text-xl font-mono font-bold text-white tracking-widest mb-6">
                            {account.account_number.match(/.{1,4}/g)?.join(' ') || account.account_number}
                        </h3>
                        
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-6">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Current Liquidity</span>
                            <div className="text-3xl font-bold text-white mt-1">
                                {Number(account.balance).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'MAD',
                                })}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-white/20" />
                                <span className="text-xs font-bold text-white/40">{account.transactions_count} Transactions</span>
                            </div>
                            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[rgb(28,212,132)] group/btn">
                                Details <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Gloss Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
            ))}

            {/* Add Account Card */}
            <button className="group rounded-[2.5rem] border-2 border-dashed border-white/5 bg-white/[0.02] p-8 flex flex-col items-center justify-center gap-4 hover:border-[rgb(28,212,132)]/30 hover:bg-[rgb(28,212,132)]/5 transition-all duration-500 min-h-[350px]">
                <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/10 group-hover:bg-[rgb(28,212,132)]/20 group-hover:text-[rgb(28,212,132)] transition-all">
                    <Activity className="h-8 w-8" />
                </div>
                <div className="text-center">
                    <h4 className="font-bold text-white group-hover:text-[rgb(28,212,132)] transition-colors">Request New Account</h4>
                    <p className="text-xs text-white/20 mt-1">Expansion of your asset portfolio.</p>
                </div>
            </button>
        </div>
      </div>
    </AppLayout>
  );
}
