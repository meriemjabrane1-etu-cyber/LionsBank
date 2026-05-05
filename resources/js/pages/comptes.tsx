import { Head } from '@inertiajs/react';

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
    console.log(accounts);
  return (
    <>
      <Head title="Comptes" />


      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold mb-4">Mes comptes</h1>

        {false ? (
          <p className="text-gray-500">Vous n&apos;avez aucun compte pour l&apos;instant.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Numéro de compte
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Solde
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Transactions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {account.account_number}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {account.type === 'current' ? 'Compte courant' : 'Compte épargne'}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-emerald-600">
                      {Number(account.balance).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'MAD',
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {account.transactions_count} transaction(s)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </>
  );
}
