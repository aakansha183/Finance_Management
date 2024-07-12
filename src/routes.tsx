import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Login from './pages/loginpage';
import Register from './pages/register';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

    

  

export default AppRoutes;
