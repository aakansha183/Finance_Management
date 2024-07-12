import React from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" align="center" gutterBottom>
                Welcome to Finance Management
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                Kindly login or register
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
