import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ExpenseFormProps } from "../utils/interface/types";
import { validationSchemaExpense } from "../utils/validationSchema/validationSchema";
import { categories } from "../utils/MenuItems/categoryItem";
const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialValues,
  onSubmit,
  editMode,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaExpense,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth variant="outlined">
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
          {categories.map((category, index) => (
            <MenuItem key={index} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
        sx={{ mt: 2 }}
      />

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
        {editMode ? "Update Expense" : "Add Expense"}
      </Button>
    </form>
  );
};

export default ExpenseForm;
