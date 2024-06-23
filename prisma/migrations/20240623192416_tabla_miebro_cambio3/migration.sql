/*
  Warnings:

  - You are about to alter the column `dni` on the `miembrosasociacion` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `miembrosasociacion` MODIFY `dni` INTEGER NOT NULL;
