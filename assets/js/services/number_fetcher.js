import moment from "moment";
import _ from "lodash";
import RssParser from "./rss_parser";

export default class NumberFetcher {

  constructor(url, avoidDate = 0) {
    this.url = url
    this.number = {};
    this.excludeDates = [moment().format('D-M')];
    this.avoidDate = avoidDate;
  }

  async perform() {
    console.log('Fetching:', this.url);

    let feed = await (new RssParser(this.url)).perform();

    feed.item.forEach((item, index) => {
      if (this.exclude(item.link)) return;
      if (this.avoidDate > 0) return this.avoidDate--;

      item.description = item.description.replace(/\n/gim, '');
      let numberStr = item.description.replace(/^ĐB:\s([\d\s-]+)1:\s([\d\s-]+)2:\s([\d\s-]+)3:\s([\d\s-]+)4:\s([\d\s-]+)5:\s([\d\s-]+)6:\s([\d\s-]+)7:\s([\d\s-]+)8:\s([\d\s-]+)$/gi, '$1,$2,$3,$4,$5,$6,$7,$8,$9');
      numberStr = numberStr.replace(/\s-\s/gi, ',');

      console.log(item.link);
      console.log(numberStr);

      this.number[item.link] = numberStr.split(',');
    });

    // fs.writeFileSync('./json/number.json', JSON.stringify(this.number));
  }

  exclude(link) {
    for (let i in this.excludeDates) {
      if (link.indexOf(this.excludeDates[i]) !== -1) return true;
    }
    return false;
  }
}
