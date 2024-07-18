import React from 'react';
import { List, ListItemText, IconButton, Paper, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Income } from '../utils/interface/types';

interface IncomeListProps {
  incomes: Income[];
  onEdit: (income: Income) => void;
  onDelete: (date: string, userId: string) => void;
}

const IncomeList: React.FC<IncomeListProps> = ({ incomes, onEdit, onDelete }) => {
  return (
    <List>
      {incomes.map((income) => (
        <Paper
          key={income.date}
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
              primary={`Amount: $${income.amount}`}
              secondary={`Source: ${income.source} | Date: ${income.date}`}
            />
            <Box>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(income)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(income.date, income.userId)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
    </List>
  );
};

export default IncomeList;

