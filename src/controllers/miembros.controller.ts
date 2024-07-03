import { Request, Response } from "express";
import { MiembrosModel } from "../models/miembros.model";
import PdfKit from "../utils/pdfkit";
import { format } from "date-fns";

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
      const { asoc_id } = req.params;

      const miembros = await MiembrosModel.listar(asoc_id);

      res.status(200).json(miembros);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async listarPdf(req: Request, res: Response) {
    try {
      const { asoc_id } = req.params;

      const miembros = await MiembrosModel.listarPdf(asoc_id);

      const columns = [
        "DNI",
        "Nombre",
        "Apellido",
        "Teléfono",
        "Fecha Inscripción",
      ];

      const formattedMiembros = miembros.map((miembro) => ({
        DNI: miembro.dni,
        Nombre: miembro.nombre,
        Apellido: miembro.apellido,
        Teléfono: miembro.telefono,
        "Fecha Inscripción": miembro.fecha_inscripcion
          ? format(new Date(miembro.fecha_inscripcion), "dd/MM/yyyy")
          : "",
      }));
      const pdfKit = new PdfKit(columns, formattedMiembros);

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

  public static async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await MiembrosModel.eliminar(id);

      res.sendStatus(200);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
}
