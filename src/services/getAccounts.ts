import React from 'react'
import Web3 from "web3";
import { useWeb3Context } from "../Context";

const getAccounts = async():Promise<string[] | Error> => {

    if(window.ethereum) {
      try {
        const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
        return accounts
      }  catch(err: any){
        console.log(err.message)
        throw new Error('User denied account access');
      }
      
    }else {
      console.log("Please Install Metamask")
      throw new Error('No crypto wallet found. Please install MetaMask.');
    }
  }

export default getAccounts;