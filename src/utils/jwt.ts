import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { Payload } from "../interfaces/interfaces";

export class Jwt {
  public static createToken(payload: Payload) {
    return new Promise((resolve, reject) => {
      if (config.jwtSecret) {
        jwt.sign(
          payload,
          config.jwtSecret,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) reject(err);
            resolve(token);
          }
        );
      } else {
        reject("No se ha configurado el secreto de JWT");
      }
    });
  }

  public static verifyToken(token: string) {
    try {
      if (config.jwtSecret) {
        const decoded = jwt.verify(token, config.jwtSecret);
        return decoded;
      } else {
        throw new Error("No se ha configurado el secreto de JWT");
      }
    } catch (error: any) {
      throw error;
    }
  }
}

