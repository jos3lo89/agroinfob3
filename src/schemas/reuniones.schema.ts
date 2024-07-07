import { z } from "zod";

export class ReunionSchemas {
  public static reunionRegistroSchema() {
    return z.object({
      titulo: z
        .string({
          required_error: "El titulo es requerido",
          invalid_type_error: "El titulo debe ser string",
        })
        .min(1, {
          message: "El titulo al menos debe tener 1 caracter",
        }),
      descripcion: z
        .string({
          required_error: "La descripción es requerida",
          invalid_type_error: "La descripción ",
        })
        .min(1, {
          message: "La descripción debe tener al menos 1 caracter",
        }),
      fecha_hora: z
        .string({
          required_error: "La fecha y hora es requerida",
          invalid_type_error: "La fecha y hora debe ser string",
        })
        .min(1, {
          message: "La fecha y hora al menos debe tener 1 caracter",
        }),
      lugar: z
        .string({
          required_error: "El lugar es requerido",
          invalid_type_error: "El lugar debe ser string",
        })
        .min(1, {
          message: "El lugar al menos debe tener 1 caracter",
        }),
    });
  }
}
