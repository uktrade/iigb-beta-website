var bsLocal = require('./BrowserstackLocalWrapper.js');
var Launcher = require('webdriverio').Launcher;
var accessibility = require('./run-accessibility-tests');

run();

function run() {
  bsLocal.start()
    .then(function() {
      console.log('Starting Tests');
      // var wdio = new Launcher('./conf/parallel.conf');  // runs out of parallel tests
      var wdio = new Launcher('./conf/single.conf');
      console.log('Running Integration Tests');
      wdio.run()
        .then(function(code) {
          console.log('Finished Integration Tests, code:', code);
          console.log('Starting Accessibility Tests');
          accessibility.run(function () {
            console.log('Finished Accessibility Tests');
            bsLocal.stop(function() {
              process.exit(code);
            })
          });
        }, function(error) {
          console.error('Launcher failed to start the test', error.stacktrace);
          bsLocal.stop(function() {
            process.exit(1)
          })
        })
    })
}
