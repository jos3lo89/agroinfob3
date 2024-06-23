// payload del token
export interface Payload {
  id: string;
  correo: string;
  rol: string;
}

// decoded token
export interface Decoded extends Payload {
  iat: number;
  exp: number;
}

// extendiendo el interface de express
declare module "express" {
  interface Request {
    user?: Decoded;
  }
}

// usuario registrar
export interface UsuarioRegistroI {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
}

// usuario actualizar datos
export interface UsuarioActualizarDatosI {
  id: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  genero: "masculino" | "femenino" | "otro";
  telefono: string;
  direccion: string;
}

// asociacion registrar
export interface AsociacionRegistroI {
  admin_id: string;
  nombre: string;
  descripcion: string;
  correo: string;
  numero: string;
  foto: string;
}
