const yargs = require("yargs");

module.exports = class LessPluginFn {
  argv: {
    functionName: string;
  } = { functionName: "define-var" };
  constructor() {}
  setOptions(args: string) {
    const argv = yargs(args ?? "").argv;
    for (const key of Object.keys(this.argv)) {
      if (argv[key]) {
        this.argv[key] = argv[key];
      }
    }
  }
  printUsage() {
    console.log("less-plugin-fn options:");
    console.log(JSON.stringify(this.argv));
  }
  install(less, pluginMenager, functions) {
    // console.log("install");
    //   console.log("install", less, pluginMenager, functions);
    functions.add(this.argv.functionName, (key, value) => {
      console.log(this.argv)
      return new less.tree.Declaration(`@${key.value}`, value);
    });
  }
};
