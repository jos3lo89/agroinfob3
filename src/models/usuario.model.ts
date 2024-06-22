import prisma from "../config/database";
import {
  UsuarioActualizarDatosI,
  UsuarioRegistroI,
} from "../interfaces/interfaces";

export class UsuarioModel {
  public static async registrar(usuario: UsuarioRegistroI) {
    try {
      const userfound = await UsuarioModel.buscarUsuarioCorreo(usuario.correo);
      if (userfound) {
        throw new Error("El correo ya existe");
      }

      const newUser = await prisma.usuarios.create({
        data: {
          apellido: usuario.apellido,
          nombre: usuario.nombre,
          correo: usuario.correo,
          clave: usuario.clave,
        },
      });

      return newUser;
    } catch (error: any) {
      throw error;
    }
  }

  public static async buscarUsuarioCorreo(correo: string) {
    try {
      const usuario = await prisma.usuarios.findFirst({
        where: {
          correo: correo,
        },
        include: {
          direcciones: true,
          telefonos: true,
        },
      });
      return usuario;
    } catch (error: any) {
      throw error;
    }
  }

  public static async actualizarDatosUsuario(data: UsuarioActualizarDatosI) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const userUpdated = await prisma.usuarios.update({
          where: {
            id: data.id,
          },
          data: {
            nombre: data.nombre,
            apellido: data.apellido,
            genero: data.genero,
            fecha_nacimiento: new Date(data.fecha_nacimiento),
          },
        });

        const newTelefono = await prisma.telefonosUsuario.upsert({
          where: {
            usuario_id: data.id,
          },
          create: {
            usuario_id: data.id,
            numero: data.telefono,
          },
          update: {
            numero: data.telefono,
          },
        });

        const newDireccion = await prisma.direccionesUsuario.upsert({
          where: {
            usuario_id: data.id,
          },
          create: {
            usuario_id: data.id,
            direccion: data.direccion,
          },
          update: {
            direccion: data.direccion,
          },
        });

        return { userUpdated, newTelefono, newDireccion };
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public static async actualizarClave(data: { id: string; clave: string }) {
    try {
      const userUpdated = await prisma.usuarios.update({
        where: {
          id: data.id,
        },
        data: {
          clave: data.clave,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }

  public static async agregarFoto(data: { id: string; foto: string }) {
    try {
      const userUpdated = await prisma.usuarios.update({
        where: {
          id: data.id,
        },
        data: {
          foto: data.foto,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }

  public static async eliminarFoto(id: string) {
    try {
      const userUpdated = await prisma.usuarios.update({
        where: {
          id,
        },
        data: {
          foto: null,
        },
      });

      return userUpdated;
    } catch (error: any) {
      throw error;
    }
  }

  public static async eliminarUsuario(id: string) {
    try {
      const userDeleted = await prisma.usuarios.delete({
        where: {
          id,
        },
      });

      return userDeleted;
    } catch (error) {
      throw error;
    }
  }
}
