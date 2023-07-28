import React from 'react'
import switchNetwork from '../services/switchNetwork'
import { useWeb3Context } from '../Context'
import styles from "../styles/networkSwitch.module.scss"
const NetworkSwitch = () => {

  const {isConnected} = useWeb3Context();
  return (
    <>
    {isConnected && <div className={styles.networkSwitch}>
    <button className={styles.polygon} onClick={(e: any) => switchNetwork("polygon")} >
      Switch to Polygon
    </button>
    <button className={styles.bsc} onClick={(e: any) => switchNetwork("bsc")}>
      Switch to bsc
    </button>
    </div>}
    </>
  )
}

export default NetworkSwitch