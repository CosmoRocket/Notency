/* @flow */

/*
* Check if a message is a valid response that uses the format <Code> OK
*/
// $FlowFixMe - Turn off type annotations
const isValidResponse = message => {
  // Trim spaces before and after message
  const trimmedMessage = message.trim()
  // Check if a message is not blank and greater
  if (numWords(trimmedMessage) === 0) return false
  // Check if a 3 character code is present
  if (parseCodeFromMessage(trimmedMessage) === '') return false
  // Valid
  return true
}

/*
* Check number of words in a message
*/
// $FlowFixMe - Turn off type annotations
const numWords = words => {
  // Convert words to trimmed String Array
  const wordArray = words.trim().split(' ')
  // If word array has only 1 word
  if (wordArray.length === 1) {
    // If word is empty
    if (wordArray[0].length > 0) return 1
    else return 0
  }
  return wordArray.length
}

/*
* Get Nth word from a string
*/
// $FlowFixMe - Turn off type annotations
const getNthWord = (str, num) => {
  return str.split(' ')[num - 1]
}

/*
* Checks if a message responds as <Code> OK
*/
// $FlowFixMe - Turn off type annotations
const isOkMessage = message => {
  // Replace multiple spaces with a single space
  // and Trim spaces before and after message
  const msg = replaceMultipleSpaces(message.trim())
  // Check if the message is valid
  if (!isValidResponse(msg)) return false
  // Check if message has two words only
  if (numWords(msg) !== 2) return false
  // Check if the 2nd word is OK
  if (getNthWord(msg, 2).toUpperCase() !== 'OK') return false
  // Message is an OK message
  return true
}

/*
* Get code from message
*/
// $FlowFixMe - Turn off type annotations
const parseCodeFromMessage = message => {
  // The first word should be the code in Uppercase
  const code = getNthWord(message, 1).toUpperCase()
  // Code is only valid if it has 3 characters
  return code.length === 3 ? code : ''
}

/*
* Replace multiple spaces with a single space
*/
// $FlowFixMe - Turn off type annotations
const replaceMultipleSpaces = str => {
  return str.replace(/ +(?= )/g, '')
}

module.exports = {
  isValidResponse,
  isOkMessage,
  parseCodeFromMessage,
  replaceMultipleSpaces,
  numWords,
  getNthWord
}
