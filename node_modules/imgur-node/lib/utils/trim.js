// @summary
// Removes all leading values of left and all trailing values of right.
// @params
// str    the string to trim
// left   value to remove from left side
// right  value to remove from right side
function trim(str, left = '\\s', right = '\\s') {
  if (!left) left = '';
  if (!right) right = '';
  return str.replace(new RegExp(`^${left}|${right}$`, 'g'), '');
}

module.exports = trim;
