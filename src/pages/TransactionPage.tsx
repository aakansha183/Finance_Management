

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { loadTransactionsFromStorage, setTransactions, Transaction } from '../redux/slice/transactionSlice';
// import { useForm, Controller } from 'react-hook-form';
// import {
//     FormControl,
//     InputLabel,
//     Select,
//     TextField,
//     Box,
//     Typography,
//     SelectChangeEvent
// } from '@mui/material';

// const TransactionHistory: React.FC = () => {
//     const dispatch = useDispatch();
//     const transactions = useSelector((state: RootState) => state.transactions.transactions);
//     const { control } = useForm();
//     const [category, setCategory] = useState('');
//     const [type, setType] = useState('');
//     const [query, setQuery] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             const transactions = await loadTransactionsFromStorage();
//             dispatch(setTransactions(transactions));
//         };

//         fetchData();
//     }, [dispatch]);

//     const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//         setCategory(event.target.value);
//     };

//     const handleTypeChange = (event: SelectChangeEvent<string>) => {
//         setType(event.target.value);
//     };

//     const filteredTransactions = transactions.filter((transaction) => {
//         return (
//             (category ? transaction.category === category : true) &&
//             (type ? transaction.type === type : true)
//         );
//     });

//     const searchedTransactions = filteredTransactions.filter((transaction) => {
//         return transaction.category.includes(query) || transaction.type.includes(query);
//     });

