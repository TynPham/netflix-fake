import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

export type Schema = yup.InferType<typeof schema>;
