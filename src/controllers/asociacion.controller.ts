import { Request, Response } from "express";
import { config } from "../config/config";
import { AsociacionModel } from "../models/asociacion.model";
import * as fs from "node:fs/promises";

export class AsociacionController {
  public static async buscarAsocById(id: string) {
    try {
      return await AsociacionModel.buscarAsocIdAdmin(id);
    } catch (error: any) {
      return false;
    }
  }

  public static async asignarRol(id: string) {
    try {
      return await AsociacionModel.asignarRol(id);
    } catch (error: any) {
      return false;
    }
  }

  public static async registrar(req: Request, res: Response) {
    try {
      const { admin_id, nombre, descripcion, correo, numero } = req.body;

      const asocFound = await AsociacionModel.buscarByCorreo(correo);

      if (asocFound) {
        throw new Error("El correo ya está asociado a otra asociación");
      }

      if (!req.file) throw new Error("No se ha encontrado el archivo");

      const newAsoc = await AsociacionModel.registrar({
        admin_id,
        nombre,
        descripcion,
        correo,
        foto: `/uploads/${req.file.filename}`,
        numero,
      });

      res.status(201).json({
        id: newAsoc.newAsoc.id,
        admin_id: newAsoc.newAsoc.admin_id,
        nombre: newAsoc.newAsoc.nombre,
        descripcion: newAsoc.newAsoc.descripcion,
        correo: newAsoc.newAsoc.correo,
        foto: newAsoc.newAsoc.foto
          ? `${config.serverUrl}${newAsoc.newAsoc.foto}`
          : newAsoc.newAsoc.foto,
        foto_id: newAsoc.newAsoc.foto_id,
        fecha_creacion: newAsoc.newAsoc.fecha_creacion,
        fecha_actualizacion: newAsoc.newAsoc.fecha_actualizacion,
        telefonos: newAsoc.newNumber,
      });
    } catch (error: any) {
      console.log(error.message);
      if (req.file) {
        await fs.unlink(`./public/uploads/${req.file.filename}`);
      }
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async buscarAsocByNombre(req: Request, res: Response) {
    try {
      const { nombre } = req.params;

      const asocFound = await AsociacionModel.buscarBynombre(nombre);

      if (!asocFound) {
        throw new Error("No se ha encontrado la asociación");
      }

      return res.status(200).json({
        id: asocFound.id,
        admin_id: asocFound.admin_id,
        nombre: asocFound.nombre,
        descripcion: asocFound.descripcion,
        correo: asocFound.correo,
        foto: asocFound.foto
          ? `${config.serverUrl}${asocFound.foto}`
          : asocFound.foto,
        foto_id: asocFound.foto_id,
        fecha_creacion: asocFound.fecha_creacion,
        fecha_actualizacion: asocFound.fecha_actualizacion,
        telefonos: asocFound.telefonos,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async buscarAsocAdmin(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No tienes autenticación");

      const asocFound = await AsociacionModel.buscarByAdminId(req.user.id);

      if (!asocFound) {
        throw new Error("No se ha encontrado la asociación");
      }

      return res.status(200).json({
        id: asocFound.id,
        admin_id: asocFound.admin_id,
        nombre: asocFound.nombre,
        descripcion: asocFound.descripcion,
        correo: asocFound.correo,
        foto: asocFound.foto
          ? `${config.serverUrl}${asocFound.foto}`
          : asocFound.foto,
        foto_id: asocFound.foto_id,
        fecha_creacion: asocFound.fecha_creacion,
        fecha_actualizacion: asocFound.fecha_actualizacion,
        telefonos: asocFound.telefonos,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async listarAsoc(req: Request, res: Response) {
    try {
      const asocs = await AsociacionModel.listarAsoc();

      if (!asocs) {
        throw new Error("No se ha encontrado la asociación");
      }

      return res.status(200).json(asocs);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async eliminarAsoc(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const asocDeleted = await AsociacionModel.eliminarAsoc(id);

      if (!asocDeleted) {
        throw new Error("No se ha encontrado la asociación");
      }
      
      await fs.unlink(`./public${asocDeleted.foto}`);

      res.sendStatus(204);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
}
