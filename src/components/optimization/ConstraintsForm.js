
"use client";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  FormNumber,
  FormSelect,
  useFormContext,
} from "@/component/myForm";

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
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Typography fontWeight={700}>محدودیت‌ها</Typography>

        {constraints.map((constraint, constraintIndex) => (
          <Box
            key={constraint.id}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Stack spacing={2}>
              <Typography variant="caption" color="text.secondary">
                محدودیت {constraintIndex + 1}
              </Typography>

              <Box
                dir="ltr"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                {variables.map((variable, variableIndex) => (
                  <Box
                    key={variable.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {variableIndex > 0 && (
                      <Typography>+</Typography>
                    )}

                    <Box sx={{ width: 76 }}>
                      <FormNumber
                        name={
                          `constraints.${constraintIndex}` +
                          `.coefficients.${variableIndex}`
                        }
                        step="any"
                        required
                      />
                    </Box>

                    <Typography fontWeight={700}>
                      x<sub>{variableIndex + 1}</sub>
                    </Typography>
                  </Box>
                ))}

                <Box sx={{ minWidth: 94 }}>
                  <FormSelect
                    name={`constraints.${constraintIndex}.operator`}
                    options={[
                      { value: "<=", label: "≤" },
                      { value: ">=", label: "≥" },
                      { value: "=", label: "=" },
                    ]}
                    required
                  />
                </Box>

                <Box sx={{ width: 90 }}>
                  <FormNumber
                    name={`constraints.${constraintIndex}.rhs`}
                    step="any"
                    required
                  />
                </Box>

                {/* <IconButton
                  color="error"
                  onClick={() => removeConstraint(constraintIndex)}
                  aria-label="حذف محدودیت"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton> */}
              </Box>
            </Stack>
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addConstraint}
          sx={{ alignSelf: "flex-start" }}
        >
          افزودن محدودیت
        </Button>
      </Stack>
    </Paper>
  );
}
