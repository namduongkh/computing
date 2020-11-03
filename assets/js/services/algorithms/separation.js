import NumberChecker from "./number_checker";

export default class Separation extends NumberChecker {

  perform() {
    this.checkNumArray();
  }

  checkNumArray() {
    _.map(this.allNumberArray, numStr => this.checkNumberString(numStr))
  }

  checkNumberString(numStr) {
    let splitNum = numStr.toString().split('');

    splitNum.forEach((rootNum, i) => {
      splitNum.forEach((num, j) => {
        if (i !== j) {
          let targetNum = `${rootNum}${num}`;
          this.result[targetNum] = '__';
        }
      });
    })
  }

  top10Result() {
    return [];
  }
}
