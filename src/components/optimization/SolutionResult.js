"use client";

import {
  Alert,
  Box,
  Chip,
  Divider,
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

// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

function formatNumber(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "—";
  }

  return Number(value.toFixed(6)).toString();
}

function formatVariables(values) {
  if (!values) return "—";

  return values
    .map((value, index) => `x${index + 1} = ${formatNumber(value)}`)
    .join(" , ");
}

function ResultCard({ title, value, variables, highlighted = false }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        height: "100%",
        bgcolor: highlighted ? "success.50" : "background.paper",
        borderColor: highlighted ? "success.main" : "divider",
      }}
    >
      <Stack spacing={2}>
        <Typography color="text.secondary" fontWeight={600}>
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight={800}
          color={highlighted ? "success.main" : "text.primary"}
        >
          {formatNumber(value)}
        </Typography>

        <Typography
          fontFamily="monospace"
          sx={{ direction: "ltr", textAlign: "left" }}
        >
          {formatVariables(variables)}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default function SolutionResult({ result }) {
  if (!result) return null;

  const { lpResult, roundingResult } = result;

  if (lpResult?.status !== "optimal") {
    return (
      <Alert severity="warning">
        حل‌کننده نتوانست جواب بهینه LP را پیدا کند.
      </Alert>
    );
  }

  const candidates = roundingResult?.candidates ?? [];
  const bestSolution = roundingResult?.bestSolution;

  const feasibleCount = candidates.filter(
    (candidate) => candidate.feasible,
  ).length;

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" fontWeight={800}>
            نتایج حل مسئله
          </Typography>

          <Chip
            color={bestSolution ? "success" : "warning"}
            label={bestSolution ? "محاسبه موفق" : "جواب گرد‌شده یافت نشد"}
          />
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ResultCard
              title="جواب بهینه LP Relaxation"
              value={lpResult.objectiveValue}
              variables={lpResult.values}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ResultCard
              title="بهترین جواب گرد‌شده"
              value={bestSolution?.objectiveValue}
              variables={bestSolution?.values}
              highlighted={Boolean(bestSolution)}
            />
          </Grid>
        </Grid>

        {!bestSolution && (
          <Alert severity="warning">
            هیچ جواب شدنی از ترکیب‌های گرد کردن پیدا نشد. این به معنی نشدنی بودن
            مسئله عدد صحیح اصلی نیست.
          </Alert>
        )}

        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            ترکیب‌های گرد کردن
          </Typography>

          <Typography color="text.secondary">
            {feasibleCount} جواب شدنی از {candidates.length} ترکیب
          </Typography>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ردیف</TableCell>
                <TableCell>مقادیر متغیرها</TableCell>
                <TableCell>تابع هدف</TableCell>
                <TableCell>وضعیت</TableCell>
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

                return (
                  <TableRow
                    key={index}
                    sx={{
                      bgcolor: isBest ? "action.selected" : "inherit",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      <Typography
                        fontFamily="monospace"
                        sx={{ direction: "ltr", textAlign: "left" }}
                      >
                        {formatVariables(candidate.values)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {formatNumber(candidate.objectiveValue)}
                    </TableCell>

                    <TableCell>
                      {isBest ? (
                        <Chip
                          size="small"
                          color="success"
                          icon={<EmojiEventsOutlinedIcon />}
                          label="بهترین جواب"
                        />
                      ) : candidate.feasible ? (
                        <Chip
                          size="small"
                          color="success"
                          variant="outlined"
                        //   icon={<CheckCircleOutlineIcon />}
                          label="شدنی"
                        />
                      ) : (
                        <Chip
                          size="small"
                          color="error"
                          variant="outlined"
                          icon={<CancelOutlinedIcon />}
                          label="غیرشدنی"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="info">
          این جواب حاصل از روش تقریب و گرد کردن است و لزوماً جواب بهینه سراسری
          مسئله عدد صحیح نیست.
        </Alert>
      </Stack>
    </Paper>
  );
}
