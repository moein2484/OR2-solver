"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";

import { FormNumber } from "@/component/myForm";

// عرض ثابت اینپوت‌های ضرایب تا عبارت‌ها مرتب و هم‌تراز باشند
export const COEFFICIENT_WIDTH = 76;

const coefficientInputStyles = {
  input: {
    direction: "ltr",
    textAlign: "center",
    paddingInline: 8,
  },
};

export function SectionCard({ step, title, description, action, children }) {
  return (
    <Paper
      component="section"
      variant="outlined"
      sx={{ borderRadius: "14px", overflow: "hidden" }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          px: { xs: 2, sm: 3 },
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {step != null && (
          <Box
            sx={{
              width: 32,
              height: 32,
              flexShrink: 0,
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

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>

          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>
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
        styles={coefficientInputStyles}
      />
    </Box>
  );
}

// عبارت خطی  c1·x1 + c2·x2 + ...  با اینپوت برای هر ضریب
export function LinearTerms({ variables, namePrefix }) {
  return variables.map((variable, index) => (
    <Box
      key={variable.id}
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      {index > 0 && <MathText>+</MathText>}
      <CoefficientInput name={`${namePrefix}.${index}`} />
      <VarSymbol index={index + 1} />
    </Box>
  ));
}

// ردیف چپ‌چین برای نمایش عبارت‌های ریاضی
export function ExpressionRow({ children }) {
  return (
    <Box
      dir="ltr"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: 1.5,
        rowGap: 1.5,
      }}
    >
      {children}
    </Box>
  );
}
