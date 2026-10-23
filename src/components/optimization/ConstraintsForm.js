"use client";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useFormContext } from "@/component/myForm";

import {
  CenteredNumberInput,
  ExpressionRow,
  LinearTerms,
  OperatorSelect,
  RemoveButton,
  SectionCard,
} from "./ui";

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
          افزودن
        </Button>
      }
    >
      {constraints.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", py: 2 }}
        >
          هنوز محدودیتی اضافه نشده است.
        </Typography>
      ) : (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {constraints.map((constraint, constraintIndex) => (
            <Box
              key={constraint.id}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr auto", sm: "auto 1fr auto" },
                gridTemplateAreas: {
                  xs: '"label remove" "expr expr"',
                  sm: '"label expr remove"',
                },
                alignItems: "center",
                columnGap: 2,
                rowGap: 0.5,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ gridArea: "label", minWidth: { sm: 72 }, fontWeight: 600 }}
              >
                محدودیت {constraintIndex + 1}
              </Typography>

              <Box sx={{ gridArea: "expr", minWidth: 0 }}>
                <ExpressionRow>
                  <LinearTerms
                    variables={variables}
                    namePrefix={`constraints.${constraintIndex}.coefficients`}
                  />

                  <OperatorSelect
                    name={`constraints.${constraintIndex}.operator`}
                  />

                  <CenteredNumberInput
                    name={`constraints.${constraintIndex}.rhs`}
                    width={{ xs: 60, sm: 88 }}
                  />
                </ExpressionRow>
              </Box>

              <Box sx={{ gridArea: "remove" }}>
                <RemoveButton
                  label={`حذف محدودیت ${constraintIndex + 1}`}
                  onClick={() => removeConstraint(constraintIndex)}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </SectionCard>
  );
}
