"use client";

import { useMemo } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import katex from "katex";
import "katex/dist/katex.min.css";

import { useFormContext } from "@/component/myForm";

const OPERATOR_TEX = { "<=": "\\le", ">=": "\\ge", "=": "=" };

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function formatCoefficient(value) {
  return String(Number(value.toFixed(6)));
}

function linearExpression(coefficients = [], count) {
  const terms = [];

  for (let index = 0; index < count; index += 1) {
    const value = coefficients[index];
    const symbol = `x_{${index + 1}}`;

    if (!isNumber(value)) {
      terms.push({ sign: "+", body: `\\square\\,${symbol}` });
      continue;
    }

    if (value === 0) continue;

    const magnitude = Math.abs(value);

    terms.push({
      sign: value < 0 ? "-" : "+",
      body: magnitude === 1 ? symbol : `${formatCoefficient(magnitude)}${symbol}`,
    });
  }

  if (terms.length === 0) return "0";

  return terms
    .map(({ sign, body }, index) => {
      if (index === 0) return sign === "-" ? `-${body}` : body;
      return ` ${sign} ${body}`;
    })
    .join("");
}

function variableDomain(variable, index) {
  const symbol = `x_{${index + 1}}`;

  if (variable.type === "binary") {
    return `${symbol} \\in \\{0, 1\\}`;
  }

  const lower = isNumber(variable.lowerBound) ? variable.lowerBound : null;
  const upper = isNumber(variable.upperBound) ? variable.upperBound : null;

  let bounds = "";

  if (lower != null && upper != null) {
    bounds = `${formatCoefficient(lower)} \\le ${symbol} \\le ${formatCoefficient(upper)}`;
  } else if (lower != null) {
    bounds = `${symbol} \\ge ${formatCoefficient(lower)}`;
  } else if (upper != null) {
    bounds = `${symbol} \\le ${formatCoefficient(upper)}`;
  }

  return bounds
    ? `${bounds}, \\; ${symbol} \\in \\mathbb{Z}`
    : `${symbol} \\in \\mathbb{Z}`;
}

function buildLatex({ direction, variables = [], objective, constraints = [] }) {
  const count = variables.length;
  const lines = [
    `\\${direction === "min" ? "min" : "max"} \\quad & Z = ${linearExpression(
      objective?.coefficients,
      count
    )}`,
  ];

  constraints.forEach((constraint, index) => {
    const label = index === 0 ? "\\text{s.t.} \\quad" : "";
    const operator = OPERATOR_TEX[constraint.operator] ?? "?";
    const rhs = isNumber(constraint.rhs)
      ? formatCoefficient(constraint.rhs)
      : "\\square";

    lines.push(
      `${label} & ${linearExpression(constraint.coefficients, count)} ${operator} ${rhs}`
    );
  });

  variables.forEach((variable, index) => {
    lines.push(`& ${variableDomain(variable, index)}`);
  });

  return `\\begin{aligned} ${lines.join(" \\\\[4pt] ")} \\end{aligned}`;
}

export default function ModelPreview() {
  const { watch } = useFormContext();

  const model = watch();
  const latex = buildLatex(model);

  const html = useMemo(
    () =>
      katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
      }),
    [latex]
  );

  return (
    <Paper variant="outlined" sx={{ borderRadius: "14px", overflow: "hidden" }}>
      <Stack
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" component="h2">
          پیش‌نمایش مدل
        </Typography>
        <Typography variant="body2" color="text.secondary">
          فرم ریاضی مسئله، هم‌زمان با ویرایش
        </Typography>
      </Stack>

      <Box
        dir="ltr"
        sx={{
          px: { xs: 2, sm: 3 },
          py: 1,
          overflowX: "auto",
          color: "text.primary",
          "& .katex-display": { my: 1.5, textAlign: "left" },
          "& .katex": { fontSize: "1.05em" },
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Paper>
  );
}
