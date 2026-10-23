
"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";

import {
  FormNumber,
  useFormContext,
} from "@/component/myForm";

export default function ObjectiveForm() {
  const { watch } = useFormContext();

  const variables = watch("variables") ?? [];
  const direction = watch("direction");

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography fontWeight={700}>تابع هدف</Typography>

        <Box
          dir="ltr"
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Typography fontWeight={800}>
            {direction === "min" ? "Min" : "Max"} Z =
          </Typography>

          {variables.map((variable, index) => (
            <Box
              key={variable.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {index > 0 && <Typography>+</Typography>}

              <Box sx={{ width: 76 }}>
                <FormNumber
                  name={`objective.coefficients.${index}`}
                  step="any"
                  required
                />
              </Box>

              <Typography fontWeight={700}>
                x<sub>{index + 1}</sub>
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Paper>
  );
}
