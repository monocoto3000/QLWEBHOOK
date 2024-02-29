import { verifyToken } from "../utils/jwt/verifyJwt.util";
import { GraphQLError } from "graphql";

export default async ({ req, _res }: any) => {
  if (req.body.operationName === "IntrospectionQuery") {
    return {};
  }
  if (
    req.body.query.includes("crearUsuario") ||
    req.body.query.includes("login")
  ) {
    return {};
  }
  const token = req.headers.authorization || "";
  const user = await verifyToken(token);
  if (!user) {
    throw new GraphQLError("User is not Authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
  return { user };
};