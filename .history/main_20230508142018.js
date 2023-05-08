const { app, BrowserWindow, Menu, dialog } = require('electron')
const remote = require('@electron/remote/main')
const template = require('./src/menuTemplate')
const Store = require('electron-store')
const path = require('path')
const isDev = require('electron-is-dev')
const { autoUpdater } = require("electron-updater")

// 初始化electron-store
Store.initRenderer();

let menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// 监听electron完成加载
app.whenReady().then(() => {
  if (isDev) {
    // 开发环境修改配置地址
    autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
    // autoUpdater.forceDevUpdateConfig = true
  }

  // 自动下载设置为false
  autoUpdater.autoDownload = false
  // 检测更新
  autoUpdater.checkForUpdates()
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
    dialog.showMessageBox({
      type: 'info',
      title: '没有版本更新',
      message: '当前已经是最新版本'
    })
  })

  // 创建一个窗口
  const mainWin = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration:true,       // 为了解决require 识别问题
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  remote.initialize()
  remote.enable(mainWin.webContents)
  // 加载窗口页面
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`
  mainWin.loadURL(urlLocation)
  mainWin.webContents.openDevTools()
})