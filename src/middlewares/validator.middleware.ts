import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import { Jwt } from "../utils/jwt";
import { Decoded } from "../interfaces/interfaces";
import * as fs from "node:fs/promises";

export class Validator {
  public static async validateAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.cookies.token;

      if (!token) {
        throw new Error("No se ha encontrado el token");
      }

      if (!config.jwtSecret) {
        throw new Error("No se ha configurado el secreto de JWT");
      }

      const decoded = Jwt.verifyToken(token) as Decoded;

      req.user = decoded;
      next();
    } catch (error: any) {
      console.log(error.message);
      return res.status(401).json({ message: [error.message] });
    }
  }

  public static async validateAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) throw new Error("No tienes autenticación");

      if (req.user.rol !== "admin") throw new Error("No tienes permisos");

      next();
    } catch (error: any) {
      console.log(error.message);
      return res.status(401).json({ message: [error.message] });
    }
  }

  public static async adminAsocValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) throw new Error("No tienes autenticación");

      if (req.user.rol !== "admin_asoc") throw new Error("No tienes permisos");

      next();
    } catch (error: any) {
      console.log(error.message);
      return res.status(401).json({ message: [error.message] });
    }
  }
}

export class FilesValidator {
  public static async validateFile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const file = req.file;
      if (!file) {
        throw new Error("No se ha encontrado el archivo");
      }

      if (!file.mimetype.match(/jpeg|jpg|png|webp/)) {
        await fs.unlink(`./public/uploads/${file.filename}`);
        throw new Error(
          "Sólo se permiten imágenes de tipo jpeg, jpg, png y webp."
        );
      }

      next();
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
}
