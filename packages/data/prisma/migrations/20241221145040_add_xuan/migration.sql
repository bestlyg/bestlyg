/*
  Warnings:

  - You are about to drop the column `danceTimes` on the `xuan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "xuan" DROP COLUMN "danceTimes",
ADD COLUMN     "dance_times" INTEGER;
