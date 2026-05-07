import { useForm, usePage, Head } from "@inertiajs/react";
import { Calendar, Clock, Plus, Activity, User as UserIcon, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/layouts/app-layout";

const getStatusConfig = (status) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: Activity };
    case 'pending':
      return { color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: Clock };
    default:
      return { color: 'bg-white/10 text-white/60 border-white/20', icon: Calendar };
  }
};

export default function Appointments() {
  const { appointments } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    service_type: "",
    date: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/appointments", {
      onSuccess: () => reset(),
    });
  };

  const breadcrumbs = [{ title: 'Appointments', href: '/appointments' }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Secure Appointments - LionsBank" />
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#041F1E] py-10 pr-10 pl-0 text-slate-900 dark:text-white relative transition-colors duration-500 m-0 w-full max-w-none">
        <div className="w-full space-y-12 m-0 p-0 max-w-none">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              Virtual Hub <span className="text-[rgb(28,212,132)]">&</span> Booking
            </h1>
            <p className="text-slate-500 dark:text-white/40 font-medium text-lg max-w-2xl">
              Manage your banking consultations and schedule new visits securely.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Create Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-[#062B29]/80 backdrop-blur-md border border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden sticky top-8">
                <div className="border-b border-white/5 p-8 bg-gradient-to-b from-white/5 to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-[rgb(28,212,132)]/10 rounded-xl border border-[rgb(28,212,132)]/20 shadow-lg">
                      <Plus className="w-5 h-5 text-[rgb(28,212,132)]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">New Request</h3>
                  </div>
                  <p className="text-white/40 text-sm">Select a service and preferred time.</p>
                </div>
                <div className="p-8">
                  <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Service Type</label>
                      <select
                        value={data.service_type}
                        onChange={(e) => setData("service_type", e.target.value)}
                        className="w-full h-12 bg-[#041F1E] text-white rounded-2xl border border-white/10 px-4 outline-none focus:ring-2 focus:ring-[rgb(28,212,132)]/50 transition-all focus:border-[rgb(28,212,132)]"
                      >
                        <option value="" className="bg-[#041F1E]">Choose a service...</option>
                        <option value="Card issue" className="bg-[#041F1E]">💳 Card Issue / Replacement</option>
                        <option value="Loan request" className="bg-[#041F1E]">💰 Loan Request Consultation</option>
                        <option value="Account problem" className="bg-[#041F1E]">⚠️ Account Security / Support</option>
                        <option value="Cheque validation" className="bg-[#041F1E]">📑 Cheque Validation</option>
                      </select>
                      {errors.service_type && (
                        <p className="text-xs text-rose-400 font-medium mt-1 ml-1">{errors.service_type}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Date & Time</label>
                      <Input
                        type="datetime-local"
                        value={data.date}
                        onChange={(e) => setData("date", e.target.value)}
                        className="h-12 bg-[#041F1E] text-white border-white/10 rounded-2xl focus-visible:ring-[rgb(28,212,132)]/50 focus-visible:border-[rgb(28,212,132)]"
                        style={{ colorScheme: 'dark' }}
                      />
                      {errors.date && (
                        <p className="text-xs text-rose-400 font-medium mt-1 ml-1">{errors.date}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={processing}
                      className="w-full h-14 bg-[rgb(28,212,132)] hover:bg-white text-[#041F1E] rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                    >
                      {processing ? "Securing Slot..." : "Confirm Booking"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* List Section */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {appointments.map((rdv, index) => {
                    const status = getStatusConfig(rdv.status);
                    const StatusIcon = status.icon;

                    return (
                      <motion.div
                        key={rdv.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="group bg-[#062B29]/60 backdrop-blur-sm border border-white/5 rounded-[2rem] overflow-hidden hover:border-[rgb(28,212,132)]/30 hover:shadow-[0_8px_30px_rgba(28,212,132,0.1)] transition-all duration-500 p-6">
                            <div className="flex justify-between items-start mb-6">
                              <Badge className={`${status.color} border font-bold px-3 py-1 rounded-full backdrop-blur-md text-[10px] uppercase tracking-tighter`}>
                                <StatusIcon className="w-3 h-3 mr-1.5" />
                                {rdv.status}
                              </Badge>
                              <div className="text-white/10 group-hover:text-[rgb(28,212,132)] transition-colors">
                                <Activity className="w-5 h-5" />
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-[rgb(28,212,132)] transition-colors line-clamp-1">
                                {rdv.service_type}
                            </h3>
                            
                            <div className="mt-6 space-y-4">
                              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="p-2 bg-[rgb(28,212,132)]/10 rounded-xl border border-[rgb(28,212,132)]/20">
                                  <Calendar className="w-4 h-4 text-[rgb(28,212,132)]" />
                                </div>
                                <span className="font-bold text-sm text-white/80">{rdv.date}</span>
                              </div>
                              
                              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <UserIcon className="w-4 h-4 text-white/20" />
                                  <span className="text-xs font-bold text-white/60">{rdv.user?.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="w-4 h-4 text-white/20" />
                                  <span className="text-xs font-bold text-white/40">{rdv.employee?.name ?? "Dispatching..."}</span>
                                </div>
                              </div>
                            </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {appointments.length === 0 && (
                  <div className="col-span-full py-32 text-center bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                      <Calendar className="w-10 h-10 text-white/10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">No Appointments</h3>
                    <p className="text-white/30 mt-2 max-w-xs mx-auto">You haven't scheduled any consultations yet. Start by using the secure form.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
