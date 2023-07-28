import React,  {FC, useState, useEffect } from "react";
import {ethers} from 'ethers'
import "./App.scss"
import WalletConnect from "./components/WalletConnect";
import NetworkSwitch from "./components/NetworkSwitch";
import TransactionForm from "./components/TransactionForm";


// const provider = new ethers.BrowserProvider(window.ethereum);

// const wallet = provider.getSigner()




export default function App() {
  

  return (
    <div>
      <WalletConnect />
      <NetworkSwitch />
      <TransactionForm />
    </div>

    
  );
}


