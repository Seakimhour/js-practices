#! /usr/bin/env node

const MemoApp = require("./memo_app.js");
const minimist = require("minimist");
const ARGV = minimist(process.argv.slice(2));

const memo_app = new MemoApp("db.sqlite3", "temp.txt");

if (ARGV.l) memo_app.list();
else if (ARGV.r) memo_app.show();
else if (ARGV.d) memo_app.remove();
else if (ARGV.e) memo_app.edit();
else process.stdin.once("data", (data) => memo_app.create(data.toString()));
