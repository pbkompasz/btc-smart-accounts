import { useState } from "react";
import SignInModal from "./modals/SignIn";

const SignIn = () => {
  const [showModal, setShowModal] = useState(false);
  const [option, setOption] = useState<"username_password" | "passkeys">(
    "username_password"
  );

  return (
    <div className="flex flex-col gap-2 items-center border rounded-sm max-w-[250px] p-2">
      <h1>Sign in</h1>

      <button
        className="w-full"
        onClick={() => {
          setShowModal(true);
          setOption("passkeys");
        }}
      >
        Sign in w/ passkeys
      </button>

      <button
        disabled
        className="w-full"
        onClick={() => {
          setShowModal(true);
          setOption("passkeys");
        }}
      >
        Sign in w/ email
      </button>

      <button
        disabled
        className="w-full"
        onClick={() => {
          setShowModal(true);
          setOption("passkeys");
        }}
      >
        Sign in w/ passport
      </button>

      <SignInModal open={showModal} setOpen={setShowModal} option={option} />
    </div>
  );
};

export default SignIn;
