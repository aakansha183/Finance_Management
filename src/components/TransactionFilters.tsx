// import React from 'react';
// import { FormControl, InputLabel, Select, Box, SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent
// import { Controller, FieldValues, Control } from 'react-hook-form';

// interface TransactionFiltersProps {
//     control: Control<FieldValues>; // Adjust as per your useForm control type
//     handleCategoryChange: (event: SelectChangeEvent<string>) => void;
//     handleTypeChange: (event: SelectChangeEvent<string>) => void;
// }

// const TransactionFilters: React.FC<TransactionFiltersProps> = ({
//     control,
//     handleCategoryChange,
//     handleTypeChange,
// }) => {
//     return (
//         <Box>
//             <FormControl>
//                 <InputLabel htmlFor="category-select">Category</InputLabel>
//                 <Controller
//                     name="category"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             native
//                             onChange={handleCategoryChange}
//                             inputProps={{
//                                 id: 'category-select',
//                             }}
//                         >
//                             <option value="">All Categories</option>
//                             <option value="food">Food</option>
//                             <option value="transport">Transport</option>
//                             <option value="utilities">Utilities</option>
//                             <option value="entertainment">Entertainment</option>
//                             <option value="health">Health</option>
//                         </Select>
//                     )}
//                 />
//             </FormControl>
//             <FormControl>
//                 <InputLabel htmlFor="type-select">Type</InputLabel>
//                 <Controller
//                     name="type"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             native
//                             onChange={handleTypeChange}
//                             inputProps={{
//                                 id: 'type-select',
//                             }}
//                         >
//                             <option value="">All Types</option>
//                             <option value="income">Income</option>
//                             <option value="expense">Expense</option>
//                         </Select>
//                     )}
//                 />
//             </FormControl>
//         </Box>
//     );
// };

// export default TransactionFilters;

// import React from 'react';
// import { FormControl, InputLabel, Select, Box, SelectChangeEvent } from '@mui/material';
// import { Controller, FieldValues, Control } from 'react-hook-form';

// interface TransactionFiltersProps {
//     control: Control<FieldValues>;
//     handleCategoryChange: (event: SelectChangeEvent<string>) => void;
//     handleTypeChange: (event: SelectChangeEvent<string>) => void;
// }

// const TransactionFilters: React.FC<TransactionFiltersProps> = ({
//     control,
//     handleCategoryChange,
//     handleTypeChange,
// }) => {
//     return (
//         <Box>
//             <FormControl fullWidth>
//                 <InputLabel htmlFor="category-select">Category</InputLabel>
//                 <Controller
//                     name="category"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             native
//                             onChange={(e) => {
//                                 field.onChange(e); // Ensure onChange propagates to react-hook-form
//                                 handleCategoryChange(e); // Call your custom handler
//                             }}
//                             inputProps={{
//                                 id: 'category-select',
//                             }}
//                         >
//                             <option value="">All Categories</option>
//                             <option value="food">Food</option>
//                             <option value="transport">Transport</option>
//                             <option value="utilities">Utilities</option>
//                             <option value="entertainment">Entertainment</option>
//                             <option value="health">Health</option>
//                         </Select>
//                     )}
//                 />
//             </FormControl>
//             <FormControl fullWidth>
//                 <InputLabel htmlFor="type-select">Type</InputLabel>
//                 <Controller
//                     name="type"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             native
//                             onChange={(e) => {
//                                 field.onChange(e); // Ensure onChange propagates to react-hook-form
//                                 handleTypeChange(e); // Call your custom handler
//                             }}
//                             inputProps={{
//                                 id: 'type-select',
//                             }}
//                         >
//                             <option value="">All Types</option>
//                             <option value="income">Income</option>
//                             <option value="expense">Expense</option>
//                         </Select>
//                     )}
//                 />
//             </FormControl>
//         </Box>
//     );
// };

// export default TransactionFilters;

// import React from 'react';
// import {
//     FormControl,
//     InputLabel,
//     Select,
//     Box,
//     SelectChangeEvent,
// } from '@mui/material';
// import { Controller, FieldValues, Control } from 'react-hook-form';

// interface TransactionFiltersProps {
//     control: Control<FieldValues>;
//     handleCategoryChange: (event: SelectChangeEvent<string>) => void;
//     handleTypeChange: (event: SelectChangeEvent<string>) => void;
//     type: string;
// }

// const TransactionFilters: React.FC<TransactionFiltersProps> = ({
//     control,
//     handleCategoryChange,
//     handleTypeChange,
//     type,
// }) => {
//     const categories = [
//         'food',
//         'transport',
//         'utilities',
//         'entertainment',
//         'health',
//     ];

