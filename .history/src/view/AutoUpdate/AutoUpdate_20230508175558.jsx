import React, { useState } from 'react'
import { Progress } from 'antd'
import { ipcRenderer } from 'electron/renderer';

function AutoUpdate() {
  const [percent, setPercent] = useState(0)

  ipcRenderer.on('downloadProgress', () => {

  })

  return (
    <Progress percent={percent} status="exception" />
  );
}

export default AutoUpdate;