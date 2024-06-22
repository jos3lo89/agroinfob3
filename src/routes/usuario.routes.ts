import { Router } from "express";
import { UsuarioMiddleware } from "../middlewares/usuario.middleware";
import { UsuarioSchemas } from "../schemas/usuario.schema";
import { UsuarioController } from "../controllers/usuario.controller";
import { FilesValidator, Validator } from "../middlewares/validator.middleware";
import { MulterMiddleware } from "../middlewares/multer.middleware";

const router = Router();

// POST registrar
router.post(
  "/registrar",
  UsuarioMiddleware.schemaValidation(UsuarioSchemas.usuarioRegistroSchema()),
  UsuarioController.registrar
);

// POST login
router.post(
  "/login",
  UsuarioMiddleware.schemaValidation(UsuarioSchemas.usuarioLoginSchema()),
  UsuarioController.login
);

// POST logout
router.post("/logout", Validator.validateAuth, UsuarioController.logout);

// GET datos
router.get("/datos", Validator.validateAuth, UsuarioController.datosUsuario);

// PUT actualizar datos
router.put(
  "/actualizar-datos",
  Validator.validateAuth,
  UsuarioMiddleware.schemaValidation(
    UsuarioSchemas.usuarioActualizarDatosSchema()
  ),
  UsuarioController.actualizarDatosUsuario
);

// PUT actualizar clave
router.put(
  "/actualizar-clave",
  Validator.validateAuth,
  UsuarioMiddleware.schemaValidation(
    UsuarioSchemas.usuarioActualizarClaveSchema()
  ),
  UsuarioController.actualizarClave
);

// POST agregar foto de usuario
router.post(
  "/agregar-foto",
  Validator.validateAuth,
  MulterMiddleware.uploadSingle("foto"),
  FilesValidator.validateFile,
  UsuarioController.agregarFoto
);

// DELETE eliminar foto de usuario
router.delete(
  "/eliminar-foto",
  Validator.validateAuth,
  UsuarioController.eliminarFoto
);

// PUT actualizar foto de usuario
router.put(
  "/actualizar-foto",
  Validator.validateAuth,
  MulterMiddleware.uploadSingle("foto"),
  FilesValidator.validateFile,
  UsuarioController.actualizarFoto
);

// DELETE eliminar usuario
router.delete(
  "/eliminar",
  Validator.validateAuth,
  UsuarioController.eleminarUsuario
);

// // POST agregar telefono de usuario
// router.post("/usuario/agregar-telefono");

export default router;
