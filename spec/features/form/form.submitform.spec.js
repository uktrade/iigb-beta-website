var base = process.env.BASE_IIGB_URL || 'http://localhost:3000';
// var formProcessor = process.env.FORMS_PROCESSOR;

describe('IIGB Form Functionality', function() {

  // it('checks form points to correct form processor', function() {

  //   browser
  //     .url(base + '/int/contact')
  //     .waitForExist('form');

  //   var form = browser.elements('form');
  //   console.log(form.getAttribute('action'));
  //   if (formProcessor === 'development') {
  //     expect(form.getAttribute('action')).toEqual('https://iigb-forms-staging.herokuapp.com/form');
  //   } else {
  //     expect(form.getAttribute('action')).toEqual('https://forms.invest.great.gov.uk/form');
  //   }
  // });

	it('validates form is successfully sent', function() {

		browser
			.url(base + '/int/contact')
			.waitForExist('form');

		browser
			.setValue("form input[name='user[name]']", 'browser stack')
			.setValue("form input[name='user[title]']", 'browser stack')
			.setValue("form input[name='user[email]']", 'browser@stack.com')
			.setValue("form input[name='user[phone]']", '4402074355599')
			.setValue("form input[name='organisation[name]']", 'utopia')
			.setValue("form input[name='organisation[website]']", 'utopia.com')
      .setValue("form input[name='organisation[headquarters_country]']", 'utopia')
			.setValue("form textarea[name='investment[project]']", 'This company plan to invest millions in the uk over the next few years.')
			.click("form input[value='2-staff:10 to 50:10 to 50']");
		browser.pause(500);

		browser
			.click("form button[type='submit']");
		browser.pause(500);

		browser.waitUntil(function() {
			return browser.getUrl().includes("enquiries")
		}, 7000, 'expected url to be different after 7s');

		console.log(browser.getUrl());
		expect(browser.getUrl()).toContain('confirmation');
	});
});
