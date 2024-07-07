import { Router } from "express";
import { FilesValidator, Validator } from "../middlewares/validator.middleware";
import { AnunciosMiddleware } from "../middlewares/anuncios.middleware";
import { AnunciosSchemas } from "../schemas/anuncios.schema";
import { MulterMiddleware } from "../middlewares/multer.middleware";
import { AnunciosController } from "../controllers/anuncios.controller";

const router = Router();

// POST - registrar anuncio
router.post(
  "/registrar",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  MulterMiddleware.uploadSingle("foto"),
  FilesValidator.validateFile, // -> bien hasta aqui
  AnunciosMiddleware.schemaValidation(AnunciosSchemas.anuncioRegistroSchema()),
  AnunciosController.registrar
);

// GET - listar anuncios
router.get("/mostrar", AnunciosController.mostrarAnuncios);
router.get("/mostrar/:id", AnunciosController.mostrarAnuncios);

// GET - listar anuncio por asociación id
router.get("/listar-asoc/:id", AnunciosController.listarByIdAsoc);

// GET - listar anuncio por nombre de asociacion
router.get(
  "/listar-asoc-nombre/:nombre",
  AnunciosController.listarByNombreAsoc
);

// DELETE - eliminar un anuncio mediante el ID
router.delete(
  "/eliminar/:id",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  AnunciosController.eliminar
);

// PUT - cambiar estado del anuncio publico o privado
router.put(
  "/cambiar-estado/:id/:estado",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  AnunciosController.cambiarEstado
);

// PUT - actualizar los datos de un anuncio mediante el ID
router.put("/eliminar/:id");

router.get(
  "/listar-anuncios-asoc-admin",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  AnunciosController.listarAnunciosAsoc
);

export default router;
