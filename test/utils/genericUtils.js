/**
 * @param {integer} max Maximun number that could be generated
 * @param {integer} min Minumun number that could be generated
 * @returns {integer} A random number between min and max (inclusive)
 */
export function generateRandomNumber(max, min = 0) {
  if (min > max) throw new Error("min should not be greater than max");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Escapes especial characters of a given string
 * @param {string} text The text containing special characters
 * @returns {string} A new string with special characters scaped
 */
export function escapeSpecialCharacters(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Parses a given string to integer
 * @param {string} string The string to parse
 * @param {integer} radix A value to be used as the base of the number in string
 * @returns {integer} The parsed integer value of the given string
 */
export function parseIntFromString(string, radix = 10) {
  if (isNaN(string)) throw new Error("The provided string is not a valid number");
  return parseInt(string, radix);
}

/**
 * @function checkIfValueIsNumber
 * @description Checks if a given value is a valid number.
 * @param {*} value - The value to be checked.
 * @returns {boolean} - Returns `true` if the value is a valid number, otherwise returns `false`.
 */
export function checkIfValueIsNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}
