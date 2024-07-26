import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  setTransactions,
  loadTransactionsFromStorage,
} from "../redux/slice/transactionSlice";
import TransactionList from "../components/TransactionList";
import TransactionFilters from "../components/TransactionFilters";
import TransactionSearch from "../components/TransactionSearch";
import { CircularProgress, SelectChangeEvent } from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Layout from "../components/Layout";
import { delayPromise } from "../utils/Delay/DelayPromise";
const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "65vh",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
});
const ContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});
const StyledCard = styled(Card)(({ theme }) => ({
  width: "90%",
  maxWidth: "600px",
  backgroundColor: "white",
  opacity: 0.9,
}));
const Title = styled(Typography)({
  textAlign: "center",
  margin: "3px ",
  color: "black",
});
const TransactionHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const { control } = useForm();
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const transactions = await loadTransactionsFromStorage();
      await delayPromise();
      setIsLoading(false);
      dispatch(setTransactions(transactions));
    };
    fetchData();
  }, [dispatch]);
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
    setCategory("");
  };
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = type ? transaction.type === type : true;
    const matchesCategory = category ? transaction.category === category : true;
    const matchesQuery = transaction.category
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesUser = transaction.userId === currentUser?.id;
    return matchesType && matchesCategory && matchesQuery && matchesUser;
  });
  return (
    <Layout>
      <Container>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
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
        )}
      </Container>
    </Layout>
  );
};
export default TransactionHistory;
