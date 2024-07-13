// components/ExpenseList.tsx
import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Expense } from '../types/Expense';

interface Props {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpenseList: React.FC<Props> = ({ expenses, onEdit, onDelete }) => {
  return (
    <List>
      {expenses.map((expense) => (
        <ListItem key={expense.id} secondaryAction={
          <>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(expense)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(expense.id)}>
              <Delete />
            </IconButton>
          </>
        }>
          <ListItemText
            primary={`${expense.amount} - ${expense.category}`}
            secondary={expense.date}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ExpenseList;
