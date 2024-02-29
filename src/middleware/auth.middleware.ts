import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "../schema/entities/user.entity";
import * as UserRepository from "../repository/user.repository";

const SECRET_WORD = "Secret_Word";

export const createJwt = (user: UserEntity) => {
  return jwt.sign(user, SECRET_WORD);
};

export const jwtGenerator = (user: UserEntity): string => {
  return jwt.sign({ NombreUsuario: user.NombreUsuario }, SECRET_WORD);
};

export const verifyToken = (token: string): any => {
  try {
    if (!token) {
      throw new Error('Token not provided');
    }
    const decoded = jwt.verify(token, SECRET_WORD);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const loginService = async (
  NombreUsuario: string,
  Contrasena: string
): Promise<string> => {
  try {
    const existingUser: UserEntity = await UserRepository.getUsuarioByName(NombreUsuario);
    console.log("Usuario existente:", existingUser);
    if (!existingUser) throw new Error("User not found");
    const isPasswordValid = bcrypt.compareSync(Contrasena, existingUser.Contrasena);
    if (!isPasswordValid) throw new Error("Credentials are not valid");
    const jwt = jwtGenerator(existingUser);
    return jwt;
  } catch (err: any) {
    console.error("Error:", err);
    throw new Error(err.message);
  }
};

