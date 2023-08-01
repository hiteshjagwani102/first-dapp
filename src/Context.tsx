import React, {useEffect,useContext,useState } from "react";
import getAccounts from "./services/getAccounts";

import Web3 from 'web3'
import {ethers} from 'ethers'

const Context = React.createContext<any>(null);

const Provider = ({ children }:any) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<Web3 | ethers.providers.Web3Provider >()
  const [isSending, setIsSending] = useState<boolean | undefined>(false)

  useEffect(()=>{
    if(window.ethereum){
      setProvider(new Web3(window.ethereum))
    }
  },[])

  const connectWallet = () => {
    getAccounts().then(
      accounts => {
        if(Array.isArray(accounts)){
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      }
    )
  }

  


  const getCurrentWalletConnected = async() => {
  if(window.ethereum) {
    try {
      let accounts: any;
      if(provider instanceof Web3) accounts = await provider.eth.getAccounts();
      else if(provider instanceof ethers.providers.Web3Provider) accounts = await provider.listAccounts();
      else throw new Error("Metamask Wallet Not Found");
      if(accounts.length>0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } else {
        setIsConnected(false);
        console.log("Connect to MetaMask using the Connect Button")
      }
      
    } catch(err: any){
      console.log(err.message)
    }
    
  }else {
    console.log("Please Install Metamask")
  }
}

const addWalletListener = async() => {
  if(window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts:any)=>{
      setWalletAddress(accounts[0]);
      setIsConnected(true)
    })
    
  }else {
    setIsConnected(false);
    setWalletAddress("");
    console.log("Please Install Metamask")
  }
}


useEffect(()=>{
  getCurrentWalletConnected();
  addWalletListener();
})

  return (
    <Context.Provider value={{walletAddress , isConnected, provider,setProvider, connectWallet}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;

export const useWeb3Context = () => useContext(Context);