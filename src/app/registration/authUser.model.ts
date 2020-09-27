export interface AuthUser{
  _id: string;
  level: number;
  token: string;
  exp: number;  //expiration time in seconds
}