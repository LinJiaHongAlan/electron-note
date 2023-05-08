const isDev = require('electron-is-dev')

// 自动更新
module.exports = {
  autoUpdater () {
    
    if (isDev) {
      // 开发环境修改配置地址
      autoUpdater.forceDevUpdateConfig = true
      autoUpdater.updateConfigPath = path.join(__dirname, './dev-app-update.yml')
    }

  }
}