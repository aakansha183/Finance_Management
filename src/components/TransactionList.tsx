import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TransactionListProps } from '../utils/interface/types';


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
