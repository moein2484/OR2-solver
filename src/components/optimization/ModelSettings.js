
"use client";

import { Paper, Stack, Typography } from "@mui/material";
import { FormSelect } from "@/component/myForm";

export default function ModelSettings() {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography fontWeight={700}>
          نوع بهینه‌سازی
        </Typography>

        <FormSelect
          name="direction"
          label="جهت تابع هدف"
          options={[
            { value: "max", label: "بیشینه‌سازی (Max)" },
            { value: "min", label: "کمینه‌سازی (Min)" },
          ]}
          required
        />
      </Stack>
    </Paper>
  );
}
