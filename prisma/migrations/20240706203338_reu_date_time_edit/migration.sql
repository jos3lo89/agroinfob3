/*
  Warnings:

  - You are about to alter the column `fecha_hora` on the `reuniones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `reuniones` MODIFY `fecha_hora` DATETIME NOT NULL;
