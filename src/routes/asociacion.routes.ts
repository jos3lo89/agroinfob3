import { Router } from "express";
import { FilesValidator, Validator } from "../middlewares/validator.middleware";
import { MulterMiddleware } from "../middlewares/multer.middleware";
import { AsociacionMiddleware } from "../middlewares/asociacion.middleware";
import { AsociacionSchemas } from "../schemas/asociacion.schema";
import { AsociacionController } from "../controllers/asociacion.controller";

const router = Router();

// POST registrar
router.post(
  "/registrar",
  Validator.validateAuth,
  Validator.validateAdmin,
  MulterMiddleware.uploadSingle("foto"),
  FilesValidator.validateFile,
  AsociacionMiddleware.schemaValidation(
    AsociacionSchemas.asociacionRegistrarSchema()
  ),
  AsociacionMiddleware.validarOneAdmin,
  AsociacionController.registrar
);

// GET datos mediante el nombre de la asociacion
router.get("/datos/:nombre", AsociacionController.buscarAsocByNombre);

// GET datos mediante en admin asociacion
router.get(
  "/datos-admin",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  AsociacionController.buscarAsocAdmin
);

// GET Lista de asociaciones
router.get("/lista", AsociacionController.listarAsoc);

// DELETE eliminar
router.delete(
  "/eliminar/:id",
  Validator.validateAuth,
  Validator.validateAdmin,
  AsociacionController.eliminarAsoc
);

// registrar publicacion
router.post(
  "/registrar-publicacion",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  MulterMiddleware.uploadMultiple(["imagen_uno", "imagen_dos"]),
  FilesValidator.validateMultiFiles,
  AsociacionMiddleware.schemaValidation(
    AsociacionSchemas.publicacionesSchema()
  ),
  AsociacionController.registrarPublicacion
);

// eliminar publicacion
router.delete(
  "/eliminar-publicacion/:id",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  AsociacionController.eliminarPublicacion
);

// cambiar estado de publicacion
router.put(
  "/cambiar-estado-publicacion/:id/:estado",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  AsociacionController.cambiarEstadoPublicacion
);
export default router;
