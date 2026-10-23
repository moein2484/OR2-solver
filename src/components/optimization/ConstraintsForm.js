"use client";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import {
  FormNumber,
  FormSelect,
  useFormContext,
} from "@/component/myForm";

import { ExpressionRow, LinearTerms, SectionCard } from "./ui";

// علامت‌های ≤ و ≥ در متن راست‌به‌چپ آینه‌ای نمایش داده می‌شوند؛
// با LRI/PDI جهتشان چپ‌به‌راست ثابت می‌شود
const OPERATOR_OPTIONS = [
  { value: "<=", label: "⁦≤⁩" },
  { value: ">=", label: "⁦≥⁩" },
  { value: "=", label: "=" },
];

const rhsInputStyles = {
  input: { direction: "ltr", textAlign: "center", paddingInline: 8 },
};

export default function ConstraintsForm() {
  const { watch, getValues, setValue } = useFormContext();

  const variables = watch("variables") ?? [];
  const constraints = watch("constraints") ?? [];

  function addConstraint() {
    const current = getValues();

    const newConstraint = {
      id: crypto.randomUUID(),
      coefficients: Array(current.variables.length).fill(0),
      operator: "<=",
      rhs: 0,
    };

    setValue("constraints", [
      ...current.constraints,
      newConstraint,
    ]);
  }

  function removeConstraint(index) {
    const current = getValues();

    setValue(
      "constraints",
      current.constraints.filter((_, i) => i !== index)
    );
  }

  return (
    <SectionCard
      step={3}
      title="محدودیت‌ها"
      description="ضرایب سمت چپ، نوع نامساوی و مقدار سمت راست هر محدودیت."
      action={
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={addConstraint}
        >
          افزودن محدودیت
        </Button>
      }
    >
      {constraints.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          هنوز محدودیتی اضافه نشده است.
        </Typography>
      ) : (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {constraints.map((constraint, constraintIndex) => (
            <Stack
              key={constraint.id}
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.5, sm: 2 }}
              sx={{ alignItems: { sm: "center" } }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ minWidth: 64, fontWeight: 600 }}
              >
                محدودیت {constraintIndex + 1}
              </Typography>

              <ExpressionRow>
                <LinearTerms
                  variables={variables}
                  namePrefix={`constraints.${constraintIndex}.coefficients`}
                />

                <Box sx={{ width: 76 }}>
                  <FormSelect
                    name={`constraints.${constraintIndex}.operator`}
                    options={OPERATOR_OPTIONS}
                    required
                  />
                </Box>

                <Box sx={{ width: 96 }}>
                  <FormNumber
                    name={`constraints.${constraintIndex}.rhs`}
                    step="any"
                    required
                    requiredMessage="الزامی"
                    styles={rhsInputStyles}
                  />
                </Box>
              </ExpressionRow>
            </Stack>
          ))}
        </Stack>
      )}
    </SectionCard>
  );
}
