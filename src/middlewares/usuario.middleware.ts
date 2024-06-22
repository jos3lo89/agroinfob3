import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export class UsuarioMiddleware {
  public static schemaValidation =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res
            .status(400)
            .json({ message: error.errors.map((e: any) => e.message) });
        }
      }
    };
}
