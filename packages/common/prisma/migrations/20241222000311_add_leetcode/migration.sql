-- CreateEnum
CREATE TYPE "LeetcodeScriptType" AS ENUM ('JS', 'TS', 'PY', 'CS', 'C', 'CPP', 'JAVA', 'GO', 'RUST', 'SQL');

-- AlterTable
ALTER TABLE "ledger" ALTER COLUMN "create_time" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "update_time" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "xuan" ALTER COLUMN "create_time" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "update_time" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "leetcode-problem" (
    "id" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "leetcode-problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leetcode-solution" (
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

    CONSTRAINT "leetcode-solution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leetcode-solution" ADD CONSTRAINT "leetcode-solution_leetcode_problem_id_fkey" FOREIGN KEY ("leetcode_problem_id") REFERENCES "leetcode-problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
