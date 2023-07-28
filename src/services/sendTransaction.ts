const sendTransaction = async(e: any,walletAddress: string, provider: any) => {
    e.preventDefault();

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

    if(window.ethereum){
      provider.eth.sendTransaction({
        from: walletAddress,
        to : e.target.to_address.value,
        value :provider.utils.toWei(e.target.eth.value, 'ether').toString(),
        gas: 21000,
        gasPrice: provider.utils.toWei('100', 'gwei').toString()
      })
      .then(function(receipt:any){
        console.log(receipt);
      }).catch((err:any)=>{
        console.log(err);
      })
    }
      

  }

  export default sendTransaction;