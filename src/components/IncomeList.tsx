
import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Income } from '../types/Income';

interface Props {
  incomes: Income[];
  onEdit: (income: Income) => void;
  onDelete: (date: string, userId: string) => void;
}

const IncomeList: React.FC<Props> = ({ incomes, onEdit, onDelete }) => {
  return (
    <List>
      {incomes.map((income) => (
        <ListItem key={income.date} secondaryAction={
          <>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(income)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(income.date, income.userId)}>
              <Delete />
            </IconButton>
          </>
        }>
          <ListItemText
            primary={`${income.amount} - ${income.source}`}
            secondary={income.date}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default IncomeList;

