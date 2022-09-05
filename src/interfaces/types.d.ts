export interface Address {
  id: number;
  street: number;
  city: string;
  state: string;
  postal_code: number;
  country: string;
}

export interface Person {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  addressId: number;
}
