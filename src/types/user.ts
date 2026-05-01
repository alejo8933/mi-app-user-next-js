// Este tipo representa un usuario completo recibido desde la api.
export type User = {
    id: number;
    name: string;
    email: string;
    age: number;
}

// Este tipo representa un usuario que se envía a la api para crear o actualizar un usuario.    
export type UserInput = {
    name: string;
    email: string;
    age: number;
}

// Este tipo representa un usuario que se muestra en la interfaz de usuario, con un formato específico para la edad.
export type ApiEResponseUser<T> = {
    success: boolean;
    data: T;
    message?: string;
}