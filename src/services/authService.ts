import api from "./api";
import type { LoginRequest, User } from "../types/auth";

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      credentials,
    );

    return response.data;
  },

  async me(): Promise<User> {
    const response = await api.get<{
      success: boolean;
      message: string;
      data: User;
    }>("/auth/me");

    return response.data.data;
  },

  async logout() {
    return api.post("/auth/logout");
  },
};

export default authService;