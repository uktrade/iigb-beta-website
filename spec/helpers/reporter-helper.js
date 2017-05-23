var jsonfile = require('jsonfile');

global.file = 'test_reports/Accessibility_violations.json'
global.writeOutput = writeOutput;
global.buildOutput = buildOutput;

function writeOutput(content, spaces) {
  spaces = spaces || 0;
  jsonfile.writeFile(file, content, {flag: 'a', spaces: spaces}, function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log(content);
    }
  });
}

function buildOutput(pageHeader, results) {
  var outputContent = {}
  outputContent.page = pageHeader;
  outputContent.violationCount = results.violations.length;
  outputContent.violations = [];
  for (var i = 0; i < results.violations.length; i++) {
    var violationOutput = {};
    violationOutput.violation = results.violations[i].id;
    violationOutput.description = results.violations[i].description;
    violationOutput.impact = results.violations[i].impact;
    violationOutput.affectedNodes = [];
    for (var j = 0; j < results.violations[i].nodes.length; j++) {
      violationOutput.affectedNodes.push('- ' + results.violations[i].nodes[j].html);
    }
    violationOutput.affectedNodes = JSON.stringify(violationOutput.affectedNodes);
    outputContent.violations.push(JSON.stringify(violationOutput));
  }
  outputContent.fullDetails = JSON.stringify(results.violations);
  outputContent.reviewCount = results.incomplete.length;
  outputContent.reviewDetails = JSON.stringify(results.incomplete);
  writeOutput(outputContent);
  writeOutput('\n----\n');
}