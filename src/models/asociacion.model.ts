import prisma from "../config/database";
import { AsociacionRegistroI } from "../interfaces/interfaces";

export class AsociacionModel {
  public static async buscarAsocIdAdmin(id: string) {
    try {
      const asocFound = await prisma.asociaciones.findFirst({
        where: {
          admin_id: id,
        },
      });

      return asocFound;
    } catch (error: any) {
      throw error;
    }
  }

  public static async asignarRol(id: string) {
    try {
      const userUpdate = await prisma.usuarios.update({
        where: {
          id,
        },
        data: {
          rol: "admin_asoc",
        },
      });

      return userUpdate;
    } catch (error: any) {
      throw error;
    }
  }

  public static async buscarByCorreo(correo: string) {
    try {
      const asocFound = await prisma.asociaciones.findFirst({
        where: {
          correo: correo,
        },
      });

      return asocFound;
    } catch (error: any) {
      throw error;
    }
  }

  public static async registrar(data: AsociacionRegistroI) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const newAsoc = await prisma.asociaciones.create({
          data: {
            admin_id: data.admin_id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            correo: data.correo,
            foto: data.foto,
          },
        });

        const newNumber = await prisma.telefonosAsociacion.create({
          data: {
            asociacion_id: newAsoc.id,
            numero: data.numero,
          },
        });

        return { newAsoc, newNumber };
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public static async buscarBynombre(nombre: string) {
    try {
      const asocFound = await prisma.asociaciones.findFirst({
        where: {
          nombre: nombre,
        },
        include: {
          telefonos: true,
        },
      });

      if (!asocFound) {
        throw new Error("No se ha encontrado la asociación");
      }

      return asocFound;
    } catch (error: any) {
      throw error;
    }
  }

  public static async buscarByAdminId(admin_id: string) {
    try {
      const asocFound = await prisma.asociaciones.findFirst({
        where: {
          admin_id: admin_id,
        },
        include: {
          telefonos: true,
        },
      });

      return asocFound;
    } catch (error: any) {
      throw error;
    }
  }

  public static async listarAsoc() {
    try {
      const asocs = await prisma.asociaciones.findMany();

      return asocs;
    } catch (error: any) {
      throw error;
    }
  }

  public static async eliminarAsoc(id: string) {
    try {
      const asocDeleted = await prisma.asociaciones.delete({
        where: {
          id,
        },
      });

      if (asocDeleted) {
        await prisma.usuarios.update({
          where: {
            id: asocDeleted.admin_id,
          },
          data: {
            rol: "publico",
          },
        });
      }

      return asocDeleted;
    } catch (error: any) {
      throw error;
    }
  }
}
