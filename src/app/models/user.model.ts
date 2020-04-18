export class User {
  authenticated: boolean;
  name: string;
  constructor(name) {
    this.name = name;
    this.authenticated = true;
  }
}
