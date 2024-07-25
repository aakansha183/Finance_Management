import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { User, FormData } from "../utils/interface/types";
import { validationSchemaRegister } from "../utils/validationSchema/validationSchema";
const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchemaRegister),
  });
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        username: values.username,
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
      };
      await registerUser(newUser);
      toast.success("Successfully Registered");
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setRegistrationError(err.message);
      } else {
        setRegistrationError("An unknown error occurred");
      }
    }
  };
  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: "16px",
          marginTop: "30px",
          height: "auto",
          maxHeight: "90vh",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ height: "100%" }}
        >
          {/* Branding Section */}
          <img
            src="/brand.png"
            alt="PennyPinch Logo"
            style={{ width: "100px", height: "auto", marginBottom: "16px" }}
          />
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ marginTop: "8px" }}
          >
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  style={{ marginTop: "1rem" }}
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          {registrationError && (
            <Typography
              variant="body1"
              color="error"
              style={{ marginTop: "1rem" }}
              align="center"
            >
              {registrationError}
            </Typography>
          )}
          <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
            <Grid item>
              Already registered?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login")}
              >
                Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
export default Register;
