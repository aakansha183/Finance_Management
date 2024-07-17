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
        textAlign: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 4, sm: 6, md: 6 },
        }}
      >
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            color: "black",
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
          }}
        >
          Welcome to Finance Management
        </Typography>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            color: "black",
            mb: { xs: 2, sm: 3, md: 1 },
            fontSize: {
              xs: "0.875rem",
              sm: "1rem",
              md: "1.25rem",
              lg: "1.5rem",
            },
          }}
        >
          Kindly login or register
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
      </Container>
    </Box>
  );
};

export default HomePage;
