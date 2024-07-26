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
export const validationSchemaIncome = yup.object().shape({
  amount: yup
    .string()
    .required('Amount is required')
    .test('is-positive', 'Amount must be a positive number', (value) => {
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue > 0;
    }),
  source: yup.string().required('Source is required'),
  date: yup.string().required('Date is required'),
});


export const validationSchemaExpense = yup.object().shape({
  amount: yup
    .string()
    .required('Amount is required')
    .test('is-positive', 'Amount must be a positive number', (value) => {
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue > 0;
    }),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
});

export const ValidationSchemaBudget = yup.object().shape({
  category: yup.string().required('Category is required'),
  amountSet: yup
    .string()
    .required('Amount Set is required')
    .min(1, 'Amount Set must be greater than zero')
    .test('is-positive', 'Amount Set must be a positive number', (value) => {
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue > 0;
    }),
});

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
