import { db } from "../config/db";
import { UserEntity } from "../schema/entities/user.entity";
import * as bcrypt from 'bcrypt';

export const getUsuarios = (pagina: number, resultadosPorPagina: number) => new Promise((resolve, reject) => {
    const offset = (pagina - 1) * resultadosPorPagina;
    const consulta = "SELECT * FROM usuariosds LIMIT ?, ?";
    db.query(consulta, [offset, resultadosPorPagina])
        .then(([rows]) => resolve(rows))
        .catch((error) => reject(error));
});

export const getUsuarioByName = async (NombreUsuario: string): Promise<UserEntity> => {
    try {
      const query = "SELECT * FROM usuariosds WHERE NombreUsuario = ?";
      const result: any = await db.execute(query, [NombreUsuario]);
      return result[0].length > 0 ? result[0][0] : null;
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getUsuario = (id: number) => new Promise((resolve, reject) => {
    const consulta = "SELECT * FROM usuariosds WHERE id_usuarios = ?";
    db.query(consulta, [id])
        .then(([rows]) => resolve(rows))
        .catch((error) => reject(error));
});

export const createUsuario = async (NombreUsuario: string, Contrasena: string, Pais_id: number) => {
    try {
        const hashedPassword = await bcrypt.hash(Contrasena, 10); 
        console.log(hashedPassword)
        const consulta = "INSERT INTO usuariosds (NombreUsuario, Contrasena, Pais_id) VALUES (?,?,?)";
        const [result] = await db.query(consulta, [NombreUsuario, hashedPassword, Pais_id]);
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateUsuario = (id: number, NombreUsuario: string, Contrasena: string, Pais_id: number) => new Promise((resolve, reject) => {
    const consulta = "UPDATE usuariosds SET NombreUsuario = ? , Contrasena = ? ,Pais_id = ? WHERE id_usuarios = ?";
    db.query(consulta, [NombreUsuario, Contrasena, Pais_id, id])
        .then(([result]) => resolve(result))
        .catch((error) => reject(error));
});

export const deleteUsuario = (id: number) => new Promise((resolve, reject) => {
    const consulta = "DELETE FROM usuariosds WHERE id_usuarios = ?";
    db.query(consulta, [id])
        .then(([result]) => resolve(result))
        .catch((error) => reject(error));
});

export const getPaisesUsuarios = (id: number) => new Promise((resolve, reject) => {
    const consulta = "SELECT * FROM usuariosds WHERE Pais_id = ?";
    db.query(consulta, [id])
        .then(([rows]) => resolve(rows))
        .catch((error) => reject(error));
});

