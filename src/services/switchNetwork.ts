import networks from "../configs/network";
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

  export default switchNetwork;