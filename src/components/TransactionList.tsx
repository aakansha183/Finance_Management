import React from 'react';

import {
    List,
    ListItem,
    ListItemText,
    Box,
    Typography,
} from '@mui/material';
import { Transaction } from '../utils/interface/types';

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    return (
        <Box>
            {transactions.length === 0 ? (
                <Typography sx={{ textAlign: 'center', padding: '20px' }}>No data found</Typography>
            ) : (
                <List>
                    {transactions.map((transaction, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                backgroundColor: '#F5F5F5',
                                marginBottom: '10px',
                                borderRadius: '8px'
                            }}
                        >
                            <ListItemText
                                primaryTypographyProps={{ sx: { color: 'balck' } }}
                                secondaryTypographyProps={{ sx: { color: 'black' } }}
                                primary={`${transaction.date} - ${transaction.category}`}
                                secondary={`$${transaction.amount} (${transaction.type})`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default TransactionList;
