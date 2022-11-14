const fs = require("node:fs/promises");
const { spawn } = require("child_process");

module.exports = class Editor {
  #TEMP_FILE = "TEMP.txt";

  #open() {
    return new Promise((resolve, reject) => {
      spawn("vi", [this.#TEMP_FILE], { stdio: "inherit" }).on(
        "exit",
        (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`vi had non zero exit code: ${code}`));
          }
        }
      );
    });
  }

  edit(originalContent) {
    return fs
      .appendFile(this.#TEMP_FILE, originalContent)
      .then(() => this.#open())
      .then(() => fs.readFile(this.#TEMP_FILE))
      .then((newContent) =>
        fs.unlink(this.#TEMP_FILE).then(() => newContent.toString())
      );
  }
};
