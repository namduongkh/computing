import fs from "fs";
import _ from "lodash";

export default class NumberGenerator {

  perform() {
    let data = {};
    _.times(10, (i) => {
      data[i] = this.generate();
    });

    fs.writeFileSync('./json/number.json', JSON.stringify(data));
  }

  generate() {
    return _.times(18, () => {
      return _.random(0, 999999)
    })
  }
}
