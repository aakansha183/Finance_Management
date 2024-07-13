// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';


// interface BudgetFormState {
//   category: string;
//   amountSet: number;
// }

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

//   const [formState, setFormState] = useState<BudgetFormState>({ category: '', amountSet: 0 });
//   const [editMode, setEditMode] = useState<boolean>(false);
//   const [currentEdit, setCurrentEdit] = useState<string>('');

//   useEffect(() => {
//     const loadBudgets = async () => {
//       const budgets = await loadBudgetsFromStorage();
//       dispatch(setBudgets(budgets));
//     };
//     loadBudgets();
//   }, [dispatch]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormState({
//       ...formState,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleAddBudget = async () => {
//     if (formState.category && formState.amountSet > 0) {
//       dispatch(addBudget({ ...formState, amountSpent: 0 }));
//       const newBudgets = [...budgets, { ...formState, amountSpent: 0 }];
//       await saveBudgetsToStorage(newBudgets);
//       setFormState({ category: '', amountSet: 0 });
//     }
//   };

//   const handleUpdateBudget = async () => {
//     if (formState.category && formState.amountSet > 0 && currentEdit) {
//       const updatedBudget = { category: formState.category, amountSet: formState.amountSet, amountSpent: budgets.find(b => b.category === currentEdit)?.amountSpent || 0 };
//       dispatch(updateBudget(updatedBudget));
//       const newBudgets = budgets.map(b => b.category === currentEdit ? updatedBudget : b);
//       await saveBudgetsToStorage(newBudgets);
//       setFormState({ category: '', amountSet: 0 });
//       setEditMode(false);
//       setCurrentEdit('');
//     }
//   };

//   const handleEditClick = (category: string, amountSet: number) => {
//     setEditMode(true);
//     setCurrentEdit(category);
//     setFormState({ category, amountSet });
//   };

//   const handleDeleteBudget = async (category: string) => {
//     dispatch(deleteBudget(category));
//     const newBudgets = budgets.filter(b => b.category !== category);
//     await saveBudgetsToStorage(newBudgets);
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
//           <form noValidate autoComplete="off">
//             <TextField
//               label="Category"
//               name="category"
//               value={formState.category}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Amount Set"
//               name="amountSet"
//               type="number"
//               value={formState.amountSet}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//             <Button variant="contained" color="primary" onClick={editMode ? handleUpdateBudget : handleAddBudget} fullWidth>
//               {editMode ? 'Update Budget' : 'Add Budget'}
//             </Button>
//           </form>
//           <List>
//             {budgets.map((budget, index) => (
//               <ListItem key={index} style={{ marginBottom: '10px', backgroundColor: 'white', borderRadius: '5px', padding: '10px', position: 'relative' }}>
//                 <ListItemText
//                   primary={`${budget.category} - Set: $${budget.amountSet} - Spent: $${budget.amountSpent}`}
//                 />
//                 <LinearProgress
//                   variant="determinate"
//                   value={(budget.amountSpent / budget.amountSet) * 100}
//                   style={{ marginTop: '5px' }}
//                 />
//                 <IconButton onClick={() => handleEditClick(budget.category, budget.amountSet)} style={{ position: 'absolute', top: '10px', right: '40px' }}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteBudget(budget.category)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
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


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useForm, Controller } from 'react-hook-form';

// interface BudgetFormInput {
//   category: string;
//   amountSet: number;
// }

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

  

//   const { control, handleSubmit, reset } = useForm<BudgetFormInput>();

//   useEffect(() => {
//     const loadBudgets = async () => {
//       const loadedBudgets = await loadBudgetsFromStorage();
//       dispatch(setBudgets(loadedBudgets));
//     };
//     loadBudgets();
//   }, [dispatch]);

//   const handleAddBudget = async (data: BudgetFormInput) => {
//     if (data.category && data.amountSet > 0) {
//       dispatch(addBudget({ ...data, amountSpent: 0 }));
//       const newBudgets = [...budgets, { ...data, amountSpent: 0 }];
//       await saveBudgetsToStorage(newBudgets);
//       reset();
//     }
//   };

