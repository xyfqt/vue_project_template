export function filterPrice(amount = 0, digist = 2) {
  amount = parseFloat(amount);
  // amount = amount / 100;
  if (isNaN(amount)) {
    return 0;
  } else if ((amount + '').indexOf('.') == -1) {
    return parseInt(amount)
  } else if (amount == 0) {
    return amount.toFixed(digist);
  } else {
    // return amount.toFixed(digist);
    var strArr = amount.toString().split('.');
    var decimalStr;
    if (strArr[1] == undefined) {
      strArr[1] = '0'.repeat(digist);
    } else if (strArr[1].length < digist) {
      strArr[1] = strArr[1] + '0'.repeat(digist - strArr[1].length);
    }
    decimalStr = strArr[1].substr(0, digist);
    return `${strArr[0]}\.${decimalStr}`;
  }
}
