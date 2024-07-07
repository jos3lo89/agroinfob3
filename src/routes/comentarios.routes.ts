import { Router } from "express";
import { Validator } from "../middlewares/validator.middleware";
import { ComentariosController } from "../controllers/comentarios.controller";

const router = Router();

router.post(
  "/lv1/:publicacion_id/:comentario",
  Validator.validateAuth,
  ComentariosController.registrarComentarioLv1
);

router.post(
  "/lv2/:publicacion_id/:idpadre/:comentario",
  Validator.validateAuth,
  ComentariosController.registrarComentarioLv2
);

router.post(
  "/lv3/:publicacion_id/:idpadre/:comentario",
  Validator.validateAuth,
  ComentariosController.registrarComentarioLv3
);

router.post("/borrar");

router.get(
  "/listar/:idpublicacion",
  ComentariosController.lsitarComentariosTodos
);

// todos comentarios

// router.get("/listar-all", ComentariosController.lsitarComentariosTodos);

export default router;