//   const handleUpdateBudget = async (data: BudgetFormInput) => {
//     const existingBudget = budgets.find(b => b.category === currentEdit);
//     if (data.category && data.amountSet > 0 && currentEdit && existingBudget) {
//       const updatedBudget = { category: data.category, amountSet: data.amountSet, amountSpent: existingBudget.amountSpent };
//       dispatch(updateBudget(updatedBudget));
//       const newBudgets = budgets.map(b => (b.category === currentEdit ? updatedBudget : b));
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
//           <form onSubmit={handleSubmit(editMode ? handleUpdateBudget : handleAddBudget)} noValidate autoComplete="off">
//             <Controller
//               name="category"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Category is required' }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Category"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
//                 />
//               )}
//             />
//             <Controller
//               name="amountSet"
//               control={control}
//               defaultValue={0}
//               rules={{ required: 'Amount Set is required', min: { value: 1, message: 'Amount Set must be greater than zero' } }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Set"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
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
//                   primary={`${budget.category} - Set: $${budget.amountSet} - Spent: $${budget.amountSpent}`}
//                 />
//                 <LinearProgress
//                   variant="determinate"
//                   value={(budget.amountSpent / budget.amountSet) * 100}
//                   style={{ marginTop: '5px' }}
//                 />
//                 <IconButton onClick={() => handleEditClick(budget.category, budget.amountSet)} style={{ position: 'absolute', top: '10px', right: '40px' }}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteBudget(budget.category)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
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


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper, Select, MenuItem } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useForm, Controller } from 'react-hook-form';

// interface BudgetFormInput {
//   category: string;
//   amountSet: number;
// }

// const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

//   const { control, handleSubmit, reset } = useForm<BudgetFormInput>();

//   const [editMode, setEditMode] = React.useState<boolean>(false);
//   const [currentEdit, setCurrentEdit] = React.useState<string>('');

//   useEffect(() => {
//     const loadBudgets = async () => {
//       const loadedBudgets = await loadBudgetsFromStorage();
//       dispatch(setBudgets(loadedBudgets));
//     };
//     loadBudgets();
//   }, [dispatch]);

//   const handleAddBudget = async (data: BudgetFormInput) => {
//     if (data.category && data.amountSet > 0) {
//       dispatch(addBudget({ ...data, amountSpent: 0 }));
//       const newBudgets = [...budgets, { ...data, amountSpent: 0 }];
//       await saveBudgetsToStorage(newBudgets);
//       reset({ category: '' });
//     }
//   };
  
//   const handleUpdateBudget = async (data: BudgetFormInput) => {
//     const existingBudget = budgets.find(b => b.category === currentEdit);
//     if (data.category && data.amountSet > 0 && currentEdit && existingBudget) {
//       const updatedBudget = { category: data.category, amountSet: data.amountSet, amountSpent: existingBudget.amountSpent };
//       dispatch(updateBudget(updatedBudget));
//       const newBudgets = budgets.map(b => (b.category === currentEdit ? updatedBudget : b));
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

//   const handleEditClick = (category: string, amountSet: number) => {
//     setEditMode(true);
//     setCurrentEdit(category);
//     reset({ category, amountSet });
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
//           <form onSubmit={handleSubmit(editMode ? handleUpdateBudget : handleAddBudget)} noValidate autoComplete="off">
//             <Controller
//               name="category"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Category is required' }}
//               render={({ field, fieldState }) => (
//                 <Select
//                   {...field}
//                   fullWidth
//                   margin="dense" // Use "dense" instead of "normal"
//                   error={!!fieldState.error}
//                 >
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
//               rules={{ required: 'Amount Set is required', min: { value: 1, message: 'Amount Set must be greater than zero' } }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Set"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
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
//                   primary={`${budget.category} - Set: $${budget.amountSet} - Spent: $${budget.amountSpent}`}
//                 />
//                 <LinearProgress
//                   variant="determinate"
//                   value={(budget.amountSpent / budget.amountSet) * 100}
//                   style={{ marginTop: '5px' }}
//                 />
//                 <IconButton onClick={() => handleEditClick(budget.category, budget.amountSet)} style={{ position: 'absolute', top: '10px', right: '40px' }}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteBudget(budget.category)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
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


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper, Select, MenuItem } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useForm, Controller } from 'react-hook-form';

