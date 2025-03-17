import { useState } from "react";
import { useAccount } from "../lib/useAccount";
import AccountModal from "./modals/Account";
import { SubAccount } from "../lib/account";

const Account = () => {
  const { account, subAccounts, sessions } = useAccount();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountModalAction, setAccountModalAction] = useState<
    | "manage_account"
    | "create_sub_account"
    | "create_virtual_sub_account"
    | "manage_sub_account"
  >("manage_account");
  const [selectedSubAccount, setSelectedSubAccount] = useState<SubAccount>();

  return (
    <div className="flex flex-col gap-2 border rounded-sm p-2 grow">
      <h1>Account & Sessions</h1>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <button
            className="w-[250px]"
            onClick={() => {
              setShowAccountModal(true);
              setAccountModalAction("manage_account");
            }}
          >
            Manage account
          </button>
          <button
            className="w-[250px]"
            onClick={() => {
              setShowAccountModal(true);
              setAccountModalAction("create_sub_account");
            }}
          >
            Create sub-account
          </button>
        </div>
        <div className="flex flex-col grow ml-3">
          <h2 className="text-3xl">Sub-accounts</h2>
          {subAccounts.map((subAccount, index) => (
            <div key={index}>
              #{index + 1} sub-account
              <button
                onClick={() => {
                  setShowAccountModal(true);
                  setAccountModalAction("manage_sub_account");
                  setSelectedSubAccount(subAccount);
                }}
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
      <AccountModal
        open={showAccountModal}
        setOpen={setShowAccountModal}
        subAccount={selectedSubAccount}
        action={accountModalAction}
      />
    </div>
  );
};

export default Account;
