/*
  Warnings:

  - Added the required column `status` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Made the column `mobile` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Products` ADD COLUMN `status` ENUM('AVAILABLE', 'DISABLE') NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `mobile` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;
