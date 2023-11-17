/*
  Warnings:

  - Made the column `transferSlip` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Orders` MODIFY `transferSlip` VARCHAR(191) NOT NULL;
