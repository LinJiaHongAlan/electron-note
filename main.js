const { app, BrowserWindow, Menu } = require('electron')
const remote = require('@electron/remote/main')
const template = require('./src/menuTemplate')
const Store = require('electron-store')
const path = require('path')
const isDev = require('electron-is-dev')
const { autoUpdaterHandel } = require('./autoUpdater')

// 初始化electron-store
Store.initRenderer();

let menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// 监听electron完成加载
app.whenReady().then(() => {
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
  const urlLocation = isDev ? 'http://localhost:3000/main' : `file://${path.join(__dirname, './index.html')}`
  mainWin.loadURL(urlLocation)
  mainWin.webContents.openDevTools()
  // 自动更新
  autoUpdaterHandel(mainWin)
})