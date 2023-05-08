import React, { useState } from 'react'
import { Progress } from 'antd'
import { ipcRenderer } from 'electron/renderer';
import { AutoUpdateWrapper } from './style';

function AutoUpdate() {
  const [percent, setPercent] = useState(0)
  const [bytesPerSecond, setBytesPerSecond] = useState(0)
  const [total, setTotal] = useState(0)
  const [transferred, setTransferred] = useState(0)

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
  ipcRenderer.on('downloadProgress', (progressObj) => {
    
  })

  return (
    <AutoUpdateWrapper>
      <span>网速:{bytesPerSecond}</span>
      <span>包大小:{total}</span>
      <span>已下载大小:{transferred}</span>
      <Progress percent={percent} status="exception" />
    </AutoUpdateWrapper>
  );
}

export default AutoUpdate;