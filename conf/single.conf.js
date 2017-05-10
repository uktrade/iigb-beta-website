exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './spec/features/search.js',
    // './spec/features/form.js',  //  TODO Reimplement for the new form MN
    './spec/features/georedirect.js'
  ],
  exclude: [],

  commonCapabilities: {
    name: 'single_test',
    build: 'webdriver-browserstack',
    'resolution': '1600x1200'

  },

  capabilities: [{
    'os': 'Windows',
    'os_version': '10',
    'browser': 'Chrome',
    name: 'single_test',
    build: 'webdriver-browserstack'
  }],

  logLevel: 'verbose',
  coloredLogs: true,
  // screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 100000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'jasmine',
  jasmineNodeOpts: {
    //
    // Jasmine default timeout
    defaultTimeoutInterval: 45000,
    //
    // The Jasmine framework allows it to intercept each assertion in order to log the state of the application
    // or website depending on the result. For example it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function(passed, assertion) {
        // do something
    },
    //
    // Make use of Jasmine-specific grep functionality
    grep: null,
    invertGrep: null
  }
}
