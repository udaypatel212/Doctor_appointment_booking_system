function isSunday(dateStr) {
  const date = new Date(dateStr);
  return date.getDay() === 0; // Sunday = 0
}
module.exports.isSunday = isSunday;


