import { z } from "zod";

export class AsociacionSchemas {
  public static asociacionRegistrarSchema() {
    return z.object({
      admin_id: z
        .string({
          required_error: "El admin_id es requerido",
          invalid_type_error: "El admin_id debe ser un string",
        })
        .min(36, {
          message: "El admin_id debe tener al menos 36 caracteres",
        }),
      nombre: z
        .string({
          required_error: "El nombre es requerido",
          invalid_type_error: "El nombre debe ser un string",
        })
        .min(1, {
          message: "El nombre debe tener al menos un caracter",
        })
        .max(50, {
          message: "El nombre es muy largo",
        }),
      descripcion: z
        .string({
          required_error: "La descripcion es requerida",
          invalid_type_error: "La descripcion debe ser un string",
        })
        .min(1, {
          message: "La descripcion debe tener al menos un caracter",
        }),
      correo: z
        .string({
          required_error: "El correo es requerido",
          invalid_type_error: "El correo debe ser un string",
        })
        .email({
          message: "El correo no es un correo valido",
        })
        .min(1, {
          message: "El correo debe tener al menos un caracter",
        }),
      numero: z
        .string({
          required_error: "El numero es requerido",
        })
        .min(9, {
          message: "El numero debe tener al menos un caracter",
        })
        .max(15, {
          message: "El numero es muy largo",
        }),
      // tipo: z
      //   .string({
      //     required_error: "El tipo de telefono es requerido",
      //     invalid_type_error: "El tipo de telefono debe ser un string",
      //   })
      //   .min(1, {
      //     message: "El tipo de telefono debe tener al menos un caracter",
      //   }),
    });
  }
}
