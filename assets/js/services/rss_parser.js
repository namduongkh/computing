import { parseStringPromise } from 'xml2js';

export default class RssParser {

  constructor(url) {
    this.url = url
  }

  perform() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    return new Promise((rs, rj) => {
      fetch(CORS_PROXY + this.url)
        .then(response => response.text())
        .then(data => {
          return parseStringPromise(data, {
            explicitArray: false
          });
        })
        .then((result) => {
          rs(result.rss.channel);
        });
    });
  }
}
