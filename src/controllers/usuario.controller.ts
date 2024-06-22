import { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario.model";
import bcrypt from "bcryptjs";
import { Jwt } from "../utils/jwt";
import { config } from "../config/config";
import * as fs from "node:fs/promises";
import prisma from "../config/database";

export class UsuarioController {
  public static async registrar(req: Request, res: Response) {
    try {
      const { nombre, apellido, correo, clave } = req.body;

      const hashedClave = await bcrypt.hash(clave, 10);

      await UsuarioModel.registrar({
        nombre,
        apellido,
        correo,
        clave: hashedClave,
      });

      res.sendStatus(200);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { correo, clave } = req.body;

      const userFound = await UsuarioModel.buscarUsuarioCorreo(correo);

      if (!userFound)
        return res.status(404).json({ message: "Usuario no encontrado" });

      const isMatch = await bcrypt.compare(clave, userFound.clave);

      if (!isMatch)
        return res.status(401).json({ message: "Clave incorrecta" });

      const token = await Jwt.createToken({
        id: userFound.id,
        correo: userFound.correo,
        rol: userFound.rol,
      });

      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        id: userFound.id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        correo: userFound.correo,
        rol: userFound.rol,
        telefonos: userFound.telefonos,
        fechaNacimiento: userFound.fecha_nacimiento,
        genero: userFound.genero,
        estado: userFound.estado,
        direcciones: userFound.direcciones,
        foto: userFound.foto
          ? `${config.serverUrl}${userFound.foto}`
          : userFound.foto,
        fechaCreacion: userFound.fecha_creacion,
        fechaActualizacion: userFound.fecha_actualizacion,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async logout(_req: Request, res: Response) {
    try {
      res.clearCookie("token");
      res.sendStatus(204);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async datosUsuario(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No se ha autenticado");
      const userFound = await UsuarioModel.buscarUsuarioCorreo(req.user.correo);
      if (!userFound) throw new Error("Usuario no encontrado");

      res.status(200).json({
        id: userFound.id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        correo: userFound.correo,
        rol: userFound.rol,
        telefonos: userFound.telefonos,
        fechaNacimiento: userFound.fecha_nacimiento,
        genero: userFound.genero,
        estado: userFound.estado,
        direcciones: userFound.direcciones,
        foto: userFound.foto
          ? `${config.serverUrl}${userFound.foto}`
          : userFound.foto,
        fechaCreacion: userFound.fecha_creacion,
        fechaActualizacion: userFound.fecha_actualizacion,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async actualizarDatosUsuario(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No se ha autenticado");

      const {
        nombre,
        apellido,
        fecha_nacimiento,
        genero,
        telefono,
        direccion,
      } = req.body;

      const userUpdated = await UsuarioModel.actualizarDatosUsuario({
        id: req.user.id,
        nombre,
        apellido,
        genero,
        telefono,
        fecha_nacimiento,
        direccion,
      });

      res.status(200).json({
        id: userUpdated.userUpdated.id,
        nombre: userUpdated.userUpdated.nombre,
        apellido: userUpdated.userUpdated.apellido,
        correo: userUpdated.userUpdated.correo,
        rol: userUpdated.userUpdated.rol,
        telefonos: userUpdated.newTelefono,
        fechaNacimiento: userUpdated.userUpdated.fecha_nacimiento,
        genero: userUpdated.userUpdated.genero,
        estado: userUpdated.userUpdated.estado,
        direcciones: userUpdated.newDireccion,
        foto: userUpdated.userUpdated.foto
          ? `${config.serverUrl}${userUpdated.userUpdated.foto}`
          : userUpdated.userUpdated.foto,
        fechaCreacion: userUpdated.userUpdated.fecha_creacion,
        fechaActualizacion: userUpdated.userUpdated.fecha_actualizacion,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async actualizarClave(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No se ha autenticado");

      const { clave, nuevaClave } = req.body;

      const userFound = await prisma.usuarios.findFirst({
        where: {
          id: req.user.id,
        },
      });

      if (!userFound) throw new Error("Usuario no encontrado");

      const isMatch = await bcrypt.compare(clave, userFound.clave);

      if (!isMatch) throw new Error("Clave incorrecta");

      const claveHashed = await bcrypt.hash(nuevaClave, 10);
      await UsuarioModel.actualizarClave({
        id: req.user.id,
        clave: claveHashed,
      });

      res.sendStatus(200);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async agregarFoto(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No se ha autenticado");
      if (!req.file) throw new Error("No se ha encontrado el archivo");

      const userFound = await UsuarioModel.buscarUsuarioCorreo(req.user.correo);

      if (!userFound) throw new Error("Usuario no encontrado");

      if (userFound.foto) {
        await fs.unlink(`./public/uploads/${req.file.filename}`);
        throw new Error("El usuario ya tiene una foto");
      }

      const userUpdated = await UsuarioModel.agregarFoto({
        id: req.user.id,
        foto: `/uploads/${req.file.filename}`,
      });

      res.status(200).json({
        foto: `${config.serverUrl}${userUpdated.foto}`,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async eliminarFoto(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No se ha autenticado");

      const userFound = await UsuarioModel.buscarUsuarioCorreo(req.user.correo);

      if (!userFound) throw new Error("Usuario no encontrado");

      if (!userFound.foto) throw new Error("El usuario no tiene una foto");

      await fs.unlink(`./public${userFound.foto}`);

      await UsuarioModel.eliminarFoto(req.user.id);

      res.status(200).json({ foto: null });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async actualizarFoto(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No se ha autenticado");
      if (!req.file) throw new Error("No se ha encontrado el archivo");

      const userFound = await UsuarioModel.buscarUsuarioCorreo(req.user.correo);

      if (!userFound) throw new Error("Usuario no encontrado");

      if (!userFound.foto) {
        await fs.unlink(`./public/uploads/${req.file.filename}`);
        throw new Error("El usuario no tiene una foto");
      }

      await fs.unlink(`./public${userFound.foto}`);

      const userUpdated = await UsuarioModel.agregarFoto({
        id: req.user.id,
        foto: `/uploads/${req.file.filename}`,
      });

      res.status(200).json({ foto: `${config.serverUrl}${userUpdated.foto}` });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }

  public static async eleminarUsuario(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No se ha autenticado");

      const { clave } = req.body;

      if (!clave) throw new Error("Clave no enviada");

      const userFound = await UsuarioModel.buscarUsuarioCorreo(req.user.correo);

      if (!userFound) throw new Error("Usuario no encontrado");

      const isMatch = await bcrypt.compare(clave, userFound.clave);

      if (!isMatch) throw new Error("Clave incorrecta");

      if (userFound.foto) {
        await fs.unlink(`./public${userFound.foto}`);
      }

      await UsuarioModel.eliminarUsuario(req.user.id);

      res.sendStatus(200);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ message: [error.message] });
    }
  }
}
