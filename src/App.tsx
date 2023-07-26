import React,  { useState, useEffect } from "react";
import Web3 from 'web3';

var web3 = new Web3(window.ethereum);




interface chain {
  [key: string]: Object
}

const networks : chain = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  }
};

export default function App() {

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
  })

  const switchNetwork = async (networkName : string) => {
    if(window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName]
            }
          ]
        });
      } catch(err: any) {
        console.log(err.message)
      }
    }

  }

  const connectWallet = async() => {
    if(window.ethereum) {
      try {
        const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
        setWalletAddress(accounts[0]);
      } catch(err: any){
        console.log(err.message)
      }
      
    }else {
      console.log("Please Install Metamask")
    }
  }


  const getCurrentWalletConnected = async() => {
    if(window.ethereum) {
      try {
        const accounts = await window.ethereum.request({method : "eth_accounts"});
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

  const sendTransaction = async(e: any) => {
    e.preventDefault();

    if(window.ethereum){
      web3.eth.sendTransaction({
        from: walletAddress,
        to : e.target.to_address.value,
        value:web3.utils.toWei('0.001', 'ether').toString(),
        gas: 21000,
        gasPrice: web3.utils.toWei('100', 'gwei').toString()
      })
      .then(function(receipt){
        console.log(receipt);
      }).catch((err)=>{
        console.log(err);
      })
    }
      

  }



  return (
    <div>
      <button onClick={connectWallet} >
        {
          walletAddress && walletAddress.length>0 ? `Connected : ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : "Connect Wallet"
        }
      </button>

      <button onClick={(e: any) => switchNetwork("polygon")} >
        Switch to Polygon
      </button>

      <button onClick={(e: any) => switchNetwork("bsc")}>
        Switch to bsc
      </button>

      <form onSubmit={sendTransaction}>
          <h3>Enter Transaction Address: </h3>
          <input type="text" name="to_address" placeholder="Address"></input>
          <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}


