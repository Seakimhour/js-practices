#! /usr/bin/env node

const Memo = require("./memo.js");
const minimist = require("minimist");
const ARGV = minimist(process.argv.slice(2));

let memo_app = new Memo();

if (ARGV.l) memo_app.list();
else if (ARGV.r) memo_app.show();
else if (ARGV.d) memo_app.remove();
else if (ARGV.e) memo_app.edit();
else process.stdin.once("data", (data) => memo_app.create(data.toString()));
