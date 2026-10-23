import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import FunctionsRoundedIcon from "@mui/icons-material/FunctionsRounded";

import ModelForm from "@/components/optimization/ModelForm";

const METHOD_TAGS = ["LP Relaxation", "Floor / Ceil Rounding", "GLPK"];

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 2.5, md: 6 } }}>
      <Container maxWidth="lg">
        <Box
          component="header"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "auto 1fr", md: "auto 1fr auto" },
            gridTemplateAreas: {
              xs: '"logo title" "desc desc" "tags tags"',
              md: '"logo title tags" "logo desc tags"',
            },
            columnGap: { xs: 1.5, sm: 2 },
            rowGap: { xs: 1, md: 0 },
            alignItems: "center",
            mb: { xs: 2.5, md: 4 },
          }}
        >
          <Box
            sx={{
              gridArea: "logo",
              width: { xs: 44, sm: 52 },
              height: { xs: 44, sm: 52 },
              display: "grid",
              placeItems: "center",
              borderRadius: { xs: "12px", sm: "14px" },
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <FunctionsRoundedIcon sx={{ fontSize: { xs: 26, sm: 32 } }} />
          </Box>

          <Typography variant="h4" component="h1" sx={{ gridArea: "title" }}>
            OR2 Solver
          </Typography>

          <Typography color="text.secondary" sx={{ gridArea: "desc" }}>
            حل تقریبی مسائل برنامه‌ریزی عدد صحیح با LP Relaxation و روش گرد
            کردن
          </Typography>


        </Box>

        <ModelForm />
      </Container>
    </Box>
  );
}
