export interface User {
  username: string;
  password: string;
  //email: string;
  //first_name: string;
  //last_name: string;
  watch_list: string[];
  error: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  First_Name: string;
  Last_Name: string;
  username: string;
  password: string;
  email: string;
}
