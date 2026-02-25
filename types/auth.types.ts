export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    user_id: string;
    email: string;
    fullname: string;
  };
}
