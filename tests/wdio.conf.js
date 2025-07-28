require('dotenv').config();

const path         = require('path');
const {downloadAPK}  = require('./utils/firebaseAPI');
const sleep = require('./utils/sleep')
const emulator = require('./utils/emulator')
const commonConfig = require('./utils/commonConfig');

const country        = process.argv[3] || 'spain';
const androidAppPath = path.join(__dirname, `app/${country}/dominos-android.apk`);

let emulatorProcess; 

exports.config = {
    ...commonConfig,

    onPrepare: async function () {
        try {
            //await downloadAPK(country)
            emulatorProcess = await emulator.start(process.env.EMULATOR_NAME)
            await sleep(10000)
            await emulator.cleanAppium()
        }catch(error) {
            console.log("erro!", error)
        } 
    },

    onWorkerEnd: async function() {
        await sleep(5000)
    },
    
    onComplete: async function () {
        console.log('Stopping emulator...');
        if (emulatorProcess) {
            emulatorProcess.kill('SIGINT');
            console.log('Emulator stopped successfully.');
        } else {
            console.log('No emulator process found.');
        }
    },

    specs: [`./environments/${country}/test/specs/**/*.js`],
    
    capabilities: [
        {
          platformName: "Android",
          "appium:deviceName": process.env.EMULATOR_NAME, 
          "appium:platformVersion": "16", 
          "appium:automationName": "UIAutomator2",
          "appium:app": androidAppPath, 
          "appium:newCommandTimeout": 30000,
          "appium:wdaLaunchTimeout": 120000,
          "appium:autoAcceptAlerts": true,
          "appium:noReset": false,
        },
      ],
}
