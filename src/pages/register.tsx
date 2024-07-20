import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Container,
  Grid,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik, FormikErrors } from "formik";
import { User, FormData } from "../utils/interface/types";
import { validationSchema } from "../utils/validationSchema/validationSchema";


const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState<string>("");

  const formik = useFormik<FormData>({
    initialValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const newUser: User = {
          id: Date.now().toString(),
          username: values.username,
          password: values.password,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
        };

        await register(newUser);
        toast.success("Successfully Registered");
        navigate("/login");
      } catch (err) {
        if (err instanceof Error) {
          setRegistrationError(err.message);
        } else {
          setRegistrationError("An unknown error occurred");
        }
      } finally {
        setSubmitting(false);
      }
    },
    validate: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        return {};
      } catch (validationErrors) {
        const errors: FormikErrors<FormData> = {};
        if (validationErrors instanceof yup.ValidationError) {
          validationErrors.inner.forEach((error) => {
            if (error.path) {
              (errors as FormikErrors<FormData>)[error.path as keyof FormData] = error.message;
            }
          });
        }
        return errors;
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} style={{ padding: "16px", marginTop: "16px" }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ marginTop: "6px" }}
          >
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
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
                  disabled={formik.isSubmitting}
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
