export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "customer" | "admin";
  address?: {
    street: string;
    city: string;
    zip: string;
  };
};
