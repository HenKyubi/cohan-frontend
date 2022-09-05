import axios from "axios";
import { Person } from "../interfaces/types";
export class PersonService {
  baseURL: string = "https://cohan-backend.herokuapp.com/api/";
  async getAll(): Promise<Array<Person>> {
    return await axios
      .get(`${this.baseURL}person`)
      .then((response) => response.data);
  }

  // async findById(id: number): Promise<Address> {
  //   return await axios
  //     .get(`${this.baseURL}address/${id}`)
  //     .then((response) => response.data);
  // }

  async save(person: Person): Promise<void> {
    return await axios
      .post(`${this.baseURL}person`, person)
      .then((response) => response.data);
  }

  async delete(id: number): Promise<void> {
    return await axios
      .delete(`${this.baseURL}person/${id}`)
      .then((response) => response.data);
  }
}
