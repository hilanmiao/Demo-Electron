// import Cookies from 'js-cookie' dev和pro环境不一致？？？
// const session = require('electron').remote.session 是异步的，get拿到值会慢？？？
// 更新：其实是mapgetters是空的，另一个问题，remote有缓存？？？
import {ipcRenderer} from 'electron'

const TokenKey = 'Admin-Token'

export function getToken() {
    // 改为发送同步消息
    return ipcRenderer.sendSync('getCookie', {key: TokenKey})
}

export function setToken(token) {
    ipcRenderer.send('setCookie', {key: TokenKey, value: token})
}

export function removeToken() {
    ipcRenderer.send('removeCookie')
}
