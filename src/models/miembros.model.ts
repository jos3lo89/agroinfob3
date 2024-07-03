import prisma from "../config/database";
import { MiembroRegistroI } from "../interfaces/interfaces";

export class MiembrosModel {
  public static async registrar(data: MiembroRegistroI) {
    try {
      const miembroFound = await prisma.miembrosAsociacion.findFirst({
        where: {
          OR: [
            {
              dni: data.dni,
            },
            {
              correo: data.correo,
            },
          ],
        },
      });

      if (miembroFound) {
        throw new Error("El dni o el correo ya existe");
      }

      const newMiembro = await prisma.miembrosAsociacion.create({
        data: {
          asociacion_id: data.asociacion_id,
          dni: data.dni,
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          fecha_nacimiento: data.fecha_nacimiento
            ? new Date(data.fecha_nacimiento)
            : null,
          genero: data.genero,
          telefono: data.telefono,
          direccion: data.direccion,
        },
      });

      if (!newMiembro) {
        throw new Error("No se ha registrado el miembro");
      }

      return newMiembro;
    } catch (error: any) {
      throw error;
    }
  }

  public static async listar(asoc_id: string) {
    try {
      const list = await prisma.miembrosAsociacion.findMany({
        where: {
          asociacion_id: asoc_id,
        },
      });

      return list;
    } catch (error: any) {
      throw new Error("No se pudo listar los miembros");
    }
  }

  public static async listarPdf(asoc_id: string) {
    try {
      const list = await prisma.miembrosAsociacion.findMany({
        where: {
          asociacion_id: asoc_id,
        },
      });

      return list;
    } catch (error: any) {
      throw new Error("No se pudo listar los miembros");
    }
  }

  public static async eliminar(id: string) {
    try {
      const miembroDeleted = await prisma.miembrosAsociacion.delete({
        where: {
          id,
        },
      });

      return miembroDeleted;
    } catch (error: any) {
      throw new Error("No se pudo eliminar el miembro");
    }
  }
}
