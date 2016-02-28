var assert = require('assert');
var Article = require('../../lib/article');

describe('article', function() {
  describe('test hashCode', function () {
    it('test hashCode', function () {
      Article.hashCode('test title', 'test content');
      assert.equal('test content', cache.get('test title'));
    });
  });
});
