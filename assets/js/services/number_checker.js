import _ from "lodash";

export default class NumberChecker {

  constructor(inputNumber) {
    this.result = {};
    this.rangeResult = {};
    this.inputNumber = inputNumber;
    this.allNumberArray = _.flatten(_.values(this.inputNumber));
  }

  perform() {
    // Kiểm tra dãy số theo mỗi ngày
    this.checkNumArray();
    this.checkRange();

    // console.log(this.top10Result());

    // let result = _.sortBy(_.toPairs(this.rangeResult), i => -i[1]);
    // console.log(result);

    // fs.writeFileSync("./json/result.json", JSON.stringify(this.result));
    // fs.writeFileSync("./json/rangeResult.json", JSON.stringify(result));
  }

  top10Result() {
    return _.sortBy(_.toPairs(this.result), i => -i[1]).slice(0, 10);
  }

  top10ResultNumber() {
    return this.top10Result().map(i => i[0])
  }

  rangeResultToPairs() {
    return _.sortBy(_.toPairs(this.rangeResult), i => -i[1])
  }

  checkNumArray() {
    // Kiểm tra từng số trong ngày
    _.map(this.allNumberArray, num => this.checkNumber(num))
  }

  checkNumber(number) {
    let splittedNum = number.toString().split('');

    // Qua từng con số, đếm số lần xuất hiện của số liền kề trước và sau
    splittedNum.forEach((num, index) => {
      // if (!this.result[num]) this.result[num] = {};

      let prev = splittedNum[index - 1];
      let next = splittedNum[index + 1];

      if (prev) {
        let targetNum = `${prev}${num}`;
        this.result[targetNum] = (this.result[targetNum] || 0) + 1;
      }

      if (next) {
        let targetNum = `${num}${next}`;
        this.result[targetNum] = (this.result[targetNum] || 0) + 1;
      }
    });
  }

  checkRange() {
    // Kiểm tra số lần đi kèm đối với 2 con số
    let arrayNum = this.top10ResultNumber() || _.range(0, 100);
    arrayNum.map((num) => {
      num = (num.toString().length === 1 ? '0' : '') + num;
      this.checkRangeNumber(num);
    })
  }

  checkRangeNumber(number) {
    this.allNumberArray.forEach(num => {
      let numStr = num.toString();
      if (numStr.indexOf(number) !== -1) {
        numStr = numStr.replace(number, '');

        if (!numStr) return;

        numStr.split('').forEach((numChar) => {
          let targetNum = `[${numChar}]${number}`;
          this.rangeResult[targetNum] = (this.rangeResult[targetNum] || 0) + 1;
        });
      }
    });
  }
}
