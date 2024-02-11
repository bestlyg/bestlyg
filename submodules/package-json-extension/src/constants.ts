import { resolve } from "./functions";

export const PREFIX = process.env.PACKAGE_JSON_EXTEND_PREFIX ?? 'EXTEND';

export const FIELD_NAME =
  process.env.PACKAGE_JSON_EXTEND_FIELD_NAME ?? "extension";

export const FILE_NAME_PACKAGE_JSON =
  process.env.PACKAGE_JSON_EXTEND_FILE_NAME_PACKAGE_JSON ?? "package.json";

export const CWD = process.env.PACKAGE_JSON_EXTEND_CWD ?? process.cwd();

export const packageInfo: {
  name: string;
  version: string;
  description: string;
} = require(resolve(FILE_NAME_PACKAGE_JSON));
