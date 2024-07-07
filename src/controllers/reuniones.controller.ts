import { Request, Response } from "express";
import { ReunionesModel } from "../models/reuniones.model";
import { log } from "node:console";
import PdfKit from "../utils/pdfkit";

export class ReunionesController {
  public static async registrar(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No tienes autenticación");
      const userId = req.user.id;
      const asocFound = await ReunionesModel.buscarIdAsocByIdAdminAsoc(userId);
      if (!asocFound) {
        throw new Error("No se ha encontrado la asociación");
      }

      const { titulo, descripcion, fecha_hora, lugar } = req.body;

      const newReunion = await ReunionesModel.registrar({
        asociacion_id: asocFound.id,
        titulo,
        descripcion,
        fecha_hora,
        lugar,
        estado: "proceso",
      });

      res.status(201).json(newReunion);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // // const reuDeleted = await ReunionesModel.eliminar(id);
      await ReunionesModel.eliminar(id);

      res.sendStatus(200);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async llamarListaReuniones(req: Request, res: Response) {
    try {
      const { iduser, estado } = req.params;

      // console.log("id user->",iduser)
      // console.log("id reu->",idreunion);

      if (estado !== "presente" && estado !== "falta") {
        throw new Error("Estado no valido");
      }

      await ReunionesModel.llamarListaReuniones(iduser, estado);

      res.sendStatus(200);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async listaReuniones(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No tienes autenticación");
      const userId = req.user.id;
      const asocFound = await ReunionesModel.buscarIdAsocByIdAdminAsoc(userId);
      if (!asocFound) {
        throw new Error("No se ha encontrado la asociación");
      }

      const reuniones = await ReunionesModel.listaReuniones(asocFound.id);
      res.status(200).json(reuniones);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async listarMiembrosReunion(req: Request, res: Response) {
    try {
      const { idreunion } = req.params;

      const miembros = await ReunionesModel.listarMiembrosReunion(idreunion);
      res.status(200).json(miembros);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }

  public static async listarPdf(req: Request, res: Response) {
    try {
      const { idreunion } = req.params;

      const miembros = await ReunionesModel.listarPdf(idreunion);

      // no tocar

      const columns = ["Nombre", "Apellido", "Dni", "Estado"];

      const formattedMiembros = miembros.map((miembro) => ({
        Nombre: miembro.miembro.nombre,
        Apellido: miembro.miembro.apellido,
        Dni: miembro.miembro.dni,
        Estado: miembro.estado,
      }));

      const pdfKit = new PdfKit(columns, formattedMiembros, "Lista de asistentes");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=miembros.pdf");
      pdfKit.buildpdf(
        (data: Buffer) => {
          res.write(data);
        },
        () => {
          res.end();
        }
      );
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: [error.message] });
    }
  }
}
