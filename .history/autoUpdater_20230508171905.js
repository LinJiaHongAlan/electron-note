const isDev = require('electron-is-dev')
const { autoUpdater } = require('./autoUpdater')
const path = require('path')
const log = require('electron-log')

// 自动更新
module.exports = {
  autoUpdaterHandel () {
    if (isDev) {
      // 开发环境修改配置地址
      autoUpdater.forceDevUpdateConfig = true
      autoUpdater.updateConfigPath = path.join(__dirname, './dev-app-update.yml')
    }

    // 自动下载设置为false
  autoUpdater.autoDownload = false
  // 检测更新
  autoUpdater.checkForUpdatesAndNotify().catch((e) => {
    console.log('网络连接', e)
    log.warn(e)
  })
  autoUpdater.on('update-available', () => {
    console.log('发现新版本')
    dialog.showMessageBox({
      type: 'info',
      title: '应用有新版本',
      message: `发现新版本，是否现在更新?`,
      buttons: ['是', '否'],
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        // 下载
        autoUpdater.downloadUpdate()
      }
    })
  })
  autoUpdater.on('update-not-available', () => {
    console.log('当前是最新版本')
    log.info('当前是最新版本')
    dialog.showMessageBox({
      type: 'info',
      title: '没有版本更新',
      message: '当前已经是最新版本'
    })
  })
  autoUpdater.on('error', function (error) {
    console.log('更新失败', error)
    log.warn('更新失败', error)
})

  }
}