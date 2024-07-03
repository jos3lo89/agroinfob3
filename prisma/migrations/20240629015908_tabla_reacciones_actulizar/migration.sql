/*
  Warnings:

  - A unique constraint covering the columns `[usuario_id]` on the table `ReaccionesPublicaciones` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ReaccionesPublicaciones_usuario_id_key` ON `ReaccionesPublicaciones`(`usuario_id`);
