import { Request, Response, NextFunction } from "express";
import { Validator } from "../src/middlewares/validator.middleware";
import { config } from "../src/config/config";
import { Jwt } from "../src/utils/jwt";

// Mock de las dependencias Jwt y config para las pruebas
jest.mock("../src/utils/jwt");
jest.mock("../src/config/config");

describe("Validator", () => {
  // Declaración de variables para los objetos mock de Request, Response y NextFunction
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    // Inicialización de los mocks antes de cada prueba
    mockReq = {
      cookies: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Limpieza de todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  describe("validateAuth", () => {
    it("la clave secreta no esta configurada", async () => {
      // Caso cuando la clave secreta no está configurada
      mockReq.cookies = { token: "token" };
      config.jwtSecret = undefined;

      // Llamada al middleware validateAuth
      await Validator.validateAuth(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      // Verificación de la respuesta esperada
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: ["No se ha encontro la clave secreta de JWT"],
      });
    });

    it("falta el token", async () => {
      // Caso cuando el token está ausente
      mockReq.cookies = {};
      config.jwtSecret = "claveSecretaJwt";

      // Llamada al middleware validateAuth
      await Validator.validateAuth(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      // Verificación de la respuesta esperada
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: ["No se ha encontrado el token"],
      });
    });

    it("token no valido", async () => {
      // Caso cuando el token no es válido
      mockReq.cookies = { token: "token" };
      config.jwtSecret = "claveSecretaJwt";

      // Mock de la función verifyToken para devolver false
      Jwt.verifyToken = jest.fn().mockReturnValue(false);

      // Llamada al middleware validateAuth
      await Validator.validateAuth(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      // Verificación de la respuesta esperada
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: ["token no valido"],
      });
    });

    it("token valido", async () => {
      // Caso cuando el token es válido
      mockReq.cookies = { token: "token" };
      config.jwtSecret = "claveSecretaJwt";
      const decoded = {
        id: "id",
        rol: "rol",
        correo: "correo",
        iat: 1699593600,
        exp: 1699593600,
      };

      // Mock de la función verifyToken para devolver un token decodificado
      Jwt.verifyToken = jest.fn().mockReturnValue(decoded);

      // Llamada al middleware validateAuth
      await Validator.validateAuth(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      // Verificación de que verifyToken fue llamado correctamente y que next fue llamado
      expect(Jwt.verifyToken).toHaveBeenCalledWith("token");
      expect(mockReq.user).toEqual(decoded);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
