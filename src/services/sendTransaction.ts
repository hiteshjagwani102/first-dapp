import { ethers } from "ethers";
import Web3 from "web3";

const sendTransaction = async(e: any,walletAddress: string, provider: Web3 | ethers.providers.Web3Provider) => {
    e.preventDefault();

  

    if(window.ethereum){
      try{
        if(provider instanceof Web3){
          provider.eth.sendTransaction({
            from: walletAddress,
            to : e.target.to_address.value,
            value :provider.utils.toWei(e.target.eth.value, 'ether').toString(),
            gas: 21000,
            gasPrice: provider.utils.toWei('100', 'gwei').toString()
            }).then(function(receipt:any){
            console.log(receipt);
            }).catch((err)=>console.log(err.message))
          }
        else{
           const tx:any = await provider.getSigner().sendTransaction({
            from: walletAddress,
            to : e.target.to_address.value,
            value : ethers.utils.parseUnits(e.target.eth.value, 'ether').toString(),
            gasPrice: ethers.utils.parseUnits('100', 'gwei').toString()
            
        }).then(()=> console.log(tx))
        .catch((err)=>console.log(err.message))
      }
     } catch(err:any){
        console.log(err.message)
      }
    }
      

  }

  export default sendTransaction;