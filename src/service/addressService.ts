import axios from "axios";
import { Address } from "../interfaces/types";
export class AddressService {
  baseURL: string = "http://localhost:8080/api/";
  async getAll(): Promise<Array<Address>> {
    return await axios
      .get(`${this.baseURL}address`)
      .then((response) => response.data);
  }

  // async findById(id: number): Promise<Address> {
  //   return await axios
  //     .get(`${this.baseURL}address/${id}`)
  //     .then((response) => response.data);
  // }

  async save(address: Address): Promise<void> {
    return await axios
      .post(`${this.baseURL}address`, address)
      .then((response) => response.data);
  }

  async delete(id: string): Promise<void> {
    return await axios
      .delete(`${this.baseURL}address/${id}`)
      .then((response) => response.data);
  }
}
