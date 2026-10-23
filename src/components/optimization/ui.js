"use client";

import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Controller } from "react-hook-form";

import { FormNumber, useFormContext } from "@/component/myForm";

// عرض اینپوت‌های ضرایب؛ در موبایل باریک‌تر تا عبارت در یک خط جا شود
export const COEFFICIENT_WIDTH = { xs: 52, sm: 76 };

const centeredInputStyles = {
  input: {
    direction: "ltr",
    textAlign: "center",
    paddingInline: 4,
  },
};

const sectionPadding = { xs: 2, sm: 3 };

export function SectionCard({ step, title, description, action, children }) {
  return (
    <Paper
      component="section"
      variant="outlined"
      sx={{ borderRadius: "14px", overflow: "hidden" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: step != null ? "auto 1fr auto" : "1fr auto",
          gridTemplateAreas:
            step != null
              ? {
                  xs: '"step title action" "desc desc desc"',
                  sm: '"step title action" "step desc action"',
                }
              : {
                  xs: '"title action" "desc desc"',
                  sm: '"title action" "desc action"',
                },
          alignItems: "center",
          columnGap: { xs: 1.5, sm: 2 },
          rowGap: 0.5,
          px: sectionPadding,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {step != null && (
          <Box
            sx={{
              gridArea: "step",
              width: 32,
              height: 32,
              display: "grid",
              placeItems: "center",
              borderRadius: "10px",
              bgcolor: "rgba(var(--mui-palette-primary-mainChannel) / 0.1)",
              color: "primary.main",
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
          >
            {step}
          </Box>
        )}

        <Typography
          variant="h6"
          component="h2"
          sx={{ gridArea: "title", minWidth: 0 }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ gridArea: "desc" }}
          >
            {description}
          </Typography>
        )}

        {action && <Box sx={{ gridArea: "action" }}>{action}</Box>}
      </Box>

      <Box sx={{ p: sectionPadding }}>{children}</Box>
    </Paper>
  );
}

// نماد متغیر به شکل ریاضی: x با زیرنویس
export function VarSymbol({ index, size = "1.0625rem" }) {
  return (
    <Box
      component="span"
      dir="ltr"
      sx={{
        fontFamily: '"Cambria Math", "Times New Roman", serif',
        fontStyle: "italic",
        fontSize: size,
        lineHeight: 1,
        color: "text.primary",
        whiteSpace: "nowrap",
      }}
    >
      x
      <Box
        component="sub"
        sx={{ fontSize: "0.68em", fontStyle: "normal", ml: "1px" }}
      >
        {index}
      </Box>
    </Box>
  );
}

export function MathText({ children, sx }) {
  return (
    <Box
      component="span"
      sx={{
        fontFamily: '"Cambria Math", "Times New Roman", serif',
        fontSize: "1.0625rem",
        color: "text.secondary",
        lineHeight: 1,
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function CoefficientInput({ name, width = COEFFICIENT_WIDTH }) {
  return (
    <Box sx={{ width, flexShrink: 0 }}>
      <FormNumber
        name={name}
        step="any"
        required
        requiredMessage="الزامی"
        styles={centeredInputStyles}
      />
    </Box>
  );
}

// عبارت خطی  c1·x1 + c2·x2 + ...  با اینپوت برای هر ضریب
export function LinearTerms({ variables, namePrefix }) {
  return variables.map((variable, index) => (
    <Box
      key={variable.id}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 0.75, sm: 1 },
        flexShrink: 0,
      }}
    >
      {index > 0 && <MathText sx={{ mr: { xs: 0.25, sm: 0.5 } }}>+</MathText>}
      <CoefficientInput name={`${namePrefix}.${index}`} />
      <VarSymbol index={index + 1} />
    </Box>
  ));
}

// عبارت ریاضی همیشه در یک خط؛ اگر جا نشد، افقی اسکرول می‌خورد
export function ExpressionRow({ children, sx }) {
  return (
    <Box
      dir="ltr"
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: { xs: 1, sm: 1.5 },
        minWidth: 0,
        maxWidth: "100%",
        overflowX: "auto",
        scrollbarWidth: "thin",
        // جا برای حلقه‌ی فوکوس اینپوت‌ها که با overflow بریده نشود
        p: "3px",
        m: "-3px",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// اینپوت عددی وسط‌چین (مثلاً مقدار سمت راست محدودیت)
export function CenteredNumberInput({ name, width = COEFFICIENT_WIDTH }) {
  return (
    <Box sx={{ width, flexShrink: 0 }}>
      <FormNumber
        name={name}
        step="any"
        required
        requiredMessage="الزامی"
        styles={centeredInputStyles}
      />
    </Box>
  );
}

const OPERATORS = [
  { value: "<=", label: "≤" },
  { value: ">=", label: "≥" },
  { value: "=", label: "=" },
];

// انتخاب نوع نامساوی؛ select بومی تا در موبایل انتخابگر سیستم باز شود
export function OperatorSelect({ name }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box
          component="select"
          {...field}
          aria-label="نوع محدودیت"
          dir="ltr"
          sx={{
            flexShrink: 0,
            width: { xs: 44, sm: 56 },
            height: "var(--form-control-height)",
            px: 0,
            border: "1px solid var(--form-border)",
            borderRadius: "var(--form-radius)",
            bgcolor: "rgba(var(--mui-palette-primary-mainChannel) / 0.06)",
            color: "primary.main",
            fontFamily: '"Cambria Math", "Times New Roman", serif',
            fontSize: "1.25rem",
            fontWeight: 700,
            textAlign: "center",
            textAlignLast: "center",
            appearance: "none",
            cursor: "pointer",
            transition: "border-color .2s, box-shadow .2s",
            "&:hover": { borderColor: "var(--form-border-hover)" },
            "&:focus": {
              outline: "none",
              borderColor: "var(--form-primary)",
              boxShadow: "var(--form-focus-ring)",
            },
          }}
        >
          {OPERATORS.map((operator) => (
            <option key={operator.value} value={operator.value}>
              {operator.label}
            </option>
          ))}
        </Box>
      )}
    />
  );
}

export function RemoveButton({ label, onClick, disabled }) {
  const button = (
    <IconButton
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 40,
        height: 40,
        flexShrink: 0,
        color: "text.secondary",
        "&:hover": {
          color: "error.main",
          bgcolor: "rgba(var(--mui-palette-error-mainChannel) / 0.08)",
        },
      }}
    >
      <DeleteOutlineRoundedIcon fontSize="small" />
    </IconButton>
  );

  if (disabled) return button;

  return <Tooltip title={label}>{button}</Tooltip>;
}
