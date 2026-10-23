"use client";

import { alpha, createTheme } from "@mui/material/styles";

// مقیاس اندازه‌ها: متن پایه، اینپوت‌ها و دکمه‌ها همگی 14px و ارتفاع کنترل‌ها 40px
export const CONTROL_HEIGHT = 40;
export const RADIUS = 10;

// موبایل: اینپوت‌ها 16px (جلوگیری از زوم خودکار iOS) و متن‌ها کمی درشت‌تر برای خوانایی
const MOBILE = "@media (max-width:599.95px)";

const BODY_FONT = "var(--font-yekan), Tahoma, sans-serif";
const HEADING_FONT = "var(--font-peyda), var(--font-yekan), Tahoma, sans-serif";

const palette = {
  mode: "light",
  primary: { main: "#4f46e5", dark: "#4338ca", light: "#818cf8", contrastText: "#ffffff" },
  secondary: { main: "#0f766e", dark: "#115e59", light: "#2dd4bf", contrastText: "#ffffff" },
  success: { main: "#16a34a", dark: "#15803d", light: "#4ade80", contrastText: "#ffffff" },
  warning: { main: "#d97706", dark: "#b45309", light: "#fbbf24", contrastText: "#ffffff" },
  error: { main: "#dc2626", dark: "#b91c1c", light: "#f87171", contrastText: "#ffffff" },
  info: { main: "#0284c7", dark: "#0369a1", light: "#38bdf8", contrastText: "#ffffff" },
  text: { primary: "#101828", secondary: "#475467", disabled: "#98a2b3" },
  divider: "#e4e7ec",
  background: { default: "#f5f6fa", paper: "#ffffff" },
  grey: {
    50: "#f9fafb",
    100: "#f2f4f7",
    200: "#e4e7ec",
    300: "#d0d5dd",
    400: "#98a2b3",
    500: "#667085",
    600: "#475467",
    700: "#344054",
    800: "#1d2939",
    900: "#101828",
  },
};

const theme = createTheme({
  direction: "rtl",
  cssVariables: true,
  palette,
  shape: { borderRadius: RADIUS },
  spacing: 8,

  typography: {
    fontFamily: BODY_FONT,
    fontSize: 14,
    h1: { fontFamily: HEADING_FONT, fontWeight: 800 },
    h2: { fontFamily: HEADING_FONT, fontWeight: 800 },
    h3: { fontFamily: HEADING_FONT, fontWeight: 800, fontSize: "2rem", lineHeight: 1.4 },
    h4: { fontFamily: HEADING_FONT, fontWeight: 800, fontSize: "1.625rem", lineHeight: 1.4, [MOBILE]: { fontSize: "1.375rem" } },
    h5: { fontFamily: HEADING_FONT, fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.5, [MOBILE]: { fontSize: "1.125rem" } },
    h6: { fontFamily: HEADING_FONT, fontWeight: 700, fontSize: "1rem", lineHeight: 1.6, [MOBILE]: { fontSize: "1rem" } },
    subtitle1: { fontWeight: 600, fontSize: "0.9375rem", lineHeight: 1.6 },
    subtitle2: { fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.6, [MOBILE]: { fontSize: "0.9375rem" } },
    body1: { fontSize: "0.875rem", lineHeight: 1.8, [MOBILE]: { fontSize: "0.9375rem" } },
    body2: { fontSize: "0.8125rem", lineHeight: 1.7, [MOBILE]: { fontSize: "0.875rem" } },
    caption: { fontSize: "0.75rem", lineHeight: 1.6, [MOBILE]: { fontSize: "0.8125rem" } },
    overline: { fontSize: "0.6875rem", fontWeight: 700, letterSpacing: 0.4 },
    button: { fontSize: "0.875rem", fontWeight: 600, textTransform: "none", [MOBILE]: { fontSize: "0.9375rem" } },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: palette.background.default },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minHeight: CONTROL_HEIGHT,
          paddingInline: 18,
          borderRadius: RADIUS,
        },
        sizeSmall: { minHeight: 32, paddingInline: 12, fontSize: "0.8125rem" },
        outlined: { borderColor: palette.grey[300] },
      },
    },

    MuiIconButton: {
      styleOverrides: { root: { borderRadius: RADIUS } },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        outlined: { borderColor: palette.divider },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: "0.75rem", borderRadius: 8 },
        sizeSmall: { height: 26 },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: RADIUS, fontSize: "0.8125rem", alignItems: "center" },
        standardInfo: { backgroundColor: alpha(palette.info.main, 0.08) },
        standardWarning: { backgroundColor: alpha(palette.warning.main, 0.1) },
        standardError: { backgroundColor: alpha(palette.error.main, 0.08) },
        standardSuccess: { backgroundColor: alpha(palette.success.main, 0.08) },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.8125rem",
          borderColor: palette.divider,
          paddingBlock: 10,
          [MOBILE]: { fontSize: "0.875rem", paddingInline: 10 },
        },
        head: {
          fontWeight: 700,
          color: palette.text.secondary,
          backgroundColor: palette.grey[50],
          whiteSpace: "nowrap",
        },
      },
    },

    MuiDivider: {
      styleOverrides: { root: { borderColor: palette.divider } },
    },
  },
});

export default theme;
