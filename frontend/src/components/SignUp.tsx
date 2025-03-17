import { useState } from "react";
import SignUpModal from "./modals/SignUp";

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-2 items-center border rounded-sm max-w-[250px] p-2">
      <h1>Sign up</h1>
      {/* <button className="w-full">Sign up w/ username and password</button> */}
      <button
        className="w-full"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Sign up
      </button>
      <button className="w-full">Claim account</button>
      <SignUpModal open={showModal} setOpen={setShowModal} />
    </div>
  );
};

export default SignUp;
