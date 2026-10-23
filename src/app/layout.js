import "./globals.css";

import ThemeRegistry from "@/theme/ThemeRegistry";
import { peyda, yekanBakh } from "./fonts";

export const metadata = {
  title: "OR2 Solver",
  description:
    "حل تقریبی مسائل برنامه‌ریزی عدد صحیح با LP Relaxation و روش گرد کردن",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${yekanBakh.variable} ${peyda.variable}`}
    >
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
