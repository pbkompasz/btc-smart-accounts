import "./App.css";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useAccount } from "./lib/useAccount";

function App() {
  return (
    <div className="flex flex-col w-full h-[100vh] p-5">
      <div className="flex flex-row gap-2 w-full pb-2">
        <Account />
        <SignIn />
        <SignUp />
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