// interface BudgetFormInput {
//   category: string;
//   amountSet: number;
// }

// const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

//   const { control, handleSubmit, reset } = useForm<BudgetFormInput>();

//   const [editMode, setEditMode] = React.useState<boolean>(false);
//   const [currentEdit, setCurrentEdit] = React.useState<string>('');

//   useEffect(() => {
//     const loadBudgets = async () => {
//       const loadedBudgets = await loadBudgetsFromStorage();
//       dispatch(setBudgets(loadedBudgets));
//     };
//     loadBudgets();
//   }, [dispatch]);

//   const handleAddBudget = async (data: BudgetFormInput) => {
//     const existingBudget = budgets.find(b => b.category === data.category);
//     if (existingBudget) {
//       handleUpdateBudget(data); // If budget exists, update it
//     } else {
//       if (data.category && data.amountSet > 0) {
//         dispatch(addBudget({ ...data, amountSpent: 0 }));
//         const newBudgets = [...budgets, { ...data, amountSpent: 0 }];
//         await saveBudgetsToStorage(newBudgets);
//         reset({ category: '' });
//       }
//     }
//   };

//   const handleUpdateBudget = async (data: BudgetFormInput) => {
//     const existingBudget = budgets.find(b => b.category === currentEdit || b.category === data.category);
//     if (data.category && data.amountSet > 0 && existingBudget) {
//       const updatedBudget = { category: data.category, amountSet: data.amountSet, amountSpent: existingBudget.amountSpent };
//       dispatch(updateBudget(updatedBudget));
//       const newBudgets = budgets.map(b => (b.category === currentEdit || b.category === data.category ? updatedBudget : b));
//       await saveBudgetsToStorage(newBudgets);
//       reset({ category: '' });
//       setEditMode(false);
//       setCurrentEdit('');
//     }
//   };

//   const handleDeleteBudget = async (category: string) => {
//     dispatch(deleteBudget(category));
//     const newBudgets = budgets.filter(b => b.category !== category);
//     await saveBudgetsToStorage(newBudgets);
//   };

//   const handleEditClick = (category: string, amountSet: number) => {
//     setEditMode(true);
//     setCurrentEdit(category);
//     reset({ category, amountSet });
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
//           <form onSubmit={handleSubmit(editMode ? handleUpdateBudget : handleAddBudget)} noValidate autoComplete="off">
//             <Controller
//               name="category"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Category is required' }}
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
//               rules={{ required: 'Amount Set is required', min: { value: 1, message: 'Amount Set must be greater than zero' } }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Set"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
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
//                   primary={`${budget.category} - Set: $${budget.amountSet} - Spent: $${budget.amountSpent}`}
//                 />
//                 <LinearProgress
//                   variant="determinate"
//                   value={(budget.amountSpent / budget.amountSet) * 100}
//                   style={{ marginTop: '5px' }}
//                 />
//                 <IconButton onClick={() => handleEditClick(budget.category, budget.amountSet)} style={{ position: 'absolute', top: '10px', right: '40px' }}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteBudget(budget.category)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
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

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget, updateSpent } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper, Select, MenuItem } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useForm, Controller } from 'react-hook-form';

// interface BudgetFormInput {
//   category: string;
//   amountSet: number;
// }

// interface SpentFormInput {
//   amountSpent: number;
// }

// const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

//   const { control, handleSubmit, reset } = useForm<BudgetFormInput>();
//   const { control: controlSpent, handleSubmit: handleSpentSubmit, reset: resetSpent } = useForm<SpentFormInput>();

