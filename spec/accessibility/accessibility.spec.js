var baseUrl = process.env.BASE_IIGB_URL || 'http://localhost:3000';
var pageData = require('./pageData.json');
var globalExclusions = require('./globalExclusions.json');
var expectedViolations = 0;

for (var i = 0; i < pageData.length; i++) {
  runAnalysis(pageData[i]);
}

function runAnalysis(currentPage) {

  describe('Accessibility testing', function() {

    beforeEach(function(done) {
      driver.get(baseUrl + currentPage.urlExtension).then(function () {
        driver.executeAsyncScript(function(callback) {
          var script = document.createElement('script');
          script.innerHTML = 'document.documentElement.classList.add("axe-is-ready");';
          document.documentElement.appendChild(script);
          callback();
        })
          .then(function () {
            return driver.wait(selenium.until.elementsLocated(selenium.By.css('.axe-is-ready')));
          })
          .then(function(){
            done();
          });
      });
    });

    it('the ' + currentPage.pageName + ' page should be accessible', function (done) {
      var axeBuilder = AxeBuilder(driver);
      for (var j = 0; j < globalExclusions.length; j++) {
        axeBuilder.exclude(globalExclusions[j]);
      }

      for (var k = 0; k < currentPage.exclusions.length; k++) {
        axeBuilder.exclude(currentPage.exclusions[k]);
      }
      axeBuilder
        .analyze(function(results) {
          buildOutput(currentPage.pageName, results);
          expect(results.violations.length).toBe(expectedViolations);
          done();
        })
    });
  });
}
