import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { jwtConfig } from "../config/jwt";

export const authService = {
  async register(name: string, email: string, password: string) {
    const userExists = await userRepository.findByEmail(email);
    if (userExists) throw new Error("Usuário já existe");

    const user = await userRepository.create({ name, email, password });
    return { id: user.id, name: user.name, email: user.email };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Senha incorreta");

    const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return { token };
  },
};
