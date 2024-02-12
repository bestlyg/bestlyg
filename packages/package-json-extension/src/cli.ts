import { Command } from "commander";
import { CWD, FILE_NAME_PACKAGE_JSON, packageInfo } from "./constants";
import { resolve } from "./functions";
import { print, error } from "./print";
import fs from "fs-extra";
import { requireJson } from "./require-json";

const program = new Command();
program
  .name(packageInfo.name)
  .description(packageInfo.description)
  .version(packageInfo.version)
  .option(
    "-p --path <path>",
    "The path of package json.",
    resolve(CWD, FILE_NAME_PACKAGE_JSON)
  )
  .action((o) => {
    return new Promise<void>((resolve) => {
      fs.writeFile(
        o.path,
        JSON.stringify(requireJson(o.path), null, 4),
        (err) => {
          if (err) error("Update package json error.", err);
          resolve();
        }
      );
    }).then(
      () => print.success(`Update package json sucessfully.`),
      (err) => error(`Update package json erorr.`, err)
    );
  });
program.parse();
