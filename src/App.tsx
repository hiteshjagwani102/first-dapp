import React,  {FC, useState, useEffect } from "react";
import Web3 from 'web3';
import {ethers} from 'ethers'
import "./App.scss"
import Provider from "./Context";
import {useWeb3Context} from "./Context";
import WalletConnect from "./components/WalletConnect";
import NetworkSwitch from "./components/NetworkSwitch";
import getAccounts from "./services/getAccounts";
import sendTransaction from "./services/sendTransaction";
import TransactionForm from "./components/TransactionForm";


// const provider = new ethers.BrowserProvider(window.ethereum);

// const wallet = provider.getSigner()




export default function App() {
  
  // const [walletAddress, setWalletAddress] = useState("");

  const { walletAddress,setWalletAddress,web3 } = useWeb3Context()




     //function to connect the wallet to the dapp
  const connectWallet = () => {
    getAccounts().then(
      accounts => {
        if(Array.isArray(accounts)) setWalletAddress(accounts[0])
      }
    )
  }

  
  


  //function to recognize the wall if connected once the page is reloded
  const getCurrentWalletConnected = async() => {
    if(window.ethereum) {
      try {
        const accounts = await web3.eth.getAccounts()
        if(accounts.length>0) {
          setWalletAddress(accounts[0]);
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
    if(window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts:any)=>{
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      })
      
    }else {
      setWalletAddress("");
      console.log("Please Install Metamask")
    }
  }

  //function to send transaction using web3
  const handleSubmit = async(e : any) =>{
    sendTransaction(e,walletAddress,web3)
  }

  //function to send transaction using ether js
  // const sendTransactionUsingEtherjs = async(e: any) => {
  //   e.preventDefault();

  //   if(window.ethereum){
  //     try{
  //       await (await wallet).sendTransaction({
  //         from: walletAddress,
  //         to : e.target.to_address.value,
  //         value :web3.utils.toWei(e.target.eth.value, 'ether').toString(),
  //         gasPrice: web3.utils.toWei('100', 'gwei').toString()
  //       })
  //     } catch(err: any) {
  //       console.log(err.message)
  //     }
  //   }
  // }

  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
  },[walletAddress])



  return (

      <div>
        {/* <button className="connectButton" onClick={connectWallet} >
          {
            walletAddress && walletAddress.length>0 ? `Connected : ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : "Connect Wallet"
          }
        </button> */}
      <WalletConnect />

      <NetworkSwitch />
      <TransactionForm />

      

      {/* <form className="etherForm" onSubmit={sendTransactionUsingEtherjs}>
          <h3>Send Transaction using Ethers.js </h3>
          <input className="address" type="text" name="to_address" placeholder="Address"></input>
          <input className="address" type="text" name="eth" placeholder="Value"></input>

          <input className="submitButton" type="submit" value="Send"></input>
      </form> */}
    </div>

    
  );
}


