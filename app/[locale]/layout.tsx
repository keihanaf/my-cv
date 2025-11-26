import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/lib/presentation/providers/ThemeProvider";
import { Box } from "@mui/material";
import { VisitorTracker } from "@/lib/presentation/components/VisitorTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vazirmatn = localFont({
  src: "../fonts/Vazirmatn-Regular.woff2",
  variable: "--font-vazirmatn",
  display: "swap",
});

const locales = ["en", "fa"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === "fa";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <body
        className={isRtl ? vazirmatn.variable : inter.variable}
        style={{
          fontFamily: isRtl ? "var(--font-vazirmatn)" : "var(--font-inter)",
          margin: 0,
          padding: 0,
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider direction={isRtl ? "rtl" : "ltr"}>
            <VisitorTracker />
            <Box sx={{ minHeight: "100vh" }}>{children}</Box>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
