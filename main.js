const { app, BrowserWindow} = require("electron")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "SomeTT"
    })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true
      });

    win.loadFile(startUrl)
}

app.whenReady().then(()=>{
    createWindow()
})

app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit()
    }
})
