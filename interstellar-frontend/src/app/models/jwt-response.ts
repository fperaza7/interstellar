export interface JwtResponse {
  user:{
    id: number,
    name: string,
    email: string
  },
  accessToken: string
}
