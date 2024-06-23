/*
  Warnings:

  - Added the required column `dni` to the `MiembrosAsociacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `miembrosasociacion` ADD COLUMN `dni` BIGINT NOT NULL;
