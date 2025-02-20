/*
  Warnings:

  - You are about to drop the `leetcode-problem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leetcode-solution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leetcode-solution" DROP CONSTRAINT "leetcode-solution_leetcode_problem_id_fkey";

-- DropTable
DROP TABLE "leetcode-problem";

-- DropTable
DROP TABLE "leetcode-solution";

-- CreateTable
CREATE TABLE "leetcode_problem" (
    "id" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tags" TEXT[],
    "level" "LeetcodeLevelType" NOT NULL,

    CONSTRAINT "leetcode_problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leetcode_solution" (
    "id" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "script" "LeetcodeScriptType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" DOUBLE PRECISION,
    "memory" DOUBLE PRECISION,
    "desc" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "leetcode_problem_id" TEXT NOT NULL,

    CONSTRAINT "leetcode_solution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leetcode_problem_name_key" ON "leetcode_problem"("name");

-- AddForeignKey
ALTER TABLE "leetcode_solution" ADD CONSTRAINT "leetcode_solution_leetcode_problem_id_fkey" FOREIGN KEY ("leetcode_problem_id") REFERENCES "leetcode_problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
