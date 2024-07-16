import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { User } from "../utils/interface/types";
import { updateUser, setUser } from "../redux/slice/userslice";
import Layout from "./Layout";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const [formData, setFormData] = useState<User>({
    id: "",
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (currentUser) {
      if (id && currentUser.id === id) {
        setFormData(currentUser);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, currentUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await dispatch(updateUser(formData));
        dispatch(setUser(formData));
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

  if (!currentUser) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Layout>
      <Container maxWidth="xs">
        <Paper elevation={3} style={{ padding: "10px" }}>
          <Typography variant="h4" gutterBottom align="center">
            Profile
          </Typography>
          <TextField
            fullWidth
            margin="dense"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="dense"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "16px" }}
          >
            Save Changes
          </Button>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Profile;
