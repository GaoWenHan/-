const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendData: async (data) => {
    try {
      const serialized = JSON.parse(JSON.stringify(data))
      return await ipcRenderer.invoke('safe-api', serialized)
    } catch (err) {
      console.error('Serialization failed:', err)
      throw new Error('Data could not be processed')
    }
  }
})
