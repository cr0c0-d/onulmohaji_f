import React from "react";
import { Typography, Container } from "@mui/material";

export default function Footer() {
  return (
    <Container maxWidth="md" style={{ marginTop: "auto", padding: "20px 0" }}>
      <Typography variant="body1" color="textSecondary" align="center">
        © 2024 onulmohaji
      </Typography>
    </Container>
  );
}
