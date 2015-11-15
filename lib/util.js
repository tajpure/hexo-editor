
/*
 * Author: tajpure
 * Since: 2015-11-15
*/
function Util() {
};

Util.sortPosts = function(posts) {
  if (!posts instanceof Array) {
    throw new Error('The posts should be Array.');
  } else {
    posts.sort(function(post0, post1){ return Util.compareDate(post0.date, post1.date)});
  }
}

// if date0 > date1 then return true, else return false
Util.compareDate = function(date0, date1) {
  var dateTime0 = new Date(date0).getTime();
  var dateTime1 = new Date(date1).getTime();
  if (dateTime0 < dateTime1) {
    return 1;
  } else if (dateTime0 === dateTime1) {
    return 0;
  } else {
    return -1;
  }
}

Util.formatDateStr = function(date) {
  return console.log('*' + date + '*');
}

module.exports = Util;
