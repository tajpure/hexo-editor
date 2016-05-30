/*
 * Author: tajpure
 * Since: 2015-11-15
*/
'use strict';


function compareDate(date0, date1) {
  const dateTime0 = new Date(date0).getTime();
  const dateTime1 = new Date(date1).getTime();
  if (dateTime0 < dateTime1) {
    return 1;
  } else if (dateTime0 === dateTime1) {
    return 0;
  } else {
    return -1;
  }
}

module.exports = {
  sortPosts(posts) {
    if (!posts instanceof Array) {
      throw new Error('The posts should be Array.');
    } else {
      posts.sort(function(post0, post1){ return compareDate(post0.date, post1.date)});
    }
  },
  formatDateStr(date) {
    return console.log('*' + date + '*');
  }
};
