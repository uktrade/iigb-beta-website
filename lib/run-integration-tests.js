var bsLocal = require('./BrowserstackLocalWrapper.js')
var Launcher = require('webdriverio').Launcher

run()

function run() {
  bsLocal.start()
    .then(function() {
      console.log('Running Tests')
      var wdio = new Launcher('./conf/parallel.conf')
      wdio.run()
        .then(function(code) {
          console.log('Finished tests, code:', code)
          var stp = bsLocal.stop(function() {
            process.exit(code)
          })
        }, function(error) {
          console.error('Launcher failed to start the test', error.stacktrace)
          bsLocal.stop(function() {
            process.exit(1)
          })
        })
    })
}
