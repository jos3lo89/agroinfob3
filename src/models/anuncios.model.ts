import prisma from "../config/database";

interface registroAnuncioI {
  asociacion_id: string;
  titulo: string;
  descripcion: string;
  foto: string;
}

export class AnunciosModel {
  public static async registrar(data: registroAnuncioI) {
    try {
      const newAnuncio = await prisma.anuncios.create({
        data: {
          asociacion_id: data.asociacion_id,
          titulo: data.titulo,
          descripcion: data.descripcion,
          foto: data.foto,
          estado: "publico",
        },
      });

      return newAnuncio;
    } catch (error: any) {
      throw new Error("No se pudo registrar");
    }
  }

  public static async cambiarEstado(data: {
    id: string;
    estado: "publico" | "privado";
  }) {
    try {
      const anuncioUpdated = await prisma.anuncios.update({
        where: {
          id: data.id,
        },
        data: {
          estado: data.estado,
        },
      });

      return anuncioUpdated;
    } catch (error: any) {
      throw new Error("No se pudo actulizar el estado");
    }
  }

  public static async mostrarAnuncios() {
    try {
      const anunciosList = await prisma.anuncios.findMany();

      return anunciosList;
    } catch (error: any) {
      throw new Error("No se pudo listar los anuncios");
    }
  }

  public static async mostrarAnunciosById(id: string) {
    try {
      const anuncio = await prisma.anuncios.findFirst({
        where: {
          id,
        },
      });

      if (!anuncio) {
        throw new Error();
      }

      return anuncio;
    } catch (error: any) {
      throw new Error("No se encontro el anuncio");
    }
  }

  public static async listarAnunciosByIdAsoc(id: string) {
    try {
      const anunciosList = await prisma.anuncios.findMany({
        where: {
          asociacion_id: id,
        },
      });

      return anunciosList;
    } catch (error: any) {
      throw new Error("No se pudo listar los anuncios");
    }
  }

  public static async eliminarAnuncio(id: string) {
    try {
      const anuncioDeleted = await prisma.anuncios.delete({
        where: {
          id,
        },
      });

      return anuncioDeleted;
    } catch (error: any) {
      throw new Error("No se pudo eliminar el anuncio");
    }
  }

  
}
