const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// 错误处理优先
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
})

app.commandLine.appendSwitch('disable-features', 'Autofill')

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      // 解决对象克隆错误
      worldSafeExecuteJavaScript: true
    }
  })

  win.loadURL('http://localhost:5173').catch(err => {
    console.error('Load failed:', err)
    win.loadFile('fallback.html')
  })

  win.webContents.on('devtools-opened', () => {
    win.webContents.executeJavaScript(`
      console.warn = (function(orig) {
        return function warn() {
          const msg = arguments[0]?.toString?.() || '';
          if (!msg.includes('Autofill') && !msg.includes('SharedImage')) {
            orig.apply(console, arguments)
          }
        }
      })(console.warn)
    `)
  })
}

app.whenReady().then(() => {
  ipcMain.handle('safe-api', async (event, data) => {
    // 确保可序列化
    return JSON.parse(JSON.stringify(data))
  })
  createWindow()
})
