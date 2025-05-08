import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { MealProvider } from "./context/MealContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Realcenutri",
  description: "app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className}`}
      >
        <MealProvider>
          {children}
        </MealProvider>
      </body>
    </html>
  );
}
