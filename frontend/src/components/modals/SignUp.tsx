import { Dispatch, SetStateAction } from "react";
import Modal from "../reusable/Modal";
import { getCredential } from "../../lib/authentication";

const SignUp = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Modal open={open} setOpen={setOpen} title="Sign in">
        <div className="text-black">
          <div className="flex flex-col items-center w-full">
            <button
              className="text-white"
              onClick={() => getCredential()}
            >
              Create passkeys
            </button>
            <button
              className="text-white"
              onClick={() => getCredential()}
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignUp;
