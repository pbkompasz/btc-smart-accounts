import { Dispatch, SetStateAction } from "react";
import Modal from "../reusable/Modal";

const ManageSessions = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Modal open={open} setOpen={setOpen} title="Manage sessions">
        <div className="text-black"></div>
      </Modal>
    </>
  );
};

export default ManageSessions;
