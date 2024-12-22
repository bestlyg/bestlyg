/*
  Warnings:

  - Added the required column `level` to the `leetcode-problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leetcode-problem" ADD COLUMN     "level" "LeetcodeLevelType" NOT NULL;
