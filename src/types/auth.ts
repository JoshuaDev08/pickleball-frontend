export interface User {
    id: number
    name: string
    email: string
    roles?: Role[]
  }
  
  export interface Role {
    id: number
    name: string
  }
  
  export interface LoginRequest {
    email: string
    password: string
  }
  
  export interface LoginResponse {
    success: boolean
    message: string
    data: {
      user: User
    }
  }