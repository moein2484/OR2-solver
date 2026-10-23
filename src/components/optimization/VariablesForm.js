"use client";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import {
  FormNumber,
  FormSelect,
  useFormContext,
} from "@/component/myForm";

import { RemoveButton, SectionCard, VarSymbol } from "./ui";

const TYPE_OPTIONS = [
  { value: "integer", label: "عدد صحیح" },
  { value: "binary", label: "دودویی" },
];

// دسکتاپ: یک ردیف جدولی | موبایل: دو خط (نماد، نوع، حذف / کران‌ها)
const ROW_GRID = {
  display: "grid",
  gridTemplateColumns: {
    xs: "40px repeat(2, minmax(0, 1fr)) 40px",
    sm: "56px minmax(0, 1.2fr) repeat(2, minmax(0, 1fr)) 40px",
  },
  gridTemplateAreas: {
    xs: '"symbol type type remove" "lower lower upper upper"',
    sm: '"symbol type lower upper remove"',
  },
  alignItems: "center",
  columnGap: { xs: 1, sm: 2 },
  rowGap: 1.5,
};

function HeaderCell({ area, children }) {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ gridArea: area, fontWeight: 600 }}
    >
      {children}
    </Typography>
  );
}

// لیبل کران‌ها فقط در موبایل که سرستون نمایش داده نمی‌شود
function MobileLabel({ children }) {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: { xs: "block", sm: "none" }, mb: 0.5, fontWeight: 600 }}
    >
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

  const canRemove = variables.length > 1;

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
          افزودن
        </Button>
      }
    >
      <Box sx={{ ...ROW_GRID, display: { xs: "none", sm: "grid" }, mb: 1.5 }}>
        <HeaderCell area="symbol">متغیر</HeaderCell>
        <HeaderCell area="type">نوع</HeaderCell>
        <HeaderCell area="lower">کران پایین</HeaderCell>
        <HeaderCell area="upper">کران بالا</HeaderCell>
      </Box>

      <Stack
        spacing={{ xs: 2, sm: 1.5 }}
        divider={<Divider flexItem sx={{ display: { sm: "none" } }} />}
      >
        {variables.map((variable, index) => (
          <Box key={variable.id} sx={ROW_GRID}>
            <Box
              sx={{
                gridArea: "symbol",
                height: 40,
                display: "grid",
                placeItems: "center",
                borderRadius: "10px",
                bgcolor: "grey.100",
              }}
            >
              <VarSymbol index={index + 1} />
            </Box>

            <Box sx={{ gridArea: "type", minWidth: 0 }}>
              <FormSelect
                name={`variables.${index}.type`}
                options={TYPE_OPTIONS}
              />
            </Box>

            <Box sx={{ gridArea: "lower", minWidth: 0 }}>
              <MobileLabel>کران پایین</MobileLabel>
              <FormNumber
                name={`variables.${index}.lowerBound`}
                placeholder="−∞"
                step="any"
              />
            </Box>

            <Box sx={{ gridArea: "upper", minWidth: 0 }}>
              <MobileLabel>کران بالا</MobileLabel>
              <FormNumber
                name={`variables.${index}.upperBound`}
                placeholder="+∞"
                step="any"
              />
            </Box>

            <Box sx={{ gridArea: "remove" }}>
              <RemoveButton
                label={
                  canRemove
                    ? `حذف متغیر x${index + 1}`
                    : "حداقل یک متغیر لازم است"
                }
                onClick={() => removeVariable(index)}
                disabled={!canRemove}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </SectionCard>
  );
}
