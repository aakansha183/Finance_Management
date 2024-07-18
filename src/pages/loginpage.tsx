import React, { useState } from "react";
import {TextField,
  Button,
  Typography,
  Grid,
  Link,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik, FormikErrors } from "formik";

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
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
        await validationSchema.validate(values, { abortEarly: false });
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
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ marginTop: "8px" }}
          >
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
            <Typography
              variant="body1"
              color="error"
              style={{ marginTop: "1rem" }}
            >
              {error}
            </Typography>
          )}
          <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
            <Grid item>
              Don’t have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/register")}
              >
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

