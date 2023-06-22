// Первое задание

function checkStringLength(string,maxLength) {
  return string.length <= maxLength;
}
checkStringLength('Программа', 9);
checkStringLength('Программа', 11);


const checkStrLength = (string,maxLength) => string.length <= maxLength;

checkStrLength('Программа', 9);
checkStrLength('Программа', 11);

// Второе задание




export {checkStringLength, checkStrLength};
