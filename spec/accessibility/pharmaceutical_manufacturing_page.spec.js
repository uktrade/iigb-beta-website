var baseUrl = process.env.BASE_IIGB_URL || 'http://localhost:3000';

describe('Accessibility testing', function() {

  beforeEach(function(done) {
    driver.get(baseUrl + '/int/industries/health-and-life/pharmaceutical-manufacturing').then(function () {
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

  it('the pharmaceutical manufacturing page should be accessible', function (done) {
    AxeBuilder(driver)
      .analyze(function(results) {
        buildOutput("Pharmaceutical manufacturing page", results);
        expect(results.violations.length).toBe(0);
        done();
      })
  });
});