-- AlterTable
ALTER TABLE `Products` MODIFY `status` ENUM('AVAILABLE', 'DISABLE') NOT NULL DEFAULT 'AVAILABLE';
