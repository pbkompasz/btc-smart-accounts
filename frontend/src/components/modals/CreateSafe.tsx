import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../reusable/Modal";

const SocialRecovery = () => {
  return <div className="text-black">coming soon</div>;
};

const CreateSafe = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [aknowledged, setAknowledged] = useState(false);
  const [useSocialRecovery, setUseSocialRecovery] = useState(false);

  return (
    <>
      <Modal open={open} setOpen={setOpen} title={"Create safe"}>
        <div className="text-black"></div>
        <button>Create mnemonic</button>
        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 rounded-sm "
            checked={aknowledged}
            onChange={(e) => setAknowledged(e.target.checked)}
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-700"
          >
            I have safed the mnemonic in a safe place
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 rounded-sm "
            checked={useSocialRecovery}
            onChange={(e) => setUseSocialRecovery(e.target.checked)}
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-700"
          >
            Use social recovery
          </label>
        </div>
        {useSocialRecovery && <SocialRecovery />}
      </Modal>
    </>
  );
};

export default CreateSafe;
