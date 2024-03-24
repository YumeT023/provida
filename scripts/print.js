import pico from "picocolors";
import boxen from "boxen";

export default {
  title(s) {
    console.log(boxen(pico.yellow(s), {padding: 1, borderColor: "yellow"}));
  },
  step(s) {
    console.log(pico.bold(`* ${s}...`));
  },
};
