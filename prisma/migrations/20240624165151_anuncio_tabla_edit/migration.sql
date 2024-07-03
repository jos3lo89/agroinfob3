-- AlterTable
ALTER TABLE `anuncios` ADD COLUMN `estado` ENUM('publico', 'privado') NOT NULL DEFAULT 'publico';
