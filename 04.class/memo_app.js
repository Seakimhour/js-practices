const { Select } = require("enquirer");
const Editor = require("./editor.js");
const MemoDatabase = require("./memo_database.js");

module.exports = class MemoApp {
  #db;
  #editor;

  constructor(database_file, edit_file) {
    this.#db = new MemoDatabase(database_file);
    this.#editor = new Editor(edit_file);
  }

  create(content) {
    this.#db.store(content.split("\n")[0], content);
  }

  list() {
    this.#db
      .memos()
      .then((memos) => memos.forEach((memo) => console.log(memo.name)));
  }

  show() {
    this.#db
      .memos()
      .then((memos) =>
        this.#selectMemo("Choose a note you want to see:", memos)
      )
      .then((memo) => console.log(memo.content));
  }

  remove() {
    this.#db
      .memos()
      .then((memos) =>
        this.#selectMemo("Choose a note you want to delete:", memos)
      )
      .then((memo) => this.#db.delete(memo.rowid));
  }

  edit() {
    this.#db
      .memos()
      .then((memos) =>
        this.#selectMemo("Choose a note you want to edit:", memos)
      )
      .then((memo) => {
        this.#editor
          .edit(memo.content)
          .then((newContent) =>
            this.#db.update(memo.rowid, newContent.split("\n")[0], newContent)
          );
      });
  }

  #selectMemo(message, choices) {
    return new Select({
      name: "select",
      message: message,
      choices: choices,
      result(value) {
        return this.choices.find((choice) => choice.name === value);
      },
    }).run();
  }
};
