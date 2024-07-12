import React, { useState } from 'react';
import * as yup from 'yup';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { User } from '../types/User';

const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
});

const Register: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
    });

    const [registrationError, setRegistrationError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            const newUser: User = {
                id: Date.now().toString(),
                username: formData.username,
                password: formData.password,
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
            };

            await register(newUser);
            navigate('/login');
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors: any = {};
                error.inner.forEach(err => {
                    newErrors[err.path as keyof typeof formData] = err.message;
                });
                setErrors(newErrors);
            } else {
                if (error instanceof Error) {
                    setRegistrationError(error.message);
                } else {
                    setRegistrationError('An unknown error occurred');
                }
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.username}
                    onChange={handleChange}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    style={{ marginTop: '1rem' }}
                >
                    Register
                </Button>
                {registrationError && (
                    <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>
                        {registrationError}
                    </Typography>
                )}
            </form>
        </Container>
    );
};

export default Register;