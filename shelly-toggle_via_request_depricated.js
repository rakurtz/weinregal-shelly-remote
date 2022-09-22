#!/usr/bin/env node
const http = require('http');

// CONFIG
const IP = "192.168.0.239";
const PATH = "/white/";
// an array of the active channels of shelly rgbw2 


let LEDS = {
    first: {
        id: 0,
        ison: false
    },
    second: {
        id: 1,
        ison: false
    } 
}
// GLOBALS


// FUNCTIONS
function greet() {
    let message = "Shelly remote v.01. \n\n";
    message += "Toggle Shelly RGBW2\n";
    message += "Shelly IP: " + IP + "\n\n\n";
    console.log(message);
}

function handleLed(ledReference, cmd='status') {
    const thisPath = PATH + ledReference.id;
    const options = {
        host: IP,
        port: 80,
        path: thisPath
    };

    if (cmd == 'status') {
        const request = http.request(options, (response) => {
            let body = '';
            response.on('data', data => {
                body += data;
            });
            response.on('end', () => {
                ledReference.ison = JSON.parse(body).ison;
            });
        });
        request.end();
    } else if(cmd == 'on') {
        options.path += "?turn=on"
        const request = http.request(options, (response) => {
            let body = '';
            response.on('data', data => {
                body += data;
            });
            response.on('end', () => {
                ledReference = JSON.parse(body);
            });
        });
        request.end();
    } else if(cmd == 'off') {
        options.path += "?turn=off"
        const request = http.request(options, (response) => {
            let body = '';
            response.on('data', data => {
                body += data;
            });
            response.on('end', () => {
                ledReference = JSON.parse(body);
                // console.log('off');
            });
        });
        request.end();

    }
}

// get status only from one since always in sync
function getStatus() {
    console.log('Getting actual Status of LEDs...')
   handleLed(LEDS.first);
}

function toggleAll() {
    console.log('Status of LED now: ' + LEDS.first.ison) 
    if (LEDS.first.ison) {
        console.log('...turning off.');
        handleLed(LEDS.first, 'off');
        handleLed(LEDS.second, 'off');
    } else {
        console.log('...turning on.');
        handleLed(LEDS.first, 'on');
        handleLed(LEDS.second, 'on');
    }
}

// MAIN
greet();

getStatus();
setTimeout(toggleAll, 1000);

