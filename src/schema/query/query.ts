export const Query = `
    type Query {
        usuarios(pagina: Int, resultadosPorPagina: Int): [Usuario]
        usuario(id: ID): Usuario
        paises: [Pais]
        pais(id: ID): Pais
        name(NombreUsuario: String): String
    }
`;
