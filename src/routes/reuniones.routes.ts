import { Router } from "express";
import { Validator } from "../middlewares/validator.middleware";
import { ReunionesController } from "../controllers/reuniones.controller";
import { ReunionMiddleware } from "../middlewares/reuniones.middleware";
import { ReunionSchemas } from "../schemas/reuniones.schema";

const router = Router();

// POST registrar
router.post(
  "/registrar",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  ReunionMiddleware.schemaValidation(ReunionSchemas.reunionRegistroSchema()),
  ReunionesController.registrar
);

// DELETE eliminar
router.delete(
  "/eliminar/:id",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  ReunionesController.eliminar
);

// GET lista de reuniones
router.get(
  "/lista-reuniones",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  ReunionesController.listaReuniones
);

// GEt lista de miembros por reunion
router.get(
  "/lista-miembros-reunion/:idreunion",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  ReunionesController.listarMiembrosReunion
);

// GET listar pdf
router.get(
  "/listar-pdf/:idreunion",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  ReunionesController.listarPdf
);

/* **************************************** LLAMAR LISTA REUNIONES **************************************** */
router.put(
  "/llamar-lista/:iduser/:estado",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  ReunionesController.llamarListaReuniones
);

export default router;
