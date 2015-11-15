
/*
 * Author: tajpure
 * Since: 2015-11-15
*/
function Util() {
};

// if date0 > date1 then return true, else return false
Util.compareDate = function(date0, date1) {
  Util.formatDateStr(date0);
  Util.formatDateStr(date1);
  if (new Date(date0).getTime() < new Date(date1).getTime()) {
    return 1;
  } else if (new Date(date0).getTime() === new Date(date1).getTime()) {
    return 0;
  } else {
    return -1;
  }
}

Util.formatDateStr = function(date) {
  return console.log('*' + date + '*');
}

module.exports = Util;
