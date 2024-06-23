/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `MiembrosAsociacion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `MiembrosAsociacion_dni_key` ON `MiembrosAsociacion`(`dni`);
