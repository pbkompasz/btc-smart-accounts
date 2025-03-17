import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../reusable/Modal";
import { AuthProvider } from "../../lib/provider";
import { getCredential } from "../../lib/authentication";

// Move to "SDK"
const AuthModal = ({
  open,
  setOpen,
  onAccountCreated,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onAccountCreated: any;
}) => {
  const [isAccount, setIsAccount] = useState(false);
  const [accountName, setAccountName] = useState("My account");
  const [accountAddress, setAccountAddress] = useState(
    "SP2M00W0M08BBJ3Q3ZEDYFTYDBE93AQ2CT4SVNE5H"
  );
  const [accountHoldingBTC, setAccountHoldingBTC] = useState("0");
  const [accountHoldingSTX, setAccountHoldingSTX] = useState("10");
  const [loading, setLoading] = useState(false);

  const createAccount = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    onAccountCreated();
    setIsAccount(true);
    await new Promise((r) => setTimeout(r, 1000));
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen} title="Create account">
        {!isAccount ? (
          <div className="text-black flex flex-col items-center w-[800px]">
            <h3 className="text-xl">Select an authentication option</h3>
            <div className="flex flex-row gap-2 m-2">
              <div className="flex flex-col items-center min-w-34 min-h-30 border-2 rounded-sm p-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6356/6356206.png"
                  alt="passkeys"
                  className="w-20 h20"
                />
                <p>Passkeys</p>
              </div>
              <div className="flex flex-col items-center min-w-30 min-h-30 border rounded-sm p-2 bg-zinc-300 m-2">
                <img
                  src="https://cdn-icons-png.freepik.com/512/678/678370.png"
                  alt="passkeys"
                  className="w-20 h20"
                />
                <p>Passport</p>
              </div>
              <div className="flex flex-col items-center min-w-30 min-h-30 border rounded-sm p-2 bg-zinc-300 m-2">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-email-icon-download-in-svg-png-gif-file-formats--envenlope-letter-mail-user-interface-pack-icons-83578.png"
                  alt="passkeys"
                  className="w-20 h20"
                />
                <p>Email</p>
              </div>
            </div>
            <button className="text-white m-2" onClick={() => getCredential()}>
              Create passkey
            </button>
            <button className="text-white" onClick={() => createAccount()}>
              <div className="flex flex-row items-center gap-2">
                {loading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                )}
                Create account
              </div>
            </button>
          </div>
        ) : (
          <div className="text-black flex flex-col items-center w-[800px]">
            <h2>{accountName}</h2>
            <p>{accountAddress}</p>
            <p>{accountHoldingBTC} BTC</p>
            <p>{accountHoldingSTX} STX</p>
            <button className="text-white">Log out</button>
          </div>
        )}
      </Modal>
    </>
  );
};

const Demo = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minted, setMinted] = useState(false);

  const onAccountCreated = () => {
    setIsAuthenticated(true);
  };

  const mintNFT = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setMinted(true);
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen} title="Demo">
        <AuthProvider>
          <div className="min-w-[800px] min-h-[70vh] border rounded-sm border-black">
            <div className="flex flex-row-reverse bg-sky-500/100 p-2">
              {!isAuthenticated ? (
                <button
                  className="text-white ml-full"
                  onClick={() => setIsOpen(true)}
                >
                  Sign in or create account
                </button>
              ) : (
                <button
                  className="text-white ml-full"
                  onClick={() => setIsOpen(true)}
                >
                  <p>My account</p>
                  <p className="text-xs">(SP2M00...)</p>
                </button>
              )}
            </div>
            <div className="w-full min-h-[500px] flex flex-col items-center justify-center">
              <div className="flex flex-col gap-2 items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDsYaQRK4j_1xVzqrPM3yTMS-1NfxY9gM_yA&s"
                  alt="ape"
                />
                {!minted ? (
                  <button
                    className="flex flex-row justify-center items-center gap-2 text-white w-[150px]"
                    onClick={() => mintNFT()}
                  >
                    {loading && (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    )}
                    Mint NFT
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <AuthModal
              open={isOpen}
              setOpen={setIsOpen}
              onAccountCreated={onAccountCreated}
            ></AuthModal>
          </div>
        </AuthProvider>
      </Modal>
    </>
  );
};

export default Demo;
