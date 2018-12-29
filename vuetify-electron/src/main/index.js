'use strict'

import {app, BrowserWindow, ipcMain, Menu, session, Tray, shell} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const path = require('path')
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        // height: 800,
        // width: 1280,
        height: 324,
        width: 368,
        useContentSize: true,
        frame: false,
        // 下面两个在一起影响最大化判断
        transparent: true,
        resizable: false
    })

    mainWindow.loadURL(winURL)

    /**
     * 监听
     */
    mainWindow.on('close', (event) => {
        if (!trayClose) {
            // 最小化
            mainWindow.hide()
            event.preventDefault()
        }
    })
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    mainWindow.on('resize', () => {
        mainWindow.webContents.send('resize', mainWindow.isMaximized())
    })

    /**
     * 设置系统托盘
     */
    // 为了防止闪烁，让画面准备好了再显示
    // 对于一个复杂的应用，ready-to-show 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 backgroundColor
    // 请注意，即使是使用 ready-to-show 事件的应用程序，仍建议使用设置 backgroundColor 使应用程序感觉更原生。
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    // 托盘对象
    let appTray = null
    // 是否可以退出
    let trayClose = false
    // 系统托盘右键菜单
    const trayMenuTemplate = [
        {
            label: '关于我们',
            click: function () {
                // 打开外部链接
                // 不支持https？？？
                shell.openExternal('http://gitee.com/XiaoLanMiao/Sunday')
            }
        },
        {
            label: '退出',
            click: function () {
                // 退出
                trayClose = true
                app.quit()
            }
        }
    ]
    // 系统托盘图标
    const iconPath = path.join(__dirname, '/static/icon2.ico')
    appTray = new Tray(iconPath)
    // 图标的上上下文
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    // 设置此托盘图标的悬停提示内容
    appTray.setToolTip('TaskManager')
    // 设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu)
    // 主窗口显示隐藏切换
    appTray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 渲染现场和主线程通信
 */
// 最小化
ipcMain.on('minimize', () => mainWindow.minimize())
// 最大化
ipcMain.on('maximize', () => {
    // if (mainWindow.isMaximized()) {
    // if (msg.isMaximized) {
    //     mainWindow.unmaximize()
    // } else {
    // 因为transparent和resizable会导致isMaximized判断失效，所以改为前端手动存储是否是最大化
    mainWindow.maximize()
    // }
})
// 还原
ipcMain.on('unmaximize', () => {
    mainWindow.unmaximize()
})
// 关闭
ipcMain.on('close', () => {
    mainWindow.close()
})
// 登录
ipcMain.on('loggedIn', () => {
    mainWindow.webContents.loadURL(winURL)
    mainWindow.webContents.on('dom-ready', event => {
        mainWindow.setSize(1280, 800)
        mainWindow.center()
        mainWindow.show()
        mainWindow.setResizable(true)
    })
})
// 已经登录
ipcMain.on('loggedInNoLoadUrl', () => {
    mainWindow.setSize(1280, 800)
    mainWindow.center()
    mainWindow.show()
    mainWindow.setResizable(true)
})
// 登出
ipcMain.on('loggedOut', () => {
    mainWindow.webContents.loadURL(winURL)
    mainWindow.webContents.on('dom-ready', event => {
        mainWindow.setSize(368, 324)
        mainWindow.center()
        mainWindow.show()
        mainWindow.setResizable(false)
    })
})

/**
 * 自动启动
 */
const startOnBoot = require('./startOnBoot.js')
// 应用程序名称 （cmd命令"msconfig-启动项"查看）
const exeName = 'Task Manager'
// 检查是否自动启动
ipcMain.on('getAutoStartValue', () => {
    startOnBoot.getAutoStartValue(exeName, (error, result) => {
        if (error) {
            mainWindow.webContents.send('getAutoStartValue', false)
        } else {
            mainWindow.webContents.send('getAutoStartValue', true)
        }
    })
})
// 设置开机自动启动
ipcMain.on('enableAutoStart', () => {
    startOnBoot.enableAutoStart(exeName, process.execPath)
})
// 取消开机自动启动
ipcMain.on('disableAutoStart', () => {
    startOnBoot.disableAutoStart(exeName)
})
/**
 * Cookie
 */
const cookieURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `http://www.github.com`
// 获取cookie
ipcMain.on('getCookie', (event, msg) => {
    // 这是一个同步消息
    let value = ''
    session.defaultSession.cookies.get({
        url: cookieURL
    }, (error, cookies) => {
        if (error) {
            value = ''
            console.log('error')
        }
        if (cookies.length > 0) {
            console.log(cookies)
            cookies.some(item => {
                if (item.name === msg.key) {
                    value = item.value
                    return true
                }
            })
        }
        event.returnValue = value
    })
})
// 设置cookie
ipcMain.on('setCookie', (sender, msg) => {
    let Days = 7
    let exp = new Date()
    let date = Math.round(exp.getTime() / 1000) + Days * 24 * 60 * 60
    const cookie = {
        url: cookieURL,
        name: msg.key,
        value: msg.value,
        expirationDate: date
    }
    session.defaultSession.cookies.set(cookie, (error) => {
        console.log(cookie)
        if (error) console.error(error)
    })
})
// 移除cookie
ipcMain.on('removeCookie', () => {
    session.defaultSession.clearStorageData({
        url: cookieURL,
        storages: ['cookies']
    }, function (error) {
        if (error) console.error(error)
    })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
