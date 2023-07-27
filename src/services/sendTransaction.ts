const sendTransaction = async(e: any,walletAddress: string, web3: any) => {
    e.preventDefault();

    if(window.ethereum){
      web3.eth.sendTransaction({
        from: walletAddress,
        to : e.target.to_address.value,
        value :web3.utils.toWei(e.target.eth.value, 'ether').toString(),
        gas: 21000,
        gasPrice: web3.utils.toWei('100', 'gwei').toString()
      })
      .then(function(receipt:any){
        console.log(receipt);
      }).catch((err:any)=>{
        console.log(err);
      })
    }
      

  }

  export default sendTransaction;