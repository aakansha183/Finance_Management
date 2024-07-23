import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { TransactionSearchProps } from '../utils/interface/types';


const TransactionSearch: React.FC<TransactionSearchProps> = ({ query, setQuery }) => {
    return (
        <Box>
            <TextField
                label="Search"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
                margin="dense"
            />
        </Box>
    );
};

export default TransactionSearch;
