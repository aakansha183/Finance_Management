import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { updateUser, setUser } from "../redux/slice/userslice";
import Layout from "./Layout";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileFormData, User } from "../utils/interface/types";
import { validationSchemaForProfile } from "../utils/validationSchema/validationSchema";


const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );

  useEffect(() => {
    if (!currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      password: currentUser?.password || "",
    },
    resolver: yupResolver(validationSchemaForProfile),
  });

  useEffect(() => {
    if (currentUser) {
      setValue("username", currentUser.username);
      setValue("email", currentUser.email);
      setValue("firstName", currentUser.firstName);
      setValue("lastName", currentUser.lastName);
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      if (currentUser?.id) {
        const updatedUser: User = {
          id: currentUser.id,
          username: data.username,
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        };

        await dispatch(updateUser(updatedUser));
        dispatch(setUser(updatedUser));
        toast.success("Profile updated successfully");
        navigate("/dashboard");
      } else {
        toast.error("User ID is missing");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Layout>
      <Container maxWidth="xs">
        <Paper elevation={3} style={{ padding: "10px" }}>
          <Typography variant="h4" gutterBottom align="center">
            Profile
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="dense"
                  label="Username"
                  {...field}
                  variant="outlined"
                  disabled
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="dense"
                  label="Email"
                  {...field}
                  variant="outlined"
                  disabled
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="dense"
                  label="First Name"
                  {...field}
                  variant="outlined"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="dense"
                  label="Last Name"
                  {...field}
                  variant="outlined"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="dense"
                  label="Password"
                  type="password"
                  {...field}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "16px" }}
            >
              Save Changes
            </Button>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Profile;
