
import { Box, Container, Typography } from "@mui/material";

import ModelForm from "@/components/optimization/ModelForm";

export default function HomePage() {
  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fc",
        py: { xs: 3, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Box mb={4}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{ fontSize: { xs: 28, md: 38 } }}
          >
            OR2 Solver
          </Typography>

          <Typography color="text.secondary" mt={1}>
            حل تقریبی مسائل برنامه‌ریزی عدد صحیح با LP Relaxation
            و روش گرد کردن
          </Typography>
        </Box>

        <ModelForm />
      </Container>
    </Box>
  );
}
