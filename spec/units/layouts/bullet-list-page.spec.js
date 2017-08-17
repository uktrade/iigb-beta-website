/* jshint ignore:start*/
describe('bullet-list-page.html content tags', function() {
  var html = render('bullet-list-page.html');
  var fields = parseCmsTags(html);
  var listItems= fields['listItems'];

  it('should have "listItems" defined as multiple content',function() {
    expect(listItems).toBeDefined();
    expect(listItems.multiple).toBe(true);
    expect(listItems.type).toBe('content');
  });

  it('"listItems" should have "link" defined',function() {
    var link = listItems.fields.link;
    expect(link).toBeDefined();
    expect(link.type).toBe('text');
  });

});
/* jshint ignore:end*/

