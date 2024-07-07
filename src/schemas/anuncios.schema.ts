import { z } from "zod";

export class AnunciosSchemas {
  public static anuncioRegistroSchema() {
    return z.object({
      // asociacion_id: z
      //   .string({
      //     required_error: "id de la asociación es requerido",
      //     invalid_type_error: "Id de la asociación debe ser string",
      //   })
      //   .min(36, {
      //     message: "El id de asociación al menos debe tener 36 caracteres",
      //   }),
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
    });
  }
}
