import prisma from "../config/database";

export class AdminModel {
  public static async eliminarUsuario(id: string) {
    try {
      const userFound = await prisma.usuarios.findFirst({
        where: {
          id,
        },
      });

      if (!userFound) {
        throw new Error("Usuario no encontrado");
      }

      if (userFound.rol == "admin_asoc") {
        throw new Error(
          "No se puede eliminar un usuario administador de asociacion"
        );
      }

      await prisma.usuarios.delete({
        where: {
          id,
        },
      });

      return userFound;
    } catch (error: any) {
      throw error;
    }
  }
}
