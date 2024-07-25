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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "black",
        padding: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <img
                src="/brand.png"
                alt="AAA Finance Logo"
                style={{ width: "150px", height: "auto", animation: "bounce 2s infinite" }}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h3"
                sx={{
                  mt: 2,
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                PennyPinch
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            mb: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: "bold",
            animation: "fadeIn 2s",
          }}
        >
          Your Journey to Financial Freedom Starts Here
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 3,
            fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
            animation: "fadeIn 3s",
          }}
        >
          Manage your finances effortlessly. Kindly login or register to get started.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                '&:hover': {
                  backgroundColor: '#0044cc',
                  transform: 'scale(1.05)',
                },
                transition: 'transform 0.2s',
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                '&:hover': {
                  backgroundColor: '#cc0044',
                  transform: 'scale(1.05)',
                },
                transition: 'transform 0.2s',
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
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
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
                  p: 2,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Expense Management
                </Typography>
                <Typography>
                  Monitor and categorize your expenses effectively.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Budget Planning
                </Typography>
                <Typography>
                  Plan and maintain your budget to achieve your financial goals.
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
