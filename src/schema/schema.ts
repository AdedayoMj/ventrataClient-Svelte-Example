// import   { object, string, number } from 'zod';
// import type {TypeOf} from 'zod'

// export const createUserSchema = object({
//     body: object({
//       username: string({ required_error: 'Username is required' }).min(6, 'Username must be more than 6 characters'),
//       role: string({ required_error: 'Role is required' }),
//       password: string({ required_error: 'Password is required' })
//         .min(8, 'Password must be more than 8 characters')
//         .max(32, 'Password must be less than 32 characters'),
//       passwordConfirm: string({ required_error: 'Please confirm your password' }),
//     }).refine((data) => data.password === data.passwordConfirm, {
//       path: ['passwordConfirm'],
//       message: 'Passwords do not match',
//     }),
//   });

//   export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];

import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords do not match"),
    hobby: yup.string().required("Hobby is required"),
  
    checkbox: yup
      .bool()
      .required("Checkbox must be accepted")
      .oneOf([true], "Checkbox must be accepted")
  });

  export default schema;