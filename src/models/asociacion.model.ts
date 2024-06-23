import prisma from "../config/database";
import {
  AsociacionRegistroI,
  PublicacionRegistroI,
} from "../interfaces/interfaces";

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

  public static async registrarPublicacion(data: PublicacionRegistroI) {
    try {
      const newPublicacion = await prisma.publicaciones.create({
        data: {
          asociacion_id: data.asociacion_id,
          titulo: data.titulo,
          estado: data.estado,
          texto_uno: data.texto_uno,
          texto_dos: data.texto_dos,
          imagen_uno: data.imagen_uno,
          imagen_dos: data.imagen_dos,
        },
      });

      return newPublicacion;
    } catch (error: any) {
      throw error;
    }
  }

  public static async eliminarPublicacion(id: string) {
    try {
      const deletedPublicacion = await prisma.publicaciones.delete({
        where: {
          id,
        },
      });

      return deletedPublicacion;
    } catch (error: any) {
      throw new Error("No se ha encontrado la publicación");
    }
  }

  public static async cambiarEstadoPublicacion(
    id: string,
    estado: "publico" | "privado"
  ) {
    try {
      const publicacionUpdated = await prisma.publicaciones.update({
        where: {
          id,
        },
        data: {
          estado: estado,
        },
      });

      return publicacionUpdated;
    } catch (error: any) {
      throw new Error("No se ha encontrado la publicación");
    }
  }
}
