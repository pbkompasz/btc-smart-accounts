import { useState } from "react";
import CreateSafe from "./modals/CreateSafe";

const Safe = () => {
  const [showSafeCreation, setShowSafeCreation] = useState(false);
  const [safe] = useState();

  return (
    <div className="flex flex-col gap-2 items-center border rounded-sm w-[500px] p-2 h-full">
      <div className="w-full justify-between flex p-2">
        <h1>Safe</h1>
        {safe && <div>socialRecovery ?? SocialRecoveryEnabledIcon</div>}
      </div>
      {safe ? (
        <>
          :<p>Safe address:</p>
          <p>STX</p>
          <p>BTC</p>
        </>
      ) : (
        <>
          Not created yet
          <button onClick={() => setShowSafeCreation(true)}>Create Safe</button>
          <CreateSafe open={showSafeCreation} setOpen={setShowSafeCreation} />
        </>
      )}
    </div>
  );
};

export default Safe;
