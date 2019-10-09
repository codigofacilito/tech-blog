module.exports.getYear = function (date){
  const year = date.getYear();
  if(year <= 999) return year + 1900;
  return year;
}

module.exports.getMonth = function(date){
  const month = date.getMonth() + 1 ;
  
  
  return month < 10 ? `0${month}` : month;
}

module.exports.getDate = function(date) {
  const day = date.getDate();

  return day < 10 ? `0${day}` : day;
}