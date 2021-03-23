const electron = require("electron");
const Process = require('child_process');
const { stderr, stdout } = require("process");
const { randomInt } = require("crypto");
const {
    app,
    BrowserWindow,
    ipcMain
} = electron;

let mainWindow;
let encodeStream;

function createWindow() {
    mainWindow = new BrowserWindow({
        transparent:true,
        frame: false,
        fullscreenable:false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false,
            enableRemoteModule: true

        }
    });
    mainWindow.loadURL(`${__dirname}/Website/index.html`);
    //mainWindow.removeMenu();                      ///REMOVE LATER!!!!
    mainWindow.setOpacity(0.97);
}

function encodeToWebM(path){
    let id = randomInt(0, 100000);
    let filename = `output${id}.webm`;
    encodeStream = Process.spawn("ffmpeg/bin/ffmpeg.exe", ["-i", path, filename]);
    return(filename);
}

app.on('ready', createWindow);

ipcMain.on("video:submit", (event, path) => {

    let filename = encodeToWebM(path);
    encodeStream.stdout.on("data", (data) => {
        console.log(`stdout data: ${data} \n`)
        mainWindow.webContents.send("video:processing", data)
    })
    encodeStream.on("close", (code) =>{
        mainWindow.webContents.send("video:decode-finish", filename);
    })
    encodeStream.on("error", (err) =>{
        console.log("fail")
    })

});
