import { Router } from "express";
import { ReaccionController } from "../controllers/reaccion.controller";

const router = Router();

router.post(
  "/idpublicacion/:idpublicacion/iduser/:iduser/tipo/:tipo",
  ReaccionController.registrar
);

export default router;
