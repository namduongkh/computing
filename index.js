import NumberGenerator from "./number_generator";
import NumberChecker from "./number_checker";
import NumberFetcher from "./number_fetcher";
import readline from "readline";

const RSS = {
  'quang_ngai': 'https://xskt.com.vn/rss-feed/quang-ngai-xsqng.rss',
  'khanh_hoa': 'https://xskt.com.vn/rss-feed/khanh-hoa-xskh.rss',
  'mien_trung': 'https://xskt.com.vn/rss-feed/mien-trung-xsmt.rss',
};

(function () {
  return new Promise(async (rs, rj) => {

    await new NumberFetcher(RSS[process.argv[2]] || await inputRequest('RSS link: '), process.argv[3]).perform();
    new NumberChecker().perform();

    rs();
  });
})().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

function inputRequest(question = '', defaultValue = '') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.write(defaultValue);

  return new Promise((rs, rj) => {
    rl.question(question, (answer) => {
      rs(answer);
      rl.close();
    });
  });
}
