import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
    ArrowLeftRight, 
    Wallet, 
    Send, 
    ArrowUpRight, 
    ArrowDownLeft, 
    Search,
    User,
    CheckCircle2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

interface Account {
    id: number;
    account_number: string;
    balance: string | number;
    type: string;
}

interface Transaction {
    id: number;
    type: string;
    amount: string | number;
    description: string;
    created_at: string;
    account: Account;
}

interface Props {
    accounts: Account[];
    recentTransfers: Transaction[];
}

export default function Virements({ accounts, recentTransfers }: Props) {
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        sender_account_id: accounts.length > 0 ? accounts[0].id.toString() : '',
        receiver_account_number: '',
        amount: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/virements', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Transfer completed successfully!');
                reset('receiver_account_number', 'amount', 'description');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
            onError: () => {
                toast.error('Failed to complete transfer. Please check the form.');
            }
        });
    };

    return (
        <>
            <Head title="Virements - LionsBank" />

            <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#041F1E] p-4 lg:p-8 text-slate-900 dark:text-white transition-colors duration-500">
                <div className="mx-auto max-w-[1200px] space-y-8">
                    
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Virements & Transferts
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-white/60 mt-2 font-medium">
                            Send money instantly and securely.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Transfer Form */}
                        <div className="lg:col-span-7 space-y-6">
                            <Card className="bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 backdrop-blur-md shadow-xl dark:shadow-none overflow-hidden relative">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Send className="w-48 h-48 rotate-12" />
                                </div>
                                
                                <CardHeader className="border-b border-slate-100 dark:border-white/5 pb-6">
                                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-[rgb(28,212,132)]/20 text-[rgb(28,212,132)] flex items-center justify-center">
                                            <ArrowLeftRight className="h-5 w-5" />
                                        </div>
                                        Nouveau Virement
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 relative z-10">
                                    {isSuccess ? (
                                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                                            <div className="h-20 w-20 rounded-full bg-[rgb(28,212,132)]/20 flex items-center justify-center animate-bounce">
                                                <CheckCircle2 className="h-10 w-10 text-[rgb(28,212,132)]" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Transfer Successful!</h3>
                                            <p className="text-slate-500 dark:text-white/60 max-w-sm">
                                                Your funds have been sent instantly to the receiver's account.
                                            </p>
                                            <Button 
                                                onClick={() => setIsSuccess(false)}
                                                className="mt-4 bg-slate-900 dark:bg-white text-white dark:text-[#041F1E] hover:bg-slate-800 dark:hover:bg-white/90"
                                            >
                                                Make Another Transfer
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-3">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/60 flex items-center gap-2">
                                                    <Wallet className="h-4 w-4" /> Account to Debit
                                                </Label>
                                                <Select 
                                                    value={data.sender_account_id} 
                                                    onValueChange={(val) => setData('sender_account_id', val)}
                                                >
                                                    <SelectTrigger className="h-14 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-xl text-base focus:ring-[rgb(28,212,132)]">
                                                        <SelectValue placeholder="Select an account" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white dark:bg-[#062B29] border-slate-200 dark:border-white/10">
                                                        {accounts.map(acc => (
                                                            <SelectItem key={acc.id} value={acc.id.toString()} className="hover:bg-slate-50 dark:hover:bg-white/5 py-3 cursor-pointer">
                                                                <div className="flex justify-between items-center w-full min-w-[200px]">
                                                                    <span className="font-bold">{acc.account_number}</span>
                                                                    <span className="text-[rgb(28,212,132)] font-mono font-bold">MAD {Number(acc.balance).toLocaleString()}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.sender_account_id && <p className="text-rose-500 text-xs font-bold">{errors.sender_account_id}</p>}
                                            </div>

                                            <div className="space-y-3 pt-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/60 flex items-center gap-2">
                                                    <User className="h-4 w-4" /> Receiver Details
                                                </Label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Search className="h-5 w-5 text-slate-400 dark:text-white/30" />
                                                    </div>
                                                    <Input 
                                                        value={data.receiver_account_number}
                                                        onChange={e => setData('receiver_account_number', e.target.value)}
                                                        placeholder="Receiver Account Number (e.g. ACC-12345)"
                                                        className="h-14 pl-12 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-xl text-base font-mono focus:ring-[rgb(28,212,132)] transition-all"
                                                    />
                                                </div>
                                                {errors.receiver_account_number && <p className="text-rose-500 text-xs font-bold">{errors.receiver_account_number}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                                <div className="space-y-3">
                                                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/60">Amount (MAD)</Label>
                                                    <Input 
                                                        type="number"
                                                        step="0.01"
                                                        value={data.amount}
                                                        onChange={e => setData('amount', e.target.value)}
                                                        placeholder="0.00"
                                                        className="h-14 text-xl font-bold bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-xl focus:ring-[rgb(28,212,132)] transition-all"
                                                    />
                                                    {errors.amount && <p className="text-rose-500 text-xs font-bold">{errors.amount}</p>}
                                                </div>

                                                <div className="space-y-3">
                                                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/60">Description / Motif</Label>
                                                    <Input 
                                                        value={data.description}
                                                        onChange={e => setData('description', e.target.value)}
                                                        placeholder="What is this for?"
                                                        className="h-14 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/10 rounded-xl focus:ring-[rgb(28,212,132)] transition-all"
                                                    />
                                                    {errors.description && <p className="text-rose-500 text-xs font-bold">{errors.description}</p>}
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <Button 
                                                    type="submit" 
                                                    disabled={processing}
                                                    className="w-full h-14 bg-[rgb(28,212,132)] hover:bg-[rgb(28,212,132)]/90 text-[#041F1E] font-bold text-lg rounded-xl shadow-lg shadow-[rgb(28,212,132)]/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <Send className="h-5 w-5" />
                                                    {processing ? 'Processing...' : 'Confirm Transfer'}
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Transfers Sidebar */}
                        <div className="lg:col-span-5 space-y-6">
                            <Card className="bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none h-full">
                                <CardHeader className="border-b border-slate-100 dark:border-white/5">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                                        Recent Transfer Activity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-[500px] overflow-y-auto">
                                        {recentTransfers.length === 0 ? (
                                            <div className="p-8 text-center text-slate-400 dark:text-white/30">
                                                <ArrowLeftRight className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                                <p className="text-sm font-medium">No recent transfers found.</p>
                                            </div>
                                        ) : (
                                            recentTransfers.map((tx) => (
                                                <div key={tx.id} className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-4">
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                                                        tx.type === 'transfer_in' 
                                                            ? 'bg-emerald-500/10 text-emerald-500' 
                                                            : 'bg-rose-500/10 text-rose-500'
                                                    }`}>
                                                        {tx.type === 'transfer_in' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                            {tx.description}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5">
                                                            {new Date(tx.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className={`font-mono font-bold ${
                                                            tx.type === 'transfer_in' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'
                                                        }`}>
                                                            {tx.type === 'transfer_in' ? '+' : '-'} MAD {Math.abs(Number(tx.amount)).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
