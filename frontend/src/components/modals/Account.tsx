import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../reusable/Modal";
import { SubAccount } from "../../lib/account";

const Account = ({
  open,
  setOpen,
  action = "manage_account",
  subAccount,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action?:
    | "manage_account"
    | "create_sub_account"
    | "create_virtual_sub_account"
    | "manage_sub_account";
  subAccount?: SubAccount;
}) => {
  let title;
  switch (action) {
    case "create_sub_account":
      title = "Create sub-account";
      break;
    case "create_virtual_sub_account":
      title = "Create virtual(temporary) sub-account";
      break;
    case "manage_sub_account":
      title = "Manage sub-account";
      break;
    case "manage_account":
    default:
      title = "Manage account";
      break;
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} title={title}>
        <div className="text-black"></div>
      </Modal>
    </>
  );
};

export default Account;
