var assert = require('assert');
var cache = require('../../lib/cache');

describe('cache', function() {
  describe('right case to put() and get()', function () {
    it('test put', function () {
      cache.put('test title', 'test content');
      assert.equal('test content', cache.get('test title'));
    });
  });
  describe('wrong case to put() and get()', function () {
    it('test put', function () {
      cache.put('test title', 'test content');
      cache.put('test title1', 'test content1');
      assert.equal('test content', cache.get('test title'));
      assert.notEqual('test content', cache.get('test title1'));
    });
  });
});
