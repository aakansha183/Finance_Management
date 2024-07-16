import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: string;
  color: string;
}

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
