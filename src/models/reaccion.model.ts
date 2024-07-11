import prisma from "../config/database";

export class ReaccionModel {
  public static async registrar(
    idpublicacion: string,
    tipo: "like" | "dislike",
    iduser: string
  ) {
    try {
      const reaccionFound = await prisma.reaccionesPublicaciones.findFirst({
        where: {
          usuario_id: iduser,
        },
      });

      if (!reaccionFound) {
        const newReaccion = await prisma.reaccionesPublicaciones.create({
          data: {
            tipo: tipo,
            publicacion_id: idpublicacion,
            usuario_id: iduser,
          },
        });

        return newReaccion;
      } else {
        const updateReaccion = await prisma.reaccionesPublicaciones.update({
          where: {
            id: reaccionFound.id,
          },
          data: {
            tipo: tipo,
          },
        });

        return updateReaccion;
      }

      // const newReccion = await prisma.reaccionesPublicaciones.upsert({
      //   where: {
      //     id: reaccionFound.id,
      //   },
      //   create: {
      //     publicacion_id: idpublicacion,
      //     tipo: tipo,
      //     usuario_id: iduser,
      //   },
      //   update: {
      //     publicacion_id: idpublicacion,
      //     tipo: tipo,
      //     usuario_id: iduser,
      //   },
      // });

      // return { idpublicacion, tipo, iduser };
    } catch (error: any) {
      throw new Error("fallo en la creacion o actualización de la reaccion");
    }
  }
}
