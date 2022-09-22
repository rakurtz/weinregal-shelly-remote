# Shelly remote
## General
Version: 0.1
Shelly remote for rgbw2 for local network 

by now only two of four possible lines possible. 
Simply add the other lines in the toggle function if you want to use more than two.

## Config
Make sure you have node.js installed and it is accessible vie the `env`-Variable of your system.
Edit the Config-Block in the javascript file to your IP ans shelly rgbw2 config

## Add custom icon
see here: [https://support.apple.com/en-gb/guide/mac-help/mchlp2313/mac](https://support.apple.com/en-gb/guide/mac-help/mchlp2313/mac)

## Add to Mac OSX Dock
- copy shelly-toggle.js to a shelly-toggle.app file 

- drag the shelly-toggle.app to the dock and then rename it (in place) to shelly-toggle.command

- make it executable `chmod +x shelly-toggle.command`

_Info:_ you have to name it to `.app` just to let OSX allow you to drag into the dock. But its suffix has to end to `.command` to let OSX allow you to execute it by clicking on it.

_Info:_
You can change the default beaviour of OSX Terminal to close the window after a script ends with `exit()` in the profile.

