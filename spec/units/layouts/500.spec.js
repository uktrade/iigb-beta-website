/* jshint ignore:start*/
describe('500.html content tags', function() {
  var html = render('500.html');
  var fields = parseCmsTags(html);
  var infoBlock= fields['infoBlock'];

  it('should have "infoBlock" defined',function() {
    expect(infoBlock).toBeDefined();
  });

  it('"infoBlock" should be of type content',function() {
    expect(infoBlock.type).toBe('content');
  });

  it('"infoBlock" should not be multiple',function() {
    expect(infoBlock.multiple).toBeFalsy();
  });

  it('"infoBlock" should have a label defined',function() {
    expect(infoBlock.label).toBeDefined();
  });

});
/* jshint ignore:end*/

