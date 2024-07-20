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
  const amountSet = parseInt(budget.amountSet);
  const progress = isNaN(amountSet) || amountSet === 0 ? 0 : 100;

  return (
    <ListItem
      style={{
        marginBottom: "10px",
        backgroundColor: "#F5F5F5",
        borderRadius: "5px",
        padding: "10px",
        position: "relative",
      }}
    >
      <ListItemText
        primary={`Category: ${budget.category}`}
        secondary={`Amount Set: $${budget.amountSet}`}
      />
      <LinearProgress
        variant="determinate"
        value={progress}
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


