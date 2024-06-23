import { Request, Response } from "express";
import { MiembrosModel } from "../models/miembros.model";

export class MiembrosController {
  public static async registrar(req: Request, res: Response) {
    try {
      const {
        asociacion_id,
        nombre,
        apellido,
        correo,
        fecha_nacimiento,
        genero,
        telefono,
        direccion,
        dni,
      } = req.body;

      const newMiembro = await MiembrosModel.registrar({
        asociacion_id,
        nombre,
        apellido,
        correo,
        fecha_nacimiento,
        genero,
        telefono,
        direccion,
        dni,
      });

      res.status(200).json(newMiembro);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }


  public static async listar(req: Request, res: Response) {
    try {

      const {asoc_id} = req.params;

      const miembros = await MiembrosModel.listar(asoc_id);

      res.status(200).json(miembros);
      
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
      
    }
  }
}
