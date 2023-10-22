/*
  Warnings:

  - Made the column `orderedAt` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Orders` MODIFY `orderedAt` DATETIME(3) NOT NULL;
