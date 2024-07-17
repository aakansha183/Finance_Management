// import React from 'react';
// import { Transaction } from '../redux/slice/transactionSlice';
// import { List, ListItem, ListItemText } from '@mui/material';

// interface TransactionListProps {
//     transactions: Transaction[];
// }

// const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
//     return (
//         <List>
//             {transactions.map((transaction, index) => (
//                 <ListItem key={index}>
//                     <ListItemText
//                         primary={`${transaction.date} - ${transaction.category}`}
//                         secondary={`$${transaction.amount} (${transaction.type})`}
//                     />
//                 </ListItem>
//             ))}
//         </List>
//     );
// };

// export default TransactionList;


// import React from 'react';
// import { Transaction } from '../redux/slice/transactionSlice';
// import {
//     List,
//     ListItem,
//     ListItemText,
//     Card,
//     CardContent,
//     Typography,
// } from '@mui/material';

// interface TransactionListProps {
//     transactions: Transaction[];
// }

// const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
//     return (
//         <Card>
//             <CardContent>
//                 <Typography variant="h6">Transactions</Typography>
//                 <List>
//                     {transactions.map((transaction, index) => (
//                         <ListItem key={index}>
//                             <ListItemText
//                                 primary={`${transaction.date} - ${transaction.category}`}
//                                 secondary={`$${transaction.amount} (${transaction.type})`}
//                             />
//                         </ListItem>
//                     ))}
//                 </List>
//             </CardContent>
//         </Card>
//     );
// };

// export default TransactionList;


// import React from 'react';
// import { Transaction } from '../redux/slice/transactionSlice';
// import {
//     List,
//     ListItem,
//     ListItemText,
//     Box,
// } from '@mui/material';

// interface TransactionListProps {
//     transactions: Transaction[];
// }

// const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
//     return (
//         <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
//             <List>
//                 {transactions.map((transaction, index) => (
//                     <ListItem key={index}>
//                         <ListItemText
//                             primary={`${transaction.date} - ${transaction.category}`}
//                             secondary={`$${transaction.amount} (${transaction.type})`}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );
// };

// export default TransactionList;

// import React from 'react';
// import { Transaction } from '../redux/slice/transactionSlice';
// import {
//     List,
//     ListItem,
//     ListItemText,
//     Box,
//     Typography,
// } from '@mui/material';

// interface TransactionListProps {
//     transactions: Transaction[];
// }

// const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
//     return (
//         <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
//             {transactions.length === 0 ? (
//                 <Typography sx={{ textAlign: 'center', padding: '20px' }}>No data found</Typography>
//             ) : (
//                 <List>
//                     {transactions.map((transaction, index) => (
//                         <ListItem key={index} sx={{ backgroundColor: '#939393', marginBottom: '10px' }}>
//                             <ListItemText
//                                 primaryTypographyProps={{ sx: { color: 'white' } }}
//                                 secondaryTypographyProps={{ sx: { color: 'white' } }}
//                                 primary={`${transaction.date} - ${transaction.category}`}
//                                 secondary={`$${transaction.amount} (${transaction.type})`}
//                             />
//                         </ListItem>
//                     ))}
//                 </List>
//             )}
//         </Box>
//     );
// };

// export default TransactionList;


// import React from 'react';
// import { Transaction } from '../redux/slice/transactionSlice';
// import {
//     List,
//     ListItem,
//     ListItemText,
//     Box,
//     Typography,
// } from '@mui/material';

// interface TransactionListProps {
//     transactions: Transaction[];
// }

// const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
//     return (
//         <Box>
//             {transactions.length === 0 ? (
//                 <Typography sx={{ textAlign: 'center', padding: '20px' }}>No data found</Typography>
//             ) : (
//                 <List>
//                     {transactions.map((transaction, index) => (
//                         <ListItem key={index} sx={{ backgroundColor: '#2C2C2C', marginBottom: '10px' }}>
//                             <ListItemText
//                                 primaryTypographyProps={{ sx: { color: 'white' } }}
//                                 secondaryTypographyProps={{ sx: { color: 'white' } }}
//                                 primary={`${transaction.date} - ${transaction.category}`}
//                                 secondary={`$${transaction.amount} (${transaction.type})`}
//                             />
//                         </ListItem>
//                     ))}
//                 </List>
//             )}
//         </Box>
//     );
// };

// export default TransactionList;


import React from 'react';
import { Transaction } from '../redux/slice/transactionSlice';
import {
    List,
    ListItem,
    ListItemText,
    Box,
    Typography,
} from '@mui/material';

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