//   const [editMode, setEditMode] = React.useState<boolean>(false);
//   const [currentEdit, setCurrentEdit] = React.useState<string>('');

//   useEffect(() => {
//     const loadBudgets = async () => {
//       const loadedBudgets = await loadBudgetsFromStorage();
//       dispatch(setBudgets(loadedBudgets));
//     };
//     loadBudgets();
//   }, [dispatch]);

//   const handleAddBudget = async (data: BudgetFormInput) => {
//     const existingBudget = budgets.find(b => b.category === data.category);
//     if (existingBudget) {
//       handleUpdateBudget(data); // If budget exists, update it
//     } else {
//       if (data.category && data.amountSet > 0) {
//         dispatch(addBudget({ ...data, amountSpent: 0 }));
//         const newBudgets = [...budgets, { ...data, amountSpent: 0 }];
//         await saveBudgetsToStorage(newBudgets);
//         reset({ category: '' });
//       }
//     }
//   };

//   const handleUpdateBudget = async (data: BudgetFormInput) => {
//     const existingBudget = budgets.find(b => b.category === currentEdit || b.category === data.category);
//     if (data.category && data.amountSet > 0 && existingBudget) {
//       const updatedBudget = { category: data.category, amountSet: data.amountSet, amountSpent: existingBudget.amountSpent };
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

//   const handleEditClick = (category: string, amountSet: number) => {
//     setEditMode(true);
//     setCurrentEdit(category);
//     reset({ category, amountSet });
//   };

//   const handleUpdateSpent = async (category: string, amountSpent: number) => {
//     const existingBudget = budgets.find(b => b.category === category);
//     if (existingBudget) {
//       dispatch(updateSpent({ category, amountSpent }));
//       const newBudgets = budgets.map(b => (b.category === category ? { ...b, amountSpent } : b));
//       await saveBudgetsToStorage(newBudgets);
//       resetSpent();
//     }
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
//           <form onSubmit={handleSubmit(editMode ? handleUpdateBudget : handleAddBudget)} noValidate autoComplete="off">
//             <Controller
//               name="category"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Category is required' }}
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
//               rules={{ required: 'Amount Set is required', min: { value: 1, message: 'Amount Set must be greater than zero' } }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Set"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
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
//                   primary={budget.category}
//                   secondary={`Set: $${budget.amountSet}\nSpent: $${budget.amountSpent}`}
//                 />
//                 <LinearProgress
//                   variant="determinate"
//                   value={(budget.amountSpent / budget.amountSet) * 100}
//                   style={{ marginTop: '5px' }}
//                 />
//                 <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', width: '100%' }}>
//                   <form onSubmit={handleSpentSubmit(data => handleUpdateSpent(budget.category, data.amountSpent))} style={{ display: 'flex', alignItems: 'center', width: 'calc(100% - 110px)' }}>
//                     <Controller
//                       name="amountSpent"
//                       control={controlSpent}
//                       defaultValue={budget.amountSpent}
//                       rules={{ required: 'Amount Spent is required', min: { value: 0, message: 'Amount Spent must be zero or more' } }}
//                       render={({ field, fieldState }) => (
//                         <TextField
//                           {...field}
//                           label="Amount Spent"
//                           type="number"
//                           fullWidth
//                           margin="normal"
//                           error={!!fieldState.error}
//                           helperText={fieldState.error ? fieldState.error.message : null}
//                           style={{ marginRight: '10px' }}
//                         />
//                       )}
//                     />
//                     <Button type="submit" variant="contained" color="primary">Update Spent</Button>
//                   </form>
//                   <IconButton onClick={() => handleEditClick(budget.category, budget.amountSet)} style={{ position: 'absolute', right: '50px' }}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteBudget(budget.category)} style={{ position: 'absolute', right: '10px' }}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </div>
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default BudgetPage;




// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper, Select, MenuItem } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useForm, Controller } from 'react-hook-form';

