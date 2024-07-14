// code before breaking into components.

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper, Select, MenuItem } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useForm, Controller, useWatch } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// interface BudgetFormInput {
//   category: string;
//   amountSet: number;
//   amountSpent: number;
// }

// const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];

// const schema = yup.object().shape({
//   category: yup.string().required('Category is required'),
//   amountSet: yup.number().min(1, 'Amount Set must be greater than zero').required('Amount Set is required'),
//   amountSpent: yup.number().min(0, 'Amount Spent must be zero or more').max(yup.ref('amountSet'), 'Amount Spent must be less than or equal to Amount Set').required('Amount Spent is required'),
// });

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

//   const { control, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm<BudgetFormInput>({
//     resolver: yupResolver(schema),
//   });

//   const amountSet = useWatch({
//     control,
//     name: 'amountSet',
//     defaultValue: 0,
//   });

//   const amountSpent = useWatch({
//     control,
//     name: 'amountSpent',
//     defaultValue: 0,
//   });

//   const [editMode, setEditMode] = React.useState<boolean>(false);
//   const [currentEdit, setCurrentEdit] = React.useState<string>('');

//   useEffect(() => {
//     const loadBudgets = async () => {
//       const loadedBudgets = await loadBudgetsFromStorage();
//       dispatch(setBudgets(loadedBudgets));
//     };
//     loadBudgets();
//   }, [dispatch]);

//   const handleAddOrUpdateBudget = async (data: BudgetFormInput) => {
//     const existingBudget = budgets.find(b => b.category === data.category);
//     if (existingBudget) {
//       await handleUpdateBudget(data);
//     } else {
//       if (data.category && data.amountSet > 0) {
//         dispatch(addBudget(data));
//         const newBudgets = [...budgets, data];
//         await saveBudgetsToStorage(newBudgets);
//         reset();
//         setEditMode(false);
//         setCurrentEdit('');
//       }
//     }
//   };

//   const handleUpdateBudget = async (data: BudgetFormInput) => {
//     const existingBudget = budgets.find(b => b.category === currentEdit || b.category === data.category);
//     if (data.category && data.amountSet > 0 && existingBudget) {
//       const updatedBudget = { category: data.category, amountSet: data.amountSet, amountSpent: data.amountSpent };
//       dispatch(updateBudget(updatedBudget));
//       const newBudgets = budgets.map(b => (b.category === currentEdit || b.category === data.category ? updatedBudget : b));
//       await saveBudgetsToStorage(newBudgets);
//       reset();
//       setEditMode(false);
//       setCurrentEdit('');
//     }
//   };

//   const handleDeleteBudget = async (category: string) => {
//     dispatch(deleteBudget(category));
//     const newBudgets = budgets.filter(b => b.category !== category);
//     await saveBudgetsToStorage(newBudgets);
//   };

//   const handleEditClick = (budget: BudgetFormInput) => {
//     setEditMode(true);
//     setCurrentEdit(budget.category);
//     reset(budget);
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(/budget.jpg)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Container maxWidth="md">
//         <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
//           <h1 style={{ textAlign: 'center' }}>Budget Management</h1>
//           <form onSubmit={handleSubmit(handleAddOrUpdateBudget)} noValidate autoComplete="off">
//             <Controller
//               name="category"
//               control={control}
//               defaultValue=""
//               render={({ field, fieldState }) => (
//                 <Select
//                   {...field}
//                   fullWidth
//                   margin="dense"
//                   error={!!fieldState.error}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Choose the category
//                   </MenuItem>
//                   {categories.map((category, index) => (
//                     <MenuItem key={index} value={category}>{category}</MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             <Controller
//               name="amountSet"
//               control={control}
//               defaultValue={0}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Set"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
//                   inputProps={{ min: 1 }}
//                 />
//               )}
//             />
//             <Controller
//               name="amountSpent"
//               control={control}
//               defaultValue={0}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Spent"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
//                   inputProps={{ min: 0 }}
//                 />
//               )}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//             >
//               {editMode ? 'Update Budget' : 'Add Budget'}
//             </Button>
//           </form>
//           <List>
//             {budgets.map((budget, index) => (
//               <ListItem key={index} style={{ marginBottom: '10px', backgroundColor: 'white', borderRadius: '5px', padding: '10px', position: 'relative' }}>
//                 <ListItemText
//                   primary={`Category: ${budget.category}`}
//                   secondary={
//                     <>
//                       <div>Amount Set: ${budget.amountSet}</div>
//                       <div>Amount Spent: ${budget.amountSpent}</div>
//                     </>
//                   }
//                 />
//                 <LinearProgress
//                   variant="determinate"
//                   value={(budget.amountSpent / budget.amountSet) * 100}
//                   style={{ marginTop: '5px' }}
//                 />
//                 <IconButton onClick={() => handleEditClick(budget)} style={{ position: 'absolute', right: '50px' }}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteBudget(budget.category)} style={{ position: 'absolute', right: '10px' }}>
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default BudgetPage;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
import { Container, List, Paper } from '@mui/material';
import BudgetForm from '../component/budgetForm';
import BudgetListItem from '../component/budgetList';
import { BudgetFormInput } from '../types/User';
const BudgetPage: React.FC = () => {
  const dispatch = useDispatch();
  const budgets = useSelector((state: RootState) => state.budget.budgets);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentEdit, setCurrentEdit] = useState<string>('');

  useEffect(() => {
    const loadBudgets = async () => {
      const loadedBudgets = await loadBudgetsFromStorage();
      dispatch(setBudgets(loadedBudgets));
    };
    loadBudgets();
  }, [dispatch]);

  const handleAddOrUpdateBudget = async (data: BudgetFormInput) => {
    const existingBudget = budgets.find(b => b.category === data.category);
    if (existingBudget) {
      await handleUpdateBudget(data);
    } else {
      dispatch(addBudget(data));
      const newBudgets = [...budgets, data];
      await saveBudgetsToStorage(newBudgets);
      resetForm();
    }
  };

  const handleUpdateBudget = async (data: BudgetFormInput) => {
    const existingBudget = budgets.find(b => b.category === currentEdit || b.category === data.category);
    if (existingBudget) {
      const updatedBudget = { ...existingBudget, ...data };
      dispatch(updateBudget(updatedBudget));
      const newBudgets = budgets.map(b => (b.category === currentEdit || b.category === data.category ? updatedBudget : b));
      await saveBudgetsToStorage(newBudgets);
      resetForm();
    }
  };

  const handleDeleteBudget = async (category: string) => {
    dispatch(deleteBudget(category));
    const newBudgets = budgets.filter(b => b.category !== category);
    await saveBudgetsToStorage(newBudgets);
  };

  const handleEditClick = (budget: BudgetFormInput) => {
    setEditMode(true);
    setCurrentEdit(budget.category);
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrentEdit('');
  };

  return (
    <div
      style={{
        backgroundImage: `url(/budget.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
          <h1 style={{ textAlign: 'center' }}>Budget Management</h1>
          <BudgetForm onSubmit={handleAddOrUpdateBudget} editMode={editMode} defaultValues={budgets.find(b => b.category === currentEdit) || { category: '', amountSet: 0, amountSpent: 0 }} />
          <List>
            {budgets.map((budget, index) => (
              <BudgetListItem key={index} budget={budget} onEdit={handleEditClick} onDelete={handleDeleteBudget} />
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default BudgetPage;
