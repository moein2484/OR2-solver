import localFont from "next/font/local";

// فونت اصلی رابط کاربری (متن، فرم‌ها، جدول‌ها)
export const yekanBakh = localFont({
  src: [
    { path: "../../public/fonts/woff2/YekanBakhFaNum-Light.woff2", weight: "300" },
    { path: "../../public/fonts/woff2/YekanBakhFaNum-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/woff2/YekanBakhFaNum-SemiBold.woff2", weight: "600" },
    { path: "../../public/fonts/woff2/YekanBakhFaNum-Bold.woff2", weight: "700" },
    { path: "../../public/fonts/woff2/YekanBakhFaNum-ExtraBold.woff2", weight: "800" },
  ],
  variable: "--font-yekan",
  display: "swap",
});

// فونت تیترها
export const peyda = localFont({
  src: [
    { path: "../../public/fonts/woff2/PeydaWebFaNum-SemiBold.woff2", weight: "600" },
    { path: "../../public/fonts/woff2/PeydaWebFaNum-Bold.woff2", weight: "700" },
    { path: "../../public/fonts/woff2/PeydaWebFaNum-ExtraBold.woff2", weight: "800" },
  ],
  variable: "--font-peyda",
  display: "swap",
});
