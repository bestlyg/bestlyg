/*
  Warnings:

  - You are about to drop the column `code` on the `serverless` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "serverless" DROP COLUMN "code";

-- CreateTable
CREATE TABLE "serverless_code" (
    "id" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "serverless_id" TEXT,

    CONSTRAINT "serverless_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "serverless_code_name_key" ON "serverless_code"("name");

-- AddForeignKey
ALTER TABLE "serverless_code" ADD CONSTRAINT "serverless_code_serverless_id_fkey" FOREIGN KEY ("serverless_id") REFERENCES "serverless"("id") ON DELETE CASCADE ON UPDATE CASCADE;
