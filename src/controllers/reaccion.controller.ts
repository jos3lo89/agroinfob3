import { Request, Response } from "express";
import { ReaccionModel } from "../models/reaccion.model";

export class ReaccionController {
  public static async registrar(req: Request, res: Response) {
    try {
      const { idpublicacion, tipo, iduser } = req.params;

      if (tipo !== "like" && tipo !== "dislike") {
        throw new Error("Faltan parametros");
      }

      console.log("wadafa");
      const newReaccion = await ReaccionModel.registrar(
        idpublicacion,
        tipo,
        iduser
      );

      res.status(200).json(newReaccion);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }
}
