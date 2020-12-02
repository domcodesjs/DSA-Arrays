const Memory = require('./memory');

const memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  pop() {
    if (this.length === 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }
}
function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  console.log(arr);
}

// main();

const URLify = (str) => {
  let strArr = str.split('');

  for (let i = strArr.length - 1; i >= 0; i--) {
    if (strArr[i] === ' ') {
      strArr[i] = '%20';
    }
  }
  return strArr.join('');
};

// console.log(URLify('www.thinkful.com /tauh ida parv een'));

const lessThanFiveFilter = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] < 5) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

// console.log(lessThanFiveFilter([4, 6, -3, 5, -2, 1]));

const mergeArrays = (arrOne, arrTwo) => {
  return arrOne.concat(arrTwo).sort((a, b) => a - b);
};

// console.log(mergeArrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

const removeChars = (str, filter) => {
  str = str.split('');
  filter = filter.split('');

  for (let i = str.length - 1; i >= 0; i--) {
    for (let j = filter.length - 1; j >= 0; j--) {
      if (str[i].toLowerCase() === filter[j]) {
        str.splice(i, 1);
      }
    }
  }
  return str.join('');
};

// console.log(removeChars('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));

//Do two iterations over the array - on the first one put in each cell the product of all preceding elements and on the second one multiply this by the product of all succeding elements.

const products = (arr) => {
  let result = [];
  let products;

  for (let i = 0; i < arr.length; i++) {
    products = arr.filter((_, idx) => idx !== i);
    result.push(products.reduce((a, b) => a * b));
  }

  return result;
};

// console.log(products([1, 3, 9, 4]));

const zeroOut = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(0)) {
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
  }
  return arr;
};

// console.log(
//   zeroOut([
//     [1, 0, 1, 1, 0],
//     [0, 1, 1, 1, 0],
//     [1, 1, 1, 1, 1],
//     [1, 0, 1, 1, 1],
//     [1, 1, 1, 1, 1]
//   ])
// );

function checkRotationStrings(str1, str2) {
  return str1.length === str2.length && str2.repeat(2).includes(str1);
}

// console.log(checkRotationStrings('amazon', 'azonma'));
// console.log(checkRotationStrings('amazon', 'azonam'));
