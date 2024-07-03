import { Request, Response } from "express";
import { AnunciosModel } from "../models/anuncios.model";
import * as fs from "fs/promises";

export class AnunciosController {
  public static async registrar(req: Request, res: Response) {
    try {
      const { asociacion_id, titulo, descripcion } = req.body;

      if (!req.file) {
        throw new Error("Foto requerido");
      }

      const newAnuncio = await AnunciosModel.registrar({
        asociacion_id,
        titulo,
        descripcion,
        foto: `/uploads/${req.file.filename}`,
      });

      res.status(201).json(newAnuncio);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async cambiarEstado(req: Request, res: Response) {
    try {
      const { id, estado } = req.params;

      if (estado !== "publico" && estado !== "privado") {
        throw new Error("Estado no valido");
      }

      const anuncioUpdated = await AnunciosModel.cambiarEstado({
        id,
        estado,
      });

      res.sendStatus(200);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async mostrarAnuncios(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const anuncio = id
        ? await AnunciosModel.mostrarAnunciosById(id)
        : await AnunciosModel.mostrarAnuncios();

      res.status(200).json(anuncio);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async listarByIdAsoc(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const anuncios = await AnunciosModel.listarAnunciosByIdAsoc(id);

      res.status(200).json(anuncios);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const anuncioDeleted = await AnunciosModel.eliminarAnuncio(id);

      if (anuncioDeleted) {
        await fs.unlink(`./public${anuncioDeleted.foto}`);
      }

      res.sendStatus(200);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }


}
