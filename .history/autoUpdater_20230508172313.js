const isDev = require('electron-is-dev')
const { autoUpdater } = require('./autoUpdater')
const path = require('path')
const log = require('electron-log')
const { dialog, ipcMain } = require('electron')

// 自动更新
module.exports = {
  autoUpdaterHandel () {
    // 开发环境修改配置地址
    if (isDev) {
      autoUpdater.forceDevUpdateConfig = true
      autoUpdater.updateConfigPath = path.join(__dirname, './dev-app-update.yml')
    }
    // 自动下载设置为false
    autoUpdater.autoDownload = false
    // 检测更新
    ipcMain.on('checkForUpdate', () => {
      log.warn('执行自动更新检查')
      autoUpdater.checkForUpdates()
    })
    // 监听事件发现新版本
    autoUpdater.on('update-available', () => {
      log.info('应用有新版本')
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
    // 当前是最新版本
    autoUpdater.on('update-not-available', () => {
      log.info('当前是最新版本')
      dialog.showMessageBox({
        type: 'info',
        title: '没有版本更新',
        message: '当前已经是最新版本'
      })
    })
    // 更新失败
    autoUpdater.on('error', function (error) {
      log.warn('更新失败', error)
    })

  }
}