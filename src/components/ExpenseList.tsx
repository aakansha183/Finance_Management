import React from 'react';
import { List, ListItemText, IconButton, Paper, Box } from '@mui/material';
import {  ExpenseListProps } from '../utils/interface/types';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  return (
    <List>
      {expenses.map((expense) => (
        <Paper
          key={expense.date}
          sx={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ListItemText
              primary={`Amount: $${expense.amount}`}
              secondary={`Category: ${expense.category} | Date: ${expense.date}`}
            />
            <Box>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(expense)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(expense.date, expense.userId)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
    </List>
  );
};

export default ExpenseList;
