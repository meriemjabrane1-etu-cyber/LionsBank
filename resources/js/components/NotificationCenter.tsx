import React, { useState } from 'react';
import { Bell, Check, Shield, Calendar, User, LogIn, Lock, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type NotificationType = 'rdv_approved' | 'rdv_rejected' | 'rdv_assigned' | 'security_login' | 'security_password' | 'security_suspicious';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'rdv_approved',
    title: 'RDV Approuvé',
    message: 'Votre rendez-vous pour "Conseil Élite" a été validé.',
    time: 'Il y a 5 min',
    read: false,
  },
  {
    id: '2',
    type: 'security_login',
    title: 'Nouvelle Connexion',
    message: 'Une connexion a été détectée depuis un nouvel appareil à Paris.',
    time: 'Il y a 20 min',
    read: false,
  },
  {
    id: '3',
    type: 'rdv_assigned',
    title: 'Conseiller Assigné',
    message: 'M. Thomas Durand a été assigné à votre prochain entretien.',
    time: 'Il y a 1 heure',
    read: true,
  },
  {
    id: '4',
    type: 'security_suspicious',
    title: 'Activité Suspecte',
    message: 'Plusieurs tentatives de connexion échouées sur votre compte.',
    time: 'Hier, 18:45',
    read: true,
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (read: boolean) => {
    return (
      <div className="relative">
        <Bell className={`h-4 w-4 ${read ? 'text-slate-300' : 'text-[rgb(28,212,132)]'}`} />
        {!read && (
          <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[rgb(28,212,132)] animate-pulse" />
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Bell Icon (First Design Style) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-[#062B29]/50 border border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/40 hover:text-[rgb(28,212,132)] transition-all shadow-sm dark:shadow-none"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[rgb(28,212,132)] border-2 border-white dark:border-[#041F1E] animate-pulse" />
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-96 z-50 bg-[#F5F7F6] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 pb-4 flex items-center justify-between bg-white/50 backdrop-blur-md">
                <h3 className="text-lg font-black text-[#111827]">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] font-black text-[rgb(28,212,132)] uppercase tracking-widest hover:underline"
                  >
                    Tout marquer comme lu
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-4 space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <motion.div 
                      key={n.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`relative p-4 rounded-2xl bg-white border border-slate-100 transition-all group ${!n.read ? 'shadow-md ring-1 ring-[rgb(28,212,132)]/20' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <div className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center">
                          {getIcon(n.read)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-black text-[#111827] truncate">{n.title}</h4>
                            <span className="text-[10px] font-medium text-[#6B7280]">{n.time}</span>
                          </div>
                          <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                            {n.message}
                          </p>
                        </div>
                      </div>

                      {/* Actions hover */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!n.read && (
                          <button 
                            onClick={() => markAsRead(n.id)}
                            className="h-8 w-8 rounded-lg bg-emerald-50 text-[rgb(28,212,132)] flex items-center justify-center hover:bg-emerald-100"
                            title="Marquer comme lu"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => deleteNotification(n.id)}
                          className="h-8 w-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {!n.read && (
                        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[rgb(28,212,132)] animate-pulse" />
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                      <Bell className="h-8 w-8 text-slate-200" />
                    </div>
                    <p className="text-sm font-bold text-[#111827]">Aucune notification</p>
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-widest mt-1">Vous êtes à jour !</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 bg-white/50 text-center">
                <button className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest hover:text-[#111827] transition-colors">
                  Voir tout l'historique
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
