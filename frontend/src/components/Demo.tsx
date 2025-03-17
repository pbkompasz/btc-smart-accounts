import DemoModal from "./modals/Demo";
import { useState } from "react";

/**
 * @summary A simple in-dashboard demo to quickly showcase and test new features
 * @returns
 */
const Demo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 items-center border rounded-sm p-2 h-full">
      <h1>Demo</h1>
      <button onClick={() => setIsOpen(true)} className="w-full h-[50px]">
        Start demo
      </button>
      <DemoModal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default Demo;
