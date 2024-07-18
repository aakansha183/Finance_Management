import React from "react";
import { Button, Container, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url("/backgroundimg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "86.7vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "Black",
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, sm: 6, md: 8 },
        overflow:"hidden",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            mb: 2,
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            fontWeight: "bold",
          }}
        >
          Welcome to Finance Management
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          Manage your finances effortlessly. Kindly login or register to get started.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1, sm: 1.5, md: 1.3 },
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1, sm: 1.5, md: 1.3 },
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Features
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Income Tracking
                </Typography>
                <Typography>
                  Keep track of your income from various sources.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Expense Management
                </Typography>
                <Typography>
                  Monitor and categorize your expenses to manage your budget effectively.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Transaction History
                </Typography>
                <Typography>
                  View and analyze your past transactions with ease.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Budget Planning
                </Typography>
                <Typography>
                  Plan and maintain your budget to achieve your financial goals.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Dashboard
                </Typography>
                <Typography>
                  Get a comprehensive overview of your financial status at a glance.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
