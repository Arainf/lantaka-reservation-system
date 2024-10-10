import React from 'react';
import AccountsRow from './AccountsRow'; // Import the AccountsRow component

const AccountsTable = ({ accountData }) => {
  return (
    <div className="flex flex-wrap items-start mt-4 w-full max-md:max-w-full pl-4">
      <table className="w-full border-collapse">
        <TableHeader />
        <tbody>
          {accountData.map((account, index) => (
            <AccountsRow key={index} accounts={account} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr className="bg-white">
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[40px]"></th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">User</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Role</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Email</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Username</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Cellphone No.</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Date of Birth</th> 
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Gender</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Created at</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Updated at</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[110px]">Status</th>


      </tr>
    </thead>
  );
};

export default AccountsTable;