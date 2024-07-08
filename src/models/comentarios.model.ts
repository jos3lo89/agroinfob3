import prisma from "../config/database";

interface ComentariosI {
  comentario: string;
  publicacion_id: string;
  userId: string;
  idpadre: string | null;
}

export class ComentariosModel {
  public static async registrarComentarioLv1(data: ComentariosI) {
    try {
      const newComentario = await prisma.comentarios.create({
        data: {
          comentario: data.comentario,
          publicacion_id: data.publicacion_id,
          usuario_id: data.userId,
          nivel: "primario",
        },
      });

      return newComentario;
    } catch (error: any) {
      throw new Error("No se ha registrado el comentario de nivel 1");
    }
  }
  public static async registrarComentarioLv2(data: ComentariosI) {
    try {
      const newComentario = await prisma.comentarios.create({
        data: {
          comentario: data.comentario,
          publicacion_id: data.publicacion_id,
          usuario_id: data.userId,
          nivel: "secundario",
          padre: data.idpadre,
        },
      });

      return newComentario;
    } catch (error: any) {
      throw new Error("No se ha registrado el comentario de nivel 2");
    }
  }
  public static async registrarComentarioLv3(data: ComentariosI) {
    try {
      const newComentario = await prisma.comentarios.create({
        data: {
          comentario: data.comentario,
          publicacion_id: data.publicacion_id,
          usuario_id: data.userId,
          nivel: "terciario",
          padre: data.idpadre,
        },
      });

      return newComentario;
    } catch (error: any) {
      throw new Error("No se ha registrado el comentario de nivel 3");
    }
  }

  public static async listarComentariosTodos(idpublicacion: string) {
    try {
      const comentarios = await prisma.comentarios.findMany({
        where: { nivel: "primario", publicacion_id: idpublicacion },
        include: {
          usuario: true, // Incluir información del usuario
          hijo_comentario: {
            include: {
              usuario: true, // Incluir información del usuario en los subcomentarios
              hijo_comentario: {
                include: {
                  usuario: true, // Incluir información del usuario en los sub-subcomentarios
                  hijo_comentario: {
                    include: {
                      usuario: true, // Incluir información del usuario en los sub-sub-subcomentarios
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          fecha_creacion: "desc", // Ordenar por fecha de creación en orden descendente
        },
      });
      return comentarios;
    } catch (error: any) {
      throw new Error("No se pudo listar los comentarios");
    }
  }

  public static async borrarComentario(comentario_id: string) {
    try {
      const comentario = await prisma.comentarios.delete({
        where: {
          id: comentario_id,
        },
      });

      return comentario;
    } catch (error: any) {
      throw new Error("No se ha borrado el comentario");
    }
  }
}
