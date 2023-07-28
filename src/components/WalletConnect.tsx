import React,{useEffect} from 'react'
import getAccounts from '../services/getAccounts'
import {useWeb3Context} from '../Context'



const WalletConnect = () => {

  const { walletAddress,setWalletAddress } = useWeb3Context()

  const connectWallet = () => {
    getAccounts().then(
      accounts => {
        if(Array.isArray(accounts)) setWalletAddress(accounts[0])
      }
    )
  }
 


  return (
    <div>
        <button className="connectButton" onClick={connectWallet} >
        {
          walletAddress && walletAddress.length>0 ? `Connected : ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : "Connect Wallet"
        }
      </button>
    </div>
  )
}

export default WalletConnect