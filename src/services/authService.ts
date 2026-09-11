import api from './api'
import type {
  LoginRequest,
  LoginResponse,
  User,
} from '../types/auth'

const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      '/auth/login',
      credentials
    )

    return response.data
  },

  async me(): Promise<User> {
    const response = await api.get<User>('/auth/me')

    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },
}

export default authService