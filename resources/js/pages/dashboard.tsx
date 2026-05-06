import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Activity, 
  ArrowUpRight, 
  ArrowDownLeft, 
  DollarSign, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SummaryCards from '@/components/SummaryCards';

export default function Dashboard({ auth }: { auth: any }) {
  const isEmployee = auth?.user?.role === 'employee';

  const stats = [
    { title: "Total Volume", value: "$4.2M", change: "+12.5%", icon: DollarSign, trend: 'up' },
    { title: "Active Users", value: "1,284", change: "+3.2%", icon: Users, trend: 'up' },
    { title: "Success Rate", value: "99.9%", change: "+0.1%", icon: ShieldCheck, trend: 'up' },
    { title: "Network Load", value: "24%", change: "-2.4%", icon: Activity, trend: 'down' },
  ];

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
      <Head title="Dashboard - LionsBank" />

      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome back, <span className="text-[rgb(28,212,132)]">{auth.user.name}</span>
            </h1>
            <p className="mt-1 text-white/40">Here's what's happening with LionsBank today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[#062B29] border border-white/5 rounded-xl flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[rgb(28,212,132)] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">System Live</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-[#062B29]/50 border-white/5 backdrop-blur-sm overflow-hidden group hover:border-[rgb(28,212,132)]/30 transition-all duration-500 rounded-[2rem]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-white/5 rounded-xl text-white/40 group-hover:text-[rgb(28,212,132)] group-hover:bg-[rgb(28,212,132)]/10 transition-all">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold flex items-center gap-1 ${stat.trend === 'up' ? 'text-[rgb(28,212,132)]' : 'text-rose-400'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/20">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[rgb(28,212,132)]/20 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Activity Chart Mock */}
          <Card className="lg:col-span-2 bg-[#062B29]/50 border-white/5 backdrop-blur-sm rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white font-bold tracking-tight">Market Evolution</CardTitle>
                  <p className="text-xs text-white/40 mt-1">Real-time asset liquidity tracking</p>
                </div>
                <div className="flex bg-[#041F1E] p-1 rounded-lg border border-white/5">
                  <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[rgb(28,212,132)] bg-[rgb(28,212,132)]/10 rounded-md">Live</button>
                  <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/20">History</button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[300px] flex items-end gap-2 px-2">
                {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75, 40, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-[rgb(28,212,132)]/5 via-[rgb(28,212,132)]/20 to-[rgb(28,212,132)]/40 rounded-t-lg group relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#041F1E] text-[10px] font-bold px-1.5 py-0.5 rounded pointer-events-none">
                      {h}%
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-6 px-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <span key={m} className="text-[10px] font-bold uppercase tracking-widest text-white/10">{m}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / Recent Activity */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-[rgb(28,212,132)]/20 to-[#062B29]/50 border-[rgb(28,212,132)]/20 rounded-[2.5rem] p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[rgb(28,212,132)]/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <Zap className="w-8 h-8 text-[rgb(28,212,132)] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Instant Transfer</h3>
                <p className="text-sm text-white/60 mb-6">Move liquidity between secure vaults instantly with zero latency.</p>
                <button className="w-full bg-[rgb(28,212,132)] hover:bg-white text-[#041F1E] font-bold py-3 rounded-2xl transition-all shadow-lg shadow-[rgb(28,212,132)]/20">
                  Initialize Protocol
                </button>
              </div>
            </Card>

            <Card className="bg-[#062B29]/50 border-white/5 rounded-[2.5rem] p-8">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-bold text-white">Recent Security Logs</h3>
                 <button className="text-[10px] font-bold uppercase tracking-widest text-[rgb(28,212,132)] hover:underline">View All</button>
               </div>
               <div className="space-y-6">
                 {[
                   { label: "IP: 192.168.1.1", action: "Successful Login", time: "2m ago" },
                   { label: "Vault #482", action: "Liquidity Sync", time: "15m ago" },
                   { label: "Mazad Auction", action: "Bid Confirmed", time: "42m ago" },
                 ].map((log, i) => (
                   <div key={i} className="flex items-center justify-between group">
                     <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[rgb(28,212,132)] group-hover:scale-150 transition-transform" />
                       <div>
                         <p className="text-sm font-bold text-white/80">{log.action}</p>
                         <p className="text-[10px] font-medium text-white/20 uppercase tracking-wide">{log.label}</p>
                       </div>
                     </div>
                     <span className="text-[10px] font-bold text-white/10 uppercase">{log.time}</span>
                   </div>
                 ))}
               </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
