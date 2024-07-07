import { Request, Response } from "express";
import { AdminModel } from "../models/admin.model";
import * as fs from "fs/promises";

export class AdminController {
  public static async eliminarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userFound = await AdminModel.eliminarUsuario(id);

      if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (userFound.foto) {
        await fs.unlink(`./public${userFound.foto}`);
      }

      return res
        .status(200)
        .json({ message: ["Usuario eliminado correctamente"] });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async listarUsuarios(req: Request, res: Response) {
    try {
      const users = await AdminModel.listarUsuarios();
      return res.status(200).json(users);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
}
