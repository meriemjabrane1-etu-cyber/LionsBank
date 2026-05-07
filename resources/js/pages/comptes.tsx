// // resources/js/Pages/Comptes.jsx

// import DashboardLayout from '@/components/DashboardLayout';
// import { useMemo, useState } from 'react';


// const getTypeLabel = (type) => {
//   if (type === 'current') return 'Compte courant';
//   if (type === 'savings') return 'Compte épargne';
//   if (type === 'salary') return 'Compte salaire';
//   return 'Compte';
// };

// const getTypeBadge = (type) => {
//   if (type === 'current') return 'bg-emerald-100 text-emerald-700';
//   if (type === 'savings') return 'bg-blue-100 text-blue-700';
//   if (type === 'salary') return 'bg-amber-100 text-amber-700';
//   return 'bg-gray-100 text-gray-700';
// };

// const getTypeIcon = (type) => {
//   if (type === 'savings') return '🏦';
//   if (type === 'salary') return '💰';
//   return '💳';
// };

// const formatBalance = (value) =>
//   Number(value || 0).toLocaleString('fr-FR', {
//     style: 'currency',
//     currency: 'MAD',
//   });

// export default function Comptes({ accounts = [] }) {
//   const [selectedId, setSelectedId] = useState(accounts[0]?.id ?? null);

//   const selectedAccount = useMemo(
//     () => accounts.find((a) => a.id === selectedId) || accounts[0] || null,
//     [accounts, selectedId]
//   );

//   return (
//     <DashboardLayout title="Comptes" active="Comptes">
//       <div className="grid gap-6 lg:grid-cols-12">
//         {/* Mes comptes */}
//         <section className="lg:col-span-7">
//           <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//             <div className="mb-5 flex items-center justify-between">
//               <h2 className="text-lg font-semibold">Mes comptes</h2>
//               <span className="text-sm text-slate-500">
//                 {accounts.length} compte(s)
//               </span>
//             </div>

//             {accounts.length === 0 ? (
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
//                 Vous n&apos;avez aucun compte pour l&apos;instant.
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {accounts.map((account) => {
//                   const isActive = selectedId === account.id;

//                   return (
//                     <button
//                       key={account.id}
//                       onClick={() => setSelectedId(account.id)}
//                       className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
//                         isActive
//                           ? 'border-cyan-200 bg-cyan-50 shadow-sm'
//                           : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
//                       }`}
//                     >
//                       <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
//                         {getTypeIcon(account.type)}
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <div className="flex items-center justify-between gap-3">
//                           <div>
//                             <p className="text-sm text-slate-500">
//                               {getTypeLabel(account.type)}
//                             </p>
//                             <h3 className="truncate text-lg font-semibold">
//                               {formatBalance(account.balance)}
//                             </h3>
//                           </div>
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeBadge(
//                               account.type
//                             )}`}
//                           >
//                             Actif
//                           </span>
//                         </div>

//                         <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
//                           <span>•••• {String(account.account_number).slice(-4)}</span>
//                           <span>{account.transactions_count} transaction(s)</span>
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Détails du compte */}
//         <section className="lg:col-span-5">
//           <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//             <h2 className="mb-5 text-lg font-semibold">Détails du compte</h2>

//             {!selectedAccount ? (
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
//                 Sélectionnez un compte pour voir les détails.
//               </div>
//             ) : (
//               <div className="overflow-hidden rounded-2xl border border-slate-200">
//                 <div className="border-b border-slate-200 bg-slate-50 p-5">
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex items-center gap-4">
//                       <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
//                         {getTypeIcon(selectedAccount.type)}
//                       </div>
//                       <div>
//                         <p className="text-sm text-slate-500">
//                           {getTypeLabel(selectedAccount.type)}
//                         </p>
//                         <h3 className="text-2xl font-semibold text-emerald-600">
//                           {formatBalance(selectedAccount.balance)}
//                         </h3>
//                         <p className="mt-1 text-sm text-slate-500">
//                           •••• {String(selectedAccount.account_number).slice(-4)}
//                         </p>
//                       </div>
//                     </div>

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeBadge(
//                         selectedAccount.type
//                       )}`}
//                     >
//                       Actif
//                     </span>
//                   </div>
//                 </div>

//                 <div className="divide-y divide-slate-200">
//                   <div className="grid grid-cols-2 gap-4 p-5">
//                     <div>
//                       <p className="text-xs uppercase tracking-wide text-slate-400">
//                         Titulaire
//                       </p>
//                       <p className="mt-1 text-sm font-medium">Karim El Amrani</p>
//                     </div>
//                     <div>
//                       <p className="text-xs uppercase tracking-wide text-slate-400">IBAN</p>
//                       <p className="mt-1 text-sm font-medium">
//                         MA64 0000 0000 0000 0000{' '}
//                         {String(selectedAccount.account_number).slice(-4)}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs uppercase tracking-wide text-slate-400">Type</p>
//                       <p className="mt-1 text-sm font-medium">
//                         {getTypeLabel(selectedAccount.type)}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs uppercase tracking-wide text-slate-400">Devise</p>
//                       <p className="mt-1 text-sm font-medium">MAD</p>
//                     </div>
//                     <div>
//                       <p className="text-xs uppercase tracking-wide text-slate-400">
//                         Date d&apos;ouverture
//                       </p>
//                       <p className="mt-1 text-sm font-medium">15/03/2022</p>
//                     </div>
//                     <div>
//                       <p className="text-xs uppercase tracking-wide text-slate-400">
//                         Transactions
//                       </p>
//                       <p className="mt-1 text-sm font-medium">
//                         {selectedAccount.transactions_count}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="p-5">
//                     <h3 className="mb-4 text-base font-semibold">Actions</h3>
//                     <div className="space-y-3">
//                       <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left hover:bg-slate-50">
//                         <span className="text-sm font-medium">Relevé de compte</span>
//                         <span className="text-cyan-600">Télécharger</span>
//                       </button>
//                       <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left hover:bg-slate-50">
//                         <span className="text-sm font-medium">Voir les transactions</span>
//                         <span className="text-cyan-600">Voir</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </DashboardLayout>
//   );
// }
