import { Router } from "express";
import { Validator } from "../middlewares/validator.middleware";
import { AdminController } from "../controllers/admin.controller";

const router = Router();

router.delete(
  "/eliminar-usuario/:id",
  Validator.validateAuth,
  Validator.validateAdmin,
  AdminController.eliminarUsuario
);

export default router;
