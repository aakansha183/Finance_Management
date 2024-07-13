// src/components/ExpenseForm.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {TextField,Button,FormControl,InputLabel,Select,MenuItem,} from '@mui/material';
import { Expense } from '../types/Expense';

interface ExpenseFormProps {
  initialValues: Expense;
  onSubmit: (values: Expense) => void;
  editMode: boolean;
}

const validationSchema = yup.object({
  amount: yup.number().required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
});

const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialValues, onSubmit, editMode }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="amount"
        name="amount"
        label="Amount"
        type="number"
        fullWidth
        variant="outlined"
        value={formik.values.amount}
        onChange={formik.handleChange}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
        helperText={formik.touched.amount && formik.errors.amount}
      />
      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          id="category"
          name="category"
          label="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
        >
          <MenuItem value="">
            <em>Select Category</em>
          </MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="date"
        name="date"
        label="Date"
        type="date"
        fullWidth
        variant="outlined"
        value={formik.values.date}
        onChange={formik.handleChange}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
        sx={{ mt: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 2 }}
      >
        {editMode ? 'Update Expense' : 'Add Expense'}
      </Button>
    </form>
  );
};

export default ExpenseForm;
