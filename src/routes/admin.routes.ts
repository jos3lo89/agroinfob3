import { Router } from "express";
import { Validator } from "../middlewares/validator.middleware";
import { AdminController } from "../controllers/admin.controller";

const router = Router();

router.get(
  "/lista-usuarios",
  Validator.validateAuth,
  Validator.validateAdmin,
  AdminController.listarUsuarios
);

router.delete(
  "/eliminar-usuario/:id",
  Validator.validateAuth,
  Validator.validateAdmin,
  AdminController.eliminarUsuario
);

export default router;
