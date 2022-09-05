import axios from "axios";
export class AddressService {
  baseURL: string = "http://localhost:8080/api/";
  getAll() {
    return axios
      .get(`${this.baseURL}address`)
      .then((response) => response.data.data);
  }
}
