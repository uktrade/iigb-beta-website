global.selenium = require('selenium-webdriver');
var browserstack = require('browserstack-local');
global.browserstackUsername = process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME';
global.browserstackAccessKey = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY';
global.capabilities = {
  'browserstack.local' : 'true',
  'browserstack.user' : browserstackUsername,
  'browserstack.key' : browserstackAccessKey
};

module.exports = BrowserstackLocalWrapper()

function BrowserstackLocalWrapper() {
  var bsLocal = new browserstack.Local()

  return {
    start: start,
    stop: stop
  }

  function start() {
    return new Promise(function(resolve, reject) {
      console.log('Starting Browserstack local')
      bsLocal.start({
        'key': browserstackAccessKey,
        'forceLocal': true
      }, function(error) {
        if (error) {
          console.error('Failed starting Browserstack Local', error, error.stacktrace)
          return reject(error)
        }
        console.log('Connected');
        var driverBuilder = new selenium.Builder()
          .usingServer('http://hub-cloud.browserstack.com/wd/hub')
          .withCapabilities(capabilities)
          .forBrowser('chrome');
        var driver = driverBuilder.build();
        global.driver = driver;
        resolve()
      })
    })
  }

  function stop(cb) {
    console.log('Stopping Browserstack local')
    return bsLocal.stop(cb)
  }

}
