import * as yup from "yup";
export const validationSchemaRegister = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const validationSchemaLogin = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
export const validationSchemaExpense = yup.object({
  amount: yup.number().required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
});
export const validationSchemaIncome = yup.object({
  amount: yup.number().required("Amount is required"),
  source: yup.string().required("Source is required"),
  date: yup.string().required("Date is required"),
});

export const ValidationSchemaBudget = yup.object().shape({
  category: yup.string().required('Category is required'),
  amountSet: yup.string().required('Amount Set is required').min(1, 'Amount Set must be greater than zero'),
});
<<<<<<< HEAD

=======
>>>>>>> 9a50653e063fb3f3a50bcde090953394ed9c4ab1
export const validationSchemaForProfile = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});
