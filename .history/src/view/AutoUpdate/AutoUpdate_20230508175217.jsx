import React, { useState } from 'react'
import { Progress } from 'antd'

function AutoUpdate() {
  const [percent, setPercent] = useState(0)
  
  return (
    <Progress percent={percent} status="exception" />
  );
}

export default AutoUpdate;