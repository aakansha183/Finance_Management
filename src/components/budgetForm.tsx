
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { BudgetFormInput, categories } from '../utils/interface/types';
interface BudgetFormProps {
  onSubmit: (data: BudgetFormInput) => void;
  editMode: boolean;
  defaultValues?: BudgetFormInput;

}
const schema = yup.object().shape({
  category: yup.string().required('Category is required'),
  amountSet: yup.string().required('Amount Set is required').min(1, 'Amount Set must be greater than zero'),
  amountSpent: yup.string().required('Amount Spent is required').min(0, 'Amount Spent must be zero or more').max(yup.ref('amountSet'), 'Amount Spent must be less than or equal to Amount Set'),
});


const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit, editMode, defaultValues }) => {
  const { control, handleSubmit, reset } = useForm<BudgetFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">

      <Controller
  name="category"
  control={control}
  render={({ field, fieldState }) => (
    <Select
      {...field}
      fullWidth
      margin="dense"
      error={!!fieldState.error}
      displayEmpty
    >
      <MenuItem value="" disabled>
        Choose the category
      </MenuItem>
      {categories.map((category, index) => (
        <MenuItem key={index} value={category}>{category}</MenuItem>
      ))}
    </Select>
  )}
/>

<Controller
  name="amountSet"
  control={control}
  render={({ field, fieldState }) => (
    <TextField
      {...field}
      label="Amount Set"
      type="string"
      fullWidth
      margin="normal"
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : null}
      inputProps={{ min: 1 }}
    />
  )}
/>

<Controller
  name="amountSpent"
  control={control}
  render={({ field, fieldState }) => (
    <TextField
      {...field}
      label="Amount Spent"
      type="string"
      fullWidth
      margin="normal"
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : null}
      inputProps={{ min: 0 }}
    />
  )}
/>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {editMode ? 'Update Budget' : 'Add Budget'}
      </Button>
    </form>
  );
};

export default BudgetForm;
