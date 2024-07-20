import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface TransactionSearchProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

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
