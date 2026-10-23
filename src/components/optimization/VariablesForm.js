
"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";F
import {
  FormNumber,
  FormSelect,
  useFormContext,
} from "@/component/myForm";

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
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography fontWeight={700}>متغیرهای تصمیم</Typography>

        {variables.map((variable, index) => (
          <Stack
            key={variable.id}
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ md: "center" }}
          >
            <Typography fontWeight={700}>
              x<sub>{index + 1}</sub>
            </Typography>

            <Box sx={{ minWidth: 150 }}>
              <FormSelect
                name={`variables.${index}.type`}
                options={[
                  { value: "integer", label: "عدد صحیح" },
                  { value: "binary", label: "دودویی" },
                ]}
              />
            </Box>

            <Box sx={{ width: 110 }}>
              <FormNumber
                name={`variables.${index}.lowerBound`}
                label="کران پایین"
                step="any"
              />
            </Box>

            <Box sx={{ width: 110 }}>
              <FormNumber
                name={`variables.${index}.upperBound`}
                label="کران بالا"
                step="any"
              />
            </Box>

            {/* <IconButton
              color="error"
              disabled={variables.length <= 1}
              onClick={() => removeVariable(index)}
            >
              <RemoveCircleOutlineIcon />
            </IconButton> */}
          </Stack>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addVariable}
          sx={{ alignSelf: "flex-start" }}
        >
          افزودن متغیر
        </Button>
      </Stack>
    </Paper>
  );
}
