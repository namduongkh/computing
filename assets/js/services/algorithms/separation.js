import NumberChecker from "./number_checker";
import _ from "lodash";

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
    _.times(99, n => {
      n = (n < 10 ? '0' : '') + n;
      this.result[n] = this.result[n] || 0
    })
    return _.toPairs(this.result).filter(i => !i[1]).slice(0, 10);
  }
}
