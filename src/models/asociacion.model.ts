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

  public static async reaccionPublicacion(data: {
    publicacion_id: string;
    idUser: string;
    tipo: "like" | "dislike";
  }) {
    try {
      const newReaction = await prisma.reaccionesPublicaciones.create({
        data: {
          publicacion_id: data.publicacion_id,
          usuario_id: data.idUser,
          tipo: data.tipo,
        },
      });

      return newReaction;
    } catch (error: any) {
      throw new Error("No se pudo registrar la reaccion");
    }
  }

  public static async buscarAsocByIdAdminAsoc(id: string) {
    try {
      const usuariosAsociados = await prisma.asociaciones.findFirst({
        where: {
          admin_id: id,
        },
      });

      return usuariosAsociados;
    } catch (error: any) {
      throw new Error("No se pudo listar los usuarios asociados");
    }
  }

  public static async listarPublicaciones(id: string) {
    try {
      const publicaciones = await prisma.publicaciones.findMany({
        where: {
          asociacion_id: id,
        },
      });

      return publicaciones;
    } catch (error: any) {
      throw new Error("No se pudo listar las publicaciones");
    }
  }

  public static async listarPublicacionesPorAsoc(nombreasoc: string) {
    try {
      const asocFound = await prisma.asociaciones.findFirst({
        where: {
          nombre: nombreasoc,
        },
      });

      if (!asocFound) {
        throw new Error("No se ha encontrado la asociación");
      }

      const publicaciones = await prisma.publicaciones.findMany({
        where: {
          asociacion_id: asocFound.id,
        },
      });

      if (!publicaciones) {
        throw new Error("No se ha encontrado la publicación");
      }

      return publicaciones;
    } catch (error: any) {
      throw Error;
    }
  }

  public static async listarPublicacionesPorId(id: string) {
    try {
      const publicaciones = await prisma.publicaciones.findFirst({
        where: {
          id,
        },
      });

      return publicaciones;
    } catch (error: any) {
      throw new Error("No se pudo listar las publicaciones");
    }
  }

  public static async buscarNumeroMiembrosAsoc(nombreasoc: string) {
    try {
      const asocFound = await prisma.asociaciones.findFirst({
        where: {
          nombre: nombreasoc,
        },
      });

      if (!asocFound) {
        throw new Error("No se ha encontrado la asociación");
      }

      const numeroDeMiembros = await prisma.miembrosAsociacion.count({
        where: {
          asociacion_id: asocFound.id,
        },
      });

      if (!numeroDeMiembros) {
        throw new Error("No se ha encontrado el numero de miembros");
      }

      return numeroDeMiembros;
    } catch (error: any) {
      throw Error;
    }
  }
}
