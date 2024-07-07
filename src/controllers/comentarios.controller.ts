import { Request, Response } from "express";
import { ComentariosModel } from "../models/comentarios.model";

export class ComentariosController {
  public static async registrarComentarioLv1(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No tienes autenticación");
      const userId = req.user.id;
      const { comentario, publicacion_id } = req.params;

      const newComentario = await ComentariosModel.registrarComentarioLv1({
        userId,
        comentario,
        publicacion_id,
        idpadre: null,
      });

      res.status(201).json(newComentario);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async registrarComentarioLv2(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No tienes autenticación");
      const userId = req.user.id;
      const { comentario, publicacion_id, idpadre } = req.params;

      const newComentario = await ComentariosModel.registrarComentarioLv2({
        userId,
        comentario,
        publicacion_id,
        idpadre,
      });

      res.status(201).json(newComentario);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
  public static async registrarComentarioLv3(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No tienes autenticación");
      const userId = req.user.id;
      const { comentario, publicacion_id, idpadre } = req.params;

      const newComentario = await ComentariosModel.registrarComentarioLv3({
        userId,
        comentario,
        publicacion_id,
        idpadre,
      });

      res.status(201).json(newComentario);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async lsitarComentariosTodos(req: Request, res: Response) {
    try {
      const { idpublicacion } = req.params;

      const comentarios = await ComentariosModel.listarComentariosTodos(
        idpublicacion
      );
      res.status(200).json(comentarios);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
}
