var base = process.env.BASE_IIGB_URL || 'http://localhost:3000';

describe('IIGB Form Functionality', function() {
	it('validates fields are correctly validated', function() {

		browser
			.url(base + '/int/contact')
			.waitForExist('form');

		browser
      .setValue("form input[name='user[name]']", '')
      .setValue("form input[name='user[title]']", '')
			.setValue("form input[name='user[email]']", 'cbakbckasbckhd')
      .setValue("form input[name='user[phone]']", '999')
      .setValue("form input[name='organisation[name]']", '')
      .setValue("form input[name='organisation[website]']", 'cbakbckasbckhd')
      .setValue("form input[name='organisation[headquarters_country]']", '')
			.setValue("form textarea[name='investment[project]']", '');
		browser.pause(500);

    browser.submitForm('#ist-form');

		var validation = browser.elements('.has-error');
		console.log(validation.value.length);
		expect(validation.value.length).toEqual(9);
	});
});
