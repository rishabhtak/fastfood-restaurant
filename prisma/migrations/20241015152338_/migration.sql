/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the `Addon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Addon" DROP CONSTRAINT "Addon_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_inventoryId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "categoryId",
ADD COLUMN     "addons" JSONB[],
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "variants" JSONB[];

-- DropTable
DROP TABLE "Addon";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Variant";
