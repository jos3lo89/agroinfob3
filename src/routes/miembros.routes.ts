import { Router } from "express";
import { Validator } from "../middlewares/validator.middleware";
import { MiembrosMiddleware } from "../middlewares/miembros.middleware";
import { MiembrosSchemas } from "../schemas/miembros.schema";
import { MiembrosController } from "../controllers/miembros.controller";

const router = Router();

// POST registrar
router.post(
  "/registrar",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  MiembrosMiddleware.schemaValidation(
    MiembrosSchemas.miembrosRegistrarSchema()
  ),
  MiembrosController.registrar
);

// GET Listar miembros
router.get(
  "/listar",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  MiembrosController.listar
);

// GET listar pdf
router.get(
  "/listar-pdf",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  MiembrosController.listarPdf
  // madar al usuario mediente uotra ruta que made el link completo url server + ruta
);

// eliminar miembros
router.delete(
  "/eliminar/:id",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  MiembrosController.eliminar
);
export default router;
