const fs = require("node:fs/promises");
const { spawn } = require("child_process");

module.exports = class Editor {
  static open(file) {
    return new Promise((resolve, reject) => {
      spawn("vi", [file], { stdio: "inherit" }).on("exit", (code) => {
        if (code === 0) {
          resolve(file);
        } else {
          reject(new Error(`vi had non zero exit code: ${code}`));
        }
      });
    });
  }

  static edit(originalContent) {
    const TEMP_FILE = "TEMP.txt";
    return fs
      .appendFile(TEMP_FILE, originalContent)
      .then(() => this.open(TEMP_FILE))
      .then(() => fs.readFile(TEMP_FILE))
      .then((newContent) =>
        fs.unlink(TEMP_FILE).then(() => newContent.toString())
      );
  }
};
