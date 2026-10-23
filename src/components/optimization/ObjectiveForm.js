"use client";

import { Box, Stack, Typography } from "@mui/material";

import { FormSelect, useFormContext } from "@/component/myForm";

import {
  ExpressionRow,
  LinearTerms,
  MathText,
  SectionCard,
} from "./ui";

const DIRECTION_OPTIONS = [
  { value: "max", label: "بیشینه‌سازی (Max)" },
  { value: "min", label: "کمینه‌سازی (Min)" },
];

export default function ObjectiveForm() {
  const { watch } = useFormContext();

  const variables = watch("variables") ?? [];
  const direction = watch("direction");

  return (
    <SectionCard
      step={1}
      title="تابع هدف"
      description="جهت بهینه‌سازی و ضریب هر متغیر در تابع هدف را مشخص کنید."
    >
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{ alignItems: { sm: "center" } }}
        >
          <Typography
            component="label"
            variant="subtitle2"
            sx={{ minWidth: 120 }}
          >
            جهت بهینه‌سازی
          </Typography>

          <Box sx={{ width: { xs: "100%", sm: 240 } }}>
            <FormSelect
              name="direction"
              options={DIRECTION_OPTIONS}
              required
            />
          </Box>
        </Stack>

        <Box
          sx={{
            p: 2,
            borderRadius: "10px",
            bgcolor: "grey.50",
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <ExpressionRow>
            <MathText sx={{ color: "text.primary", fontWeight: 700 }}>
              {direction === "min" ? "min" : "max"}&nbsp;&nbsp;Z =
            </MathText>

            <LinearTerms
              variables={variables}
              namePrefix="objective.coefficients"
            />
          </ExpressionRow>
        </Box>
      </Stack>
    </SectionCard>
  );
}
