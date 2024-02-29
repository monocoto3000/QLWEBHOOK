import { getUsuarioByName } from '../repository/user.repository';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'SecretWord';

export async function verifyUserCredentials(NombreUsuario: string, Contrasena: string) {
    try {
        const user = await getUsuarioByName(NombreUsuario);
        if (!user) {
            return null; 
        }
        return user;
    } catch (error) {
        console.error('Error al verificar las credenciales del usuario:', error);
        throw error;
    }
}

export function generateToken(user: any): string {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }