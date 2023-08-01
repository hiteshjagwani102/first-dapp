import {useWeb3Context} from '../Context'
import styles from "../styles/walletConnect.module.scss"



const WalletConnect = () => {

  const { walletAddress, connectWallet } = useWeb3Context()

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