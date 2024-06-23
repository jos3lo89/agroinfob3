import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import * as fs from "node:fs/promises";
import { AsociacionController } from "../controllers/asociacion.controller";

export class AsociacionMiddleware {
  public static schemaValidation =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = Object.assign({}, req.body);
        schema.parse(body);
        next();
      } catch (error: any) {
        if (error instanceof ZodError) {
          if (req.file) {
            await fs.unlink(`./public/uploads/${req.file.filename}`);
          }
          return res
            .status(400)
            .json({ message: error.errors.map((e: any) => e.message) });
        }
      }
    };

  public static async validarOneAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { admin_id } = req.body;
      if (!admin_id) {
        throw new Error("No se ha encontrado el admin id");
      }

      const asocFound = await AsociacionController.buscarAsocById(admin_id);

      if (!asocFound) {
        const rolAdmin = await AsociacionController.asignarRol(admin_id);
        if (!rolAdmin) {
          throw new Error(
            "Asociación no registrada el usuario no existe"
          );
        }
        next();
      } else {
        throw new Error("El usuario ya administra una asociacion");
      }
    } catch (error: any) {
      if (req.file) {
        await fs.unlink(`./public/uploads/${req.file.filename}`);
      }
      return res.status(400).json({ message: [error.message] });
    }
  }
}
