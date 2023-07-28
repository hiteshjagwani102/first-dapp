import React from 'react'
import switchNetwork from '../services/switchNetwork'
import { useWeb3Context } from '../Context'
const NetworkSwitch = () => {

  const {isConnected} = useWeb3Context();
  return (
    <>
    {isConnected && <div className="networkSwitch">
    <button className="polygon" onClick={(e: any) => switchNetwork("polygon")} >
      Switch to Polygon
    </button>
    <button className="bsc" onClick={(e: any) => switchNetwork("bsc")}>
      Switch to bsc
    </button>
    </div>}
    </>
  )
}

export default NetworkSwitch