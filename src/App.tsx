import React,  { useState, useEffect } from "react";

export default function App() {

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
  })

  const connectWallet = async() => {
    if(typeof window != "undefined"  && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch(err: any){
        console.log(err.message)
      }
      
    }else {
      console.log("Please Install Metamask")
    }
  }


  const getCurrentWalletConnected = async() => {
    if(typeof window != "undefined"  && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({method : "eth_accounts"});
        if(accounts.length>0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
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
    if(typeof window != "undefined"  && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts:any)=>{
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      })
      
    }else {
      setWalletAddress("");
      console.log("Please Install Metamask")
    }
  }



  return (
    <div>
      <button onClick={connectWallet} >
        {
          walletAddress && walletAddress.length>0 ? `Connected : ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : "Connect Wallet"
        }
      </button>
    </div>
  );
}


