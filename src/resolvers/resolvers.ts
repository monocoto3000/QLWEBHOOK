import { getPaises, getPais, postPais, putPais, deletePais } from "../repository/country.repository";
import { getUsuario, getUsuarios, createUsuario, updateUsuario, deleteUsuario, getPaisesUsuarios, getUsuarioByName } from "../repository/user.repository";
import { notifyDiscord } from "../service/DiscordEventNotification/DiscordNotify";
import { UserEntity } from "../schema/entities/user.entity";
import { loginService } from "../middleware/auth.middleware";

export const resolvers = {
    Query: {
        usuarios: (_root: any, { pagina, resultadosPorPagina }: any) => getUsuarios(pagina, resultadosPorPagina),
        usuario: (_root: any, { id }: any) => getUsuario(id),
        paises: async () => {
            const resPaises: any = await getPaises();
            const paisesWithUsuarios: any[] = [];
            for (const pais of resPaises) {
                const resUsers: any = await getPaisesUsuarios(pais.id_paises);
                const paisWithUsuarios = {
                    ...pais,
                    Usuario: resUsers,
                };
                paisesWithUsuarios.push(paisWithUsuarios);
            }
            return paisesWithUsuarios;
        },
        pais: async (_root: any, { id }: any) => {
            const resPaises: any = await getPais(id);
            const resUsers: any = await getPaisesUsuarios(id);
            const newRes = {
                ...resPaises[0],
                Usuario: resUsers.length <= 1 ? [resUsers[0]] : resUsers,
            };
            return newRes;
        },
        name: (_root: any, { NombreUsuario }: any) => getUsuarioByName(NombreUsuario),
    },
    Mutation: {
        crearUsuario: (_root: any, { input }: any) => {
            createUsuario(input.NombreUsuario, input.Contrasena, input.Pais_id),
                notifyDiscord("¡Se ha registrado un nuevo usuario! Dale la bienvenida a " + input.NombreUsuario)
        },
        actualizarUsuario: (_root: any, { id, input }: any) =>
            updateUsuario(id, input.NombreUsuario, input.Contrasena, input.Pais_id),
        eliminarUsuario: (_root: any, { id }: any) => deleteUsuario(id),
        crearPais: (_root: any, { input }: any) => {
            postPais(
                input.nombre,
                input.codigo_iso,
                input.capital,
                input.idioma_principal
            ),
                notifyDiscord("Se ha creado un nuevo pais! Se llama: " + input.nombre)
        },
        actualizarPais: (_root: any, { id, input }: any) => {
            putPais(
                input.nombre,
                input.codigo_iso,
                input.capital,
                input.idioma_principal,
                id
            ),
                notifyDiscord("Se ha modificado los datos de " + input.nombre)
        },
        eliminarPais: (_root: any, { id }: any) => deletePais(id),
        login: async (_root: any, args: UserEntity) => {
            try {
                const { NombreUsuario, Contrasena } = args;
                const token = await loginService(NombreUsuario, Contrasena);
                return token;
            } catch (err: any) {
                return err;
            }
        },
    },
}