/*
            -- REQUIRERREREE
            */

            //import {EncodeQueue, WindowManager} from "/ipc.js";

            const electron = require("electron");
            const {
                ipcRenderer,
                remote
            } = electron;

            /*
            -- EVENTS
            */

            function ping() {
                console.log("pong")
            }

            // -- S U B M I T --
            document.querySelector("form").addEventListener("submit", (event) => {

                event.preventDefault();
                EncodeQueue.updatePath();
                EncodeQueue.submitQueue();
                document.getElementById("processing").innerHTML = `Processing...`;
            });

            // -- P R O C E S S I N G --
            ipcRenderer.on("video:processing", (event, data) => {
                document.getElementById("processing").innerHTML = `Processing...${data}`;
            })

            // -- W O R K F I N I S H E D --
            ipcRenderer.on("video:decode-finish", (event, filename) => {
                console.log(filename)
                document.getElementById("processing").innerHTML = ``;
                document.querySelector("#result").innerHTML = `Download!`;
                document.getElementById("result").setAttribute("href", `${filename}`);
                console.log(`received!`);
            })
