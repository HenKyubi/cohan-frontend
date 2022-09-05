import axios from "axios";

export class AuthService {
  baseURL: string = "https://cohan-backend.herokuapp.com/api/";
  async login(person : any): Promise<boolean> {
    return await axios
      .post(`${this.baseURL}login`, person)
      .then((response) => response.data);
  }
}