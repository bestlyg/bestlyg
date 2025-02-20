-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LedgerType" ADD VALUE 'FamilyWallet';
ALTER TYPE "LedgerType" ADD VALUE 'BreakfastWallet';
ALTER TYPE "LedgerType" ADD VALUE 'LunchWallet';
ALTER TYPE "LedgerType" ADD VALUE 'DinnerWallet';
ALTER TYPE "LedgerType" ADD VALUE 'TravelWallet';

-- AlterTable
ALTER TABLE "ledger" ADD COLUMN     "bank" TEXT,
ADD COLUMN     "from" TEXT;
