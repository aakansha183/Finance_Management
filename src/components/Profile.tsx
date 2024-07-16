import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { User } from "../utils/interface/types";
import { getUserFromLocalStorage, updateUser } from "../redux/slice/userslice";
import Layout from "./Layout";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    id: "",
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          const userData = await getUserFromLocalStorage();
          //console.log("=>:", userData);
          if (userData) {
            setUser(userData);
            setFormData(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateUser(formData);
        setUser(formData);
        toast.success("Successfully Changes");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
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
