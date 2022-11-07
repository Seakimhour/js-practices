const { Select } = require("enquirer");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.sqlite3");
const Editor = require("./editor.js");

module.exports = class Memo {
  constructor() {
    db.run("CREATE TABLE IF NOT EXISTS memo (name TEXT, content TEXT)");
    db.close();
  }

  static getMemoList() {
    return new Promise((resolve, reject) => {
      db.all("SELECT rowid, name, content FROM memo", (err, memos) => {
        if (err) {
          reject(err);
        } else {
          resolve(memos);
        }
      });
    });
  }

  static selectMemo(message, choices) {
    return new Select({
      name: "select",
      message: message,
      choices: choices,
      result(value) {
        return this.choices.find((choice) => choice.name === value);
      },
    }).run();
  }

  static create(content) {
    let name = content.split("\n")[0];
    db.run("INSERT INTO memo VALUES (?,?)", name, content);
    db.close();
  }

  static list() {
    db.each("SELECT name FROM memo", (err, memo) => console.log(memo.name));
    db.close();
  }

  static show() {
    this.getMemoList()
      .then((memos) => this.selectMemo("Choose a note you want to see:", memos))
      .then((memo) => console.log(memo.content))
      .finally(() => db.close());
  }

  static remove() {
    this.getMemoList()
      .then((memos) =>
        this.selectMemo("Choose a note you want to delete:", memos)
      )
      .then((memo) => db.run("DELETE FROM memo WHERE rowid = ?", memo.rowid))
      .finally(() => db.close());
  }

  static edit() {
    this.getMemoList()
      .then((memos) =>
        this.selectMemo("Choose a note you want to edit:", memos)
      )
      .then((memo) =>
        Editor.edit(memo.content).then((newContent) =>
          this.update(memo.rowid, newContent)
        )
      );
  }

  static update(id, content) {
    let name = content.split("\n")[0];
    db.run(
      "UPDATE memo SET name = ?, content = ? WHERE rowid = ?",
      name,
      content,
      id
    );
    db.close();
  }
};
