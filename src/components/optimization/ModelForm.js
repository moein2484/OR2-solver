"use client";

import { useState } from "react";
import { Box, Paper, Stack, Typography, Alert } from "@mui/material";
import SolutionResult from "./SolutionResult";
import { Form } from "@/component/myForm";
import { initialModel } from "@/lib/optimization/model";
import { solveApproximation } from "@/lib/optimization/solveApproximation";

import ModelFormFields from "./ModelFormFields";

export default function ModelForm() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(data) {
    setError("");
    setResult(null);

    try {
      const solution = await solveApproximation(data);
      setResult(solution);
    } catch (err) {
      setError(err.message || "خطا در حل مسئله");
    }
  }

  return (
    <Stack spacing={3}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight={800} mb={1}>
          تعریف مدل ریاضی
        </Typography>

        <Typography color="text.secondary" mb={4}>
          تابع هدف، متغیرها و محدودیت‌های مسئله را وارد کنید.
        </Typography>

        <Form
          type="normal"
          defaultValues={initialModel}
          onSubmit={handleSubmit}
        >
          <ModelFormFields />
        </Form>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      {result && <SolutionResult result={result} />}
    </Stack>
  );
}
