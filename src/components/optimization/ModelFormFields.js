"use client";

import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import ObjectiveForm from "./ObjectiveForm";
import VariablesForm from "./VariablesForm";
import ConstraintsForm from "./ConstraintsForm";
import ModelPreview from "./ModelPreview";

import { FormActions } from "@/component/myForm";

export default function ModelFormFields() {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: "flex-start" }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={{ xs: 2, md: 3 }}>
          <ObjectiveForm />
          <VariablesForm />
          <ConstraintsForm />

          <Paper
            variant="outlined"
            sx={{
              borderRadius: "14px",
              px: { xs: 2, sm: 3 },
              py: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              ابتدا LP آزادشده حل می‌شود، سپس همه‌ی ترکیب‌های گرد کردن بررسی می‌شوند.
            </Typography>

            <FormActions
              submitText="محاسبه جواب"
              resetText="بازنشانی مدل"
              showReset
              style={{ flexShrink: 0 }}
            />
          </Paper>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ position: { md: "sticky" }, top: { md: 24 } }}>
          <ModelPreview />
        </Box>
      </Grid>
    </Grid>
  );
}
