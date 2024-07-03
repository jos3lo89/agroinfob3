/*
  Warnings:

  - A unique constraint covering the columns `[publicacion_id,usuario_id]` on the table `ReaccionesPublicaciones` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ReaccionesPublicaciones_publicacion_id_usuario_id_key` ON `ReaccionesPublicaciones`(`publicacion_id`, `usuario_id`);
