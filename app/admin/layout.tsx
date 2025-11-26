import { ThemeProvider } from "@/lib/presentation/providers/ThemeProvider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.variable}
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-inter)",
        }}
      >
        <ThemeProvider direction="ltr">{children}</ThemeProvider>
      </body>
    </html>
  );
}
