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
          hijo_comentario: {
            include: {
              hijo_comentario: {
                include: {
                  hijo_comentario: true,
                },
              },
            },
          },
        },
      });
      return comentarios;
    } catch (error: any) {
      throw new Error("No se oudo listar los comentarios");
    }
  }
}
