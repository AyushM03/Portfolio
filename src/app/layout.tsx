import type { Metadata } from "next";
import { Instrument_Sans, Phudu } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const phudu = Phudu({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ayush Meshram — Software Engineer",
  description:
    "Associate Software Engineer at Accenture, deepening backend architecture and system design on the way to a product-based engineering role.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${phudu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        {children}
      </body>
    </html>
  );
}
