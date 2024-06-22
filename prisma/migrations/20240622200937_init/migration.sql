-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `clave` VARCHAR(90) NOT NULL,
    `rol` ENUM('publico', 'admin_asoc', 'admin') NOT NULL DEFAULT 'publico',
    `foto` VARCHAR(100) NOT NULL,
    `foto_id` CHAR(200) NULL,
    `fecha_nacimiento` DATE NULL,
    `genero` ENUM('masculino', 'femenino', 'otro') NULL,
    `estado` ENUM('activo', 'inactivo', 'suspendido') NOT NULL DEFAULT 'activo',
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_correo_key`(`correo`),
    INDEX `correo_id_user`(`correo`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelefonosUsuario` (
    `id` VARCHAR(191) NOT NULL,
    `usuario_id` CHAR(36) NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `telefonos_usuarios_numero`(`usuario_id`, `numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DireccionesUsuario` (
    `id` VARCHAR(191) NOT NULL,
    `usuario_id` CHAR(36) NOT NULL,
    `direccion` VARCHAR(150) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `direcciones_usuarios_direccion`(`usuario_id`, `direccion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asociaciones` (
    `id` VARCHAR(191) NOT NULL,
    `admin_id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(100) NOT NULL,
    `foto_id` CHAR(200) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Asociaciones_admin_id_key`(`admin_id`),
    UNIQUE INDEX `Asociaciones_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelefonosAsociacion` (
    `id` VARCHAR(191) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `telefonos_asociacion_numero`(`asociacion_id`, `numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DireccionesAsociacion` (
    `id` VARCHAR(191) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `direccion` VARCHAR(150) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `direcciones_asociacion_direccion`(`asociacion_id`, `direccion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RedSocialAsociaciones` (
    `id` VARCHAR(191) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `tipo` ENUM('facebook', 'x', 'instagram', 'website', 'whatsapp') NOT NULL,
    `url` VARCHAR(100) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RedSocialAsociaciones_asociacion_id_key`(`asociacion_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publicaciones` (
    `id` VARCHAR(191) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `titulo` VARCHAR(100) NULL,
    `texto_uno` TEXT NULL,
    `texto_dos` TEXT NULL,
    `imagen_uno` VARCHAR(100) NULL,
    `imagen_dos` VARCHAR(100) NULL,
    `imagen_uno_id` CHAR(200) NULL,
    `imagen_dos_id` CHAR(200) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anuncios` (
    `id` VARCHAR(191) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `titulo` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `foto` VARCHAR(100) NULL,
    `foto_id` CHAR(200) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MiembrosAsociacion` (
    `id` VARCHAR(191) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(100) NULL,
    `fecha_nacimiento` DATE NULL,
    `genero` ENUM('masculino', 'femenino', 'otro') NULL,
    `telefono` VARCHAR(20) NULL,
    `direccion` VARCHAR(150) NULL,
    `fecha_inscripcion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('activo', 'inactivo', 'suspendido') NOT NULL DEFAULT 'activo',
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reuniones` (
    `id` VARCHAR(191) NOT NULL,
    `asociacion_id` CHAR(36) NOT NULL,
    `titulo` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `fecha` DATE NOT NULL,
    `hora` TIME NOT NULL,
    `lugar` VARCHAR(100) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencias` (
    `id` VARCHAR(191) NOT NULL,
    `reunion_id` CHAR(36) NOT NULL,
    `miembro_id` CHAR(36) NOT NULL,
    `estado` ENUM('presente', 'falta') NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comentarios` (
    `id` VARCHAR(191) NOT NULL,
    `publicacion_id` CHAR(36) NOT NULL,
    `usuario_id` CHAR(36) NOT NULL,
    `comentario` TEXT NOT NULL,
    `nivel` ENUM('primario', 'secundario', 'terciario') NOT NULL,
    `padre` CHAR(36) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `comentarios_usuario_id_padre_nivel`(`id`, `usuario_id`, `padre`, `nivel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReaccionesPublicaciones` (
    `id` VARCHAR(191) NOT NULL,
    `publicacion_id` CHAR(36) NOT NULL,
    `usuario_id` CHAR(36) NOT NULL,
    `tipo` ENUM('like', 'dislike') NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `validacion_publicaciones_usuario_id_tipo`(`id`, `usuario_id`, `tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TelefonosUsuario` ADD CONSTRAINT `TelefonosUsuario_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DireccionesUsuario` ADD CONSTRAINT `DireccionesUsuario_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asociaciones` ADD CONSTRAINT `Asociaciones_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TelefonosAsociacion` ADD CONSTRAINT `TelefonosAsociacion_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DireccionesAsociacion` ADD CONSTRAINT `DireccionesAsociacion_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RedSocialAsociaciones` ADD CONSTRAINT `RedSocialAsociaciones_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicaciones` ADD CONSTRAINT `Publicaciones_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anuncios` ADD CONSTRAINT `Anuncios_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MiembrosAsociacion` ADD CONSTRAINT `MiembrosAsociacion_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reuniones` ADD CONSTRAINT `Reuniones_asociacion_id_fkey` FOREIGN KEY (`asociacion_id`) REFERENCES `Asociaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencias` ADD CONSTRAINT `Asistencias_reunion_id_fkey` FOREIGN KEY (`reunion_id`) REFERENCES `Reuniones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencias` ADD CONSTRAINT `Asistencias_miembro_id_fkey` FOREIGN KEY (`miembro_id`) REFERENCES `MiembrosAsociacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentarios` ADD CONSTRAINT `Comentarios_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentarios` ADD CONSTRAINT `Comentarios_publicacion_id_fkey` FOREIGN KEY (`publicacion_id`) REFERENCES `Publicaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentarios` ADD CONSTRAINT `Comentarios_padre_fkey` FOREIGN KEY (`padre`) REFERENCES `Comentarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReaccionesPublicaciones` ADD CONSTRAINT `ReaccionesPublicaciones_publicacion_id_fkey` FOREIGN KEY (`publicacion_id`) REFERENCES `Publicaciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReaccionesPublicaciones` ADD CONSTRAINT `ReaccionesPublicaciones_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
