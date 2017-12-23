const Cac = require("cac"),
  cli = new Cac();
const MeCab = require('mecab-async'),
  mecab = new MeCab();

cli.option("simple", {
  desc: "簡易表記",
  alias: "s"
});

cli.command("*", {desc: "show help"}, () => cli.showHelp());

cli.command("parse", {
  desc: "形態素解析します",
  alias: "p"
}, (input, flag) => {
  if (flag.simple) {
    mecab.wakachi(input.join(""), function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  } else {
    mecab.parse(input.join(""), function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
});

cli.parse();
