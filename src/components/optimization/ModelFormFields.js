
"use client";

import { Stack } from "@mui/material";

import ModelSettings from "./ModelSettings";
import ObjectiveForm from "./ObjectiveForm";
import VariablesForm from "./VariablesForm";
import ConstraintsForm from "./ConstraintsForm";

import { FormActions } from "@/component/myForm";

export default function ModelFormFields() {
  return (
    <Stack spacing={4}>
      <ModelSettings />
      <ObjectiveForm />
      <VariablesForm />
      <ConstraintsForm />

      <FormActions
        submitText="محاسبه جواب"
        resetText="بازنشانی مدل"
        showReset
      />
    </Stack>
  );
}
