const { requireJson } = require("..");
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");

const dirs = fs
  .readdirSync(__dirname)
  .filter((name) => name !== path.basename(__filename));

dirs.forEach((dir) => {
  test(path.resolve(__dirname, dir));
});
function test(dirpath) {
  console.log("=".repeat(20));
  console.log(`START TEST [${path.basename(dirpath)}]`);
  const json = _.omit(
    requireJson(path.resolve(dirpath, "package.json")),
    "extension"
  );
  const expect = _.omit(
    requireJson(path.resolve(dirpath, "expect.json")),
    "extension"
  );
  console.log("json", JSON.stringify(json));
  console.log("expect", JSON.stringify(expect));
  if (_.isEqual(json, expect)) {
    console.log(`TEST [${path.basename(dirpath)}] SUCCESSFULLY.`);
  } else {
    console.log(`TEST [${path.basename(dirpath)}] FAIL.`);
  }
}
