"use client";

import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import {
  FormNumber,
  FormSelect,
  useFormContext,
} from "@/component/myForm";

import { SectionCard, VarSymbol } from "./ui";

const TYPE_OPTIONS = [
  { value: "integer", label: "عدد صحیح" },
  { value: "binary", label: "دودویی" },
];

const GRID_COLUMNS = {
  xs: "40px repeat(3, minmax(0, 1fr))",
  sm: "56px minmax(0, 1.2fr) repeat(2, minmax(0, 1fr))",
};

function HeaderCell({ children }) {
  return (
    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
      {children}
    </Typography>
  );
}

export default function VariablesForm() {
  const { watch, getValues, setValue } = useFormContext();

  const variables = watch("variables") ?? [];

  function addVariable() {
    const current = getValues();
    const nextIndex = current.variables.length + 1;

    const newVariable = {
      id: crypto.randomUUID(),
      name: `x${nextIndex}`,
      type: "integer",
      lowerBound: 0,
      upperBound: null,
    };

    const nextVariables = [...current.variables, newVariable];

    const nextObjective = [
      ...current.objective.coefficients,
      0,
    ];

    const nextConstraints = current.constraints.map(
      (constraint) => ({
        ...constraint,
        coefficients: [...constraint.coefficients, 0],
      })
    );

    setValue("variables", nextVariables);
    setValue("objective.coefficients", nextObjective);
    setValue("constraints", nextConstraints);
  }

  function removeVariable(index) {
    const current = getValues();

    if (current.variables.length <= 1) return;

    const nextVariables = current.variables
      .filter((_, i) => i !== index)
      .map((variable, i) => ({
        ...variable,
        name: `x${i + 1}`,
      }));

    const nextObjective = current.objective.coefficients
      .filter((_, i) => i !== index);

    const nextConstraints = current.constraints.map(
      (constraint) => ({
        ...constraint,
        coefficients: constraint.coefficients.filter(
          (_, i) => i !== index
        ),
      })
    );

    setValue("variables", nextVariables);
    setValue("objective.coefficients", nextObjective);
    setValue("constraints", nextConstraints);
  }

  return (
    <SectionCard
      step={2}
      title="متغیرهای تصمیم"
      description="نوع و کران‌های هر متغیر. کران خالی یعنی بدون محدودیت."
      action={
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={addVariable}
        >
          افزودن متغیر
        </Button>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: GRID_COLUMNS,
          alignItems: "center",
          columnGap: { xs: 1, sm: 2 },
          rowGap: 1.5,
        }}
      >
        <HeaderCell>متغیر</HeaderCell>
        <HeaderCell>نوع</HeaderCell>
        <HeaderCell>کران پایین</HeaderCell>
        <HeaderCell>کران بالا</HeaderCell>

        {variables.map((variable, index) => (
          <Box key={variable.id} sx={{ display: "contents" }}>
            <Box
              sx={{
                height: 40,
                display: "grid",
                placeItems: "center",
                borderRadius: "10px",
                bgcolor: "grey.100",
              }}
            >
              <VarSymbol index={index + 1} />
            </Box>

            <FormSelect
              name={`variables.${index}.type`}
              options={TYPE_OPTIONS}
            />

            <FormNumber
              name={`variables.${index}.lowerBound`}
              placeholder="−∞"
              step="any"
            />

            <FormNumber
              name={`variables.${index}.upperBound`}
              placeholder="+∞"
              step="any"
            />
          </Box>
        ))}
      </Box>
    </SectionCard>
  );
}
