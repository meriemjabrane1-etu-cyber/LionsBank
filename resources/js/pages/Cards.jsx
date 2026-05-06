import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { 
  CreditCard, 
  Plus, 
  Lock, 
  Eye, 
  Settings, 
  Bell, 
  RefreshCw, 
  ShieldX,
  ChevronRight,
  Search,
  ArrowRight,
  MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function Cards({ auth }) {
  const [selectedCard, setSelectedCard] = useState(0);

  const cards = [
    { id: 0, type: 'Principale', brand: 'VISA', number: '•••• 3456', holder: 'Karim El Amrani', expiry: '06/26', color: 'bg-[#062B29]', textColor: 'text-white', isTeal: true },
    { id: 1, type: 'Secondaire', brand: 'MasterCard', number: '•••• 7890', holder: 'Karim El Amrani', expiry: '09/25', color: 'bg-gradient-to-br from-amber-400 to-amber-600', textColor: 'text-[#041F1E]', isGold: true },
    { id: 2, type: 'Compte joint', brand: 'VISA', number: '•••• 1122', holder: 'Karim & Sara', expiry: '02/27', color: 'bg-gradient-to-br from-blue-700 to-blue-900', textColor: 'text-white', isBlue: true },
  ];

  const limits = [
    { label: 'Paiement', current: '10.000,00', max: '20.000,00', percent: 50 },
    { label: 'Retrait', current: '3.000,00', max: '5.000,00', percent: 60 },
    { label: 'Paiement en ligne', current: '5.000,00', max: '10.000,00', percent: 50 },
  ];

  const actions = [
    { label: 'Verrouiller la carte', icon: Lock, color: 'indigo' },
    { label: 'Voir le code PIN', icon: Eye, color: 'emerald' },
    { label: 'Gérer les plafonds', icon: Settings, color: 'blue' },
    { label: 'Activer les notifications', icon: Bell, color: 'emerald' },
    { label: 'Remplacer la carte', icon: RefreshCw, color: 'blue' },
    { label: 'Bloquer la carte', icon: ShieldX, color: 'rose' },
  ];

  const transactions = [
    { id: 1, type: 'Achat en ligne - Amazon', date: "Hier, 16:45", amount: '-450,00' },
    { id: 2, type: 'Zara - Morocco Mall', date: "Hier, 14:20", amount: '-320,00' },
    { id: 3, type: 'Station Afriquia', date: "07 Mai 2024, 18:30", amount: '-200,00' },
    { id: 4, type: 'Restaurant La Table', date: "06 Mai 2024, 21:15", amount: '-280,00' },
  ];

  const currentCard = cards[selectedCard];

  return (
    <AppLayout breadcrumbs={[{ title: 'Cartes', href: '/cartes' }]}>
      <Head title="Mes Cartes - LionsBank" />

      <div className="min-h-screen py-8 pr-8 pl-0 text-slate-900 dark:text-white relative transition-colors duration-500">
        <div className="w-full space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Cartes</h1>
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

        {/* Mes Cartes Carousel Section */}
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Mes cartes</h3>
                <button className="text-[10px] font-bold text-[rgb(28,212,132)] uppercase tracking-widest hover:underline flex items-center gap-2">
                    Gérer mes cartes <Settings className="h-4 w-4" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedCard(i)}
                        className={`relative h-52 rounded-[2rem] p-8 cursor-pointer transition-all duration-500 overflow-hidden group shadow-xl ${card.color} ${card.textColor} ${selectedCard === i ? 'ring-4 ring-[rgb(28,212,132)]/50 scale-105' : 'opacity-80 hover:opacity-100'}`}
                    >
                        {/* Brand Marks */}
                        {card.isTeal && (
                            <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
                                <img src="/images/lion-watermark.png" alt="Lion" className="h-64 w-64 object-contain" />
                            </div>
                        )}
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <Badge className={`${card.isGold ? 'bg-black/20 text-[#041F1E]' : 'bg-white/10 text-white'} border-none px-3 py-1 font-bold text-[9px] uppercase tracking-widest`}>
                                    {card.type}
                                </Badge>
                                <span className="text-xl font-black italic">{card.brand}</span>
                            </div>
                            <div>
                                <p className="text-lg font-mono tracking-[0.2em] mb-1">{card.number}</p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[9px] uppercase font-bold opacity-50 tracking-widest">Titulaire</p>
                                        <p className="text-sm font-bold">{card.holder}</p>
                                    </div>
                                    <p className="text-xs font-bold">{card.expiry}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
                
                {/* Add Card Button */}
                <button className="h-52 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 text-slate-300 dark:text-white/10 hover:border-[rgb(28,212,132)] hover:text-[rgb(28,212,132)] transition-all group bg-white dark:bg-transparent shadow-sm dark:shadow-none">
                    <div className="h-14 w-14 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Ajouter une carte</span>
                </button>
            </div>
        </section>

        {/* Details & Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Card Details & Quick Actions */}
            <div className="lg:col-span-2 space-y-8">
                <Card className="bg-white dark:bg-[#062B29]/50 border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-sm dark:shadow-none overflow-hidden">
                    <CardHeader className="p-8 flex flex-row items-center justify-between border-b border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-4">
                            <CardTitle className="text-xl font-black text-slate-900 dark:text-white">Détails de la carte</CardTitle>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-[9px] uppercase tracking-widest">Active</Badge>
                        </div>
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-[#041F1E] border border-slate-200 dark:border-white/10 text-slate-400">
                            <MoreVertical className="h-5 w-5" />
                        </button>
                    </CardHeader>
                    <CardContent className="p-10">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            {/* Visual Card Representation */}
                            <div className={`relative w-72 h-44 rounded-2xl p-6 shadow-2xl transition-all duration-700 ${currentCard.color} ${currentCard.textColor} overflow-hidden`}>
                                {currentCard.isTeal && (
                                    <div className="absolute -right-8 -bottom-8 opacity-20 pointer-events-none">
                                        <img src="/images/lion-watermark.png" alt="Lion" className="h-56 w-56 object-contain" />
                                    </div>
                                )}
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <span className="text-lg font-black italic self-end">{currentCard.brand}</span>
                                    <div>
                                        <p className="text-base font-mono tracking-widest mb-4">{currentCard.number}</p>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[7px] uppercase font-bold opacity-50">Titulaire</p>
                                                <p className="text-xs font-bold">{currentCard.holder}</p>
                                            </div>
                                            <p className="text-[10px] font-bold">{currentCard.expiry}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Info Table */}
                            <div className="flex-1 grid grid-cols-2 gap-y-6 gap-x-8">
                                {[
                                    { label: 'Type de carte', value: 'Visa Classic' },
                                    { label: 'Numéro de carte', value: '**** **** **** 3456', hasEye: true },
                                    { label: 'Titulaire', value: currentCard.holder },
                                    { label: 'Compte associé', value: 'Compte courant (•••• 3456)' },
                                    { label: 'Date d\'expiration', value: currentCard.expiry },
                                    { label: 'CVV', value: '***', hasEye: true },
                                ].map((info, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mb-1">{info.label}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-slate-900 dark:text-white">{info.value}</span>
                                            {info.hasEye && <Eye className="h-3 w-3 text-[rgb(28,212,132)] cursor-pointer" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions Grid */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Actions rapides</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {actions.map((action, i) => (
                            <button key={i} className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-[#062B29]/50 border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm dark:shadow-none hover:border-[rgb(28,212,132)]/50 transition-all group">
                                <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-[#041F1E] text-slate-400 group-hover:text-[rgb(28,212,132)] transition-colors">
                                    <action.icon className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest text-center leading-tight">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Limits & Transactions */}
            <div className="space-y-8">
                {/* Plafonds Card */}
                <Card className="bg-white dark:bg-[#062B29]/50 border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-sm dark:shadow-none p-8">
                    <div className="flex items-center justify-between mb-10">
                        <CardTitle className="text-lg font-black text-slate-900 dark:text-white">Plafonds de la carte</CardTitle>
                        <button className="text-[10px] font-bold text-[rgb(28,212,132)] uppercase tracking-widest hover:underline">Modifier</button>
                    </div>
                    
                    <div className="space-y-8">
                        {limits.map((limit, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-slate-600 dark:text-white/60">{limit.label}</span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-white/20">{limit.percent}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${limit.percent}%` }}
                                        className="h-full bg-[rgb(28,212,132)] rounded-full"
                                    />
                                </div>
                                <p className="text-[10px] font-black text-slate-900 dark:text-white tracking-widest">
                                    {limit.current} MAD <span className="text-slate-300 dark:text-white/10">/</span> {limit.max} MAD
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Card Transactions */}
                <Card className="bg-white dark:bg-[#062B29]/50 border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-sm dark:shadow-none p-8">
                    <div className="flex items-center justify-between mb-8">
                        <CardTitle className="text-lg font-black text-slate-900 dark:text-white">Dernières transactions</CardTitle>
                        <button className="text-[10px] font-bold text-[rgb(28,212,132)] uppercase tracking-widest hover:underline">Voir tout</button>
                    </div>
                    
                    <div className="space-y-6">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center gap-4 group">
                                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-[#041F1E] text-slate-400 group-hover:text-[rgb(28,212,132)] transition-colors">
                                    <CreditCard className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">{tx.type}</p>
                                    <p className="text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-wide">{tx.date}</p>
                                </div>
                                <span className="text-xs font-black text-slate-900 dark:text-white">{tx.amount} MAD</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
        </div>
      </div>
    </AppLayout>
  );
}