// interface BudgetFormInput {
//   category: string;
//   amountSet: number;
//   amountSpent: number;
// }

// const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

//   const { control, handleSubmit, reset, watch } = useForm<BudgetFormInput>();
//   const amountSet = watch('amountSet', 0);

//   const [editMode, setEditMode] = React.useState<boolean>(false);
//   const [currentEdit, setCurrentEdit] = React.useState<string>('');

//   useEffect(() => {
//     const loadBudgets = async () => {
//       const loadedBudgets = await loadBudgetsFromStorage();
//       dispatch(setBudgets(loadedBudgets));
//     };
//     loadBudgets();
//   }, [dispatch]);


// const handleAddOrUpdateBudget = async (data: BudgetFormInput) => {
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
//               rules={{ required: 'Category is required' }}
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
//               rules={{ required: 'Amount Set is required', min: { value: 1, message: 'Amount Set must be greater than zero' } }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Set"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
//                 />
//               )}
//             />
//             <Controller
//               name="amountSpent"
//               control={control}
//               defaultValue={0}
//               rules={{
//                 required: 'Amount Spent is required',
//                 min: { value: 0, message: 'Amount Spent must be zero or more' },
//                 validate: value => value <= amountSet || 'Amount Spent must be less than or equal to Amount Set'
//               }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Spent"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
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


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper, Select, MenuItem } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useForm, Controller } from 'react-hook-form';

// interface BudgetFormInput {
//   category: string;
//   amountSet: number;
//   amountSpent: number;
// }

// const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

//   const { control, handleSubmit, reset, watch } = useForm<BudgetFormInput>();
//   const amountSet = watch('amountSet', 0);

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
//               rules={{ required: 'Category is required' }}
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
//               rules={{ required: 'Amount Set is required', min: { value: 1, message: 'Amount Set must be greater than zero' } }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Set"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
//                 />
//               )}
//             />
//             <Controller
//               name="amountSpent"
//               control={control}
//               defaultValue={0}
//               rules={{
//                 required: 'Amount Spent is required',
//                 min: { value: 0, message: 'Amount Spent must be zero or more' },
//                 validate: value => value <= amountSet || 'Amount Spent must be less than or equal to Amount Set'
//               }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Spent"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
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


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
// import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
// import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper, Select, MenuItem } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useForm, Controller } from 'react-hook-form';

// interface BudgetFormInput {
//   category: string;
//   amountSet: number;
//   amountSpent: number;
// }

// const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];

// const BudgetPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const budgets = useSelector((state: RootState) => state.budget.budgets);

//   const { control, handleSubmit, reset, watch } = useForm<BudgetFormInput>();
//   const amountSet = watch('amountSet', 0);

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
//               rules={{ required: 'Category is required' }}
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
//               rules={{ required: 'Amount Set is required', min: { value: 1, message: 'Amount Set must be greater than zero' } }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Set"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
//                 />
//               )}
//             />
//             <Controller
//               name="amountSpent"
//               control={control}
//               defaultValue={0}
//               rules={{
//                 required: 'Amount Spent is required',
//                 min: { value: 0, message: 'Amount Spent must be zero or more' },
//                 validate: {
//                   lessThanOrEqual: value => value <= amountSet || 'Amount Spent must be less than or equal to Amount Set',
//                   positiveInteger: value => /^\d+$/.test(value.toString()) || 'Amount Spent must be a positive integer'
//                 }
//               }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label="Amount Spent"
//                   type="number"
//                   fullWidth
//                   margin="normal"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error ? fieldState.error.message : null}
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


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addBudget, setBudgets, updateBudget, deleteBudget } from '../redux/slice/budgetSlice';
import { loadBudgetsFromStorage, saveBudgetsToStorage } from '../redux/slice/budgetSlice';
import { Container, TextField, Button, List, ListItem, ListItemText, LinearProgress, IconButton, Paper, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller } from 'react-hook-form';

interface BudgetFormInput {
  category: string;
  amountSet: number;
  amountSpent: number;
}

const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];

