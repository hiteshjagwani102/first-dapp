import React, {useEffect, createContext,useContext,useState } from "react";
import getProvider from "./services/getProvider";

import Web3 from 'web3'

const Context = React.createContext<any>(null);

const Provider = ({ children }:any) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  var provider:any;
if(window.ethereum) provider = new Web3(window.ethereum);

//function to recognize the wall if connected once the page is reloded
const getCurrentWalletConnected = async() => {
  if(window.ethereum) {
    try {
      const accounts = await provider.eth.getAccounts()
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
    <Context.Provider value={{walletAddress , setWalletAddress,isConnected, setIsConnected, provider}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;

export const useWeb3Context = () => useContext(Context);