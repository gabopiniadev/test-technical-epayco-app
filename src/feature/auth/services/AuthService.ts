
import axios from "axios";

const API_URL = "http://localhost:3000/api";

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const authenticateUser = async (
    data: LoginData
): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Error desconocido al autenticarse."
        );
    }
};