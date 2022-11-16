const sqlite3 = require("sqlite3").verbose();

module.exports = class MemoDatabase {
  constructor(database_file) {
    this.db = new sqlite3.Database(database_file);
    this.db.run("CREATE TABLE IF NOT EXISTS memo (name TEXT, content TEXT)");
  }

  memos() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT rowid, name, content FROM memo", (err, memos) => {
        if (err) {
          reject(err);
        } else {
          resolve(memos);
        }
      });
    });
  }

  store(name, content) {
    this.db.run("INSERT INTO memo VALUES (?,?)", name, content);
  }

  update(id, name, content) {
    this.db.run(
      "UPDATE memo SET name = ?, content = ? WHERE rowid = ?",
      name,
      content,
      id
    );
  }

  delete(id) {
    this.db.run("DELETE FROM memo WHERE rowid = ?", id);
  }
};
