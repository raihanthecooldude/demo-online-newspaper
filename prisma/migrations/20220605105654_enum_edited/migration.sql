/*
  Warnings:

  - The values [Active] on the enum `Editor_activeStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `editor` MODIFY `activeStatus` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE';
