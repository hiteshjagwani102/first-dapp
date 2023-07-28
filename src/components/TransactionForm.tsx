import React from 'react'
import { useWeb3Context } from '../Context'
import sendTransaction from '../services/sendTransaction'

const TransactionForm = () => {

    const { walletAddress,provider, isConnected } = useWeb3Context()
    const handleSubmit = async(e : any) =>{
        sendTransaction(e,walletAddress,provider)
      }

  return (
      <>
      {isConnected ?
        <form onSubmit={handleSubmit}>
        <h3>Send Transaction using Web3.js </h3>
          <input className="address" type="text" name="to_address" placeholder="Address"></input>
          <input className="address" type="text" name="eth" placeholder="Value"></input>

          <input className="submitButton" type="submit" value="Send"></input>
          </form>
       : <p className='tempText'>Please Connect Wallet for Transaction</p>}
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