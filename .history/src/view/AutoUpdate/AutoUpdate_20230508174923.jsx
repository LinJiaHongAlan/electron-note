import React from 'react'
import { AutoUpdateWrapper } from './style';

function AutoUpdate() {
  return (
    <AutoUpdateWrapper>
      <div style={{ width: '100%', height: '100%' }} className="App">
        我是组件2
      </div>
    </AutoUpdateWrapper>
  );
}

export default AutoUpdate;