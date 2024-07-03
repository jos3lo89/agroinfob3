import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import * as fs from "node:fs/promises";

export class AnunciosMiddleware {
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
}
