// Se fuerza la URL de producción para evitar problemas con las variables de entorno en Vercel
export const USERS_API_URL = 'https://mi-api-rest-node-js.onrender.com/api/users';

export function getApiErrorMessage(error: unknown){
    if (error instanceof Error) {

        return error.message;
    }
    return "Ocurrio un error desconocido";
}
