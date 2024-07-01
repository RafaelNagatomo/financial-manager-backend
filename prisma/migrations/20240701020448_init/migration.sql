/*
  Warnings:

  - The primary key for the `Categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Categories` table. All the data in the column will be lost.
  - The `id` column on the `Categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Goals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Goals` table. All the data in the column will be lost.
  - The `id` column on the `Goals` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `category_id` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_category_id_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_pkey",
DROP COLUMN "created_at",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "max_amount" DROP NOT NULL,
ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Goals" DROP CONSTRAINT "Goals_pkey",
DROP COLUMN "created_at",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "goal_description" DROP NOT NULL,
ALTER COLUMN "goal_image" DROP NOT NULL,
ALTER COLUMN "goal_date" DROP NOT NULL,
ADD CONSTRAINT "Goals_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "category_id",
DROP COLUMN "created_at",
ADD COLUMN     "category_name" TEXT,
ALTER COLUMN "transaction_tag" DROP NOT NULL,
ALTER COLUMN "expiration_date" DROP NOT NULL,
ALTER COLUMN "paid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
