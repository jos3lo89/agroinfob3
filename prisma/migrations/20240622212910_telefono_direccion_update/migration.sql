/*
  Warnings:

  - A unique constraint covering the columns `[usuario_id]` on the table `DireccionesUsuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuario_id]` on the table `TelefonosUsuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DireccionesUsuario_usuario_id_key` ON `DireccionesUsuario`(`usuario_id`);

-- CreateIndex
CREATE UNIQUE INDEX `TelefonosUsuario_usuario_id_key` ON `TelefonosUsuario`(`usuario_id`);
