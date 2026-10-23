"use client";

import { useEffect, useRef, useState } from "react";
import { Alert, Stack } from "@mui/material";
import SolutionResult from "./SolutionResult";
import { Form } from "@/component/myForm";
import { initialModel } from "@/lib/optimization/model";
import { solveApproximation } from "@/lib/optimization/solveApproximation";

import ModelFormFields from "./ModelFormFields";

export default function ModelForm() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const outputRef = useRef(null);

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

  // بعد از هر محاسبه، نتیجه یا خطا را در دید کاربر بیاور
  useEffect(() => {
    if (result || error) {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result, error]);

  return (
    <Stack spacing={3}>
      <Form
        type="normal"
        defaultValues={initialModel}
        onSubmit={handleSubmit}
      >
        <ModelFormFields />
      </Form>

      <Stack ref={outputRef} spacing={3} sx={{ scrollMarginTop: 24 }}>
        {error && <Alert severity="error">{error}</Alert>}

        {result && <SolutionResult result={result} />}
      </Stack>
    </Stack>
  );
}
