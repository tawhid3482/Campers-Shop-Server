export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "customer" | "admin" | "superAdmin";
  address?: {
    street: string;
    city: string;
    zip: string;
  };
};
