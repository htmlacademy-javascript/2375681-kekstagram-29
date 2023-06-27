import {generateComments, addPhotos, addPhoto} from './data';






const isPalindrome = (string) => string.toUpperCase() === string.toUpperCase().split('').reverse().join('');

isPalindrome('Лёша на полке клопа нашёл ');


function findPalindrome(string) {
  string = string.replaceAll().toLowerCase();
  for (let i = string.length - 1; i >= 0; i -= 1) {
    if (string[i] !== string[string.length - i - 1]) {
      return false;
    }
  }
  return true;

}

findPalindrome('Лёша на полке клопа нашёл ');


