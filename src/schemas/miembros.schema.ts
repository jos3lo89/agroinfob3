import { z } from "zod";

export class MiembrosSchemas {
  public static miembrosRegistrarSchema() {
    return z.object({
      dni: z
        .number({
          required_error: "Debe ingresar el dni del miembro",
          invalid_type_error: "El dni del miembro debe ser un number",
        })
        .min(10000000, {
          message: "El dni del miembro debe tener al menos 8 cifras",
        }),
      asociacion_id: z
        .string({
          required_error: "Debe ingresar el id de la asociacion",
          invalid_type_error: "El id de la asociacion debe ser un string",
        })
        .min(36, {
          message: "El id de la asociacion debe tener al menos 36 caracteres",
        }),
      nombre: z
        .string({
          required_error: "Debe ingresar el nombre del miembro",
          invalid_type_error: "El nombre del miembro debe ser un string",
        })
        .min(1, {
          message: "El nombre del miembro debe tener al menos 1 caracter",
        }),
      apellido: z
        .string({
          required_error: "Debe ingresar el apellido del miembro",
          invalid_type_error: "El apellido del miembro debe ser un string",
        })
        .min(1, {
          message: "El apellido del miembro debe tener al menos 1 caracter",
        }),
      correo: z
        .string({
          invalid_type_error: "El correo del miembro debe ser un string",
        })
        .email({
          message: "El correo del miembro debe ser un correo válido",
        })
        .optional(),
      fecha_nacimiento: z
        .string({
          required_error: "Debe ingresar la fecha de nacimiento del miembro",
          invalid_type_error:
            "La fecha de nacimiento del miembro debe ser un date",
        })
        .optional(),
      genero: z.enum(["masculino", "femenino", "otro"], {
        required_error: "Debe ingresar el genero del miembro",
        invalid_type_error: "El genero del miembro debe ser un string",
      }),
      telefono: z
        .string({
          required_error: "Debe ingresar el telefono del miembro",
          invalid_type_error: "El telefono del miembro debe ser un string",
        })
        .min(8)
        .optional(),
      direccion: z
        .string({
          required_error: "Debe ingresar la direccion del miembro",
          invalid_type_error: "La direccion del miembro debe ser un string",
        })
        .min(1)
        .optional(),
    });
  }
}
