#! /usr/bin/env node

const Memo = require("./memo.js");
const minimist = require("minimist");
const ARGV = minimist(process.argv.slice(2));

if (ARGV.l) Memo.list();
else if (ARGV.r) Memo.show();
else if (ARGV.d) Memo.remove();
else if (ARGV.e) Memo.edit();
else {
  process.stdin.once("data", function (data) {
    Memo.create(data.toString());
  });
}
