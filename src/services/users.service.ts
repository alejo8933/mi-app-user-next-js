import { USERS_API_URL } from "../lib/api";
import { User, UserInput, ApiEResponseUser } from "@/types/user";

// Función genérica para hacer peticiones HTTP
// Usa generics (<T>) para que TypeScript conozca el tipo exacto de datos esperado.
export async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  // Si el servidor responde con error HTTP, se lanza una excepcion.
  // El hook la capturara para mostrar el mensaje al usuario.
  if (!response.ok) {
    throw new Error(
      body?.message ?? `La API respondio con estado ${response.status}.`
    );
  }

  // La API de ejemplo devuelve un contenedor con success y data.
  // Aqui extraemos solamente data para que los componentes reciban datos limpios.
  if (body && typeof body === "object" && "success" in body) {
    const apiBody = body as ApiEResponseUser<T>;

    if (!apiBody.success) {
      throw new Error(apiBody.message ?? "La operacion no fue exitosa.");
    }

    return apiBody.data;
  }
  
  return body as T;
}

// Servicio CENTRALIZADO de usuarios.
//Asi los componentes no conocen URLs ni metodos HTTP directamente


export const usersService = {
    //GET /api/users
    getAll() {
        return request<User[]>(USERS_API_URL);
    },
    //GET /api/users/:id
    getById(id: string) {
        return request<User>(`${USERS_API_URL}/${id}`);
    },
    //POST /api/users
    create(payload: UserInput) {
        return request<User>(USERS_API_URL, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },
    //PUT /api/users/:id
    update(id: string, payload: UserInput) {
        return request<User>(`${USERS_API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        });
    },
    //DELETE /api/users/:id
    delete(id: string) {
        return request<void>(`${USERS_API_URL}/${id}`, {
            method: "DELETE",
        });
    }
}