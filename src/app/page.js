import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import FunctionsRoundedIcon from "@mui/icons-material/FunctionsRounded";

import ModelForm from "@/components/optimization/ModelForm";

const METHOD_TAGS = ["LP Relaxation", "Floor / Ceil Rounding", "GLPK"];

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 3, md: 6 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ mb: { xs: 3, md: 4 }, alignItems: { sm: "center" } }}
          spacing={2}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: "14px",
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <FunctionsRoundedIcon fontSize="large" />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1">
              OR2 Solver
            </Typography>

            <Typography color="text.secondary">
              حل تقریبی مسائل برنامه‌ریزی عدد صحیح با LP Relaxation و روش گرد
              کردن
            </Typography>
          </Box>

          <Stack direction="row" useFlexGap spacing={1} sx={{ flexWrap: "wrap" }}>
            {METHOD_TAGS.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ bgcolor: "background.paper" }}
              />
            ))}
          </Stack>
        </Stack>

        <ModelForm />
      </Container>
    </Box>
  );
}
