import { z } from "zod";

export class UsuarioSchemas {
  public static usuarioRegistroSchema() {
    return z.object({
      nombre: z
        .string({
          required_error: "El nombre es requerido",
          invalid_type_error: "El nombre debe ser un string",
        })
        .min(1, {
          message: "El nombre debe tener al menos un caracter",
        }),
      apellido: z
        .string({
          required_error: "El apellido es requerido",
          invalid_type_error: "El apellido debe ser un string",
        })
        .min(1, {
          message: "El apellido debe tener al menos un caracter",
        }),
      correo: z
        .string({
          required_error: "El correo es requerido",
          invalid_type_error: "El correo debe ser un string",
        })
        .email({
          message: "El correo no es válido",
        })
        .min(1, {
          message: "El correo debe tener al menos un caracter",
        }),
      clave: z
        .string({
          required_error: "La clave es requerida",
          invalid_type_error: "La clave debe ser un string",
        })
        .min(6, {
          message: "La clave debe tener al menos 6 caracteres",
        }),
    });
  }

  public static usuarioLoginSchema() {
    return z.object({
      correo: z
        .string({
          required_error: "El correo es requerido",
          invalid_type_error: "El correo debe ser un string",
        })
        .email({
          message: "El correo no es válido",
        })
        .min(1, {
          message: "El correo debe tener al menos un caracter",
        }),
      clave: z
        .string({
          required_error: "La clave es requerida",
          invalid_type_error: "La clave debe ser un string",
        })
        .min(6, {
          message: "La clave debe tener al menos 6 caracteres",
        }),
    });
  }

  public static usuarioActualizarDatosSchema() {
    return z.object({
      nombre: z
        .string({
          required_error: "El nombre es requerido",
          invalid_type_error: "El nombre debe ser un string",
        })
        .min(1, {
          message: "El nombre debe tener al menos un caracter",
        })
        .max(20, {
          message: "El nombre es muy largo",
        }),
      apellido: z
        .string({
          required_error: "El apellido es requerido",
          invalid_type_error: "El apellido debe ser un string",
        })
        .min(1, {
          message: "El apellido debe tener al menos un caracter",
        })
        .max(20, {
          message: "El apellido es muy largo",
        }),
      fecha_nacimiento: z
        .string({
          required_error: "La fecha de nacimiento es requerida",
          invalid_type_error: "La fecha de nacimiento debe ser un string",
        })
        .min(1, {
          message: "La fecha de nacimiento debe tener al menos un caracter",
        }),
      genero: z
        .string({
          required_error: "El genero es requerido",
          invalid_type_error: "El genero debe ser un string",
        })
        .min(1, {
          message: "El genero debe tener al menos un caracter",
        })
        .max(20, {
          message: "El genero es muy largo",
        }),
      telefono: z
        .string({
          required_error: "El telefono es requerido",
          invalid_type_error: "El telefono debe ser un string",
        })
        .min(1, {
          message: "El telefono debe tener al menos un caracter",
        })
        .max(20, {
          message: "El telefono es muy largo",
        }),
      direccion: z
        .string({
          required_error: "La direccion es requerida",
          invalid_type_error: "La direccion debe ser un string",
        })
        .min(1, {
          message: "El direccion debe tener al menos un caracter",
        })
        .max(40, {
          message: "El direccion es muy largo",
        }),
    });
  }

  public static usuarioActualizarClaveSchema() {
    return z.object({
      clave: z
        .string({
          required_error: "La clave es requerida",
          invalid_type_error: "La clave debe ser un string",
        })
        .min(6, {
          message: "La clave debe tener al menos 6 caracteres",
        }),
      nuevaClave: z
        .string({
          required_error: "La nueva clave es requerida",
          invalid_type_error: "La nueva clave debe ser un string",
        })
        .min(6, {
          message: "La nueva clave debe tener al menos 6 caracteres",
        }),
    });
  }

  public static usuarioAgregarTelefonoSchema() {
    return z.object({
      numero: z
        .number({
          required_error: "El numero de telefono es requerido",
          invalid_type_error: "El numero de telefono debe ser un number",
        })
        .min(1, {
          message: "El numero de telefono debe tener al menos un caracter",
        }),
    });
  }
}
