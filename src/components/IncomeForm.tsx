import React from "react";
import { useFormik } from "formik";
import {IncomeFormProps } from "../utils/interface/types";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { validationSchemaIncome } from "../utils/validationSchema/validationSchema";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const IncomeForm: React.FC<IncomeFormProps> = ({
  initialValues,
  onSubmit,
  editMode,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema:validationSchemaIncome,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
       toast.success("Income Successfully Added");
    },
    enableReinitialize: true,
  });
   const incomeSources = [
    { value: "Freelancing", label: "Freelancing" },
    { value: "Business", label: "Business" },
    { value: "Investment", label: "Investment" },
    { value: "Salary", label: "Salary" },
    { value: "Other sources", label: "Other sources" },
  ];
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
      <TextField
        id="source"
        name="source"
        select
        label="Source"
        fullWidth
        variant="outlined"
        value={formik.values.source}
        onChange={formik.handleChange}
        error={formik.touched.source && Boolean(formik.errors.source)}
        helperText={formik.touched.source && formik.errors.source}
        sx={{ mt: 2 }}
      >
        {incomeSources.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
        {editMode ? "Update Income" : "Add Income"}
      </Button>
    </form>
  );
};
export default IncomeForm;