//     return (
//         <Box>
//             <FormControl fullWidth>
//                 <InputLabel htmlFor="category-select">Category</InputLabel>
//                 <Controller
//                     name="category"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             native
//                             onChange={(e) => {
//                                 field.onChange(e);
//                                 handleCategoryChange(e);
//                             }}
//                             inputProps={{
//                                 id: 'category-select',
//                             }}
//                         >
//                             <option value="">All Categories</option>
//                             {categories.map((category) => (
//                                 <option key={category} value={category}>
//                                     {category}
//                                 </option>
//                             ))}
//                         </Select>
//                     )}
//                 />
//             </FormControl>
//             <FormControl fullWidth>
//                 <InputLabel htmlFor="type-select">Type</InputLabel>
//                 <Controller
//                     name="type"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             native
//                             onChange={(e) => {
//                                 field.onChange(e);
//                                 handleTypeChange(e);
//                             }}
//                             inputProps={{
//                                 id: 'type-select',
//                             }}
//                         >
//                             <option value="">All Types</option>
//                             <option value="income">Income</option>
//                             <option value="expense">Expense</option>
//                         </Select>
//                     )}
//                 />
//             </FormControl>
//         </Box>
//     );
// };

// export default TransactionFilters;


// import React, { useState, useEffect } from 'react';
// import {
//     FormControl,
//     InputLabel,
//     Select,
//     Box,
//     SelectChangeEvent,
// } from '@mui/material';
// import { Controller, FieldValues, Control } from 'react-hook-form';

// interface TransactionFiltersProps {
//     control: Control<FieldValues>;
//     handleCategoryChange: (event: SelectChangeEvent<string>) => void;
//     handleTypeChange: (event: SelectChangeEvent<string>) => void;
//     type: string;
// }

// const TransactionFilters: React.FC<TransactionFiltersProps> = ({
//     control,
//     handleCategoryChange,
//     handleTypeChange,
//     type,
// }) => {
//     const [categories, setCategories] = useState<string[]>([]);

//     useEffect(() => {
//         // Update categories based on type
//         if (type === 'income') {
//             setCategories([
//                 'Freelancing',
//                 'Business',
//                 'Investment',
//                 'Salary',
//                 'Other sources',
//             ]);
//         } else if (type === 'expense') {
//             setCategories([
//                 'food',
//                 'transport',
//                 'utilities',
//                 'entertainment',
//                 'health',
//             ]);
//         } else {
//             setCategories([]); // Reset categories if type is empty or invalid
//         }
//     }, [type]);

//     return (
//         <Box>
//             <FormControl fullWidth>
//                 <InputLabel htmlFor="category-select">Category</InputLabel>
//                 <Controller
//                     name="category"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             native
//                             onChange={(e) => {
//                                 field.onChange(e);
//                                 handleCategoryChange(e);
//                             }}
//                             inputProps={{
//                                 id: 'category-select',
//                             }}
//                         >
//                             <option value="">All Categories</option>
//                             {categories.map((category) => (
//                                 <option key={category} value={category}>
//                                     {category}
//                                 </option>
//                             ))}
//                         </Select>
//                     )}
//                 />
//             </FormControl>
//             <FormControl fullWidth>
//                 <InputLabel htmlFor="type-select">Type</InputLabel>
//                 <Controller
//                     name="type"
//                     control={control}
//                     defaultValue=""
//                     render={({ field }) => (
//                         <Select
//                             {...field}
//                             native
//                             onChange={(e) => {
//                                 field.onChange(e);
//                                 handleTypeChange(e);
//                             }}
//                             inputProps={{
//                                 id: 'type-select',
//                             }}
//                         >
//                             <option value="">All Types</option>
//                             <option value="income">Income</option>
//                             <option value="expense">Expense</option>
//                         </Select>
//                     )}
//                 />
//             </FormControl>
//         </Box>
//     );
// };

// export default TransactionFilters;


import React, { useState, useEffect } from 'react';
import {
    FormControl,
    Select,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import { Controller, FieldValues, Control } from 'react-hook-form';

interface TransactionFiltersProps {
    control: Control<FieldValues>;
    handleCategoryChange: (event: SelectChangeEvent<string>) => void;
    handleTypeChange: (event: SelectChangeEvent<string>) => void;
    type: string;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
    control,
    handleCategoryChange,
    handleTypeChange,
    type,
}) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        if (type === 'income') {
            setCategories([
                'Freelancing',
                'Business',
                'Investment',
                'Salary',
                'Other sources',
            ]);
        } else if (type === 'expense') {
            setCategories([
                'Food',
                'Transport',
                'Utilities',
                'Entertainment',
                'Health',
            ]);
        } else {
            setCategories([]);
        }
    }, [type]);

    return (
        <Box>
            <FormControl fullWidth margin="dense">

                <Controller
                    name="type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            {...field}
                            native
                            onChange={(e) => {
                                field.onChange(e);
                                handleTypeChange(e);
                            }}
                            inputProps={{
                                id: 'type-select',
                            }}
                        >
                            <option value="">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </Select>
                    )}
                />
            </FormControl>
            <FormControl fullWidth margin="dense">

                <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            {...field}
                            native
                            onChange={(e) => {
                                field.onChange(e);
                                handleCategoryChange(e);
                            }}
                            inputProps={{
                                id: 'category-select',
                            }}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>
        </Box>
    );
};

export default TransactionFilters;
