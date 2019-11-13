const date = (string, splicer) => {
  var d = new Date(string),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join(splicer ? splicer : '.');
}

const price = (string) => {
  if(string == 0) return 0;
  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = (string + '');
  while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

  return n;
}

const formatter = {
  'date': date,
  'price': price
};
export default formatter;