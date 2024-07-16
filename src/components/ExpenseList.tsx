import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Expense } from "../utils/interface/types";

interface Props {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (date: string, userId: string) => void;
}

const ExpenseList: React.FC<Props> = ({ expenses, onEdit, onDelete }) => {
  return (
    <List>
      {expenses.map((expense) => (
        <ListItem
          key={expense.date}
          secondaryAction={
            <>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(expense)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(expense.date, expense.userId)}
              >
                <Delete />
              </IconButton>
            </>
          }
        >
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
