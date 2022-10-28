const minimist = require("minimist");

const today = new Date();
const argv = minimist(process.argv.slice(2));
const year = argv["y"] || today.getFullYear();
const month = argv["m"] || today.getMonth() + 1;
const days_in_month = new Date(year, month, 0).getDate();

let current_week_day = new Date(year, month - 1).getDay();
let output = "";
output += `     ${month}月 ${year}\n日 月 火 水 木 金 土\n`;
output += "   ".repeat(current_week_day);

for (let day = 1; day <= days_in_month; day++) {
  output += `${day.toString().padEnd(2, " ")} `;

  if (current_week_day < 6) {
    current_week_day += 1;
  } else {
    current_week_day = 0;
    output += "\n";
  }
}

console.log(output);
