import axios from "axios";
import { Address } from "../interfaces/types";
export class AddressService {
  baseURL: string = "http://localhost:8080/api/";
  getAll() : Promise<Array<Address>> {
    return axios
      .get(`${this.baseURL}address`)
      .then((response) => response.data);
  }
}
