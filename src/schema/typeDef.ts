import { Pais } from "./entities/country.entity";
import { Usuarios } from "./entities/user.entity";
import { UsuarioInput } from "./inputs/user.input";
import { PaisInput } from "./inputs/country.input";
import { Query } from "./query/query";
import { Mutacion } from "./mutation/mutation";

export const typeDefs = `
    ${Pais}
    ${Usuarios}
    ${UsuarioInput}
    ${PaisInput}
    ${Query}
    ${Mutacion}
`;