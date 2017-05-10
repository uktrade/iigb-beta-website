var base = process.env.BASE_IIGB_URL || 'http://localhost:3000';

describe('IIGB geo redirect Functionality', function() {
	it('redirects me to int', function() {
		browser
			.url(base)
			.pause(10000);		
		expect(browser.getUrl(), 'redirected url').toEqual(base + "/int/");
	});
});
