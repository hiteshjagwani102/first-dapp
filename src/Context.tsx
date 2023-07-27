import React, {createContext,useContext,useState } from "react";
import getProvider from "./services/getProvider";

import Web3 from 'web3'

const Context = React.createContext<any>(null);

const Provider = ({ children }:any) => {
  const [walletAddress, setWalletAddress] = useState("");

  var web3;
if(window.ethereum) web3=new Web3(window.ethereum);


  return (
    <Context.Provider value={{walletAddress , setWalletAddress,web3}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;

export const useWeb3Context = () => useContext(Context);