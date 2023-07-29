import "./App.scss"
import WalletConnect from "./components/WalletConnect";
import NetworkSwitch from "./components/NetworkSwitch";
import TransactionForm from "./components/TransactionForm";


export default function App() {
  

  return (
    <div>
      <WalletConnect />
      <NetworkSwitch />
      <TransactionForm />
    </div>

    
  );
}


