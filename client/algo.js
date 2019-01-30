// Reverse a string
const reversedStr = str => {
  let rev = ''
  for (let character of str) {
    rev = rev + character
  }
  return rev
}

// Reverse an integer (including negative numbers. Should ignore leading 0s)
const reversedInt = int => {
  return (
    parseInt(
      int
        .toString()
        .split('')
        .reverse()
        .join('')
    ) * Math.sign(int)
  )
}

//  Find char that is repeated max times
const maxChars = str => {
  const charMap = {}
  for (let char of str) {
    charMap[char] = charMap[char] + 1 || 1
  }
  let max = 0
  let maxChar = ''
  for (let char in charMap) {
    if (charMap[char] > max) {
      max = charMap[char]
      maxChar = char
    }
  }
  return `${maxChar} is Max`
}

//  Find anagram using sort
const anagramSort = (strA, strB) => {
  return cleanString(strA) === cleanString(strB) ? true : false
}

// remove spaces & remove non alphabet characters. convert to lowercase
function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('')
}

//  long solution to anagrams
const anagram = (strA, strB) => {
  let objA = buildCharMap(strA)
  let objB = buildCharMap(strB)
  if (Object.keys(objA).length !== Object.keys(objA).length) {
    console.log(false)
    return false
  } else {
    for (let char in objA) {
      if (objA[char] !== objB[char]) {
        return false
      }
    }
    return true
  }
  console.log(objA)
  console.log(objB)
}

//  create object of char as key & count as value
function buildCharMap(str) {
  charMap = {}
  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    charMap[char] = charMap[char] + 1 || 1
  }
  return charMap
}

// fizzbuzz
const fizzBuzz = n => {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log('fizzbuzz')
    } else if (i % 3 === 0) {
      console.log('fizz')
    } else if (i % 5 === 0) {
      console.log('buzz')
    } else {
      console.log(i)
    }
  }
}

// convert array into 'size' sized chunks
const chunk = (arr, size) => {
  let chunked = []
  let sliceSize = size
  for (let i = 0; i <= arr.length; i += size) {
    chunked.push(arr.slice(i, sliceSize))
    sliceSize += size
  }
  return chunked
}

// Capitalize a sentence
const capitalize = sentence => {
  const words = []
  for (let word of sentence.split(' ')) {
    words.push(word[0].toUpperCase() + word.slice(1))
  }
  return words.join(' ')
}

// Capitalize a sentence
const capitalize2 = sentence => {
  let result = sentence[0].toUpperCase()
  for (let i = 1; i < sentence.length; i++) {
    if (sentence[i - 1] === ' ') {
      result += sentence[i].toUpperCase()
    } else {
      result += sentence[i]
    }
  }
  return result
}

// Draw '#' from 1 to n number of times in the shape of stairs
const steps = n => {
  for (let row = 0; row < n; row++) {
    let stair = ''
    for (let column = 0; column < n; column++) {
      if (column <= row) {
        stair += '#'
      } else {
        stair += ' '
      }
    }
    console.log(stair)
  }
}
const stepsRecursive = (n, row = 0, stair = '') => {
  if (row === n) {
    return
  }

  if (n === stair.length) {
    console.log(stair)
    return stepsRecursive(n, row + 1)
  }

  if (stair.length <= row) {
    stair += '#'
  } else {
    stair += ' '
  }
  stepsRecursive(n, row, stair)
}

// console.log(steps(9))
// console.log(stepsRecursive(9))

// console.log(anagram('foobassssssfrz', 'bzoofsar'))
// console.log(anagramSort('foobassssssfrz', 'bzoofsar'))
// fizzBuzz(30)
// console.log(chunk([3, 5, 11, 33, 4444, 32, 11, 1], 7))
// console.log(capitalize('hello, there how are you?'))
// console.log(capitalize2('hello, there how are you?'))
