"use client";

import {
  Alert,
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

import { VarSymbol } from "./ui";

function formatNumber(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "—";
  }

  return Number(value.toFixed(4)).toString();
}

function relativeGap(lpValue, roundedValue) {
  if (
    typeof roundedValue !== "number" ||
    typeof lpValue !== "number" ||
    lpValue === 0
  ) {
    return null;
  }

  return (Math.abs(lpValue - roundedValue) / Math.abs(lpValue)) * 100;
}

function VariableValues({ values }) {
  if (!values) {
    return (
      <Typography variant="body2" color="text.secondary">
        —
      </Typography>
    );
  }

  return (
    <Box
      dir="ltr"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        gap: 0.75,
      }}
    >
      {values.map((value, index) => (
        <Box
          key={index}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            px: 1,
            height: 28,
            borderRadius: "8px",
            bgcolor: "grey.100",
            fontSize: "0.8125rem",
            fontWeight: 600,
          }}
        >
          <VarSymbol index={index + 1} size="0.9375rem" />
          <Box component="span" sx={{ color: "text.secondary" }}>
            =
          </Box>
          {formatNumber(value)}
        </Box>
      ))}
    </Box>
  );
}

function StatCard({ label, value, hint, tone = "default", children }) {
  const toneColor = {
    default: "text.primary",
    primary: "primary.main",
    success: "success.main",
    warning: "warning.main",
  }[tone];

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, sm: 2.5 },
        height: "100%",
        borderRadius: "12px",
        ...(tone === "success" && {
          borderColor: "success.main",
          bgcolor: "rgba(var(--mui-palette-success-mainChannel) / 0.04)",
        }),
      }}
    >
      <Stack spacing={{ xs: 1, sm: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>

        <Typography
          variant="h4"
          component="p"
          color={toneColor}
          sx={{ fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </Typography>

        {hint && (
          <Typography variant="caption" color="text.secondary">
            {hint}
          </Typography>
        )}

        {children}
      </Stack>
    </Paper>
  );
}

const STATUS = {
  best: {
    label: "بهترین جواب",
    color: "success",
    variant: "filled",
    Icon: EmojiEventsOutlinedIcon,
  },
  feasible: {
    label: "شدنی",
    color: "success",
    variant: "outlined",
    Icon: CheckCircleOutlineIcon,
  },
  infeasible: {
    label: "غیرشدنی",
    color: "error",
    variant: "outlined",
    Icon: CancelOutlinedIcon,
  },
};

// در موبایل فقط آیکون وضعیت نمایش داده می‌شود تا جدول جا شود
function StatusChip({ status }) {
  const { label, color, variant, Icon } = STATUS[status];

  return (
    <Chip
      size="small"
      color={color}
      variant={variant}
      icon={<Icon />}
      label={label}
      aria-label={label}
      title={label}
      sx={{
        "& .MuiChip-label": { display: { xs: "none", sm: "block" } },
        "& .MuiChip-icon": { mx: { xs: "5px", sm: undefined } },
      }}
    />
  );
}

const numericCell = {
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
};

function RoundingTable({ candidates, bestSolution }) {
  const variableCount = candidates[0]?.values.length ?? 0;

  return (
    <TableContainer
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "12px",
        maxHeight: 480,
      }}
    >
      <Table stickyHeader size="small" sx={{ minWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: 56 }}>
              ردیف
            </TableCell>

            {Array.from({ length: variableCount }, (_, index) => (
              <TableCell key={index} align="center" sx={{ minWidth: 56 }}>
                <VarSymbol index={index + 1} size="1rem" />
              </TableCell>
            ))}

            <TableCell align="center" sx={{ minWidth: 72 }}>
              تابع هدف
            </TableCell>

            <TableCell align="center" sx={{ width: { xs: 56, sm: 136 } }}>
              وضعیت
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {candidates.map((candidate, index) => {
            const isBest =
              bestSolution &&
              candidate.feasible &&
              candidate.values.every(
                (value, i) => value === bestSolution.values[i],
              );

            const status = isBest
              ? "best"
              : candidate.feasible
                ? "feasible"
                : "infeasible";

            return (
              <TableRow
                key={index}
                sx={{
                  bgcolor: isBest
                    ? "rgba(var(--mui-palette-success-mainChannel) / 0.07)"
                    : "inherit",
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                <TableCell
                  align="center"
                  sx={{ ...numericCell, color: "text.secondary" }}
                >
                  {index + 1}
                </TableCell>

                {candidate.values.map((value, i) => (
                  <TableCell key={i} align="center" sx={numericCell}>
                    {formatNumber(value)}
                  </TableCell>
                ))}

                <TableCell
                  align="center"
                  sx={{
                    ...numericCell,
                    fontWeight: 700,
                    color: candidate.feasible
                      ? isBest
                        ? "success.dark"
                        : "text.primary"
                      : "text.disabled",
                  }}
                >
                  {formatNumber(candidate.objectiveValue)}
                </TableCell>

                <TableCell align="center">
                  <StatusChip status={status} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function SolutionResult({ result }) {
  if (!result) return null;

  const { lpResult, roundingResult } = result;

  if (lpResult?.status !== "optimal") {
    return (
      <Alert severity="warning">
        حل‌کننده نتوانست جواب بهینه LP را پیدا کند. ممکن است مسئله نشدنی یا
        بی‌کران باشد.
      </Alert>
    );
  }

  const candidates = roundingResult?.candidates ?? [];
  const bestSolution = roundingResult?.bestSolution;

  const feasibleCount = candidates.filter(
    (candidate) => candidate.feasible,
  ).length;

  const gap = relativeGap(
    lpResult.objectiveValue,
    bestSolution?.objectiveValue,
  );

  return (
    <Paper
      component="section"
      variant="outlined"
      sx={{ borderRadius: "14px", overflow: "hidden" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography variant="h5" component="h2">
            نتایج حل مسئله
          </Typography>
          <Typography variant="body2" color="text.secondary">
            مقایسه‌ی جواب LP آزادشده با بهترین جواب عدد صحیح گردشده
          </Typography>
        </Box>

        <Chip
          color={bestSolution ? "success" : "warning"}
          label={bestSolution ? "محاسبه موفق" : "جواب گردشده یافت نشد"}
          sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
        />
      </Stack>

      <Stack spacing={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatCard
              label="جواب بهینه LP Relaxation"
              value={formatNumber(lpResult.objectiveValue)}
              tone="primary"
            >
              <VariableValues values={lpResult.values} />
            </StatCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <StatCard
              label="بهترین جواب گردشده"
              value={formatNumber(bestSolution?.objectiveValue)}
              tone={bestSolution ? "success" : "warning"}
            >
              <VariableValues values={bestSolution?.values} />
            </StatCard>
          </Grid>
        </Grid>

        {!bestSolution && (
          <Alert severity="warning">
            هیچ جواب شدنی از ترکیب‌های گرد کردن پیدا نشد. این به معنی نشدنی
            بودن مسئله عدد صحیح اصلی نیست.
          </Alert>
        )}

        <Stack spacing={1.5}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "baseline", justifyContent: "space-between" }}
          >
            <Typography variant="h6" component="h3">
              ترکیب‌های گرد کردن
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {feasibleCount} شدنی از {candidates.length}
            </Typography>
          </Stack>

          <RoundingTable
            candidates={candidates}
            bestSolution={bestSolution}
          />
        </Stack>

        <Alert severity="info">
          این جواب حاصل از روش تقریب و گرد کردن است و لزوماً جواب بهینه سراسری
          مسئله عدد صحیح نیست.
        </Alert>
      </Stack>
    </Paper>
  );
}
