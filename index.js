const Cac = require("cac"),
  cli = new Cac();
const MeCab = require('mecab-async'),
  mecab = new MeCab();
const fs = require('fs');
const path = require('path');

const parse = (input) => {
  mecab.parse(input, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
};

const parseSimple = (input) => {
  mecab.wakachi(input, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
};

cli.option("simple", {
  desc: "簡易表記",
  alias: "s"
});

cli.option("file", {
  desc: "ファイルから読み込み",
  alias: "f"
});

cli.command("*", {desc: "show help"}, () => cli.showHelp());

cli.command("parse", {
  desc: "形態素解析します",
  alias: "p"
}, (input, flag) => {
  if (flag.simple && !flag.file) {
    parseSimple(input.join(""));
  } else if (flag.file) {
    try {
      const stats = fs.statSync(path.join(__dirname, input.join("")));
      if (stats.isFile()) {
        fs.readFileSync(input.join(""), "utf-8")
          .split("\n")
          .filter(e => e !== '')
          .forEach(e => {
            if (flag.simple) {
              parseSimple(e);
            } else {
              parse(e);
            }
          });
      }
    } catch (err) {
      console.log(`${input.join("")} is not File`);
    }
  } else {
    parse(input.join(""));
  }
});

cli.parse();