const BudgetPage: React.FC = () => {
  const dispatch = useDispatch();
  const budgets = useSelector((state: RootState) => state.budget.budgets);

  const { control, handleSubmit, reset, watch, setError, clearErrors } = useForm<BudgetFormInput>();
  const amountSet = watch('amountSet', 0);
  const amountSpent = watch('amountSpent', 0);

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [currentEdit, setCurrentEdit] = React.useState<string>('');

  useEffect(() => {
    const loadBudgets = async () => {
      const loadedBudgets = await loadBudgetsFromStorage();
      dispatch(setBudgets(loadedBudgets));
    };
    loadBudgets();
  }, [dispatch]);

  useEffect(() => {
    if (amountSpent > amountSet) {
      setError('amountSpent', {
        type: 'manual',
        message: 'Amount Spent must be less than or equal to Amount Set',
      });
    } else {
      clearErrors('amountSpent');
    }
  }, [amountSet, amountSpent, setError, clearErrors]);

  const handleAddOrUpdateBudget = async (data: BudgetFormInput) => {
    if (data.amountSpent > data.amountSet) {
      setError('amountSpent', {
        type: 'manual',
        message: 'Amount Spent must be less than or equal to Amount Set',
      });
      return;
    }

    const existingBudget = budgets.find(b => b.category === data.category);
    if (existingBudget) {
      await handleUpdateBudget(data);
    } else {
      if (data.category && data.amountSet > 0) {
        dispatch(addBudget(data));
        const newBudgets = [...budgets, data];
        await saveBudgetsToStorage(newBudgets);
        reset();
        setEditMode(false);
        setCurrentEdit('');
      }
    }
  };

  const handleUpdateBudget = async (data: BudgetFormInput) => {
    if (data.amountSpent > data.amountSet) {
      setError('amountSpent', {
        type: 'manual',
        message: 'Amount Spent must be less than or equal to Amount Set',
      });
      return;
    }

    const existingBudget = budgets.find(b => b.category === currentEdit || b.category === data.category);
    if (data.category && data.amountSet > 0 && existingBudget) {
      const updatedBudget = { category: data.category, amountSet: data.amountSet, amountSpent: data.amountSpent };
      dispatch(updateBudget(updatedBudget));
      const newBudgets = budgets.map(b => (b.category === currentEdit || b.category === data.category ? updatedBudget : b));
      await saveBudgetsToStorage(newBudgets);
      reset();
      setEditMode(false);
      setCurrentEdit('');
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
    reset(budget);
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
          <form onSubmit={handleSubmit(handleAddOrUpdateBudget)} noValidate autoComplete="off">
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: 'Category is required' }}
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
              defaultValue={0}
              rules={{
                required: 'Amount Set is required',
                min: { value: 1, message: 'Amount Set must be greater than zero' }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Amount Set"
                  type="number"
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
              defaultValue={0}
              rules={{
                required: 'Amount Spent is required',
                min: { value: 0, message: 'Amount Spent must be zero or more' }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Amount Spent"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  inputProps={{ min: 0 }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {editMode ? 'Update Budget' : 'Add Budget'}
            </Button>
          </form>
          <List>
            {budgets.map((budget, index) => (
              <ListItem key={index} style={{ marginBottom: '10px', backgroundColor: 'white', borderRadius: '5px', padding: '10px', position: 'relative' }}>
                <ListItemText
                  primary={`Category: ${budget.category}`}
                  secondary={
                    <>
                      <div>Amount Set: ${budget.amountSet}</div>
                      <div>Amount Spent: ${budget.amountSpent}</div>
                    </>
                  }
                />
                <LinearProgress
                  variant="determinate"
                  value={(budget.amountSpent / budget.amountSet) * 100}
                  style={{ marginTop: '5px' }}
                />
                <IconButton onClick={() => handleEditClick(budget)} style={{ position: 'absolute', right: '50px' }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteBudget(budget.category)} style={{ position: 'absolute', right: '10px' }}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default BudgetPage;
