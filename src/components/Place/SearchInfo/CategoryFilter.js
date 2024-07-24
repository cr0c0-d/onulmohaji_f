import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useSearchContext } from "../../../SearchContext";
import { useEffect, useState } from "react";

export default function CategoryFilter({ categoryFilter, setCategoryFilter }) {
  return (
    <div>
      {categoryFilter ? (
        <Box sx={{ padding: "3px" }}>
          <Typography variant="h6" gutterBottom>
            카테고리 필터
          </Typography>
          <FormGroup>
            {categoryFilter.map((category, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={category.visible}
                    onChange={(e) => {
                      const updatedArray = [...categoryFilter];
                      updatedArray[index].visible = e.target.checked;
                      setCategoryFilter(updatedArray);
                    }}
                    name={category.id}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
}
