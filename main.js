const { app, BrowserWindow } = require('electron/main');
const fs = require("fs-extra");
const path = require("path");
const { execFile } = require("child_process");

const logFile = fs.createWriteStream("./log.txt");
let logger = new console.Console(logFile, logFile);

let backendProcess = null;

function startBackendService() {
  try {
    const backendEntry = path.join(
      process.resourcesPath,
      'extra', 
      'backend.exe'
    );
  
    if (!fs.existsSync(backendEntry)) {
      logger.error('backend files not exist:', backendEntry);
      return;
    }
  
    backendProcess = execFile(backendEntry, (_error, stdout, _stderr) => {
      logger.log(stdout)
    });
  
    backendProcess.on('exit', (code) => {
      logger.log(`backend service exit, the exit code: ${code}`);
      backendProcess = null;
    });
  
    backendProcess.on('error', (err) => {
      logger.error('backend service start failed:', err);
    });
  } catch(err) {
    logger.error("start backend service failed: ", err);
  }
}

function stopBackendService() {
  if (backendProcess) {
    if (!backendProcess.killed) {
      logger.log("start stop backend service...");
      let res = backendProcess.kill("SIGTERM");
      logger.log("start stop backend service result: ", res);
    }
    backendProcess = null;
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
  })

  win.loadURL("http://localhost:8080/dist/index.html");
}

app.whenReady().then(() => {
  logger.log("window ready! start backend service...");
  startBackendService();
  
  logger.log("start create window");
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("will-quit", ()=> {
  stopBackendService();
  logFile.close();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})