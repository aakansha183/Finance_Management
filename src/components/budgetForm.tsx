import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { BudgetFormInput, categories } from '../utils/interface/types';
import { BudgetFormProps } from '../utils/interface/types';
import { ValidationSchemaBudget } from '../utils/validationSchema/validationSchema';


const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit, editMode, defaultValues }) => {
  const { control, handleSubmit, reset } = useForm<BudgetFormInput>({
    resolver: yupResolver(ValidationSchemaBudget),
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
              <MenuItem key={index} value={category.value}>
                {category.label}
              </MenuItem>
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {editMode ? 'Update Budget' : 'Add Budget'}
      </Button>
    </form>
  );
};

export default BudgetForm;
