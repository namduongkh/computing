import { parseStringPromise } from 'xml2js';
import axios from "axios";

export default class RssParser {

  constructor(url) {
    this.url = url
  }

  perform() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    return new Promise((rs, rj) => {
      CommonJs.toggleLoadingWrapper(true);

      axios.get(CORS_PROXY + this.url)
        .then(({ data }) => {
          return parseStringPromise(data, {
            explicitArray: false
          });
        })
        .then((result) => {
          rs(result.rss.channel);
        })
        .finally(() => {
          CommonJs.toggleLoadingWrapper(false);
        })
    });
  }
}
