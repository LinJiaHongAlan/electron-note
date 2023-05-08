import React, { useState } from 'react'
import { Progress } from 'antd'
import { AutoUpdateWrapper } from './style';
import useIpcRenderer from '../../hooks/useIpcRenderer'

function AutoUpdate() {
  const [percent, setPercent] = useState(0)
  const [bytesPerSecond, setBytesPerSecond] = useState(0)
  const [total, setTotal] = useState(0)
  const [transferred, setTransferred] = useState(0)

  const downloadProgressHandel = (event, progressObj) => {
    console.log(progressObj)
    setPercent(progressObj.percent)
    setBytesPerSecond(progressObj.bytesPerSecond)
    setTotal(progressObj.total)
    setTransferred(progressObj.transferred)
  }

  /**
   * progressObj
   * {
   *    bytesPerSecond // 网速
   *    delta
   *    percent // 已下载百分比
   *    total // 包大小
   *    transferred // 已下载大小
   * }
  */
   useIpcRenderer({
    downloadProgress: downloadProgressHandel
   })

  return (
    <AutoUpdateWrapper>
      <span>网速:{bytesPerSecond / 1024 / 1024}</span>
      <span>包大小:{total}</span>
      <span>已下载大小:{transferred}</span>
      <Progress percent={percent} status="exception" />
    </AutoUpdateWrapper>
  );
}

export default AutoUpdate;