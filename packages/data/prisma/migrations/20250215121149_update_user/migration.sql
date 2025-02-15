/*
  Warnings:

  - Added the required column `avatar` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL;
