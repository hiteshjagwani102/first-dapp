import {useWeb3Context} from '../Context'
import styles from "../styles/walletConnect.module.scss"
import getAccounts from '../services/getAccounts'



const WalletConnect = () => {

  const { walletAddress,setWalletAddress,setIsConnected } = useWeb3Context()

  const connectWallet = () => {
    getAccounts().then(
      accounts => {
        if(Array.isArray(accounts)){
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      }
    )
  }
 


  return (
    <div>
        <button className={styles.connectButton} onClick={connectWallet} >
        {
          walletAddress && walletAddress.length>0 ? `Connected : ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : "Connect Wallet"
        }
      </button>
    </div>
  )
}

export default WalletConnect