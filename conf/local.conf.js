exports.config = {

  specs: [
    './spec/features/search.js',
    './spec/features/form.js',
    './spec/features/georedirect.js'
    // './spec/features/**/*.js'
  ],
  exclude: [
  ],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'firefox'
  }],
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  bail: 0,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 600000,
    expectationResultHandler: function(passed, assertion) {
      // do something
    }
  }
}
