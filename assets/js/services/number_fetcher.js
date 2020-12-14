import moment from "moment";
import _ from "lodash";
import RssParser from "./rss_parser";

export default class NumberFetcher {

  static getInstance(url, accepts = false) {
    if (!this.instance) {
      this.instance = new this(url, accepts);
    } else {
      this.instance.url = url;
      this.instance.acceptedDates = accepts;
    }
    return this.instance;
  }

  constructor(url, accepts = false) {
    this.url = url
    this.acceptedDates = accepts;
    this.excludeDates = [moment().format('D-M')];
    this.loaded = {};
  }

  async perform() {
    console.log('Fetching:', this.url);

    let feed = this.loaded[this.url] || await (new RssParser(this.url)).perform();
    this.loaded[this.url] = feed;
    this.number = {};

    feed.item.forEach((item, index) => {
      if (this.exclude(item.link)) return;

      this.number[item.link] = [];
      if (Array.isArray(this.acceptedDates) && this.acceptedDates.indexOf(item.link) == -1) return;

      item.description = item.description.replace(/\n/gim, '');
      let numberStr = [];
      [
        /(ĐB):\s{0,1}([\d\s-]+)(1|Nhất):/,
        /(1|Nhất):\s{0,1}([\d\s-]+)(2|Nhì):/,
        /(2|Nhì):\s{0,1}([\d\s-]+)(3|Ba):/,
        /(3|Ba):\s{0,1}([\d\s-]+)(4|Tư):/,
        /(4|Tư):\s{0,1}([\d\s-]+)(5|Năm):/,
        /(5|Năm):\s{0,1}([\d\s-]+)(6|Sáu):/,
        /(6|Sáu):\s{0,1}([\d\s-]+)(7|Bảy):/,
        /(7|Bảy):\s{0,1}([\d\s-]+)(8):/,
        /(7|Bảy):\s{0,1}([\d\s-]+)$/,
        /(8):\s{0,1}([\d\s-]+)$/
      ].forEach(reg => {
        let match = item.description.match(reg);
        if (match)
          numberStr.push(match[2]);
      })
      numberStr = numberStr.join(',');
      numberStr = numberStr.replace(/\s{0,1}-\s{0,1}/gi, ',');

      // console.log(item.link);
      // console.log(numberStr);

      this.number[item.link] = numberStr.split(',');
    });

    return this.number;
    // fs.writeFileSync('./json/number.json', JSON.stringify(this.number));
  }

  exclude(link) {
    for (let i in this.excludeDates) {
      if (link.indexOf(this.excludeDates[i]) !== -1) return true;
    }
    return false;
  }

  allDates() {
    return Object.keys(this.number);
  }
}
