-- AlterTable
ALTER TABLE "Goals" ALTER COLUMN "amount_raised" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "category_name" DROP NOT NULL;
