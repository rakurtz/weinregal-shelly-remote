#!/usr/bin/env node
const { json } = require("stream/consumers");

// ########  BEGIN CONFIG ##############
const IP = "192.168.0.239";
const URI = `http://${IP}/white/`
// an array of the active channels of shelly rgbw2 

// array of used LEDS, fill up if more lanes of shelly are used
// start with ison: false
const LEDS = {
    first: {
        id: 0,
        ison: false
    },
    second: {
        id: 1,
        ison: false
    } 
}

// define shelly lane (0-3) being used to determine status of whole shelly
const STATUSLEDID = 0

// ########  END CONFIG ##############


// FUNCTIONS
function greet() {
    let message = "Shelly remote v.01. \n\n";
    message += "Toggle Shelly RGBW2\n";
    message += "Shelly IP: " + IP + "\n\n\n";
    console.log(message);
}

// get status and return Promise that resolves the status of the given led
const getStatus = (id) => {
    return new Promise((resolve, reject) => {
        fetch(URI+id)
            .then(response => response.json())
            .then(data => {
                if (data.ison) {
                    resolve('on')
                } else {
                    resolve('off')
                }
            })
            .catch(err => {reject(err)})
    })
}

// toggle single (not used in this script) 
const toggleSingle = (id, cmd) => {
    let path = URI + id

    if(cmd == 'on') {
        path = URI + id + '?turn=on'
    } else if (cmd == 'off') {
        path = URI + id + '?turn=off'
    }
    fetch(path)
        .catch(err => console.log(path, err.message)) 
}

// toggle all leds in LEDS
const toggleAll = (cmd) => {
    let path = ''
    for (const led in LEDS) {

        path = URI + LEDS[led].id + '?turn=' + cmd
        fetch(path)
        .catch(err => console.log(path, err.message)) 
    }
}

// MAIN
greet();
// status and then toggle;
getStatus(STATUSLEDID)
    .then(status => {
        if (status == 'on') {
            toggleAll('off')
        } else if (status == 'off') {
            toggleAll('on')
        } else {
            console.log(status)
        }
    }).catch(err => console.log(err.message)) 
