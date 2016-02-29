var assert = require('assert');
var emoji = require('../../lib/emoji');

describe('emoji', function() {
  describe('test emoji.random', function () {
    it('test random', function () {
      console.log(emoji.random());
      assert.notEqual(null, emoji.random());
    });
  });
});
