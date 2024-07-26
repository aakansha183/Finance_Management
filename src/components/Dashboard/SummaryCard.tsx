import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { SummaryCardProps } from "../../utils/interface/types";


const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, color }) => {
  return (
    <Card
      sx={{
        backgroundColor: color,
        color: "white",
        textAlign: "center",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
