exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './spec/features/search.js',
    './spec/features/form.js',
    './spec/features/georedirect.js'
  ],
  exclude: [],

  maxInstances: 5,
  commonCapabilities: {
    name: 'parallel_test',
    build: 'webdriver-browserstack',
    'resolution': '1600x1200',
    'browserstack.local' :true

  },

  capabilities: [{
      browser: 'chrome',
    } , {
      browser: 'firefox'
    }, {
      'browser': 'IE',
      'browser_version': '10.0',
    },
    {
      'browser': 'safari',
      'browser_version': '9.0',
    },
    {
      browser: 'safari'
    }
    // {
    //   'browserName': 'iPhone',
    //   'platform': 'MAC',
    //   'device': 'iPhone 6S Plus'
    // },
    // {
    //   'browserName': 'android',
    //   'platform': 'ANDROID',
    //   'device': 'Google Nexus 5'
    // }
    // , {
    //   'browser': 'IE',
    //   'browser_version': '8.0',
    // }, {
    //   'browser': 'IE',
    //   'browser_version': '9.0',
    // }
  ],
  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 250000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'jasmine',
  jasmineNodeOpts: {
    //
    // Jasmine default timeout
    defaultTimeoutInterval: 250000,
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
  },
}

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
