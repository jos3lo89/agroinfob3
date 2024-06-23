-- AlterTable
ALTER TABLE `publicaciones` ADD COLUMN `estado` ENUM('publico', 'privado') NOT NULL DEFAULT 'publico';
