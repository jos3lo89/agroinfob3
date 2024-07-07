import prisma from "../config/database";
import { ReunionRegistroI } from "../interfaces/interfaces";

export class ReunionesModel {
  public static async buscarIdAsocByIdAdminAsoc(id: string) {
    try {
      const asocFound = await prisma.asociaciones.findFirst({
        where: {
          admin_id: id,
        },
      });
      return asocFound;
    } catch (error: any) {
      throw new Error("No se pudo buscar el miembro");
    }
  }

  public static async registrar(data: ReunionRegistroI) {
    try {
      const [fecha, hora] = data.fecha_hora.split(" ");
      const [mes, dia, anio] = fecha.split("/");
      const [horas, minutos] = hora.split(":");

      const newReunion = await prisma.reuniones.create({
        data: {
          asociacion_id: data.asociacion_id,
          titulo: data.titulo,
          descripcion: data.descripcion,
          fecha_hora: new Date(
            parseInt(anio),
            parseInt(mes),
            parseInt(dia),
            parseInt(horas),
            parseInt(minutos)
          ),
          lugar: data.lugar,
          estado: data.estado,
        },
      });

      /*        console.log(new Date(newReunion.fecha_hora).getFullYear());
       console.log(new Date(newReunion.fecha_hora).getMonth());
       console.log(new Date(newReunion.fecha_hora).getDate());
       console.log(new Date(newReunion.fecha_hora).getHours());
       console.log(new Date(newReunion.fecha_hora).getMinutes()); */

      console.log(new Date(newReunion.fecha_hora).toLocaleString("es-ES"));

      // agregar a todos los miembros de la asociación a la lista de asistentes como presente START
      const miembrosAsociacion = await prisma.miembrosAsociacion.findMany({
        where: {
          estado: "activo",
          asociacion_id: data.asociacion_id,
        },
      });

      for (const miembro of miembrosAsociacion) {
        const newAsistemcia = await prisma.asistencias.create({
          data: {
            reunion_id: newReunion.id,
            miembro_id: miembro.id,
            estado: "presente",
          },
        });
        console.log(newAsistemcia);
      }

      // agregar a todos los miembros de la asociación a la lista de asistentes como presente END

      return newReunion;
    } catch (error: any) {
      throw new Error("No se pudo registrar la reunion");
    }
  }

  public static async eliminar(id: string) {
    try {
      const deleted = await prisma.reuniones.delete({
        where: {
          id,
        },
      });

      return deleted;
    } catch (error: any) {
      throw new Error("No se pudo eliminar la reunión");
    }
  }

  public static async llamarListaReuniones(
    iduser: string,
    estado: "presente" | "falta"
  ) {
    try {
      const newAsistencia = await prisma.asistencias.update({
        where: {
          id: iduser,
        },
        data: {
          estado: estado,
        },
      });

      return newAsistencia;
    } catch (error: any) {
      throw new Error("No se pudo registrar la asistencia");
    }
  }

  public static async listaReuniones(id: string) {
    try {
      const reuniones = await prisma.reuniones.findMany({
        where: {
          asociacion_id: id,
        },
      });
      return reuniones;
    } catch (error: any) {
      throw new Error("No se pudo obtener la lista de reuniones");
    }
  }

  public static async listarMiembrosReunion(idreunion: string) {
    try {
      const miembros = await prisma.asistencias.findMany({
        where: {
          reunion_id: idreunion,
        },
        include: {
          miembro: true,
        },
      });
      return miembros;
    } catch (error: any) {
      throw new Error("No se pudo obtener la lista de miembros de la reunion");
    }
  }

  public static async listarPdf(id: string) {
    try {
      const reuniones = await prisma.asistencias.findMany({
        where: {
          reunion_id: id,
        },
        include: {
          miembro: true,
        }
      })
      return reuniones;
    } catch (error: any) {
      throw new Error("No se pudo obtener la lista de miembros de la reunion");
    }
  }
}
