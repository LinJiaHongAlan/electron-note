const isDev = require('electron-is-dev')
const path = require('path')
const log = require('electron-log')
const { autoUpdater } = require("electron-updater")
const { dialog, ipcMain } = require('electron')

const message = {
  error: '检查更新出错',
  checking: '正在检查更新…',
  updateAva: '正在更新',
  updateNotAva: '已经是最新版本',
  downloadProgress: '正在下载...'
}

// 自动更新
module.exports = {
  autoUpdaterHandel (mainWin) {
    // 通过main进程发送事件给renderer进程，提示更新信息
    function sendUpdateMessage({ cmd, data }) {
      mainWin.webContents.send(cmd, data)
    }

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
      }).then(({ response }) => {
        if (response === 0) {
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
    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
      log.warn(progressObj)
      sendUpdateMessage({ cmd: 'downloadProgress', data: progressObj })
    })
    // 开始更新
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      log.warn('开始更新')
      autoUpdater.quitAndInstall()
      mainWin.destroy()
    })
  }
}