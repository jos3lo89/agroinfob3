/*
  Warnings:

  - Made the column `fecha_nacimiento` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuarios` MODIFY `fecha_nacimiento` DATE NOT NULL;
