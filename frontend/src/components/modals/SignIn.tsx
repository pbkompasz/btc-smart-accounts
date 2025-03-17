import { Dispatch, SetStateAction } from "react";
import Modal from "../reusable/Modal";
import {
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
import { getCredential } from "../../lib/authentication";

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
  return (
    <div className="flex flex-col items-center w-full">
      <button className="text-white" onClick={() => getCredential()}>
        Sign in
      </button>
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

const SignIn = ({
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
            <TabList
              className="flex gap-2 p-2 m-2"
              style={{ borderBottom: "solid 1px grey" }}
            >
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

export default SignIn;
