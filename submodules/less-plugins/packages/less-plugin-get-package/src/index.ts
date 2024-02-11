const path = require("node:path");
const fs = require("fs-extra");
const packageName = "package.json";

function findClosestFile({ dirPath, fileName }) {
  while (
    !fs.existsSync(path.resolve(dirPath, fileName)) &&
    path.dirname(dirPath) !== dirPath
  ) {
    dirPath = path.dirname(dirPath);
  }
  const filePath = path.resolve(dirPath, fileName);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return filePath;
}

module.exports = class LessPluginGetPackage {
  constructor() {}
  setOptions(args: string) {}
  printUsage() {
    console.log("less-plugin-get-package");
  }
  install(less, pluginMenager, functions) {
    // console.log("less install");
    function getPackage(p, key, transform) {
      try {
        const dirPath = this.currentFileInfo.currentDirectory;
        const pkgPath = p?.value
          ? path.resolve(dirPath, p.value)
          : findClosestFile({ dirPath, fileName: packageName });
        let transformFn = (v) => v;
        if (transform?.value) transformFn = eval(transform.value);
        const res = transformFn(require(pkgPath)[key.value]);
        // console.log(`Result: ${res}`);
        return new less.tree.Keyword(res);
      } catch (e) {
        console.error(e);
        return "";
      }
    }
    const functionRegisters = {
      getPackage,
    };
    for (const [k, fn] of Object.entries(functionRegisters)) {
      functions.add(k, fn);
    }
  }
};
