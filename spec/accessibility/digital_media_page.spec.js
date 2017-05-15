var baseUrl = process.env.BASE_IIGB_URL || 'http://localhost:3000';

var driver, browser;

describe('Accessibility testing', function() {

  beforeEach(function(done) {
    driver = new selenium.Builder()
      .forBrowser('firefox');

    browser = driver.build();

    browser.manage().timeouts().setScriptTimeout(60000);

    browser.get(baseUrl + '/int/industries/creative/digital-media').then(function () {
      browser.executeAsyncScript(function(callback) {
        var script = document.createElement('script');
        script.innerHTML = 'document.documentElement.classList.add("axe-is-ready");';
        document.documentElement.appendChild(script);
        callback();
      })
      .then(function () {
        return browser.wait(selenium.until.elementsLocated(selenium.By.css('.axe-is-ready')));
      })
      .then(function(){
        done();
      });
    });
  });

  // Close the website after each test is run (so that it is opened fresh each time)
  afterEach(function(done) {
    browser.quit().then(function () {
      done();
    });
  });

  it('the digital media page should be accessible', function (done) {
    AxeBuilder(browser)
      .analyze(function(results) {
        writeOutput("Digital media page");
        writeOutViolations(results.violations);
        writeOutReviews(results.incomplete);
        expect(results.violations.length).toBe(0);
        done();
      })
  });
});