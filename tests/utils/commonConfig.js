const commonConfig = {
    runner: "local",
    port: 4723,
    logLevel: "info",
    bail: 0,
    baseUrl: "http://localhost",
    waitforTimeout: 10000,
    connectionRetryTimeout: 240000,
    connectionRetryCount: 3,
    services: [
    [
      "appium",
      {
        command: "appium",
        args: {
          address: "127.0.0.1",
          port: 4723,
        },
      },
    ],
    ],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000,
    },
    maxInstances: 1
};

module.exports = commonConfig;