
import React from "react";
import {
  ListItem,
  ListItemText,
  LinearProgress,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BudgetFormInput } from "../utils/interface/types";


interface BudgetListItemProps {
  budget: BudgetFormInput;
  onEdit: (budget: BudgetFormInput) => void;
  onDelete: (category: string) => void;
}


const BudgetListItem: React.FC<BudgetListItemProps> = ({
  budget,
  onEdit,
  onDelete,
}) => {
  return (
    <ListItem
      style={{
        marginBottom: "10px",
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "10px",
        position: "relative",
      }}
    >

      <ListItemText
        primary={`Category: ${budget.category}`}
        secondary={
          <>
            <div>Amount Set: ${budget.amountSet}</div>
            <div>Amount Spent: ${budget.amountSpent}</div>
          </>
        }
      />

      <LinearProgress
        variant="determinate"
        value={(budget.amountSpent / budget.amountSet) * 100}
        style={{ marginTop: "5px" }}
      />
      <IconButton
        onClick={() => onEdit(budget)}
        style={{ position: "absolute", right: "50px" }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => onDelete(budget.category)}
        style={{ position: "absolute", right: "10px" }}
      >

        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default BudgetListItem;
