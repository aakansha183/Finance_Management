import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Link,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [touched, setTouched] = useState<{
    username: boolean;
    password: boolean;
  }>({ username: false, password: false });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleBlur = (field: "username" | "password") => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const handleChange = (field: "username" | "password", value: string) => {
    if (field === "username") {
      setUsername(value);
    }
    if (field === "password") {
      setPassword(value);
    }
    validateField(field, value);
  };

  const validateField = (field: "username" | "password", value?: string) => {
    let fieldErrors: any = { ...errors };
    try {
      validationSchema.validateSyncAt(field, {
        [field]: value ?? (field === "username" ? username : password),
      });
      delete fieldErrors[field];
    } catch (err: any) {
      fieldErrors[field] = err.message;
    }
    setErrors(fieldErrors);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const isValid = await validationSchema.isValid({ username, password });
      if (!isValid) {
        setTouched({ username: true, password: true });
        return;
      }
      const success = await login(username, password);
      if (success) {
        navigate("/dashboard");
        toast.success("Successfully Logged In"); // Ensure this line is correct
      } else {
        setError("Invalid username or password");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during login.");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url("/backgroundimg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  onBlur={() => handleBlur("username")}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
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
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
