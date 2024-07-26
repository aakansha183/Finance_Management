import React, { useState } from "react";
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
import * as yup from "yup";
import { useFormik, FormikErrors } from "formik";
import { validationSchemaLogin } from "../utils/validationSchema/validationSchema";
import { LoginFormValues } from "../utils/interface/types";
const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const success = await login(values.username, values.password);
        if (success) {
          navigate("/dashboard");
          toast.success("Successfully Logged In");
        } else {
          setError("Invalid username or password");
        }
      } catch (err) {
        setError("Invalid username or password.");
      } finally {
        setSubmitting(false);
      }
    },
    validate: async (values) => {
      try {
        await validationSchemaLogin.validate(values, { abortEarly: false });
        return {};
      } catch (validationErrors) {
        const errors: FormikErrors<LoginFormValues> = {};
        if (validationErrors instanceof yup.ValidationError) {
          validationErrors.inner.forEach((error) => {
            if (error.path) {
              (errors as FormikErrors<LoginFormValues>)[error.path as keyof LoginFormValues] = error.message;
            }
          });
        }
        return errors;
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: "16px", marginTop: "50px" }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src="/brand.png"
            alt="PennyPinch Logo"
            style={{ width: "100px", height: "auto", marginBottom: "16px" }}
          />
         
         

          <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: "8px" }}>
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
          {error && (
            <Typography variant="body1" color="error" style={{ marginTop: "1rem" }}>
              {error}
            </Typography>
          )}
          <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
            <Grid item>
              Don’t have an account?{" "}
              <Link component="button" variant="body2" onClick={() => navigate("/register")}>
                Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
export default Login;