//     return (
//         <Box>
//             <Typography variant="h1">Transaction History</Typography>
//             <Box>
//                 <FormControl>
//                     <InputLabel htmlFor="category-select">Category</InputLabel>
//                     <Controller
//                         name="category"
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                             <Select
//                                 {...field}
//                                 native
//                                 onChange={handleCategoryChange}
//                                 inputProps={{
//                                     id: 'category-select',
//                                 }}
//                             >
//                                 <option value="">All Categories</option>
//                                 <option value="food">Food</option>
//                                 <option value="transport">Transport</option>
//                                 <option value="utilities">Utilities</option>
//                                 <option value="entertainment">Entertainment</option>
//                                 <option value="health">Health</option>
//                             </Select>
//                         )}
//                     />
//                 </FormControl>
//                 <FormControl>
//                     <InputLabel htmlFor="type-select">Type</InputLabel>
//                     <Controller
//                         name="type"
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => (
//                             <Select
//                                 {...field}
//                                 native
//                                 onChange={handleTypeChange}
//                                 inputProps={{
//                                     id: 'type-select',
//                                 }}
//                             >
//                                 <option value="">All Types</option>
//                                 <option value="income">Income</option>
//                                 <option value="expense">Expense</option>
//                             </Select>
//                         )}
//                     />
//                 </FormControl>
//             </Box>
//             <Box>
//                 <TextField
//                     label="Search"
//                     variant="outlined"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                 />
//             </Box>
//             <TransactionList transactions={searchedTransactions} />
//         </Box>
//     );
// };

// const TransactionList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
//     return (
//         <ul>
//             {transactions.map((transaction, index) => (
//                 <li key={index}>
//                     {transaction.date} - {transaction.category} - ${transaction.amount} ({transaction.type})
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default TransactionHistory;



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { loadTransactionsFromStorage, setTransactions, Transaction } from '../redux/slice/transactionSlice';
// import { useForm } from 'react-hook-form';
// import { Box, Typography } from '@mui/material';
// import TransactionFilters from '../components/TransactionFilters';
// import TransactionSearch from '../components/TransactionSearch';
// import TransactionList from '../components/TransactionList';
// import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent

// const TransactionHistory: React.FC = () => {
//     const dispatch = useDispatch();
//     const transactions = useSelector((state: RootState) => state.transactions.transactions);
//     const { control } = useForm();
//     const [category, setCategory] = useState<string>('');
//     const [type, setType] = useState<string>('');
//     const [query, setQuery] = useState<string>('');

//     useEffect(() => {
//         const fetchData = async () => {
//             const transactions = await loadTransactionsFromStorage();
//             dispatch(setTransactions(transactions));
//         };

//         fetchData();
//     }, [dispatch]);

//     const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//         setCategory(event.target.value);
//     };

//     const handleTypeChange = (event: SelectChangeEvent<string>) => {
//         setType(event.target.value);
//     };

//     const filteredTransactions = transactions.filter((transaction) => {
//         return (
//             (category ? transaction.category === category : true) &&
//             (type ? transaction.type === type : true)
//         );
//     });

//     const searchedTransactions = filteredTransactions.filter((transaction) => {
//         return transaction.category.includes(query) || transaction.type.includes(query);
//     });

//     return (
//         <Box>
//             <Typography variant="h1">Transaction History</Typography>
//             <TransactionFilters
//                 control={control}
//                 handleCategoryChange={handleCategoryChange}
//                 handleTypeChange={handleTypeChange}
//             />
//             <TransactionSearch query={query} setQuery={setQuery} />
//             <TransactionList transactions={searchedTransactions} />
//         </Box>
//     );
// };

// export default TransactionHistory;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import { setTransactions, loadTransactionsFromStorage } from '../redux/slice/transactionSlice';
// import TransactionList from '../components/TransactionList';
// import TransactionFilters from '../components/TransactionFilters';
// import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent
// import { useForm, SubmitHandler, Control } from 'react-hook-form'; // Import Control

// const TransactionHistory: React.FC = () => {
//     const dispatch = useDispatch();
//     const transactions = useSelector((state: RootState) => state.transactions.transactions);
//     const { control, handleSubmit } = useForm(); // Initialize useForm hook

//     const [category, setCategory] = useState<string>('');
//     const [type, setType] = useState<string>('');

//     useEffect(() => {
//         const fetchData = async () => {
//             const transactions = await loadTransactionsFromStorage();
//             dispatch(setTransactions(transactions));
//         };

//         fetchData();
//     }, [dispatch]);

//     const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//         setCategory(event.target.value);
//     };

//     const handleTypeChange = (event: SelectChangeEvent<string>) => {
//         setType(event.target.value);
//     };

//     const filteredTransactions = transactions.filter((transaction) => {
//         return (
//             (!type || transaction.type === type) &&
//             (!category || transaction.category === category)
//         );
//     });

//     return (
//         <div>
//             <h1>Transaction History</h1>
//             <TransactionFilters
//                 control={control} // Pass control prop here
//                 handleCategoryChange={handleCategoryChange}
//                 handleTypeChange={handleTypeChange}
//             />
//             <TransactionList transactions={filteredTransactions} />
//         </div>
//     );
// };

// export default TransactionHistory;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import {
//     setTransactions,
//     loadTransactionsFromStorage,
// } from '../redux/slice/transactionSlice';
// import TransactionList from '../components/TransactionList';
// import TransactionFilters from '../components/TransactionFilters';
// import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent
// import { useForm, SubmitHandler, Control } from 'react-hook-form'; // Import Control

// const TransactionHistory: React.FC = () => {
//     const dispatch = useDispatch();
//     const transactions = useSelector(
//         (state: RootState) => state.transactions.transactions
//     );
//     const { control, handleSubmit } = useForm(); // Initialize useForm hook

//     const [category, setCategory] = useState<string>('');
//     const [type, setType] = useState<string>(''); // State to track type (income or expense)

//     useEffect(() => {
//         const fetchData = async () => {
//             const transactions = await loadTransactionsFromStorage();
//             dispatch(setTransactions(transactions));
//         };

//         fetchData();
//     }, [dispatch]);

//     const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//         setCategory(event.target.value);
//     };

//     const handleTypeChange = (event: SelectChangeEvent<string>) => {
//         setType(event.target.value); // Update type state on type change
//     };

//     const filteredTransactions = transactions.filter((transaction) => {
//         return (
//             (!type || transaction.type === type) &&
//             (!category || transaction.category === category)
//         );
//     });

//     return (
//         <div>
//             <h1>Transaction History</h1>
//             <TransactionFilters
//                 control={control}
//                 handleCategoryChange={handleCategoryChange}
//                 handleTypeChange={handleTypeChange}
//                 type={type} // Pass type state to TransactionFilters
//             />
//             <TransactionList transactions={filteredTransactions} />
//         </div>
//     );
// };

// export default TransactionHistory;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import {
//     setTransactions,
//     loadTransactionsFromStorage,
// } from '../redux/slice/transactionSlice';
// import TransactionList from '../components/TransactionList';
// import TransactionFilters from '../components/TransactionFilters';
// import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent
// import { useForm, SubmitHandler, Control } from 'react-hook-form'; // Import Control

// const TransactionHistory: React.FC = () => {
//     const dispatch = useDispatch();
//     const transactions = useSelector(
//         (state: RootState) => state.transactions.transactions
//     );
//     const { control, handleSubmit } = useForm(); // Initialize useForm hook

//     const [category, setCategory] = useState<string>('');
//     const [type, setType] = useState<string>(''); // State to track type (income or expense)

//     useEffect(() => {
//         const fetchData = async () => {
//             const transactions = await loadTransactionsFromStorage();
//             dispatch(setTransactions(transactions));
//         };

//         fetchData();
//     }, [dispatch]);

//     const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//         setCategory(event.target.value);
//     };

//     const handleTypeChange = (event: SelectChangeEvent<string>) => {
//         setType(event.target.value); // Update type state on type change
//         setCategory(''); // Reset category when type changes
//     };

//     const filteredTransactions = transactions.filter((transaction) => {
//         if (type === 'income') {
//             return (!category || transaction.category === category) && transaction.type === 'income';
//         } else if (type === 'expense') {
//             return (!category || transaction.category === category) && transaction.type === 'expense';
//         } else {
//             return true; // Show all transactions if no type is selected
//         }
//     });

//     return (
//         <div>
//             <h1>Transaction History</h1>
//             <TransactionFilters
//                 control={control}
//                 handleCategoryChange={handleCategoryChange}
//                 handleTypeChange={handleTypeChange}
//                 type={type} // Pass type state to TransactionFilters
//             />
//             <TransactionList transactions={filteredTransactions} />
//         </div>
//     );
// };

// export default TransactionHistory;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import {
//     setTransactions,
//     loadTransactionsFromStorage,
// } from '../redux/slice/transactionSlice';
// import TransactionList from '../components/TransactionList';
// import TransactionFilters from '../components/TransactionFilters';
// import TransactionSearch from '../components/TransactionSearch';
// import { SelectChangeEvent } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { Box, Card, CardContent, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const Container = styled(Box)({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '20px 0',
//     padding: '20px',
//     backgroundImage: 'url("/transaction.jpg")', // Path to the background image
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     minHeight: '100vh', // Ensures it covers the entire viewport height
// });

// const StyledCard = styled(Card)({
//     width: '90%',
//     maxWidth: '600px',
//     margin: '20px 0',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background for the card
// });

// const Title = styled(Typography)({
//     textAlign: 'center',
//     margin: '20px 0',

// });

// const TransactionHistory: React.FC = () => {
//     const dispatch = useDispatch();
//     const transactions = useSelector(
//         (state: RootState) => state.transactions.transactions
//     );
//     const { control } = useForm();

//     const [category, setCategory] = useState<string>('');
//     const [type, setType] = useState<string>('');
//     const [query, setQuery] = useState<string>(''); // Add state for search query

//     useEffect(() => {
//         const fetchData = async () => {
//             const transactions = await loadTransactionsFromStorage();
//             dispatch(setTransactions(transactions));
//         };

//         fetchData();
//     }, [dispatch]);

//     const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//         setCategory(event.target.value);
//     };

//     const handleTypeChange = (event: SelectChangeEvent<string>) => {
//         setType(event.target.value);
//         setCategory('');
//     };

//     const filteredTransactions = transactions.filter((transaction) => {
//         const matchesType = type ? transaction.type === type : true;
//         const matchesCategory = category ? transaction.category === category : true;
//         const matchesQuery = transaction.category.toLowerCase().includes(query.toLowerCase());

//         return matchesType && matchesCategory && matchesQuery;
//     });

//     return (
//         <Container>
//             <Title variant="h4">Transaction History</Title>
//             <StyledCard>
//                 <CardContent>
//                     <TransactionSearch query={query} setQuery={setQuery} />
//                 </CardContent>
//             </StyledCard>
//             <StyledCard>
//                 <CardContent>
//                     <TransactionFilters
//                         control={control}
//                         handleCategoryChange={handleCategoryChange}
//                         handleTypeChange={handleTypeChange}
//                         type={type}
//                     />
//                 </CardContent>
//             </StyledCard>
//             <StyledCard>
//                 <CardContent>
//                     <TransactionList transactions={filteredTransactions} />
//                 </CardContent>
//             </StyledCard>
//         </Container>
//     );
// };

// export default TransactionHistory;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import {
//     setTransactions,
//     loadTransactionsFromStorage,
// } from '../redux/slice/transactionSlice';
// import TransactionList from '../components/TransactionList';
// import TransactionFilters from '../components/TransactionFilters';
// import TransactionSearch from '../components/TransactionSearch';
// import { SelectChangeEvent } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { Box, Card, CardContent, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const Container = styled(Box)({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '20px 0',
//     padding: '20px',
//     // backgroundImage: 'url("/transaction.jpg")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     minHeight: '100vh',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add opaque background color
// });

// const ContentWrapper = styled(Box)({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     height: '100%',
//     overflowY: 'auto',
//     padding: '20px 0',
// });

// const StyledCard = styled(Card)(({ theme }) => ({
//     width: '90%',
//     maxWidth: '600px',
//     margin: '10px 0',
//     backgroundColor: '#F6F6F6',
//     opacity: 0.9,
// }));


// const Title = styled(Typography)({
//     textAlign: 'center',
//     margin: '10px 0',
//     color: 'black',
// });

// const TransactionHistory: React.FC = () => {
//     const dispatch = useDispatch();
//     const transactions = useSelector(
//         (state: RootState) => state.transactions.transactions
//     );
//     const { control } = useForm();

//     const [category, setCategory] = useState<string>('');
//     const [type, setType] = useState<string>('');
//     const [query, setQuery] = useState<string>('');

//     useEffect(() => {
//         const fetchData = async () => {
//             const transactions = await loadTransactionsFromStorage();
//             dispatch(setTransactions(transactions));
//         };

//         fetchData();
//     }, [dispatch]);

//     const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//         setCategory(event.target.value);
//     };

//     const handleTypeChange = (event: SelectChangeEvent<string>) => {
//         setType(event.target.value);
//         setCategory('');
//     };

//     const filteredTransactions = transactions.filter((transaction) => {
//         const matchesType = type ? transaction.type === type : true;
//         const matchesCategory = category ? transaction.category === category : true;
//         const matchesQuery = transaction.category.toLowerCase().includes(query.toLowerCase());

//         return matchesType && matchesCategory && matchesQuery;
//     });

//     return (
//         <Container>
//             <ContentWrapper>
//                 <Title variant="h4">Transaction History</Title>
//                 <StyledCard>
//                     <CardContent>
//                         <TransactionSearch query={query} setQuery={setQuery} />
//                     </CardContent>


//                     <CardContent>
//                         <TransactionFilters
//                             control={control}
//                             handleCategoryChange={handleCategoryChange}
//                             handleTypeChange={handleTypeChange}
//                             type={type}
//                         />
//                     </CardContent>


//                     <CardContent>
//                         <TransactionList transactions={filteredTransactions} />
//                     </CardContent>
//                 </StyledCard>
//             </ContentWrapper>
//         </Container>
//     );
// };

// export default TransactionHistory;


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setTransactions,
    loadTransactionsFromStorage,
} from '../redux/slice/transactionSlice';
import TransactionList from '../components/TransactionList';
import TransactionFilters from '../components/TransactionFilters';
import TransactionSearch from '../components/TransactionSearch';
import { SelectChangeEvent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../components/Layout';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    padding: '20px',
    // backgroundImage: 'url("/transaction.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
});

const ContentWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px 0',
});

const StyledCard = styled(Card)(({ theme }) => ({
    width: '90%',
    maxWidth: '600px',
    margin: '10px 0',
    backgroundColor: 'white',
    opacity: 0.9,
}));

const Title = styled(Typography)({
    textAlign: 'center',
    margin: '10px 0',
    color: 'black',
});

const TransactionHistory: React.FC = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(
        (state: RootState) => state.transactions.transactions
    );
    const { control } = useForm();

    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const transactions = await loadTransactionsFromStorage();
            dispatch(setTransactions(transactions));
        };

        fetchData();
    }, [dispatch]);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
    };

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setType(event.target.value);
        setCategory('');
    };

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesType = type ? transaction.type === type : true;
        const matchesCategory = category ? transaction.category === category : true;
        const matchesQuery = transaction.category.toLowerCase().includes(query.toLowerCase());

        return matchesType && matchesCategory && matchesQuery;
    });

    return (
        <Layout>
            <Container>
                <ContentWrapper>

                    <StyledCard>
                        <Title variant="h4">Transaction History</Title>
                        <CardContent>
                            <TransactionSearch query={query} setQuery={setQuery} />
                        </CardContent>
                        <CardContent>
                            <TransactionFilters
                                control={control}
                                handleCategoryChange={handleCategoryChange}
                                handleTypeChange={handleTypeChange}
                                type={type}
                            />
                        </CardContent>
                        <CardContent>
                            <TransactionList transactions={filteredTransactions} />
                        </CardContent>
                    </StyledCard>
                </ContentWrapper>
            </Container>
        </Layout>
    );
};

export default TransactionHistory;
