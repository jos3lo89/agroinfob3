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
  "/listar/:asoc_id",
  Validator.validateAuth,
  Validator.adminAsocValidator,
  MiembrosController.listar
);

export default router;
