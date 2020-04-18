export class JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  roles: string[];

  constructor() {
    this.type = 'Bearer';
  }
}
