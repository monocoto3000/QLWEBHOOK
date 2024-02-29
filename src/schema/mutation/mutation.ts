export const Mutacion = `
    type Mutation {
        crearUsuario(input: UsuarioInput): String
        actualizarUsuario(id: ID, input: UsuarioInput): Usuario
        eliminarUsuario(id: ID): Usuario
        crearPais(input: PaisInput): Pais
        actualizarPais(id: ID, input: PaisInput): Pais
        eliminarPais(id: ID): Pais
        login(NombreUsuario : String!, Contrasena : String!): String
    }
`;