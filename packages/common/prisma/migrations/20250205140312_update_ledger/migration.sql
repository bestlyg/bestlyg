/*
  Warnings:

  - The `from` column on the `ledger` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LedgerFrom" AS ENUM ('Lyg', 'Yzx');

-- AlterTable
ALTER TABLE "ledger" DROP COLUMN "from",
ADD COLUMN     "from" "LedgerFrom";
