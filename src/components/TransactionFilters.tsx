


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
