import React, {useEffect,useContext,useState } from "react";

import Web3 from 'web3'
import {ethers} from 'ethers'

const Context = React.createContext<any>(null);

const Provider = ({ children }:any) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<Web3 | ethers.providers.Web3Provider >(new Web3(window.ethereum))


  const getCurrentWalletConnected = async() => {
  if(window.ethereum) {
    try {
      let accounts: any;
      if(provider instanceof Web3) accounts = await provider.eth.getAccounts();
      else accounts = await provider.listAccounts()
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
    <Context.Provider value={{walletAddress , setWalletAddress,isConnected, setIsConnected, provider,setProvider}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;

export const useWeb3Context = () => useContext(Context);