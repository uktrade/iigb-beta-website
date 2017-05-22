#!/usr/bin/env node
var Jasmine = require('jasmine');
var jsonfile = require('jsonfile');
var JSONReporter = require('jasmine-json-test-reporter');

var file = 'test_reports/Accessibility_violations.json';
var reporter = new JSONReporter({
  file: './test_reports/accessibility-test-results.json',
  beautify: true,
  indentationLevel: 2
});

module.exports = {run: run};

function run(callback) {
  jsonfile.writeFile(file, 'Accessibility Assessment Results ' + new Date(Date.now()), function (err) {
    console.error(err);
  });
  var jasmine = new Jasmine();
  /* jshint ignore:start */
  jasmine.loadConfig({
    spec_dir: 'spec/accessibility',
    spec_files: [
      '**/*.[sS]pec.js'
      // './access_talent_page.spec.js'
      // './advanced_manufacturing_page.spec.js'
    ],
    helpers: [
      '../helpers/**/*.js'
    ]
  });

  jasmine.addReporter(reporter);
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 250000;

  jasmine.onComplete(callback);

  jasmine.execute();
  /* jshint ignore:end*/

}
