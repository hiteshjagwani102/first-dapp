import { useWeb3Context } from '../Context'
import sendTransaction from '../services/sendTransaction'
import styles from "../styles/transactionForm.module.scss"
import Web3 from 'web3'
import { ethers } from 'ethers'
import { useState } from 'react'

const TransactionForm = () => {

  const [providerText, setProviderText] = useState("Web3.js")

    const { walletAddress,provider, isConnected, setProvider } = useWeb3Context()
    const handleSubmit = async(e : any) =>{
        sendTransaction(e,walletAddress,provider)
      }

    const handleProviderChange = (e:any) => {
      if(!e.target.checked){
        setProvider(new Web3(window.ethereum))
        setProviderText("web3.js")
      }
      else{
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
        setProviderText("ether.js")
      }
      console.log(provider);
    } 

  return (
      <>
      {isConnected ?
        <form className={styles.form} onSubmit={handleSubmit}>
        <div>
        <h3>Send Transaction using {providerText} </h3>
        <label className={styles.switch}>
          <input type="checkbox" onChange={handleProviderChange} />
          <span className={styles.slider}></span>
        </label>
        </div>
          <input className={styles.input} type="text" name="to_address" placeholder="Address"></input>
          <input className={styles.input} type="text" name="eth" placeholder="Value"></input>

          <input className={styles.submitButton} type="submit" value="Send"></input>
          </form>
       : <p className={styles.tempText}>Please Connect Wallet for Transaction</p>}
       </>
          
      
    //    <form className="etherForm" onSubmit={sendTransactionUsingEtherjs}>
    //       <h3>Send Transaction using Ethers.js </h3>
    //       <input className="address" type="text" name="to_address" placeholder="Address"></input>
    //       <input className="address" type="text" name="eth" placeholder="Value"></input>

    //       <input className="submitButton" type="submit" value="Send"></input>
    //   </form>
  )
}

export default TransactionForm