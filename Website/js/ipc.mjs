const electron = require("electron");
const {
    ipcRenderer,
    remote
} = electron;
/*
-- REQUIRERREREE
*/
export let WindowManager = {

    //window controls
    minimize: function () {
        var window = remote.getCurrentWindow();
        window.minimize();
    },

    maximize: function () {
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    },

    exit: function () {
        var window = remote.getCurrentWindow();
        window.close();
    },


}

class EncodeElement {
    constructor(inputID, filePath) {
        this.outputFormat = "webm";
        this.inputID = inputID;
        this.filePath = filePath;
        this.ElementPreset = `
        <div class="encode-element">
            <input type="file" accept="video/*" name="file" id="${this.inputID}-input">
            <span class="encode-span">
            <label onchange="encodeQueue.pathQueue[${this.inputID}].uptadePathListing()" for="${this.inputID}-input"><p id="${this.inputID}-text"></p></label>
                <button class="button-conv">TO<br>WEBM</button>
                <button class="button-conv">FROM<br>H264</button>
            </span>
        </div>
        `;
    }

    changeOutputFormat(format) {
        this.outputFormat = format;
    }

    updatePathListing() {
        let {path} = document.getElementById(`${this.inputID}-input`).file[0];
        this.filePath = path;
        document.getElementById(`${this.inputID}-text`).innerHTML = `${filepath}`;
    }
}

export let EncodeQueue = {
    pathQueue: new Array(),

    addEncodingEntry: function () {
        let newElement = new EncodeElement(this.pathQueue.length, "");
        this.pathQueue.push(newElement);
        this.formatQueue.push("webm");
        document.getElementById("encodelist-wrap").appendChild(newElement)

    },

    submitQueue: function () {
        ipcRenderer.send("submit", this.pathQueue, this.toFormatQueue);
    }

}
