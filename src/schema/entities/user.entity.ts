export const Usuarios = `
    type Usuario {
        id_usuarios: ID
        NombreUsuario: String
        Contrasena: String
        Pais_id: ID
    }
`;

export interface UserEntity {
    id_usuarios?: number | null
    NombreUsuario: string
    Contrasena: string
    Pais_id?: number | null
}
