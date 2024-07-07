/*
  Warnings:

  - You are about to drop the column `fecha` on the `reuniones` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `reuniones` table. All the data in the column will be lost.
  - Added the required column `fecha_hora` to the `Reuniones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reuniones` DROP COLUMN `fecha`,
    DROP COLUMN `hora`,
    ADD COLUMN `fecha_hora` DATETIME(3) NOT NULL;
