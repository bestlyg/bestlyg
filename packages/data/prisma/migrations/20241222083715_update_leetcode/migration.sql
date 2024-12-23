/*
  Warnings:

  - The values [JS,TS,PY,CS,C,CPP,JAVA,GO,RUST,SQL] on the enum `LeetcodeScriptType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeetcodeScriptType_new" AS ENUM ('javascript', 'typescript', 'python', 'csharp', 'c', 'cpp', 'java', 'go', 'rust', 'sql');
ALTER TABLE "leetcode_solution" ALTER COLUMN "script" TYPE "LeetcodeScriptType_new" USING ("script"::text::"LeetcodeScriptType_new");
ALTER TYPE "LeetcodeScriptType" RENAME TO "LeetcodeScriptType_old";
ALTER TYPE "LeetcodeScriptType_new" RENAME TO "LeetcodeScriptType";
DROP TYPE "LeetcodeScriptType_old";
COMMIT;
