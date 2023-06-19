// Первое задание

function checkStringLength(string,maxLength) {
    return string.length <= maxLength ? true : false;
}
checkStringLength('Программа', 9);
checkStringLength('Программа', 11);


const checkStrLength = (string,maxLength) => string.length <= maxLength;

checkStrLength('Программа', 9);
checkStrLength('Программа', 11);

// Второе задание

function isPalindrome = (string) => string.toUpperCase() === string.toUpperCase().split('').reverse().join('');

isPalindrome('Лёша на полке клопа нашёл ');


function isPalindrome(string) {
  string = string.replaceAll().toLowerCase();
  for (let i = string.length - 1; i >= 0; i -= 1) {
    if (string[i] !== string[string.length - i - 1]) {
      return false;
  }
}
return true;

}

isPalindrome('Лёша на полке клопа нашёл ');
