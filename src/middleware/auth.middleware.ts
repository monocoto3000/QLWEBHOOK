// import bcrypt from 'bcrypt-ts';
// import { getUsuarioByName,getUsuarioContrasena } from '../repository/user.repository';
// import { Usuarios } from '../schema/entities/user.entity';

// export async function verifyUserCredentials(NombreUsuario: string, Contrasena: string) {
//     try {
//         const user = await getUsuarioByName(NombreUsuario);
//         const user_contrasena =  await getUsuarioContrasena(NombreUsuario);
//         if (!user) {
//             return null; 
//         }
//         const passwordMatch = await bcrypt.compare(Contrasena, user_contrasena);
//         if (!passwordMatch) {
//             return null; 
//         }
//         return user;
//     } catch (error) {
//         console.error('Error al verificar las credenciales del usuario:', error);
//         throw error;
//     }
// }
