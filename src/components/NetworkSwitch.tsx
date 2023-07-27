import React from 'react'
import switchNetwork from '../services/switchNetwork'

const NetworkSwitch = () => {
  return (
    <div className="networkSwitch">
      <button className="polygon" onClick={(e: any) => switchNetwork("polygon")} >
        Switch to Polygon
      </button>
      <button className="bsc" onClick={(e: any) => switchNetwork("bsc")}>
        Switch to bsc
      </button>
      </div>
  )
}

export default NetworkSwitch