const fs = require("node:fs/promises");
const { spawn } = require("child_process");

module.exports = class Editor {
  constructor(file) {
    this.file = file;
  }

  #open() {
    return new Promise((resolve, reject) => {
      spawn("vi", [this.file], { stdio: "inherit" }).on("exit", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`vi had non zero exit code: ${code}`));
        }
      });
    });
  }

  async edit(originalContent) {
    fs.appendFile(this.file, originalContent);
    await this.#open();
    const newContent = await fs.readFile(this.file);
    await fs.unlink(this.file);

    return newContent.toString();
  }
};
