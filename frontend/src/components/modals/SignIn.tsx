import { Dispatch, SetStateAction } from "react";
import Modal from "../reusable/Modal";
import {
  Button,
  Description,
  Field,
  Input,
  Label,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

const UsernamePassword = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Field>
        <Label className="text-sm/6 font-medium">Username</Label>
        <Description className="text-sm/6 ">
          Use your real name so people will recognize you.
        </Description>
        <Input
          className="block w-full rounded-lg py-1.5"
          style={{ border: "solid 1px black" }}
          type="text"
        />
      </Field>
      <Field className="w-full">
        <Label className="text-sm/6 font-medium">Password</Label>
        <Description className="text-sm/6">Make it good</Description>
        <Input
          className="block w-full rounded-lg py-1.5 text-sm/6 "
          style={{ border: "solid 1px black" }}
          type="password"
        />
      </Field>
    </div>
  );
};

const Passkeys = () => {
  async function signMessage(message: string) {
    const challenge = new TextEncoder().encode(message);

    const publicKeyCredentialRequestOptions = {
      allowCredentials: [], // Leave empty to let the user select a passkey
      challenge: challenge,
      userVerification: "required" as UserVerificationRequirement,
      timeout: 60000,
    };

    await navigator.credentials.create({
      publicKey: {
        challenge: new Uint8Array([0, 1, 2, 3, 4]),
        rp: {
          name: "Web",
        },
        user: {
          id: new Uint8Array([2, 3, 4]),
          name: "me@test.com",
          displayName: "hyllo",
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7,
          },
          {
            type: "public-key",
            alg: -8,
          },
          {
            type: "public-key",
            alg: -257,
          },
        ],
      },
    });

    // try {
    //   const credential = await navigator.credentials.get({
    //     publicKey: publicKeyCredentialRequestOptions,
    //   });

    //   if (!credential) {
    //     throw new Error("No credential received");
    //   }

    //   const authData = new Uint8Array(credential.response.authenticatorData);
    //   const signature = new Uint8Array(credential.response.signature);
    //   const clientDataJSON = new Uint8Array(credential.response.clientDataJSON);

    //   console.log("Authenticator Data:", authData);
    //   console.log("Signature:", signature);
    //   console.log("Client Data JSON:", clientDataJSON);

    //   return { authData, signature, clientDataJSON };
    // } catch (error) {
    //   console.error("Error signing message:", error);
    // }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Button onClick={() => signMessage("LET ME IN")}>Sign in</Button>
    </div>
  );
};

const signInOptions = [
  {
    id: "username_password",
    title: "Username & Password",
  },
  {
    id: "passkeys",
    title: "Passkeys",
  },
];

const ManageSessions = ({
  open,
  setOpen,
  option,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  option: "username_password" | "passkeys";
}) => {
  return (
    <>
      <Modal open={open} setOpen={setOpen} title="Sign in">
        <div className="text-black">
          <TabGroup
            defaultIndex={signInOptions.findIndex(
              (sOption) => sOption.id === option
            )}
          >
            <TabList className="flex gap-2">
              {signInOptions.map((option) => (
                <Tab className="text-white" key={option.title}>
                  {option.title}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="min-h-[200px]">
              <TabPanel>
                <UsernamePassword />
              </TabPanel>
              <TabPanel>
                <Passkeys />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </Modal>
    </>
  );
};

export default ManageSessions;
