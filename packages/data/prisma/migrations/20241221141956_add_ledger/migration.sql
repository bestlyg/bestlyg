-- CreateEnum
CREATE TYPE "LedgerType" AS ENUM ('Generally', 'Drinks', 'Food', 'Transportation', 'RedEnvelope', 'Taobao', 'Rent', 'PhoneBill', 'DailyNecessities', 'Drug', 'BuyGroceries', 'Movie', 'Snack', 'Fruit', 'ClothesShoesBags', 'SkinMakeup', 'Salary');

-- CreateTable
CREATE TABLE "ledger" (
    "id" TEXT NOT NULL,
    "create_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "balance" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "io" BOOLEAN NOT NULL,
    "type" "LedgerType" NOT NULL,

    CONSTRAINT "ledger_pkey" PRIMARY KEY ("id")
);
