import "./globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/common/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Service Marketplace",
  description: "Book trusted local services online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
