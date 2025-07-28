const {exec} = require('child_process');

async function start(emulatorName) {
    console.log(`Starting emulator: ${emulatorName}`);
    emulatorProcess = exec(`emulator -avd "${emulatorName}"`, (error) => {
            if (error) {
                console.log("ERRO: ", error)
            }
        });
    return emulatorProcess
}     

async function cleanAppium(){
    exec(`adb uninstall io.appium.uiautomator2.server`)
    exec(`adb uninstall io.appium.uiautomator2.server.test`)
}

module.exports = {
    start,
    cleanAppium
}