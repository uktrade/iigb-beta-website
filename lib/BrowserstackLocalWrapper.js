var browserstack = require('browserstack-local')
var username = process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME'
var key = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY'

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
        'key': key,
        'forceLocal': true
      }, function(error) {
        if (error) {
          console.error('Failed starting Browserstack Local', error, error.stacktrace)
          return reject(error)
        }
        console.log('Connected')
        resolve()
      })
    })
  }

  function stop(cb) {
    console.log('Stopping Browserstack local')
    return bsLocal.stop(cb)
  }

}
