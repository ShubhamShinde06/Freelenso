import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/provider/ClientLayout";
import { ThemeProvider } from "@/provider/Themeprovider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FreeLenso",
  description: "make it easy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/main_logo.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>{children}</ClientLayout>

          <Toaster position="top-center"/>
        </ThemeProvider>
      </body>
    </html>
  );
}
