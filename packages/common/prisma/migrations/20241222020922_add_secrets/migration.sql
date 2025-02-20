/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `leetcode-problem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date]` on the table `xuan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "secrets" (
    "id" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "secrets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "secrets_name_key" ON "secrets"("name");

-- CreateIndex
CREATE UNIQUE INDEX "leetcode-problem_name_key" ON "leetcode-problem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "xuan_date_key" ON "xuan"("date");
