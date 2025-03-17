import "./App.css";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Demo from "./components/Demo";
import Safe from "./components/Safe";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="flex flex-col w-full h-[100vh]">
      <div className="flex flex-row gap-2 w-full pb-2">
        <Account />
        <SignIn />
        <SignUp />
        <Demo />
      </div>
      <div className="flex flex-row justify-between h-[72vh] gap-2">
        <Dashboard />
        <Safe />
      </div>
    </div>
  );
}

export default App;
