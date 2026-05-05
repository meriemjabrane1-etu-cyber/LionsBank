import { usePage, useForm, Head } from "@inertiajs/react";
import { Calendar, Clock, CheckCircle2, AlertCircle, Plus, ChevronRight, Briefcase, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AppLayout from "@/layouts/app-layout";

export default function Appointments() {
  const { appointments } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    service_type: "",
    date: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/appointments", {
      onSuccess: () => {
        reset();
        toast.success("Appointment booked successfully!", {
          style: { background: '#0F3433', color: '#fff', border: '1px solid #1bd382' }
        });
      },
    });
  };

  const breadcrumbs = [{ title: 'Appointments', href: '/appointments' }];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending': return { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', icon: Clock };
      case 'approved': return { color: 'bg-[#1bd382]/10 text-[#1bd382] border-[#1bd382]/30', icon: CheckCircle2 };
      default: return { color: 'bg-red-500/10 text-red-400 border-red-500/30', icon: AlertCircle };
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appointments / RDV - LionsBank" />
      
      <div className="min-h-screen bg-[#071d1d] pb-20 pt-8 px-6 text-white selection:bg-[#1bd382]/30 relative overflow-hidden">
        {/* Glowing background effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1bd382]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1bd382]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Appointments / <span className="text-[#1bd382] drop-shadow-[0_0_10px_rgba(27,211,130,0.5)]">RDV</span>
            </h1>
            <p className="text-[#9CA3AF] mt-2 text-lg font-light">
              Manage your banking consultations and schedule new visits securely.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Form Section */}
            <div className="lg:col-span-1">
              <Card className="bg-[#0b2827]/80 backdrop-blur-md border-[#1a4f4d] shadow-[0_8px_30px_rgb(0,0,0,0.4)] rounded-[24px] overflow-hidden sticky top-8">
                <CardHeader className="border-b border-[#1a4f4d]/50 p-6 bg-gradient-to-b from-[#0e3332] to-transparent">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-[#1bd382]/10 rounded-lg border border-[#1bd382]/20 shadow-[0_0_15px_rgba(27,211,130,0.15)]">
                      <Plus className="w-5 h-5 text-[#1bd382]" />
                    </div>
                    <CardTitle className="text-xl text-white">New Appointment</CardTitle>
                  </div>
                  <CardDescription className="text-[#9CA3AF]">Select a service and preferred time.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#D1D5DB]">Service Type</label>
                      <select
                        value={data.service_type}
                        onChange={(e) => setData("service_type", e.target.value)}
                        className="w-full h-12 bg-[#061818] text-white rounded-xl border border-[#1a4f4d] px-4 outline-none focus:ring-2 focus:ring-[#1bd382]/50 transition-all focus:border-[#1bd382]"
                      >
                        <option value="" className="text-gray-500">Choose a service...</option>
                        <option value="Card issue">💳 Card Issue / Replacement</option>
                        <option value="Loan request">💰 Loan Request Consultation</option>
                        <option value="Account problem">⚠️ Account Security / Support</option>
                        <option value="Cheque validation">📑 Cheque Validation</option>
                      </select>
                      {errors.service_type && (
                        <p className="text-xs text-red-400 font-medium mt-1">{errors.service_type}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#D1D5DB]">Preferred Date & Time</label>
                      <Input
                        type="datetime-local"
                        value={data.date}
                        onChange={(e) => setData("date", e.target.value)}
                        className="h-12 bg-[#061818] text-white border-[#1a4f4d] rounded-xl focus-visible:ring-[#1bd382]/50 focus-visible:border-[#1bd382] color-scheme-dark"
                        style={{ colorScheme: 'dark' }}
                      />
                      {errors.date && (
                        <p className="text-xs text-red-400 font-medium mt-1">{errors.date}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={processing}
                      className="w-full h-12 bg-transparent border border-[#1bd382]/50 text-[#1bd382] hover:bg-[#1bd382] hover:text-[#061818] hover:shadow-[0_0_20px_rgba(27,211,130,0.4)] rounded-xl font-bold text-lg transition-all duration-300 active:scale-[0.98]"
                    >
                      {processing ? "Booking..." : "Confirm Appointment"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
                        <Card className="group bg-[#0b2827]/60 backdrop-blur-sm border-[#1a4f4d] rounded-[24px] overflow-hidden hover:border-[#1bd382]/50 hover:shadow-[0_8px_30px_rgba(27,211,130,0.1)] transition-all duration-300">
                          <CardHeader className="p-6 pb-2">
                            <div className="flex justify-between items-start">
                              <Badge className={`${status.color} border font-semibold px-3 py-1 rounded-full backdrop-blur-md`}>
                                <StatusIcon className="w-3 h-3 mr-1.5" />
                                {rdv.status.toUpperCase()}
                              </Badge>
                              <div className="text-[#1a4f4d] group-hover:text-[#1bd382] transition-colors">
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                            <CardTitle className="text-xl font-bold text-white mt-4 tracking-wide">
                              {rdv.service_type}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="p-6 pt-2">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 text-[#D1D5DB]">
                                <div className="p-2 bg-[#061818] rounded-lg border border-[#1a4f4d]">
                                  <Calendar className="w-4 h-4 text-[#1bd382]" />
                                </div>
                                <span className="font-medium">{rdv.date}</span>
                              </div>
                              
                              <div className="pt-4 border-t border-[#1a4f4d]/50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <UserIcon className="w-4 h-4 text-[#9CA3AF]" />
                                  <span className="text-sm font-medium text-[#E5E7EB]">{rdv.user?.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="w-4 h-4 text-[#9CA3AF]" />
                                  <span className="text-sm text-[#9CA3AF]">{rdv.employee?.name ?? "Assigning..."}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {appointments.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-[#0b2827]/40 rounded-[24px] border border-dashed border-[#1a4f4d]">
                    <div className="w-16 h-16 bg-[#061818] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1a4f4d]">
                      <Calendar className="w-8 h-8 text-[#1bd382]/50" />
                    </div>
                    <h3 className="text-lg font-bold text-white">No appointments yet</h3>
                    <p className="text-[#9CA3AF] mt-1">Book your first secure consultation using the form.</p>
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