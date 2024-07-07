/*
  Warnings:

  - Added the required column `estado` to the `Reuniones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reuniones` ADD COLUMN `estado` ENUM('proceso', 'culminado') NOT NULL;
